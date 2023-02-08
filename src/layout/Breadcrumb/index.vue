<template>
  <div class="app-breadcrumb">
    <div class="breadcrumb-lable">
      <el-icon class="icon"><Location /></el-icon>
      <span class="text">当前位置：</span>
    </div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
          <span
            v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
            class="no-redirect"
          >
            {{ item.meta.title }}
          </span>
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowRight, Location } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const levelList = ref([])

function getBreadcrumb() {
  // only show routes with meta.title
  let matched = route.matched.filter((item) => item.meta && item.meta.title)
  const first = matched[0]
  // 判断是否为首页
  if (!isDashboard(first)) {
    matched = [].concat(matched)
  }

  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}

function isDashboard(route) {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim() === 'Home'
}

function handleLink(item) {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(path)
}

watchEffect(() => {
  // if you go to the redirect page, do not update the breadcrumbs
  if (route.path.startsWith('/redirect/')) {
    return
  }
  getBreadcrumb()
})
getBreadcrumb()
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  background: #ffffff;

  .breadcrumb-lable {
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-size: 14px;
    color: #999999;

    .icon {
      font-size: 16px;
      margin-right: 4px;
    }
  }

  .el-breadcrumb {
    font-size: 14px;

    .el-breadcrumb__inner {
      a {
        color: #999999;
        font-weight: 400;
      }
    }

    .no-redirect {
      color: #666666;
      cursor: text;
    }
  }
}
</style>
