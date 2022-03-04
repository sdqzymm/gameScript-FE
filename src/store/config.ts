import { v4 } from 'uuid'
import { Continuous, Task } from './type'

const defaultContinuous: Continuous = {
  ticket: true,
  diamond: false,
  fail: true,
  find: true
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
      id: 'shopping',
      type: '商店',
      before: true,
      interval: 3
    },
    {
      id: 'arena',
      type: '竞技场',
      before: true,
      interval: 3
    }
  ]
}
