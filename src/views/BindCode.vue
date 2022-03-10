<template>
  <div class="bind-code">
    <el-page-header
      :icon="ArrowLeft"
      title="返回"
      content="绑定注册码"
      @back="handleBack"
    />
    <div class="code">
      <el-input
        placeholder="请输入您的注册码"
        v-model="code"
        style="width: 300px"
      ></el-input>
      <el-button @click="handleSubmit" type="success" class="submit-btn"
        >绑定</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useStore } from '@/store'

const router = useRouter()
const handleBack = () => {
  router.back()
}

const store = useStore()
const code = ref<string>('')

const handleSubmit = () => {
  store.dispatch('login/bindCodeAction', {
    code: code.value,
    userId: store.state.login.userInfo.id
  })
}
</script>

<style lang="scss" scoped>
.bind-code {
  margin: 20px;
  .code {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    margin: 10px auto;
    margin-top: 200px;
    .submit-btn {
      margin-top: 20px;
    }
  }
}
</style>
