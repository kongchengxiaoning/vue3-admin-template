import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, removeToken } from '@/utils/auth'
import { getAppEnvConfig } from '@/utils/env'

const { VITE_GLOB_API_URL } = getAppEnvConfig()

const service: AxiosInstance = axios.create({
  baseURL: VITE_GLOB_API_URL,
  withCredentials: true,
  timeout: 12000
})

service.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    request.headers['Content-Type'] = 'application/json;charset=UTF-8'

    request.headers['authtoken'] = getToken()

    return request
  },
  (error: AxiosError) => {
    ElMessage({
      showClose: true,
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data
    // Error
    if (code !== 0) {
      if (code === 401) {
        removeToken()
      }
      ElMessage({
        showClose: true,
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else {
      return response
    }
  },
  (error: AxiosError) => {
    if (error && error.request && error.request.status === 200) {
      ElMessage({
        showClose: true,
        message: '数据请求异常，请稍后再试！',
        type: 'error'
      })
    } else {
      ElMessage({
        showClose: true,
        message: error.message,
        type: 'error'
      })
    }
    return Promise.reject(error)
  }
)

export const request = async (options: AxiosRequestConfig): Promise<any> => {
  try {
    const { data } = await service(options)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export default service
