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
        间隔
        <el-input-number
          class="number"
          style="width: 120px"
          v-model="task.interval"
          placeholder="间隔几小时"
          :min="3"
          :max="task.type === '竞技场' ? 10 : 5"
        />
        小时
        <el-switch
          class="switch"
          v-model="task.before"
          inline-prompt
          active-text="是"
          inactive-text="否"
        >
        </el-switch>
        优先于配置任务
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
  }优先执行${type}任务, 每隔${interval}小时执行${type}任务`
  return msg
})
</script>

<style lang="scss" scoped>
.schedule-task {
  .task {
    margin-bottom: 20px;
    padding: 20px;
    padding-bottom: 10px;
    border: 1px solid black;
    .number {
      margin: 0 5px;
    }
    .switch {
      margin-left: 50px;
      margin-right: 5px;
    }
  }
}
</style>
