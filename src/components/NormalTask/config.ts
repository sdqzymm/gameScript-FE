const maps = [
  {
    value: '1',
    label: '1图'
  },
  {
    value: '2',
    label: '2图'
  },
  {
    value: '3',
    label: '3图'
  },
  {
    value: '4',
    label: '4图'
  },
  {
    value: '5',
    label: '5图'
  },
  {
    value: '6',
    label: '6图'
  },
  {
    value: '7',
    label: '7图'
  },
  {
    value: '8',
    label: '8图'
  }
]
const chapters = [
  {
    value: '1',
    label: '第一章',
    children: maps
  },
  {
    value: '2',
    label: '第二章',
    children: maps
  },
  {
    value: '3',
    label: '第三章',
    children: maps
  },
  {
    value: '4',
    label: '第四章',
    children: maps
  },
  {
    value: '5',
    label: '第五章',
    children: maps
  },
  {
    value: '6',
    label: '第六章',
    children: maps
  },
  {
    value: '7',
    label: '第七章',
    children: maps
  },
  {
    value: '8',
    label: '第八章',
    children: maps
  },
  {
    value: '9',
    label: '第九章',
    children: maps
  },
  {
    value: '10',
    label: '第十章',
    children: maps
  }
]
const checkPoints = [
  {
    value: '12',
    label: '关卡12'
  },
  {
    value: '11',
    label: '关卡11'
  },
  {
    value: '10',
    label: '关卡10'
  },
  {
    value: '9',
    label: '关卡9'
  },
  {
    value: '8',
    label: '关卡8'
  },
  {
    value: '7',
    label: '关卡7'
  },
  {
    value: '6',
    label: '关卡6'
  },
  {
    value: '5',
    label: '关卡5'
  },
  {
    value: '4',
    label: '关卡4'
  },
  {
    value: '3',
    label: '关卡3'
  },
  {
    value: '2',
    label: '关卡2'
  },
  {
    value: '1',
    label: '关卡1'
  }
]
const _checkPoints = checkPoints.slice(3)
const options = [
  {
    value: '冒险',
    label: '冒险',
    children: [
      {
        value: '神话',
        label: '神话',
        children: chapters
      },
      {
        value: '困难',
        label: '困难',
        children: chapters
      },
      {
        value: '普通',
        label: '普通',
        children: chapters
      }
    ]
  },
  {
    value: '元素禁地',
    label: '元素禁地',
    children: [
      {
        value: '木',
        label: '木元素',
        children: _checkPoints
      },
      {
        value: '水',
        label: '水元素',
        children: _checkPoints
      },
      {
        value: '火',
        label: '火元素',
        children: _checkPoints
      },
      {
        value: '光',
        label: '光元素',
        children: _checkPoints
      },
      {
        value: '暗',
        label: '暗元素',
        children: _checkPoints
      }
    ]
  },
  {
    value: '秘境支配者',
    label: '秘境支配者',
    children: [
      {
        value: '木',
        label: '木装备本',
        children: checkPoints
      },
      {
        value: '水',
        label: '水装备本',
        children: checkPoints
      },
      {
        value: '火',
        label: '火装备本',
        children: checkPoints
      },
      {
        value: '光',
        label: '光装备本',
        children: checkPoints
      },
      {
        value: '暗',
        label: '暗装备本',
        children: checkPoints
      }
    ]
  }
]

const mapElemental = [
  ['木', '光'], // 周一12点后
  ['火', '暗'],
  ['水', '光'],
  ['木', '暗'],
  ['火', '光'],
  ['水', '暗'] // 周六12点后, 周日全开
]

options[1].children = options[1].children.filter((item) => {
  const date = new Date()
  let day = date.getDate()
  const hour = date.getHours()
  if (hour < 12) day--
  if (day === 6) return true
  if (mapElemental[day].includes(item.value)) return true
  return false
})

export default options
