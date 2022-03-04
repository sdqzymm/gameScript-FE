<template>
  <div class="schedule-task">
    <el-form
      ref="formRef"
      :model="config"
      label-width="60px"
      label-position="left"
    >
      <el-form-item
        v-for="task in config.schedules"
        class="task"
        :key="task.id"
        prop="schedules"
        :label="task.type"
      >
        <el-input-number
          style="width: 170px"
          v-model="task.interval"
          placeholder="间隔几小时"
          :min="3"
          :max="5"
        />
        &nbsp;&nbsp;
        <el-switch
          v-model="task.before"
          inline-prompt
          active-text="是"
          inactive-text="否"
        >
        </el-switch>
        <div>{{ msg(task) }}</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useConfig from '../hooks/useConfig'
import { Task } from '../store/type'

// 获取任务配置
const config = useConfig()

// 提示信息
const msg = computed(() => (task: Task) => {
  const { type, interval, before } = task
  const msg = `表示脚本开始时${
    before ? '会' : '不会'
  }优先执行${type}任务, 然后间隔${interval}小时执行${type}任务`
  return msg
})
</script>

<style lang="scss" scoped>
.schedule-task {
  .task {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid black;
  }
}
</style>
