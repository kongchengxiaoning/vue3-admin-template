import { MockMethod } from 'vite-plugin-mock'

const tokens = {
  admin: 'admin-token-eyJhbGciOiJIU',
  editor: 'editor-token-jyJhbGciOiJIU'
}

const users = {
  'admin-token-eyJhbGciOiJIU': {
    msg: '操作成功',
    code: 0,
    permissions: ['*:*:*'],
    roles: ['admin'],
    user: {
      searchValue: null,
      createBy: 'admin',
      createTime: '2021-09-09 17:25:28',
      updateBy: null,
      updateTime: null,
      remark: '管理员',
      params: {},
      userId: 1,
      deptId: 103,
      userName: 'admin',
      nickName: '若依',
      email: 'ry@163.com',
      phonenumber: '15888888888',
      sex: '1',
      avatar: '',
      status: '0',
      delFlag: '0',
      loginIp: '36.5.180.75',
      loginDate: '2022-04-07T14:35:16.000+08:00',
      dept: {
        searchValue: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        params: {},
        deptId: 103,
        parentId: 101,
        ancestors: null,
        deptName: '研发部门',
        orderNum: '1',
        leader: '若依',
        phone: null,
        email: null,
        status: '0',
        delFlag: null,
        parentName: null,
        children: []
      },
      roles: [
        {
          searchValue: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          remark: null,
          params: {},
          roleId: 1,
          roleName: '超级管理员',
          roleKey: 'admin',
          roleSort: '1',
          dataScope: '1',
          menuCheckStrictly: false,
          deptCheckStrictly: false,
          status: '0',
          delFlag: null,
          flag: false,
          menuIds: null,
          deptIds: null,
          admin: true
        }
      ],
      roleIds: null,
      postIds: null,
      roleId: null,
      admin: true
    }
  },
  'editor-token-jyJhbGciOiJIU': {
    msg: '操作成功',
    code: 0,
    permissions: ['*:*:*'],
    roles: ['editor'],
    user: {
      searchValue: null,
      createBy: 'editor',
      createTime: '2021-09-09 17:25:28',
      updateBy: null,
      updateTime: null,
      remark: '编辑',
      params: {},
      userId: 1,
      deptId: 103,
      userName: 'editor',
      nickName: '李信',
      email: 'ry@163.com',
      phonenumber: '15888888888',
      sex: '1',
      avatar: '',
      status: '0',
      delFlag: '0',
      loginIp: '36.5.180.75',
      loginDate: '2022-04-07T14:35:16.000+08:00',
      dept: {
        searchValue: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        params: {},
        deptId: 103,
        parentId: 101,
        ancestors: null,
        deptName: '研发部门',
        orderNum: '1',
        leader: '李信',
        phone: null,
        email: null,
        status: '0',
        delFlag: null,
        parentName: null,
        children: []
      },
      roles: [
        {
          searchValue: null,
          createBy: null,
          createTime: null,
          updateBy: null,
          updateTime: null,
          remark: null,
          params: {},
          roleId: 1,
          roleName: '编辑',
          roleKey: 'editor',
          roleSort: '1',
          dataScope: '1',
          menuCheckStrictly: false,
          deptCheckStrictly: false,
          status: '0',
          delFlag: null,
          flag: false,
          menuIds: null,
          deptIds: null,
          admin: true
        }
      ],
      roleIds: null,
      postIds: null,
      roleId: null,
      admin: true
    }
  }
}

const routes = [
  {
    name: 'List',
    path: '/list',
    hidden: false,
    component: 'Layout',
    redirect: '/list/index',
    meta: {
      title: '列表',
      icon: 'list'
    },
    children: [
      {
        path: 'index',
        name: 'ListIndex',
        component: 'list/index',
        meta: {
          title: '自定义列表',
          icon: 'list'
        }
      }
    ]
  },
  {
    name: 'System',
    path: '/system',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: {
      title: '系统管理',
      icon: 'system'
    },
    children: [
      {
        name: 'User',
        path: 'user',
        hidden: false,
        component: 'system/user/index',
        meta: {
          title: '用户管理',
          icon: 'user'
        }
      },
      {
        name: 'Role',
        path: 'role',
        hidden: false,
        component: 'system/role/index',
        meta: {
          title: '角色管理',
          icon: 'peoples'
        }
      },
      {
        name: 'Menu',
        path: 'menu',
        hidden: false,
        component: 'system/menu/index',
        meta: {
          title: '菜单管理',
          icon: 'tree-table'
        }
      },
      {
        name: 'Dept',
        path: 'dept',
        hidden: false,
        component: 'system/dept/index',
        meta: {
          title: '部门管理',
          icon: 'tree'
        }
      },
      {
        name: 'Post',
        path: 'post',
        hidden: false,
        component: 'system/post/index',
        meta: {
          title: '岗位管理',
          icon: 'post'
        }
      },
      {
        name: 'Dict',
        path: 'dict',
        hidden: false,
        component: 'system/dict/index',
        meta: {
          title: '字典管理',
          icon: 'dict'
        }
      },
      {
        name: 'Config',
        path: 'config',
        hidden: false,
        component: 'system/config/index',
        meta: {
          title: '参数设置',
          icon: 'edit'
        }
      },
      {
        name: 'Notice',
        path: 'notice',
        hidden: false,
        component: 'system/notice/index',
        meta: {
          title: '通知公告',
          icon: 'message'
        }
      },
      {
        name: 'Log',
        path: 'log',
        hidden: false,
        redirect: 'noRedirect',
        component: 'ParentView',
        alwaysShow: true,
        meta: {
          title: '日志管理',
          icon: 'log'
        },
        children: [
          {
            name: 'Operlog',
            path: 'operlog',
            hidden: false,
            component: 'monitor/operlog/index',
            meta: {
              title: '操作日志',
              icon: 'form'
            }
          },
          {
            name: 'Logininfor',
            path: 'logininfor',
            hidden: false,
            component: 'monitor/logininfor/index',
            meta: {
              title: '登录日志',
              icon: 'logininfor'
            }
          }
        ]
      }
    ]
  }
]

export default [
  {
    url: '/api/captchaImage',
    method: 'post',
    response: () => {
      return {
        code: 0,
        msg: 'success',
        img: 'http://demo.ruoyi.vip/captcha/captchaImage?type=math',
        uuid: 'e7c197fc1b4942a8bd4ac9683874717a'
      }
    }
  },
  {
    url: '/api/login',
    method: 'post',
    response: (config) => {
      const { username, password } = config.body
      const token = tokens[username]

      if (!token || !password) {
        return {
          code: '60204',
          msg: '帐户或密码不正确'
        }
      }

      return {
        code: 0,
        msg: 'success',
        token
      }
    }
  },
  {
    url: '/api/getInfo',
    method: 'post',
    response: (config) => {
      const { token } = config.body
      const info = users[token]

      if (!info) {
        return {
          code: '50008',
          msg: '登录失败，无法获取用户详细信息。'
        }
      }

      return {
        ...info
      }
    }
  },
  {
    url: '/api/getRouters',
    method: 'post',
    response: (config) => {
      const { roles } = config.body
      console.log(roles)

      return {
        code: 0,
        msg: 'success',
        data: routes
      }
    }
  },
  {
    url: '/api/logout',
    method: 'post',
    response: () => {
      return {
        code: 0,
        msg: '成功',
        data: 'success'
      }
    }
  }
] as MockMethod[]
