<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#3E4657"
        text-color="#868E9F"
        :unique-opened="false"
        active-text-color="#FFFFFF"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(item, index) in sidebarRouters"
          :key="item.path + index"
          :item="item"
          :base-path="item.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { useAppStoreWithOut } from '@/store/modules/app'

const route = useRoute()
const permissionStore = usePermissionStoreWithOut()
const appStore = useAppStoreWithOut()

const sidebarRouters = computed(() => permissionStore.getSidebarRouters)
const isCollapse = computed(() => !appStore.sidebar.opened)

const activeMenu = computed((): string => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu as string
  }
  return path
})
</script>

<style lang="scss" scoped></style>
