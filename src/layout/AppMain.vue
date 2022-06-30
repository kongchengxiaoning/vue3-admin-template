<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-transform" mode="out-in">
      <div :key="route.name">
        <component :is="Component" :key="route.path" />
      </div>
    </transition>
  </router-view>
</template>
