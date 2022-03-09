<template>
  <div class="reward">
    <el-page-header
      :icon="ArrowLeft"
      title="返回"
      content="打赏"
      @back="handleBack"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()
const handleBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.reward {
  margin: 20px;
}
</style>
