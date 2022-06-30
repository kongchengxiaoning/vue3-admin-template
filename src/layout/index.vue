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
import { computed } from 'vue'
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
