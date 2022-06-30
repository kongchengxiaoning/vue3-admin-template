<template>
  <div class="navbar-container">
    <div class="sidebar-top">
      <router-link
        :class="['logo-link', appStore.sidebar.opened ? 'open-sidebar' : 'hide-sidebar']"
        key="collapse"
        to="/"
      >
        <img class="logo-link__image" :src="logoUrl" alt="logo" />
        <span class="logo-link__name">{{ title }}</span>
      </router-link>
      <el-icon v-if="appStore.sidebar.opened" class="icon" @click="appStore.toggleSidebar">
        <Fold />
      </el-icon>
      <el-icon v-else class="icon" @click="appStore.toggleSidebar">
        <Expand />
      </el-icon>
    </div>
    <div class="user-info">
      <el-avatar class="user-info__avatar" :size="24" :src="getUserInfo.avatar" />
      <div class="user-info__name">
        <span>{{ getUserInfo.userName || '用户名' }}</span>
        <span v-if="getUserInfo.userName">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a v-if="getUserInfo.userName" @click="logout()">退出</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoUrl from '../../assets/images/logo.png'

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { Fold, Expand } from '@element-plus/icons-vue'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useUserStoreWithOut } from '@/store/modules/user'
import { useGlobSetting } from '@/hooks/setting'

const appStore = useAppStoreWithOut()
const userStore = useUserStoreWithOut()
const getUserInfo = computed(() => userStore.getUserInfo)

const route = useRoute()
const router = useRouter()

const { title } = useGlobSetting()

const logout = () => {
  ElMessageBox.confirm('确定要退出登录？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      userStore.logout().then(() => {
        router.push(`/login?redirect=${route.fullPath}`)
      })
    })
    .catch(() => {
      console.log('取消了')
    })
}
</script>

<style scoped lang="scss">
.navbar-container {
  width: 100%;
  height: $base-nav-bar-height;
  background-color: $base-menu-background;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  .sidebar-top {
    @include flex();

    .icon {
      padding: 10px;
      font-size: 16px;
      cursor: pointer;
      color: #ffffff;
    }

    .logo-link {
      @include flex(row, flex-start);
      -webkit-transition: width 0.28s;
      transition: width 0.28s;
      box-sizing: border-box;
      overflow: hidden;

      &.open-sidebar {
        width: $base-sidebar-width !important;
      }

      &.hide-sidebar {
        width: 54px !important;
      }

      &__image {
        width: 26px;
        margin: 0 14px;
      }

      &__name {
        font-size: 16px;
        font-weight: 600;
        white-space: nowrap;
        color: #ffffff;
      }
    }
  }

  .user-info {
    @include flex();
    margin-right: 60px;

    &__avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-right: 10px;
    }

    &__name {
      overflow-wrap: break-word;
      color: #ffffff;
      font-size: 14px;
    }
  }
}
</style>
