<template>
  <user-profile></user-profile>
  <div class="detail">
    <h2 class="title">ace脚本</h2>
    <div class="collapse">
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item name="1">
          <template #title>
            <div>使用需知</div>
          </template>
          <div class="need-know-list">
            <div v-for="needKnow in needKnows" :key="needKnow.id">
              <div>{{ needKnow.title }}:</div>
              <div>
                <template
                  v-for="(msg, index) in needKnow.msgs"
                  :key="needKnow.id + index"
                >
                  <div style="margin-left: 20px">
                    {{ index + 1 }}. {{ msg }}
                  </div>
                </template>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template #title>
            <div>定时任务(一般无需配置)</div>
          </template>
          <schedule-task></schedule-task>
        </el-collapse-item>
        <el-collapse-item name="3" title="配置任务">
          <normal-task ref="taskRef"></normal-task>
          <div class="mid">
            <el-button @click="addTask">添加任务</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="mid">
      <el-button @click="submit" type="primary">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useConfig from '../../hooks/useConfig'
import { getDefaultTask } from '../../store/config'
import UserProfile from '@/components/UserProfile/UserProfile.vue'

// 控制当前展开面板
const activeNames = ref<string[]>([])

// 使用需知信息
const needKnows = [
  {
    id: 1,
    title: '下载',
    msgs: [
      '请加群588435441(暗号: ace), 群文件下载脚本',
      '请确保已经注册, 并将自动生成的注册码写入系统环境'
    ]
  },
  {
    id: 2,
    title: '系统',
    msgs: [
      '系统控制面板电源选项请设置永远不关闭显示(显示器是可以关闭的), 永远不休眠',
      '命令行窗口: 上方菜单栏右键->默认值->选项->取消勾选快速编辑模式(窗口键+r输入cmd可以打开命令行)'
    ]
  },
  {
    id: 3,
    title: '模拟器',
    msgs: [
      '版本: 脚本是在夜神安卓9版本上开发, 建议使用该版本, 夜神7应该也可以',
      '分辨率: 平板版-960*540'
    ]
  },
  {
    id: 4,
    title: '游戏',
    msgs: [
      '设定: 精致(30fps)',
      '战斗: 脚本使用连续战斗模式, 请自行确保已经通关需要挂机的地图',
      '配队: 脚本不会帮你进行配队, 请自行确保队伍配置正确'
    ]
  },
  {
    id: 5,
    title: '脚本',
    msgs: [
      '模拟器窗口不能最小化',
      '在挂机过程中请不要操作游戏, 不要移动模拟器',
      '如果绑定失败请将模拟器窗口置顶再启动脚本'
    ]
  }
]

// 获取任务配置信息
const config = useConfig()

// 添加配置任务
const addTask = () => {
  config.value.tasks.push(getDefaultTask())
}

// 触发配置任务表单的提交(因为定时任务表单无需校验)
const taskRef = ref()
const submit = () => {
  activeNames.value = ['3']
  if (!taskRef.value) return
  taskRef.value.submit()
}
</script>

<style lang="scss" scoped>
.detail {
  min-width: 750px;
  width: 750px;
  margin: 30px auto;
  .title {
    font-size: 24px;
    text-align: center;
    margin-bottom: 30px;
  }
  .collapse {
    margin-bottom: 20px;
  }
  .mid {
    display: flex;
    justify-content: space-around;
  }
}
</style>
