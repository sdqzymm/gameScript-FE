import { v4 } from 'uuid'
import { Continuous, Task } from './type'

const defaultContinuous: Continuous = {
  ticket: true,
  diamond: false,
  fail: true,
  find: true,
  open: true // true:表示启动连续战斗, false:表示启用单次战斗
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
      interval: 3
    },
    {
      id: 'shopping',
      type: '商店',
      before: true,
      interval: 3
    }
  ]
}
