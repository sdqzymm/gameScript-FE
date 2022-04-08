import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IState, Config } from './type'
import login from './login/login'
import { getDefaultTask, getDefaultSchedule, getDefaultDaily } from './config'
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
        daily: getDefaultDaily(),
        shopping: '',
        simulator: true,
        print: true
      }
    }
  },
  mutations: {
    changeConfig(state, config: Config) {
      // 去除活动(在这里和任务的config.ts中)
      if (Array.isArray(config.tasks)) {
        config.tasks = config.tasks.filter((task) => {
          if (task.type == '活动') return false
          return true
        })
      }

      // 后来添加到config的属性, 由于用户缓存中可能不存在, 我们要给与默认值
      config.daily = config.daily ?? getDefaultDaily()
      config.print = config.print ?? true
      config.simulator = config.simulator ?? true

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
