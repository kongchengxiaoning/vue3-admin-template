<template>
  <div class="app-wrapper" :class="classObj">
    <NavBar />
    <div class="main-wrapper">
      <SideBar v-if="!sidebar.hide" class="sidebar-container" />
      <div :class="{ sidebarHide: sidebar.hide }" class="main-container">
        <section class="app-main">
          <BreadCrumb />
          <AppMain />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import { computed, watchEffect } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { AppMain, NavBar, BreadCrumb, SideBar } from './'
import { useAppStoreWithOut } from '@/store/modules/app'

const appStore = useAppStoreWithOut()

const sidebar = computed(() => appStore.sidebar)
const device = computed(() => appStore.device)

const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === 'mobile'
}))

const { width } = useWindowSize()
const WIDTH = 992 // refer to Bootstrap's responsive design

watchEffect(() => {
  if (device.value === 'mobile' && sidebar.value.opened) {
    appStore.closeSideBar({ withoutAnimation: false })
  }
  if (width.value - 1 < WIDTH) {
    appStore.toggleDevice('mobile')
    appStore.closeSideBar({ withoutAnimation: true })
  } else {
    appStore.toggleDevice('desktop')
  }
})
</script>

<style lang="scss" scoped>
.main-wrapper {
  padding-top: $base-nav-bar-height;
  width: 100%;
  box-sizing: border-box;

  .app-main {
    min-height: calc(100vh - $base-nav-bar-height);
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: $bg-color;
  }
}
</style>
