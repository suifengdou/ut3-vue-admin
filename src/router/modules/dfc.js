/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const dfcRouter = {
  path: '/dfc',
  component: Layout,
  redirect: 'noRedirect',
  name: 'dfc',
  meta: {
    title: '数格转换',
    icon: 'nested',
    roles: ['users.view_userprofile', 'AllPrivileges']
  },
  children: [
    {
      path: 'manualorder',
      component: () => import('@/views/dfc/manualorder'), // Parent router-view
      name: 'manualorder',
      meta: { title: '手工订单' },
      redirect: 'noRedirect',
      children: [
        {
          path: 'mosubmit',
          component: () => import('@/views/dfc/manualorder/submit'),
          name: 'mosubmit',
          meta: { title: '订单递交' }
        },
        {
          path: 'mogoodsmanage',
          component: () => import('@/views/dfc/manualorder/modetail'),
          name: 'mogoodsmanage',
          meta: { title: '明细管理' }
        },
        {
          path: 'momanage',
          component: () => import('@/views/dfc/manualorder/manage'),
          name: 'momanage',
          meta: { title: '订单管理' }
        },
        {
          path: 'moexport',
          component: () => import('@/views/dfc/manualorder/submit'),
          name: 'moexport',
          meta: { title: '格式输出' }
        },
        {
          path: 'moexportmanage',
          component: () => import('@/views/dfc/manualorder/submit'),
          name: 'moexportmanage',
          meta: { title: '输出管理' }
        }
      ]
    },
    {
      path: 'tables',
      component: () => import('@/views/dfc/batchtable'), // Parent router-view
      name: 'gift',
      meta: { title: '表格处理' },
      redirect: 'noRedirect',
      children: [
        {
          path: 'origindata',
          component: () => import('@/views/dfc/batchtable/origindata'),
          name: 'origindata',
          meta: { title: '原始表格' },
          children: [
            {
              path: 'odsubmit',
              component: () => import('@/views/dfc/batchtable/origindata/submit'),
              name: 'odsubmit',
              meta: { title: '表格递交' }
            },
            {
              path: 'odmanage',
              component: () => import('@/views/dfc/batchtable/origindata/manage'),
              name: 'odmanage',
              meta: { title: '表格管理' }
            }
          ]
        },
        {
          path: 'batchtable',
          component: () => import('@/views/dfc/batchtable/batchtable'),
          name: 'batchtable',
          meta: { title: '表格输出' },
          children: [
            {
              path: 'btsubmit',
              component: () => import('@/views/dfc/batchtable/batchtable/submit'),
              name: 'btsubmit',
              meta: { title: '输出处理' }
            },
            {
              path: 'btmanage',
              component: () => import('@/views/dfc/batchtable/batchtable/manage'),
              name: 'btmanage',
              meta: { title: '输出管理' }
            }
          ]
        }
      ]
    }
  ]
}

export default dfcRouter
