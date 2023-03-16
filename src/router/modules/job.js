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
    roles: ['AllPrivileges']
  },
  children: [
    {
      path: 'jobcategory',
      component: () => import('@/views/workorder/job/category'), // Parent router-view
      name: 'jobcategory',
      meta: { title: '任务类型', roles: ['AllPrivileges'] },
    },
    {
      path: 'joborder',
      component: () => import('@/views/workorder/job'), // Parent router-view
      name: 'joborder',
      meta: { title: '任务工单', roles: ['AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'josubmit',
          component: () => import('@/views/workorder/job/order/submit'),
          name: 'josubmit',
          meta: { title: '工单递交', roles: ['AllPrivileges'] }
        },
        {
          path: 'jotrack',
          component: () => import('@/views/workorder/job/order/track'),
          name: 'jotrack',
          meta: { title: '工单跟踪', roles: ['AllPrivileges'] }
        },
        {
          path: 'jomanage',
          component: () => import('@/views/workorder/job/order/submit'),
          name: 'jomanage',
          meta: { title: '工单管理', roles: ['AllPrivileges'] }
        },
      ]
    },
    {
      path: 'joborderdetails',
      component: () => import('@/views/workorder/job/details'), // Parent router-view
      name: 'joborderdetails',
      meta: { title: '任务工单执行', roles: ['AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'jodsubmit',
          component: () => import('@/views/workorder/job/details/submit'),
          name: 'jodsubmit',
          meta: { title: '任务确认', roles: ['AllPrivileges'] }
        },
        {
          path: 'jodaccepte',
          component: () => import('@/views/workorder/job/details/accept'),
          name: 'jodaccepte',
          meta: { title: '任务领取', roles: ['AllPrivileges'] }
        },
        {
          path: 'jodeperform',
          component: () => import('@/views/workorder/job/details/perform'),
          name: 'jodeperform',
          meta: { title: '任务执行', roles: ['AllPrivileges'] }
        },
        {
          path: 'jodtrack',
          component: () => import('@/views/dfc/manualorder/modetailtrack'),
          name: 'jodtrack',
          meta: { title: '任务跟踪', roles: ['AllPrivileges'] }
        },
        {
          path: 'jodmanage',
          component: () => import('@/views/workorder/job/details/manage'),
          name: 'jodmanage',
          meta: { title: '任务管理', roles: ['AllPrivileges'] }
        },
      ]
    },
  ]
}

export default jobRouter
