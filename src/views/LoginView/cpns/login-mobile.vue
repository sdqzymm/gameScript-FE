<template>
  <div class="login-mobile">
    <el-form label-width="80px" :rules="rules" :model="mobile" ref="formRef">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="mobile.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <div class="captcha">
          <el-input v-model="mobile.captcha"></el-input>
          <el-button
            type="primary"
            :disabled="canCaptchClick"
            @click="handleCaptchaClick"
            class="btn"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElForm, ElMessage } from 'element-plus'
import { reactive, computed, ref } from 'vue'
import config from '../config/mobile.config'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'

// 定义属性
const mobile = reactive({
  phone: localCache.getCache('phone'),
  captcha: ''
})
const formRef = ref<InstanceType<typeof ElForm>>()
const store = useStore()

// 获取校验规则
const { rules } = config

// 验证码
const canCaptchClick = computed(() => {
  return !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
    mobile.phone
  )
})
const handleCaptchaClick = () => {
  ElMessage.error('算了, 要钱的, 还是用账号登录吧, 以后再说')
}

// 登录
const loginAction = (isKeepPhone: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1. 判断是否要记住手机号
      if (isKeepPhone) {
        // 本地缓存
        localCache.setCache(mobile)
      } else {
        // 清除缓存
        localCache.deleteCache(mobile)
      }

      // 2. 登录
      store.dispatch('login/mobileLoginAction', { ...mobile })
    } else {
      return false
    }
  })
}

// eslint-disable-next-line no-undef
defineExpose({
  loginAction
})
</script>

<style lang="scss" scoped>
.captcha {
  display: flex;
  .btn {
    margin-left: 20px;
  }
}
</style>
