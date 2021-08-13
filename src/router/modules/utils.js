/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const utilsRouter = {
  path: '/utils',
  component: Layout,
  redirect: 'noRedirect',
  name: 'utils',
  meta: {
    title: '工具组件',
    icon: 'nested',
    roles: ['users.view_userprofile', 'AllPrivileges']
  },
  children: [
    {
      path: 'geography',
      component: () => import('@/views/dfc/manualorder'), // Parent router-view
      name: 'geography',
      meta: { title: '地理行政' },
      redirect: 'noRedirect',
      children: [
        {
          path: 'nationality',
          component: () => import('@/views/dfc/manualorder/submit'),
          name: 'nationality',
          meta: { title: '国别' }
        },
        {
          path: 'province',
          component: () => import('@/views/dfc/manualorder/modetial'),
          name: 'province',
          meta: { title: '省份' }
        },
        {
          path: 'city',
          component: () => import('@/views/dfc/manualorder/manage'),
          name: 'city',
          meta: { title: '城市' }
        },
        {
          path: 'district',
          component: () => import('@/views/dfc/manualorder/submit'),
          name: 'district',
          meta: { title: '区县' }
        }
      ]
    }
  ]
}

export default utilsRouter
