<template>
  <div class="user-profile">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ user }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="bind">绑定</el-dropdown-item>
          <el-dropdown-item divided command="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'

const store = useStore()
const user = computed(() => {
  return store.state.login.userInfo.name
})
const router = useRouter()

const handleCommand = (command: string | number | object) => {
  switch (command) {
    case 'bind':
      router.push('/bind')
      break
    case 'logout':
      store.dispatch('login/logoutAction')
      break
    default:
      break
  }
}
</script>

<style lang="scss" scoped>
.user-profile {
  display: flex;
  background-color: black;
  justify-content: right;
  .el-dropdown-link {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-right: 10px;
    color: var(--el-color-primary);
    cursor: pointer;
  }
}
</style>
