/**
 * v-hasPermi 操作权限处理
 * 示例 v-hasPermi="['monitor:job:add']"
 */

import { useUserStoreWithOut } from '@/store/modules/user'

const userStore = useUserStoreWithOut()

export default {
  mounted(el, binding) {
    const { value } = binding
    const all_permission = '*:*:*'
    const permissions = userStore.getPermissions

    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value

      const hasPermissions = permissions.some((permission) => {
        return all_permission === permission || permissionFlag.includes(permission)
      })

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
