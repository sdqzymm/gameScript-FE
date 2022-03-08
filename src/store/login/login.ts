import { Module } from 'vuex'
import router from '@/router'
import { accountLoginRequest, updateUser } from '@/service'
import localCache from '@/utils/cache'
import { ElMessage } from 'element-plus'
import type { IRootState } from '../type'
import type { ILoginState } from './type'
import type { UserInfo } from '@/service'
import { getDefaultSchedule, getDefaultTask } from '../config'

const login: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: UserInfo) {
      state.userInfo = userInfo
    }
  },
  getters: {},
  actions: {
    // 账号登录
    async accountLoginAction({ commit }, payload: any) {
      // 1. 登录
      const loginResult = await accountLoginRequest(payload)
      if (!loginResult || loginResult.code !== 1000) {
        return
      }
      ElMessage.success('登录成功, 3s后自动跳转')
      const user = loginResult.data
      const token = user.token
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2. 用户信息
      const userInfo = {
        id: user.id,
        name: user.name
      }
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3. 保存config
      const config = {
        tasks: JSON.parse(user.tasks) || [getDefaultTask()],
        schedules: JSON.parse(user.schedules) || getDefaultSchedule(),
        shopping: user.shopping || ''
      }
      commit('changeConfig', config, { root: true })
      localCache.setCache('config', config)

      // 3. 跳到首页
      setTimeout(() => {
        router.push('/')
      }, 3000)
    },
    // 更新配置
    async updateConfigAction({ commit }, payload: any) {
      const { id, config } = payload
      const res = await updateUser(id, config)
      if (!res) {
        return
      }
      if (res.code === 1000) {
        ElMessage.success('提交成功')
        commit('changeConfig', config, { root: true })
        localCache.setCache('config', config)
      }
    },
    // 读取缓存
    loadCache({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const config = localCache.getCache('config')
      if (config) {
        commit('changeConfig', config, { root: true })
      }
    }
  }
}

export default login
