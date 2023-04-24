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
    roles: ['job.view_joborder', 'job.view_joborderdetails', 'AllPrivileges']
  },
  children: [
    {
      path: 'jobcategory',
      component: () => import('@/views/workorder/job/category'), // Parent router-view
      name: 'jobcategory',
      meta: { title: '任务类型', roles: ['job.jobcategory', 'AllPrivileges'] },
    },
    {
      path: 'joborder',
      component: () => import('@/views/workorder/job'), // Parent router-view
      name: 'joborder',
      meta: { title: '任务工单', roles: ['job.view_joborder', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'josubmit',
          component: () => import('@/views/workorder/job/order/submit'),
          name: 'josubmit',
          meta: { title: '工单递交', roles: ['job.jobcategory', 'AllPrivileges'] }
        },
        {
          path: 'jotrack',
          component: () => import('@/views/workorder/job/order/track'),
          name: 'jotrack',
          meta: { title: '工单跟踪', roles: ['job.jobcategory', 'AllPrivileges'] }
        },
        {
          path: 'jomanage',
          component: () => import('@/views/workorder/job/order/manage'),
          name: 'jomanage',
          meta: { title: '工单管理', roles: ['job.view_joborder', 'AllPrivileges'] }
        },
      ]
    },
    {
      path: 'joborderdetails',
      component: () => import('@/views/workorder/job/details'), // Parent router-view
      name: 'joborderdetails',
      meta: { title: '任务工单执行', roles: ['job.view_joborderdetails', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'jodsubmit',
          component: () => import('@/views/workorder/job/details/submit'),
          name: 'jodsubmit',
          meta: { title: '任务确认', roles: ['job.jobcategory', 'AllPrivileges'] }
        },
        {
          path: 'jodaccepte',
          component: () => import('@/views/workorder/job/details/accept'),
          name: 'jodaccepte',
          meta: { title: '任务领取', roles: ['job.view_joborderdetails', 'AllPrivileges'] }
        },
        {
          path: 'jodeperform',
          component: () => import('@/views/workorder/job/details/perform'),
          name: 'jodeperform',
          meta: { title: '任务执行', roles: ['job.view_joborderdetails', 'AllPrivileges'] }
        },
        {
          path: 'jodtrack',
          component: () => import('@/views/workorder/job/details/track'),
          name: 'jodtrack',
          meta: { title: '任务跟踪', roles: ['job.jobcategory', 'AllPrivileges'] }
        },
        {
          path: 'jodmanage',
          component: () => import('@/views/workorder/job/details/manage'),
          name: 'jodmanage',
          meta: { title: '任务管理', roles: ['job.view_joborderdetails', 'AllPrivileges'] }
        },
      ]
    },
  ]
}

export default jobRouter
