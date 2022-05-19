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
          :min="2"
          :max="task.type === '商店' ? 5 : 10"
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
              v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]"
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
          竞技场等每日暂时无法完成, 会先去执行其它任务,
          等到合适时间再尝试继续完成每日
        </div>
      </el-form-item>
      <el-form-item label="自动无尽" class="task">
        <el-switch
          v-model="config.endless.open"
          class="mb-2"
          active-text="开启无尽"
          inactive-text="关闭无尽"
        />
        <div v-if="config.endless.open">
          <div>脚本不会帮你配队, 你需要自己在无尽中配置好阵容进行一场战斗</div>
          <div class="text1">
            神器选择的优先级列表, 从上到下优先级依次降低, 可以拖拽调整优先顺序,
            调整完毕记得提交(如果你出的3个神器都不在该优先级列表中,
            那么会随机选择)
          </div>
          <div class="text2">
            右边的开关表示是否开启保持优先级: 开启时,
            该神器始终保持设置的优先级; 关闭时,
            该神器在第一次选择后将从优先级列表中移除(比如有些神器多次选择是无效的)
          </div>
          <draggable
            v-model="config.endless.artifacts"
            class="list-group"
            tag="transition-group"
            :component-data="{
              tag: 'ul',
              type: 'transition-group',
              name: !drag ? 'flip-list' : null
            }"
            v-bind="dragOptions"
            @start="drag = true"
            @end="onEnd"
            item-key="id"
          >
            <template #item="{ element }">
              <li class="list-group-item">
                <span :style="{ color: element.color }"
                  >{{ element.name }}: {{ element.desc }}</span
                >
                <el-switch v-model="element.keep" class="mb-2" />
              </li>
            </template>
          </draggable>
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
import draggable from 'vuedraggable'

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

// 拖拽排序
const drag = ref(false)
const onEnd = () => {
  drag.value = false
  console.log(config.value.endless)
}
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost'
  }
})
</script>

<style lang="scss" scoped>
/* 拖拽排序 */
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
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
      background-color: light;
    }
  }
}
</style>
