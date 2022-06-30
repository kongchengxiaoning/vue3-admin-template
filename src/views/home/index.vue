<template>
  <div class="center">
    <img src="@/assets/images/logo.png" alt="Vue logo" />
    <hello-world msg="Hello Vue 3 + TypeScript + Vite" />
    <div>x: {{ x }} - y: {{ y }}</div>
    <div>name: {{ getUserInfo.userName }}</div>
    <el-button v-hasPermi="['monitor:job:add']">权限按钮</el-button>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld/index.vue'

import { computed } from 'vue'
import useMousePosition from '@/hooks/event/useMousePosition'
import { useUserStoreWithOut } from '@/store/modules/user'

const userStore = useUserStoreWithOut()
const getUserInfo = computed(() => userStore.getUserInfo)

const { x, y } = useMousePosition()
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
</style>
