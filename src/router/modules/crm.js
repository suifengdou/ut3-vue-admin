/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const crmChannelRouter = {
  path: '/crm',
  component: Layout,
  redirect: 'noRedirect',
  name: 'crm',
  meta: {
    title: '客户关系管理',
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
          component: () => import('@/views/sales/advance/prestore/index'),
          name: 'utorder',
          meta: { title: '订单' },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/sales/advance/prestore/submit/index'),
              name: '订单提交',
              meta: { title: '预存单提交', roles: ['advancepayment.view_user_prestore', 'AllPrivileges'] }
            },
            {
              path: 'check',
              component: () => import('@/views/sales/advance/prestore/check/index'),
              name: '订单审核',
              meta: { title: '预存单审核', roles: ['advancepayment.view_prestore', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/sales/advance/prestore/manage/index'),
              name: '订单管理',
              meta: { title: '预存单管理', roles: ['advancepayment.view_user_prestore', 'advancepayment.view_prestore', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'expendlist',
          component: () => import('@/views/sales/advance/expendlist/index'),
          name: '支出冲销管理',
          meta: { title: '支出冲销管理', roles: ['advancepayment.view_expendlist', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'customer',
      name: 'customer',
      component: () => import('@/views/sales/tailgoods/index'),
      meta: { title: '尾货客户档案订单' },
      children: [
        {
          path: 'manage',
          component: () => import('@/views/sales/tailgoods/bills'),
          name: '档案管理',
          meta: { title: '对账单明细', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        }
      ]
    }
  ]
}

export default crmChannelRouter
