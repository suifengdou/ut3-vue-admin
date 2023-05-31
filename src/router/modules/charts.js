/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'charts',
  meta: {
    title: '图形图表',
    icon: 'nested',
    roles: ['AllPrivileges', 'service.view_maintenancesummary']
  },
  children: [
    {
      path: 'servicechart',
      component: () => import('@/views/chart/service'), // Parent router-view
      name: 'servicechart',
      meta: { title: '服务图表', roles: ['AllPrivileges', 'service.view_maintenancesummary'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'serviceorder',
          component: () => import('@/views/chart/service/order'),
          name: 'serviceorder',
          meta: { title: '单据图形', roles: ['AllPrivileges', 'service.view_maintenancesummary'] }
        },
        {
          path: 'serviceparts',
          component: () => import('@/views/chart/service/parts'),
          name: 'serviceparts',
          meta: { title: '配件图形', roles: ['AllPrivileges', 'service.view_maintenancesummary'] }
        },
      ]
    }
  ]
}

export default chartsRouter
