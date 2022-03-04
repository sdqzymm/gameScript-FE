<template>
  <div class="login-panel">
    <!-- <h1 class="title">脚本登录</h1> -->
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="mobile">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-mobile ref="mobileRef"></login-mobile>
      </el-tab-pane>
    </el-tabs>
    <div class="control">
      <el-checkbox v-model="isKeep">记住{{ message }}</el-checkbox>
      <el-link type="primary" :underline="false">忘记{{ message }}</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import LoginAccount from './login-account.vue'
import LoginMobile from './login-mobile.vue'

// 定义属性
const isKeep = ref(true)
const accountRef = ref()
const mobileRef = ref()
const currentTab = ref('account')

// 提示记住信息
const message = computed(() =>
  currentTab.value === 'account' ? '密码' : '手机号'
)

// 点击登录
const handleLoginClick = () => {
  if (currentTab.value === 'account') {
    accountRef.value?.loginAction(isKeep.value)
  } else if (currentTab.value === 'mobile') {
    mobileRef.value?.loginAction(isKeep.value)
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 24px;
  margin-bottom: 30px;
}
.login-panel {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 320px;
  width: 30%;
  margin-bottom: 25%;
  margin-top: 100px;
  .title {
    text-align: center;
  }
  .control {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
