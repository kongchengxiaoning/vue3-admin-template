import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { store } from '@/store'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false,
      hide: false
    },
    device: 'desktop'
  }),
  getters: {},
  actions: {
    toggleSidebar() {
      if (this.sidebar.hide) {
        return false
      }
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', '1')
      } else {
        Cookies.set('sidebarStatus', '0')
      }
    },
    closeSideBar(withoutAnimation) {
      Cookies.set('sidebarStatus', '0')
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(device) {
      this.device = device
    },
    setSidebarHide(status) {
      this.sidebar.hide = status
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
