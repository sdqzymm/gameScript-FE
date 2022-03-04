<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import config from '../config/account.config'
import localCache from '@/utils/cache'

// 定义属性
const store = useStore()
const account = reactive(localCache.getCache(['name', 'password']))
const formRef = ref<InstanceType<typeof ElForm>>()

// 获取校验规则
const { rules } = config

// 登录
const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1. 判断是否要记住密码
      if (isKeepPassword) {
        // 本地缓存
        localCache.setCache(account)
      } else {
        // 清除缓存
        localCache.deleteCache(account)
      }

      // 2. 登录
      store.dispatch('login/accountLoginAction', { ...account })
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

<style lang="scss" scoped></style>
