/**
 * @description 本地图片地址处理
 * @return String
 */
export const handleImg = (img = '', suffix = 'png'): string => {
  return `/${img}.${suffix}`
}

/**
 * @description 服务器图片地址处理
 * @return String
 */
export const handleServeImg = (img = ''): string => {
  return img
}

/**
 * @description 返回项目路径
 * @return String
 */
export function getNormalPath(p) {
  if (p.length === 0 || !p || p == 'undefined') {
    return p
  }
  const res = p.replace('//', '/')
  if (res[res.length - 1] === '/') {
    return res.slice(0, res.length - 1)
  }
  return res
}
