/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const crmChannelRouter = {
  path: '/crm',
  component: Layout,
  redirect: 'noRedirect',
  name: 'crm',
  meta: {
    title: '客户关系',
    icon: 'nested'
  },
  children: [
    {
      path: 'order',
      component: () => import('@/views/sales/advance/index'), // Parent router-view
      name: 'order',
      meta: { title: '订单系统' },
      redirect: 'noRedirect',
      children: [
        {
          path: 'oriorder',
          component: () => import('@/views/crm/order/oriorder'),
          name: 'oriorder',
          meta: { title: '原始订单' },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/crm/order/oriorder/submit'),
              name: 'oriordersubmit',
              meta: { title: '原始订单提交', roles: ['advancepayment.view_user_account', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/crm/order/oriorder/manage'),
              name: 'oriordermanage',
              meta: { title: '原始订单管理', roles: ['advancepayment.view_account', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'bmsorder',
          component: () => import('@/views/crm/order/bmsorder'),
          name: 'bmsorder',
          meta: { title: 'BMS订单' },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/crm/order/bmsorder/submit'),
              name: 'bmsordersubmit',
              meta: { title: 'BMS订单提交', roles: ['advancepayment.view_user_account', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/crm/order/bmsorder/manage'),
              name: 'bmsordermanage',
              meta: { title: 'BMS订单管理', roles: ['advancepayment.view_account', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'utorder',
          component: () => import('@/views/crm/order/order'),
          name: 'utorder',
          meta: { title: '订单' },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/crm/order/order/submit/index'),
              name: '订单提交',
              meta: { title: '订单提交', roles: ['advancepayment.view_user_prestore', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/crm/order/order/manage/index'),
              name: '订单管理',
              meta: { title: '订单管理', roles: ['advancepayment.view_user_prestore', 'advancepayment.view_prestore', 'AllPrivileges'] }
            }
          ]
        }
      ]
    },
    {
      path: 'customer',
      name: 'customer',
      component: () => import('@/views/crm/customers'),
      meta: { title: '客户档案' },
      children: [
        {
          path: 'manage',
          component: () => import('@/views/crm/customers/manage'),
          name: 'manage',
          meta: { title: '档案管理', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'blacklist',
          component: () => import('@/views/crm/customers/manage'),
          name: '黑名单',
          meta: { title: '黑名单', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        }
      ]
    }
  ]
}

export default crmChannelRouter
