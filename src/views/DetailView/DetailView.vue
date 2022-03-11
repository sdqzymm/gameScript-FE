<template>
  <user-profile></user-profile>
  <div class="detail">
    <h2 class="head">ace脚本</h2>
    <div class="collapse">
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item name="1">
          <template #title>
            <div class="title">使用需知</div>
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
            <div><span class="title">定时任务</span>(一般无需配置)</div>
          </template>
          <schedule-task></schedule-task>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template #title>
            <div class="title">配置任务</div>
          </template>
          <normal-task ref="taskRef"></normal-task>
          <div class="mid">
            <el-button v-show="show" @click="addTask">添加任务</el-button>
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
    id: 0,
    title: '说明',
    msgs: [
      '脚本支持自动更新, 支持断线重连, 支持顶号半小时后重连, 支持游戏闪退重启',
      '脚本目前支持商店购物, 竞技场, 冒险, 元素禁地, 秘境支配者, 活动图',
      '请认真阅读使用需知, 以免脚本使用过程中出错'
    ]
  },
  {
    id: 1,
    title: '下载',
    msgs: [
      '请加群249946487(暗号: ace), 群文件下载脚本, 直接解压即可',
      '执行脚本目录下的dm.bat, 提示注册成功',
      '淘宝(这里待上链接)购买获取注册码(请保存, 以免丢失)',
      '执行脚本目录下的reg.bat, 输入注册码, 确认无误',
      '点击右上角用户名处的绑定, 输入注册码, 点击提交',
      '注意: 请不要删除或移动脚本目录下的文件'
    ]
  },
  {
    id: 2,
    title: '系统',
    msgs: [
      '系统控制面板电源选项请设置永远不关闭显示, 永远不休眠(显示器是可以关闭的), 否则电脑休眠后脚本无法识别屏幕',
      '命令行窗口(窗口键+r输入cmd可以打开命令行): 上方菜单栏右键->默认值->选项->取消勾选快速编辑模式, 否则用户可能会误触命令行导致脚本暂停'
    ]
  },
  {
    id: 3,
    title: '模拟器设置',
    msgs: [
      '版本: 脚本是在夜神安卓9版本上开发, 建议使用该版本, 夜神7也可以使用',
      '分辨率: 平板版-960*540'
    ]
  },
  {
    id: 4,
    title: '游戏设置',
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
      '如果绑定失败请将模拟器窗口置于最上方再启动脚本',
      '脚本支持多开, 请将当前要绑定的模拟器窗口置于其他模拟器窗口上方',
      '本脚本属于屏幕像素识别原理，不修改或读取游戏内存或封包、是给白领办公学生党等没时间的人解放双手，请不要用于游戏内经济市场的炒作！一但发现将禁止您的使用'
    ]
  },
  {
    id: 6,
    title: '使用方法',
    msgs: [
      '在网站配置任务后点提交会显示提交成功',
      '在模拟器界面或者游戏任意界面, 双击脚本目录下的ace.exe启动脚本'
    ]
  }
]

// 获取任务配置信息
const config = useConfig()

// 添加配置任务
const addTask = () => {
  config.value.tasks.push(getDefaultTask())
}

// 控制添加任务按钮显示
const show = computed(() => {
  return config.value.tasks.length < 20
})

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
  .head {
    font-size: 24px;
    font-weight: 900;
    text-align: center;
    margin-bottom: 30px;
  }
  .collapse {
    margin-bottom: 20px;
    .title {
      font-weight: 600;
      font-size: 20px;
    }
  }
  .mid {
    display: flex;
    justify-content: space-around;
  }
}
</style>
