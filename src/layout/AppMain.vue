<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTagsViewStoreWithOut } from '@/store/modules/tagsView'

const tagsViewStore = useTagsViewStoreWithOut()

const routeView = useRoute()
tagsViewStore.addCachedView(routeView)
const cachedViews = computed(() => {
  return tagsViewStore.getCachedViews
})
</script>
