import { v4 } from 'uuid'
import { Continuous, Task } from './type'

const defaultContinuous: Continuous = {
  ticket: true,
  diamond: false,
  fail: true,
  find: true,
  open: false // true:表示启动连续战斗, false:表示启用单次战斗
}

export function getDefaultTask(): Task {
  return {
    id: v4(),
    type: '',
    checked: ['ticket', 'fail', 'find'],
    continuous: { ...defaultContinuous }
  }
}

export function getDefaultSchedule() {
  return [
    {
      id: 'arena',
      type: '竞技场',
      before: true,
      interval: 5
    },
    {
      id: 'shopping',
      type: '商店',
      before: true,
      interval: 3
    },
    {
      id: 'send',
      type: '派遣',
      before: false,
      interval: 2
    }
  ]
}

export function getDefaultDaily() {
  return {
    open: true,
    elemental: {
      floor: 7
    },
    secretArea: {
      property: '水',
      floor: 12
    }
  }
}

export function getDefaultEndless() {
  return {
    open: true,
    artifacts: [
      {
        id: 20,
        name: '新兵护符',
        desc: '仅第三层, 攻防+20%',
        keep: true,
        color: 'darkorange'
      },
      {
        id: 17,
        name: '刽子手',
        desc: '对生命低于50%的单位伤害提升',
        keep: false,
        color: 'darkorange'
      },
      {
        id: 9,
        name: '诅咒圣杯',
        desc: '全体速度+50%',
        keep: false,
        color: 'darkorange'
      },
      {
        id: 16,
        name: '黄金马蹄铁',
        desc: '战斗开始时, 降低所有敌人30%防御',
        keep: false,
        color: 'darkorange'
      },
      {
        id: 18,
        name: '爆裂美酒',
        desc: '元素克制效果提高100%',
        keep: false,
        color: 'darkorange'
      },
      {
        id: 23,
        name: '巨魔宝藏',
        desc: '击杀立刻获得1个额外回合',
        keep: true,
        color: 'darkorange'
      },
      {
        id: 3,
        name: '誓言旗帜',
        desc: '击杀获得1个额外回合',
        keep: false,
        color: 'darkorange'
      },
      {
        id: 30,
        name: '剧毒之瓶',
        desc: '中毒效果提高200%',
        keep: false,
        color: 'darkorange'
      },
      {
        id: 29,
        name: '死亡凝视',
        desc: '开局大幅削减敌方生命',
        keep: false,
        color: 'darkorange'
      },
      {
        id: 42,
        name: '银鳞腿甲',
        desc: '暴击时自身技能CD-1',
        keep: false,
        color: 'darkorange'
      },
      {
        id: 8,
        name: '萌发枝芽',
        desc: '最大生命+30%',
        keep: false,
        color: 'darkorange'
      },
      {
        id: 19,
        name: '诅咒之刃',
        desc: '25%几率造成双倍伤害',
        keep: true,
        color: 'darkorange'
      },
      {
        id: 4,
        name: '胜利誓约',
        desc: '战斗结束全员恢复30%生命',
        keep: false,
        color: 'darkorange'
      },
      {
        id: 10,
        name: '精准指环',
        desc: '所有技能CD-1',
        keep: false,
        color: 'darkorange'
      },
      {
        id: 22,
        name: '狂怒咆哮',
        desc: '战斗开始时, 第一个终极技能伤害+50%',
        keep: false,
        color: 'darkorange'
      },
      {
        id: 24,
        name: '魔龙之眼',
        desc: '反伤25%',
        keep: false,
        color: 'darkorange'
      },
      {
        id: 25,
        name: '弹射之瓶',
        desc: '单体伤害25%几率复制到1个随机敌人身上',
        keep: false,
        color: 'darkorange'
      },
      {
        id: 41,
        name: '狮鹫之心',
        desc: '造成伤害时有50%几率造成额外的真实伤害',
        keep: false,
        color: 'darkorange'
      },
      {
        id: 1,
        name: '沉船之靴',
        desc: '暴击率+15%, 暴击伤害+20%',
        keep: true,
        color: 'purple'
      },
      {
        id: 2,
        name: '兽群项链',
        desc: '击杀单位, 攻击+30%, 速度+10%',
        keep: true,
        color: 'purple'
      },
      {
        id: 7,
        name: '黑耀巨剑',
        desc: '攻击+15%, 速度+20',
        keep: true,
        color: 'purple'
      },
      {
        id: 31,
        name: '爆炸图腾',
        desc: '群体攻击时30%几率攻击加倍',
        keep: true,
        color: 'purple'
      },
      {
        id: 12,
        name: '睥睨之眼',
        desc: '范围伤害+15%, 驱散1个buff',
        keep: true,
        color: 'purple'
      },
      {
        id: 15,
        name: '闪亮矿锄',
        desc: '每个buff额外提高5%攻击',
        keep: false,
        color: 'purple'
      },
      {
        id: 5,
        name: '谦卑护符',
        desc: '战斗开始时获得1次技能免疫',
        keep: false,
        color: 'purple'
      },
      {
        id: 21,
        name: '大地之心',
        desc: '开局20%最大生命值的护盾',
        keep: false,
        color: 'purple'
      },
      {
        id: 11,
        name: '金钟罩',
        desc: '防御+25%, 偏移+20%',
        keep: false,
        color: 'purple'
      },
      {
        id: 13,
        name: '洪流法杖',
        desc: '使用法术时, 清除所有技能CD',
        keep: false,
        color: 'purple'
      },
      {
        id: 14,
        name: '旅行之壶',
        desc: '使用非伤害技能, 50%几率所有技能CD-1',
        keep: false,
        color: 'purple'
      },
      {
        id: 27,
        name: '黑之靴',
        desc: '开局25%几率对敌人施加debuff',
        keep: false,
        color: 'purple'
      },
      {
        id: 28,
        name: '牵引头冠',
        desc: '20%几率令队友夹击',
        keep: false,
        color: 'purple'
      },
      {
        id: 46,
        name: '尖刺护符',
        desc: '受伤反弹5%最大生命的伤害',
        keep: false,
        color: 'purple'
      },
      {
        id: 32,
        name: '暴怒法杖',
        desc: '使用法术时, 攻+50%一回合',
        keep: false,
        color: 'purple'
      },
      {
        id: 33,
        name: '反击长靴',
        desc: '30%几率反击',
        keep: false,
        color: 'purple'
      },
      {
        id: 43,
        name: '追魂之刃',
        desc: '使用单体攻击时, 有20%几率再释放一次',
        keep: false,
        color: 'purple'
      },
      {
        id: 39,
        name: '处刑者匕首',
        desc: '每胜利1场, 攻击+3%, 最多15% ',
        keep: false,
        color: 'blue'
      },
      {
        id: 26,
        name: '角斗士勋章',
        desc: '暴击伤害+20%',
        keep: false,
        color: 'blue'
      },
      {
        id: 44,
        name: '猎人手套',
        desc: '暴击吸血+15%',
        keep: false,
        color: 'blue'
      },
      {
        id: 6,
        name: '末日锁链',
        desc: '速度+20',
        keep: false,
        color: 'blue'
      },
      {
        id: 34,
        name: '死亡之爪',
        desc: '攻击+10%',
        keep: false,
        color: 'blue'
      },
      {
        id: 36,
        name: '领军头饰',
        desc: '战斗中每次行动后, 攻击+5%, 最多叠加10层',
        keep: false,
        color: 'blue'
      },
      {
        id: 35,
        name: '荣耀之盔',
        desc: '防御+15%',
        keep: false,
        color: 'blue'
      },
      {
        id: 37,
        name: '处刑者铠甲',
        desc: '每胜利1场, 防御+4%, 最多20%',
        keep: false,
        color: 'blue'
      },
      {
        id: 38,
        name: '幸运四叶草',
        desc: '暴击+15%',
        keep: false,
        color: 'blue'
      },
      {
        id: 40,
        name: '蓝少女祝福',
        desc: '治疗效果+15%',
        keep: false,
        color: 'blue'
      },
      {
        id: 45,
        name: '灵动卫戒',
        desc: '闪避+10%',
        keep: false,
        color: 'blue'
      }
    ]
  }
}
