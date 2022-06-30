import { request } from '@/utils/axios/request'

/**
 * @description 获取登录信息
 */
export const setLogin = (data: { username: string; password: string }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data
  })
}

/**
 * @description 获取用户信息
 */
export const getUserInfo = (data) => {
  return request({
    url: '/api/getInfo',
    method: 'POST',
    data
  })
}

/**
 * @description 获取菜单信息
 */
export const getRouters = (data) => {
  return request({
    url: '/api/getRouters',
    method: 'POST',
    data
  })
}

/**
 * @description 退出登录
 */
export const doLogout = (data) => {
  return request({
    url: '/api/logout',
    method: 'POST',
    data
  })
}
