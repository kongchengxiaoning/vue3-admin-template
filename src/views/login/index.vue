<template>
  <div class="login">
    <el-form ref="ruleFormRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">后台管理系统</h3>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="账号"
        >
          <template #prefix>
            <svg-icon icon-class="user" class="el-input__icon input-icon" />
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="密码"
        >
          <template #prefix>
            <svg-icon icon-class="password" class="el-input__icon input-icon" />
          </template>
        </el-input>
      </el-form-item>

      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 25px 0px">
        记住密码
      </el-checkbox>

      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          style="width: 100%"
          @click.prevent="handleLogin(ruleFormRef)"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie'

import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { encrypt, decrypt } from '@/utils/jsencrypt/jsencrypt'
import { useUserStoreWithOut } from '@/store/modules/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStoreWithOut()

const loginForm = ref({
  username: 'admin',
  password: '123456',
  rememberMe: false
})

// 获取redirect地址
const redirect = route.query.redirect as string

const ruleFormRef = ref<FormInstance>()

const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }]
}

const loading = ref(false)

function handleLogin(formEl: FormInstance | undefined) {
  formEl.validate(async (valid) => {
    if (valid) {
      // 调用action的登录方法
      try {
        loading.value = true
        await userStore.login(loginForm.value)
        // 勾选了需要记住密码设置在cookie中设置记住用户明和名命
        if (loginForm.value.rememberMe) {
          Cookies.set('username', loginForm.value.username, { expires: 30 })
          Cookies.set('password', encrypt(loginForm.value.password), { expires: 30 })
          Cookies.set('rememberMe', String(loginForm.value.rememberMe), { expires: 30 })
        } else {
          // 否则移除
          Cookies.remove('username')
          Cookies.remove('password')
          Cookies.remove('rememberMe')
        }
        router.push({ path: redirect || '/' })
      } catch (_err) {
        loading.value = false
      }
    }
  })
}

function getCookie() {
  const username = Cookies.get('username')
  const password = Cookies.get('password')
  const rememberMe = Cookies.get('rememberMe')
  loginForm.value = {
    username: username === undefined ? loginForm.value.username : username,
    password: password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : rememberMe === 'true' ? true : false
  }
}

getCookie()
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  margin-top: 25vh;

  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;
    box-shadow: 0 20px 40px 0 rgb(0 0 0 / 18%);

    .el-input {
      height: 40px;

      input {
        height: 40px;
      }
    }

    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 0px;
    }
  }
}
</style>
