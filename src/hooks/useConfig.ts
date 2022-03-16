import { useStore } from '../store'

export default () => {
  const store = useStore()
  const config = computed(() => {
    const config = store.state.config

    return config
  })
  return config
}
