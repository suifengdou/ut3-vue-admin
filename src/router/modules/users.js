/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const usersRouter = {
  path: '/users',
  component: Layout,
  redirect: 'noRedirect',
  name: '用户管理',
  meta: { title: '用户管理', icon: 'user', roles: ['users.view_userprofile', 'AllPrivileges'] },
  children: [
    {
      path: '/users/list',
      component: () => import('@/views/users/users'),
      name: '用户列表',
      meta: { title: '用户列表', icon: 'user', roles: ['users.view_userprofile', 'AllPrivileges'] }
    },
    {
      path: '/users/groups',
      component: () => import('@/views/users/groups'),
      name: '用户组',
      meta: { title: '用户组', icon: 'user', roles: ['auth.view_group', 'AllPrivileges'] }
    },
  ]
}

export default usersRouter
