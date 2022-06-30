import { defineStore } from 'pinia'
import { resetRouter } from '@/router'
import { store } from '@/store'
import { setLogin, doLogout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: getToken(),
    user: null,
    roles: [],
    permissions: []
  }),
  getters: {
    getToken(): string {
      return this.token
    },
    getUserInfo(): any {
      return this.user || {}
    },
    getRoles(): string[] {
      return this.roles
    },
    getPermissions(): string[] {
      return this.permissions
    }
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token || ''
      setToken(token)
    },
    setUser(user) {
      this.user = user
    },
    setRoles(roles) {
      this.roles = roles
    },
    setPermissions(permissions) {
      this.permissions = permissions
    },
    resetState() {
      this.setToken('')
      this.setUser(null)
      this.setRoles([])
      this.setPermissions([])
    },
    /**
     * @description: login
     */
    async login(params: { username: string; password: string }): Promise<any> {
      try {
        const { username, password } = params
        const { token } = await setLogin({ username, password })
        this.setToken(token)
        return token
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getInfo(): Promise<any> {
      try {
        const res = await getUserInfo({ token: this.getToken })
        const { user, roles, permissions } = res
        const avatar = user.avatar ? user.avatar : ''
        user.avatar = avatar

        if (roles && roles.length > 0) {
          // 验证返回的roles是否是一个非空数组
          this.setRoles(roles)
          this.setPermissions(permissions)
        } else {
          this.setRoles(['ROLE_DEFAULT'])
        }
        this.setUser(user)

        return Promise.resolve(res)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    /**
     * @description: logout
     */
    async logout(): Promise<any> {
      if (this.getToken) {
        try {
          await doLogout({ token: this.getToken })
          this.resetState()
          removeToken()
          resetRouter()
          return Promise.resolve()
        } catch (error) {
          return Promise.reject(error)
        }
      }
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
