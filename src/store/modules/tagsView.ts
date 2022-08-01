import { defineStore } from 'pinia'
import { store } from '@/store'

export const useTagsViewStore = defineStore({
  id: 'tagsView',
  state: () => ({
    cachedViews: []
  }),
  getters: {
    getCachedViews(): string[] {
      return this.cachedViews
    }
  },
  actions: {
    addCachedView(route) {
      if (this.cachedViews.includes(route.name)) return
      if (route.meta.keepAlive) {
        this.cachedViews.push(route.name)
      }
    }
  }
})

export function useTagsViewStoreWithOut() {
  return useTagsViewStore(store)
}
