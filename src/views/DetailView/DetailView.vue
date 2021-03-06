<template>
  <user-profile></user-profile>
  <div class="detail">
    <h2 class="head">ace模拟器脚本</h2>
    <div class="collapse">
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item name="1">
          <template #title>
            <div class="title">下载及使用</div>
          </template>
          <div class="need-know-list">
            <div v-for="useInfo in useInfos" :key="useInfo.id">
              <div>{{ useInfo.title }}:</div>
              <div>
                <template
                  v-for="(msg, index) in useInfo.msgs"
                  :key="useInfo.id + index"
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
            <div class="title">常见问题</div>
          </template>
          <div class="need-know-list">
            <div v-for="attention in attentions" :key="attention.id">
              <div>{{ attention.title }}:</div>
              <div>
                <template
                  v-for="(msg, index) in attention.msgs"
                  :key="attention.id + index"
                >
                  <div style="margin-left: 20px">
                    {{ index + 1 }}. {{ msg }}
                  </div>
                </template>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template #title>
            <div><span class="title">全局配置</span></div>
          </template>
          <schedule-task></schedule-task>
        </el-collapse-item>
        <el-collapse-item name="4">
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

// 下载及使用方法
const useInfos = [
  {
    id: 0,
    title: '说明',
    msgs: [
      '脚本官网: http://47.96.69.41, 注册后使用',
      '脚本自动更新, 只需下载一次, 支持断线重连, 闪退重启等',
      '脚本支持隐藏模拟器, 同时会隐藏模拟器的任务栏图标',
      '脚本目前支持自动清每日, 自动无尽, 派遣,商店和竞技场可以设置定时任务, 冒险, 元素禁地, 秘境支配者, 活动图可以自由配置',
      '脚本可以同时设置多个任务, 例如冒险神话8-5刷30次, 水装备本12层刷50次, 活动图V-3刷100次等等, 脚本会依次执行任务, 中间会自动穿插进行竞技场及商店购物, 脚本目前支持设置20个任务, 元素本及装备本可设置采用单次战斗(连续战斗失败会损失所有体力, 单次战斗失败减少1点体力)'
    ]
  },
  {
    id: 1,
    title: '下载',
    msgs: [
      '请加QQ群249946487(暗号: ace), 群文件下载脚本解压缩, 注意脚本存放目录不要带空格, 最好也不要带中文',
      '打开官网(http://47.96.69.41), 注册用户, 注册成功会弹出注册码(务必保存以免丢失), 点确定自动跳转脚本页面',
      '双击脚本目录下的register.cmd, 会弹出已成功提示框, 点确定后按要求输入注册码, 请确保无误(如果输入注册码回车后没有提示, 请关闭模拟器后重新执行register.cmd)',
      '有任何问题先查看常见问题, 解决不了可以Q群主'
    ]
  },
  {
    id: 2,
    title: '使用方法',
    msgs: [
      '启动脚本: 在游戏任意界面, 双击脚本目录下的ace.exe启动脚本',
      '停止脚本: 在脚本命令行窗口按住ctrl+c退出脚本',
      '修改配置: 在脚本页面可以修改全局配置以及添加各种任务, 点击提交, 提示成功后重新启动脚本即可生效'
    ]
  },
  {
    id: 3,
    title: '模拟器设置',
    msgs: [
      '版本: 脚本是在夜神v7上开发, 目前已对雷电v4和蓝叠v4做了适配',
      '分辨率: 请确认为平板版-960*540, 蓝叠还需设置dpi为160, 调整完毕请重启模拟器',
      '请不要关闭模拟器右侧操作栏'
    ]
  },
  {
    id: 4,
    title: '游戏设置',
    msgs: [
      '设定: 精致(30fps)',
      '配队: 脚本不会帮你进行配队, 请自行确保队伍配置正确'
    ]
  },
  {
    id: 5,
    title: '系统设置',
    msgs: [
      '系统: win7及以上',
      '显示: 桌面右键显示-缩放布局请确保为100%',
      '如果脚本提示任务开始后就没有反应: 将系统主题调整为经典主题(桌面右键->个性化->主题), 将系统性能调整为最佳性能(我的电脑右键->属性->高级->性能)后重新尝试'
    ]
  }
]

// 常见问题
const attentions = [
  {
    id: 1,
    title: '常见问题',
    msgs: [
      '提示越界: 确保模拟器分辨率正确; 不要最小化模拟器; 尝试模拟器置顶',
      // '电脑熄屏或休眠后无法识别界面: 电脑控制面板电源选项请设置永远不关闭显示, 永远不休眠(显示器是可以关闭的)',
      '脚本暂停: 这是用户在脚本命令行窗口点击鼠标导致, 右键点击即可继续, 永久的解决办法是在脚本命令行窗口上方菜单栏右键->默认值->选项->取消勾选快速编辑模式'
      // '无法绑定窗口: 如果是蓝叠模拟器务必启动游戏后再启动脚本, 其余可尝试将模拟器窗口置顶再启动脚本'
    ]
  },
  {
    id: 2,
    title: '使用注意',
    msgs: [
      '模拟器窗口不能最小化, 有需要请使用脚本提供的隐藏模拟器功能, 该功能会同时隐藏模拟器任务栏图标',
      '在挂机过程中请不要操作游戏, 不要移动模拟器',
      '不同的模拟器不要混用(比如夜神玩其他游戏, 蓝叠玩ace), 如果必须这样, 请先运行ace使用脚本后再使用其他模拟器',
      '注册码将与电脑绑定, 不能在多台电脑使用',
      '脚本支持多开, 请将当前要绑定的模拟器窗口置于其他模拟器窗口上方'
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
  if (!config.value.tasks) return true
  return config.value.tasks.length < 20
})

// 触发配置任务表单的提交(定时任务表单无需校验)
const taskRef = ref()
const submit = () => {
  activeNames.value = ['4']
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
