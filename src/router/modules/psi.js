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
              meta: { title: '原始订单提交', roles: ['inbound.view_oriinbound', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/psi/inbound/oriinbound/manage'),
              name: 'erpinboundmanage',
              meta: { title: '原始订单管理', roles: ['inbound.view_oriinbound', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'utinbound',
          component: () => import('@/views/psi/inbound/'),
          name: 'utinbound',
          meta: { title: '入库管理' },
          children: [
            {
              path: 'inboundsubmit',
              component: () => import('@/views/psi/inbound/order/submit'),
              name: 'inboundsubmit',
              meta: { title: '入库提交', roles: ['inbound.view_user_inbound', 'AllPrivileges'] }
            },
            {
              path: 'inboundcheck',
              component: () => import('@/views/psi/inbound/order/check'),
              name: 'inboundcheck',
              meta: { title: '入库审核', roles: ['inbound.view_check_inbound', 'AllPrivileges'] }
            },
            {
              path: 'inboundvalid',
              component: () => import('@/views/psi/inbound/order/valid'),
              name: 'inboundvalid',
              meta: { title: '可用列表', roles: ['inbound.view_check_inbound', 'AllPrivileges'] }
            },
            {
              path: 'inboundmanage',
              component: () => import('@/views/psi/inbound/order/manage'),
              name: 'inboundmanage',
              meta: { title: '入库管理', roles: ['inbound.view_check_inbound', 'AllPrivileges'] }
            },
            {
              path: 'inbounddetailvalid',
              component: () => import('@/views/psi/inbound/details/valid'),
              name: 'inbounddetailvalid',
              meta: { title: '可用明细', roles: ['inbound.view_inbound', 'AllPrivileges'] }
            },
            {
              path: 'inbounddetailmanage',
              component: () => import('@/views/psi/inbound/details/manage'),
              name: 'inbounddetailmanage',
              meta: { title: '明细管理', roles: ['inbound.view_inbound', 'AllPrivileges'] }
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
    },
    {
      path: 'renovation',
      component: () => import('@/views/psi/renovation'), // Parent router-view
      name: 'renovation',
      meta: { title: '翻新管理', roles: ['AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'order',
          component: () => import('@/views/psi/renovation/order'),
          name: 'order',
          meta: { title: '翻新工单' },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/psi/renovation/order/submit'),
              name: 'erpinboundsubmit',
              meta: { title: '原始订单提交', roles: ['inbound.view_oriinbound', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/psi/renovation/order/manage'),
              name: 'erpinboundmanage',
              meta: { title: '原始订单管理', roles: ['inbound.view_oriinbound', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'goods',
          component: () => import('@/views/psi/renovation/goods'),
          name: 'goods',
          meta: { title: '翻新配件', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'detail',
          component: () => import('@/views/psi/renovation/detail'),
          name: 'detail',
          meta: { title: '使用详情', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        },
      ]
    },
  ]
}

export default psiChannelRouter
