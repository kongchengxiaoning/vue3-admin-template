import { defineStore } from 'pinia'
import { store } from '@/store'
import { constantRoutes } from '@/router'
import { getRouters } from '@/api/user'

import Layout from '@/layout/index.vue'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.{vue,tsx}')

export const loadView = (view) => {
  let res
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  return res
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: []
  }),
  getters: {
    getSidebarRouters(): any {
      return this.sidebarRouters
    }
  },
  actions: {
    SET_ROUTES: function (routes) {
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes)
    },
    SET_DEFAULT_ROUTES: function (routes) {
      this.defaultRoutes = constantRoutes.concat(routes)
    },
    SET_TOPBAR_ROUTES: function (routes) {
      this.topbarRouters = routes
    },
    SET_SIDEBAR_ROUTERS: function (routes) {
      this.sidebarRouters = routes
    },
    // 生成路由
    generateRoutes(roles) {
      return new Promise((resolve) => {
        // 向后端请求路由数据
        getRouters(roles).then((res) => {
          const sdata = JSON.parse(JSON.stringify(res.data))
          const rdata = JSON.parse(JSON.stringify(res.data))
          const defaultData = JSON.parse(JSON.stringify(res.data))
          const sidebarRoutes = this.filterAsyncRouter(sdata)
          const rewriteRoutes = this.filterAsyncRouter(rdata, false, true)
          const defaultRoutes = this.filterAsyncRouter(defaultData)
          this.SET_ROUTES(rewriteRoutes)
          this.SET_SIDEBAR_ROUTERS(constantRoutes.concat(sidebarRoutes))
          this.SET_DEFAULT_ROUTES(sidebarRoutes)
          this.SET_TOPBAR_ROUTES(defaultRoutes)
          resolve(rewriteRoutes)
        })
      })
    },
    filterAsyncRouter(asyncRouterMap, _lastRouter = false, type = false) {
      return asyncRouterMap.filter((route) => {
        if (type && route.children) {
          route.children = this.filterChildren(route.children)
        }
        if (route.component) {
          // Layout 组件特殊处理
          if (route.component === 'Layout') {
            route.component = Layout
          } else {
            route.component = loadView(route.component)
          }
        }
        if (route.children != null && route.children && route.children.length) {
          route.children = this.filterAsyncRouter(route.children, route, type)
        } else {
          delete route['children']
          delete route['redirect']
        }
        return true
      })
    },
    filterChildren(childrenMap, lastRouter: any = false) {
      let children = []
      childrenMap.forEach((el) => {
        if (el.children && el.children.length) {
          if (el.component === 'ParentView' && !lastRouter) {
            el.children.forEach((c) => {
              c.path = el.path + '/' + c.path
              if (c.children && c.children.length) {
                children = children.concat(this.filterChildren(c.children, c))
                return
              }
              children.push(c)
            })
            return
          }
        }
        if (lastRouter) {
          el.path = lastRouter.path + '/' + el.path
        }
        children = children.concat(el)
      })
      return children
    }
  }
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
