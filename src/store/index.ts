import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IState, Config } from './type'
import login from './login/login'
import { getDefaultTask, getDefaultSchedule } from './config'
import localCache from '@/utils/cache'

export function useStore(): Store<IState> {
  return useVuexStore()
}

const store = createStore<IRootState>({
  state: () => {
    return {
      config: {
        tasks: [getDefaultTask()],
        schedules: getDefaultSchedule(),
        shopping: ''
      }
    }
  },
  mutations: {
    changeConfig(state, config: Config) {
      state.config = config
      localCache.setCache('config', config)
    }
  },
  modules: {
    login
  }
})

;(function setupStore() {
  store.dispatch('login/loadCacheAction')
})()

export default store
