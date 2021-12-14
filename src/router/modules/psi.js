/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const psiChannelRouter = {
  path: '/psi',
  component: Layout,
  redirect: 'noRedirect',
  name: 'psi',
  meta: {
    title: '库存管理',
    icon: 'nested',
    roles: ['AllPrivileges']
  },
  children: [
    {
      path: 'inbound',
      component: () => import('@/views/psi/inbound'), // Parent router-view
      name: 'inbound',
      meta: { title: '入库管理', roles: ['AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'erpinbound',
          component: () => import('@/views/psi/inbound/oriinbound'),
          name: 'erpinbound',
          meta: { title: '原始入库' },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/psi/inbound/oriinbound/submit'),
              name: 'erpinboundsubmit',
              meta: { title: '原始订单提交', roles: ['advancepayment.view_user_account', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/crm/order/oriorder/manage'),
              name: 'erpinboundmanage',
              meta: { title: '原始订单管理', roles: ['advancepayment.view_account', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'utinbound',
          component: () => import('@/views/psi/inbound/inbound'),
          name: 'utinbound',
          meta: { title: '入库管理' },
          children: [
            {
              path: 'inboundcheck',
              component: () => import('@/views/psi/inbound/inbound/check'),
              name: 'inboundcheck',
              meta: { title: '入库审核', roles: ['advancepayment.view_user_account', 'AllPrivileges'] }
            },
            {
              path: 'validinbound',
              component: () => import('@/views/psi/inbound/inbounddetail/valid'),
              name: 'validinbound',
              meta: { title: '可用列表', roles: ['advancepayment.view_user_account', 'AllPrivileges'] }
            },
            {
              path: 'inbounddetail',
              component: () => import('@/views/psi/inbound/inbounddetail/manage'),
              name: 'inbounddetail',
              meta: { title: '入库明细', roles: ['advancepayment.view_user_account', 'AllPrivileges'] }
            },
            {
              path: 'inbountmanage',
              component: () => import('@/views/crm/order/bmsorder/manage'),
              name: 'inbountmanage',
              meta: { title: '入库管理', roles: ['advancepayment.view_account', 'AllPrivileges'] }
            }
          ]
        }
      ]
    },
    {
      path: 'outbound',
      name: 'outbound',
      component: () => import('@/views/psi/outbound'),
      meta: { title: '出库管理', roles: ['AllPrivileges'] },
      children: [
        {
          path: 'outboundsubmit',
          component: () => import('@/views/psi/outbound/submit'),
          name: 'outboundsubmit',
          meta: { title: '出库单处理', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'outboundmanage',
          component: () => import('@/views/crm/customers/manage'),
          name: 'outboundmanage',
          meta: { title: '出库单管理', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'changelist',
          component: () => import('@/views/crm/customers/manage'),
          name: 'changelist',
          meta: { title: '冲销列表', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'inventory',
      name: 'inventory',
      component: () => import('@/views/psi/inventory'),
      meta: { title: '库存管理', roles: ['AllPrivileges'] },
      children: [
        {
          path: 'inventoryanalysis',
          component: () => import('@/views/crm/customers/manage'),
          name: 'inventoryanalysis',
          meta: { title: '库存分析', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'inventorymanage',
          component: () => import('@/views/psi/inventory/manage'),
          name: 'inventorymanage',
          meta: { title: '库存管理', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        }
      ]
    }
  ]
}

export default psiChannelRouter
