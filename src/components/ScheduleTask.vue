<template>
  <div class="schedule-task">
    <el-form
      ref="formRef"
      :model="config"
      label-width="100px"
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
      <el-form-item label="隐藏功能" class="task">
        <el-switch
          v-model="config.simulator"
          class="mb-2"
          active-text="显示模拟器"
          inactive-text="隐藏模拟器"
        />
        <el-switch
          v-model="config.print"
          class="mb-2 log"
          active-text="显示日志"
          inactive-text="隐藏日志"
        />
        <div v-if="!config.simulator" class="text1">
          模拟器会被隐藏, 切记退出脚本时使用ctrl+c, 不要直接右上角关闭,
          否则脚本不会帮你恢复显示模拟器,
          如果直接关闭了导致找不到模拟器可以重新启动脚本,
          等个几秒然后ctrl+c退出即可
        </div>
        <div v-if="!config.print" class="text2">
          打印信息会被隐藏, 脚本将不会输出跟游戏相关的信息,
          用户将无法得知游戏进度
        </div>
      </el-form-item>
      <el-form-item
        v-if="store.state.login.userInfo.vip"
        label="薅羊毛"
        class="task"
      >
        <div class="text1">
          说明: 该功能为vip功能, 只会在装备本12层及以上选择单次战斗时启用,
          可以判断boss掉落的装备品级和星级, 不满足条件会点击撤退重新战斗,
          目前设置的条件为: 12层出6星紫装或6星橙装, 炼狱出6星橙装
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useConfig from '../hooks/useConfig'
import { useStore } from '../store'
import { Task } from '../store/type'

const store = useStore()
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
    .text1 {
      color: red;
    }
    .text2 {
      color: blue;
    }
    .log {
      margin-left: 20px;
    }
  }
}
</style>
