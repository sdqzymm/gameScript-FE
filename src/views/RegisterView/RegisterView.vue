<template>
  <div class="register">
    <el-page-header
      :icon="ArrowLeft"
      title="返回"
      content="注册用户"
      @back="handleBack"
    />
    <el-form
      label-width="100px"
      :rules="rules"
      :model="account"
      ref="formRef"
      class="form"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword">
        <el-input show-password v-model="account.rePassword"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="handelSubmit(formRef)"
          >注册</el-button
        >
        <el-button @click="handleReset(formRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import useRules from './hook'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const handleBack = () => {
  router.back()
}

const account = reactive({
  name: '',
  password: '',
  rePassword: ''
})

const store = useStore()
const rules = useRules(account)
type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>()
const handelSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      store.dispatch('login/accountRegisterAction', { ...account })
    } else {
      return false
    }
  })
}
const handleReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.register {
  margin: 20px;
  .form {
    margin: 250px auto;
    width: 30%;
    min-width: 350px;
  }
}
</style>
