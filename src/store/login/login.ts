import { Module } from 'vuex'
import router from '@/router'
import { accountLoginRequest, updateUser, bindCode, register } from '@/service'
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
      localCache.setCache('token', token)
    },
    changeUserInfo(state, userInfo: UserInfo) {
      state.userInfo = userInfo
      localCache.setCache('userInfo', userInfo)
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
      ElMessage.success({
        duration: 1000,
        message: '登录成功, 1s后自动跳转'
      })
      const user = loginResult.data
      const token = user.token
      commit('changeToken', token)

      // 2. 用户信息
      const userInfo = {
        id: user.id,
        name: user.name
      }
      commit('changeUserInfo', userInfo)

      // 3. 保存config
      const config = {
        tasks: JSON.parse(user.tasks) || [getDefaultTask()],
        schedules: JSON.parse(user.schedules) || getDefaultSchedule(),
        shopping: user.shopping || ''
      }
      commit('changeConfig', config, { root: true })

      // 3. 跳到首页
      setTimeout(() => {
        router.push('/')
      }, 2000)
    },
    // 更新配置
    async updateConfigAction({ commit }, payload: any) {
      const { id, config } = payload
      const res = await updateUser(id, config)
      if (!res || res.code != 1000) {
        return
      }
      ElMessage.success('提交成功')
      // 更新配置, 并且更新下token
      commit('changeConfig', config, { root: true })
      const token = res.data.token
      token && commit('changeToken', token)
    },
    // 读取缓存
    loadCacheAction({ commit }) {
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
    },
    // 登出
    logoutAction({ commit }) {
      commit('changeToken', '')
      commit('changeUserInfo', {})
      ElMessage({
        duration: 500,
        message: '登出, 即将前往登录页面'
      })
      setTimeout(() => {
        router.push('/login')
      }, 500)
    },
    // 绑定注册码
    async bindCodeAction(_, payload: any) {
      const res = await bindCode(payload.code, payload.userId)
      if (!res || res.code != 1000) {
        return
      }
      ElMessage.success({
        duration: 1500,
        message: '绑定成功'
      })
    },
    // 账号注册
    async accountRegisterAction(_, payload: any) {
      const res = await register(payload)
      if (!res || res.code != 1000) {
        return
      }
      ElMessage.success({
        duration: 1000,
        message: '注册成功, 正在自动登录'
      })
      setTimeout(() => {
        this.dispatch('login/accountLoginAction', payload)
      }, 1000)
    }
  }
}

export default login
