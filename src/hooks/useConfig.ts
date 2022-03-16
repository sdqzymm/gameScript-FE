import { useStore } from '../store'

export default () => {
  const store = useStore()
  const config = computed(() => {
    const config = store.state.config
    // 移除活动
    config.tasks = config.tasks.filter((task) => {
      if (task.type === '活动') return false
      return true
    })
    return config
  })
  return config
}
