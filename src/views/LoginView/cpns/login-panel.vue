<template>
  <div class="login-panel">
    <!-- <h1 class="title">脚本登录</h1> -->
    <el-tabs
      type="border-card"
      stretch
      v-model="currentTab"
      @tab-click="handleTabClick"
    >
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
    </div>
    <div class="btn">
      <el-button type="success" @click="handleRegClick">前往注册</el-button>
      <el-button type="primary" @click="handleLoginClick">立即登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import LoginAccount from './login-account.vue'
import LoginMobile from './login-mobile.vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 定义属性
const isKeep = ref(true)
const accountRef = ref()
const mobileRef = ref()
const currentTab = ref('account')

// 提示记住信息
const message = computed(() =>
  currentTab.value === 'account' ? '密码' : '手机号'
)

// 暂时关闭手机登录
const handleTabClick = (tab: any) => {
  const name = tab.paneName
  if (name === 'mobile') {
    ElMessage.warning({
      duration: 1500,
      message: '暂不支持手机登录'
    })
  }
}

// 点击登录
const handleLoginClick = () => {
  if (currentTab.value === 'account') {
    accountRef.value?.loginAction(isKeep.value)
  } else if (currentTab.value === 'mobile') {
    mobileRef.value?.loginAction(isKeep.value)
  }
}

// 点击注册
const router = useRouter()
const handleRegClick = () => {
  router.push('/register')
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
  .btn {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
}
</style>
