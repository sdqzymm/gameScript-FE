import { useStore } from '../store'

export default () => {
  const store = useStore()
  const config = computed(() => {
    return store.state.config
  })
  return config
}
