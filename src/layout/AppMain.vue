<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { computed, watch, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useTagsViewStoreWithOut } from '@/store/modules/tagsView'

const tagsViewStore = useTagsViewStoreWithOut()
const { currentRoute } = useRouter()

watch(
  () => unref(currentRoute).path,
  () => {
    const { name } = unref(currentRoute)

    if (name) {
      tagsViewStore.addCachedView(unref(currentRoute))
    }
  },
  {
    immediate: true
  }
)

const cachedViews = computed(() => {
  return tagsViewStore.getCachedViews
})
</script>
