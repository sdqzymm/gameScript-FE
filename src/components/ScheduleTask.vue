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
          等个几秒然后用ctrl+c退出
        </div>
        <div v-if="!config.print" class="text2">
          打印信息会被隐藏, 脚本将不会输出跟游戏相关的信息,
          用户将无法得知游戏进度
        </div>
      </el-form-item>
      <el-form-item label="自动每日" class="task">
        <el-switch
          v-model="config.daily.open"
          class="mb-2"
          active-text="开启每日"
          inactive-text="关闭每日"
        />
        <div class="elemental">
          <span class="text">元素禁地</span>
          <el-select
            v-model="config.daily.elemental.floor"
            class="m-2"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
              :key="item"
              :label="item + '层'"
              :value="item"
            />
          </el-select>
        </div>
        <div class="secret">
          <span class="text">秘境支配者</span>
          <el-select
            v-model="config.daily.secretArea.property"
            class="m-2"
            size="large"
          >
            <el-option
              v-for="item of ['风', '火', '水', '光', '暗']"
              :key="item"
              :label="item + '装备本'"
              :value="item"
            />
          </el-select>
          <el-select
            v-model="config.daily.secretArea.floor"
            class="m-2"
            size="large"
          >
            <el-option
              v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]"
              :key="item"
              :label="item + '层'"
              :value="item"
            />
          </el-select>
        </div>
        <div class="text1">
          开启每日后, 脚本会优先完成每日任务, 自动领取每日奖励,
          每天12点后(utc时间4点后)会自动添加每日任务, 如果升星,
          竞技场等每日暂时无法完成, 会优先执行配置中的任务,
          然后再尝试继续完成每日
        </div>
      </el-form-item>
      <el-form-item
        v-if="store.state.login.userInfo.vip"
        label="薅羊毛"
        class="task"
      >
        <div class="text1">
          说明: 该功能为vip功能, 只会在装备本12层及以上并且选择单次战斗时启用,
          可以判断boss掉落的装备品级和星级, 不满足条件会点击撤退退出,
          目前设置的条件为: 12, 13层出6星紫装或6星橙装, 14层出6星紫装*2或6星橙装
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
    .elemental {
      margin: 0 20px;
      .text {
        margin-right: 10px;
      }
    }
    .secret {
      margin: 5px 0;
      .text {
        margin-right: 10px;
      }
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
