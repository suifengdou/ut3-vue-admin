/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const jobRouter = {
  path: '/jobsystem',
  component: Layout,
  redirect: 'noRedirect',
  name: 'jobsystem',
  meta: {
    title: '任务系统',
    icon: 'nested',
    roles: ['compensation.view_compensation', 'compensation.view_batchcompensation', 'manualorder.view_manualorderexport', 'manualorder.view_manualorder', 'batchtable.view_origindata', 'AllPrivileges']
  },
  children: [
    {
      path: 'jobcategory',
      component: () => import('@/views/dfc/manualorder'), // Parent router-view
      name: 'jobcategory',
      meta: { title: '任务类型', roles: ['manualorder.view_manualorderexport', 'manualorder.view_manualorder', 'AllPrivileges'] },
    },
    {
      path: 'joborder',
      component: () => import('@/views/dfc/manualorder'), // Parent router-view
      name: 'joborder',
      meta: { title: '任务工单', roles: ['manualorder.view_manualorderexport', 'manualorder.view_manualorder', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'josubmit',
          component: () => import('@/views/dfc/manualorder/submit'),
          name: 'josubmit',
          meta: { title: '工单递交', roles: ['manualorder.view_manualorder', 'AllPrivileges'] }
        },
        {
          path: 'jocheck',
          component: () => import('@/views/dfc/manualorder/manage'),
          name: 'jocheck',
          meta: { title: '工单执行', roles: ['manualorder.view_user_manualorder', 'AllPrivileges'] }
        },
        {
          path: 'jomanage',
          component: () => import('@/views/dfc/manualorder/manage'),
          name: 'jomanage',
          meta: { title: '工单管理', roles: ['manualorder.view_user_manualorder', 'AllPrivileges'] }
        },
      ]
    },
    {
      path: 'joborderdetails',
      component: () => import('@/views/dfc/manualorder'), // Parent router-view
      name: 'joborderdetails',
      meta: { title: '任务工单执行', roles: ['manualorder.view_manualorderexport', 'manualorder.view_manualorder', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'jodsubmit',
          component: () => import('@/views/dfc/manualorder/submit'),
          name: 'jodsubmit',
          meta: { title: '任务领取', roles: ['manualorder.view_manualorder', 'AllPrivileges'] }
        },
        {
          path: 'jodexecute',
          component: () => import('@/views/dfc/manualorder/manage'),
          name: 'jodexecute',
          meta: { title: '任务执行', roles: ['manualorder.view_user_manualorder', 'AllPrivileges'] }
        },
        {
          path: 'jodtrack',
          component: () => import('@/views/dfc/manualorder/modetailtrack'),
          name: 'jodtrack',
          meta: { title: '任务跟踪', roles: ['manualorder.view_mogoods', 'AllPrivileges'] }
        },
        {
          path: 'jodmanage',
          component: () => import('@/views/dfc/manualorder/modetail'),
          name: 'jodmanage',
          meta: { title: '任务管理', roles: ['manualorder.view_mogoods', 'AllPrivileges'] }
        },
      ]
    },
    {
      path: 'joborderInvoice',
      component: () => import('@/views/dfc/manualorder'), // Parent router-view
      name: 'joborderInvoice',
      meta: { title: '任务工单发货', roles: ['manualorder.view_manualorderexport', 'manualorder.view_manualorder', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'joisubmit',
          component: () => import('@/views/dfc/manualorder/submit'),
          name: 'joisubmit',
          meta: { title: '订单递交', roles: ['manualorder.view_manualorder', 'AllPrivileges'] }
        },
        {
          path: 'joimanage',
          component: () => import('@/views/dfc/manualorder/manage'),
          name: 'joimanage',
          meta: { title: '订单管理', roles: ['manualorder.view_user_manualorder', 'AllPrivileges'] }
        },
        {
          path: 'joigoods',
          component: () => import('@/views/dfc/manualorder/modetailtrack'),
          name: 'joigoods',
          meta: { title: '明细跟踪', roles: ['manualorder.view_mogoods', 'AllPrivileges'] }
        },
        {
          path: 'joigoodsmanage',
          component: () => import('@/views/dfc/manualorder/modetail'),
          name: 'joigoodsmanage',
          meta: { title: '明细管理', roles: ['manualorder.view_mogoods', 'AllPrivileges'] }
        },
      ]
    },
  ]
}

export default jobRouter
