/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const intSalesChannelRouter = {
  path: '/intsales',
  component: Layout,
  redirect: 'noRedirect',
  name: 'intsales',
  meta: {
    title: '国际业务',
    icon: 'nested',
    roles: ['AllPrivileges','intpurchase.view_intpurchaseorder', 'intpurchase.view_user_intpurchaseorder']
  },
  children: [
    {
      path: 'intdistributor',
      component: () => import('@/views/int/distributor'), // Parent router-view
      name: '国际经销商',
      meta: { title: '国际经销商', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'distributor',
          component: () => import('@/views/int/distributor/distributor'),
          name: '经销商',
          meta: { title: '经销商', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder']},
          children: [
            {
              path: 'mydistributor',
              component: () => import('@/views/int/distributor/distributor/mydistributor'),
              name: '我的经销商',
              meta: { title: '我的经销商', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/int/distributor/distributor//manage'),
              name: '经销商管理',
              meta: { title: '经销商管理', roles: ['AllPrivileges', 'intpurchase.view_handler_intpurchaseorder'] }
            }
          ]
        },
        {
          path: 'contacts',
          component: () => import('@/views/int/distributor/contacts'),
          name: '联系人',
          meta: { title: '联系人', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder']},
          children: [
            {
              path: 'mycontacts',
              component: () => import('@/views/int/distributor/contacts/manage'),
              name: '我的联系人',
              meta: { title: '我的联系人', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder'] }
            },

            {
              path: 'manage',
              component: () => import('@/views/int/distributor/contacts/mycontacts'),
              name: '联系人管理',
              meta: { title: '联系人管理', roles: ['AllPrivileges', 'intpurchase.view_handler_intpurchaseorder'] }
            }
          ]
        }
      ]
    },
    {
      path: 'intaccount',
      component: () => import('@/views/int/account'), // Parent router-view
      name: '国际账户',
      meta: { title: '国际账户', roles: ['AllPrivileges', 'intpurchase.view_handler_intpurchaseorder', 'intpurchase.view_user_intpurchaseorder'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'currency',
          component: () => import('@/views/int/account/currency'),
          name: '币种',
          meta: { title: '币种', roles: ['AllPrivileges', 'intpurchase.view_handler_intpurchaseorder', 'intpurchase.view_user_intpurchaseorder']},
        },
        {
          path: 'account',
          component: () => import('@/views/int/account/account'),
          name: '国际账户管理',
          meta: { title: '国际账户管理', roles: ['AllPrivileges', 'intpurchase.view_handler_intpurchaseorder', 'intpurchase.view_user_intpurchaseorder']},
        }
      ]
    },
    {
      path: 'intreceipt',
      component: () => import('@/views/int/receipt'), // Parent router-view
      name: '收款单',
      meta: { title: '收款单', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder', 'intpurchase.view_user_intpurchaseorder'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'create',
          component: () => import('@/views/int/receipt/create'),
          name: '收款单创建',
          meta: { title: '收款单创建', roles: ['AllPrivileges', 'intpurchase.view_user_intpurchaseorder']},
        },
        {
          path: 'submit',
          component: () => import('@/views/int/receipt/submit'),
          name: '收款单认领',
          meta: { title: '收款单认领', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder']},
        },
        {
          path: 'check',
          component: () => import('@/views/int/receipt/check'),
          name: '收款单审核',
          meta: { title: '收款单审核', roles: ['AllPrivileges', 'intpurchase.view_user_intpurchaseorder']},
        },
        {
          path: 'execute',
          component: () => import('@/views/int/receipt/execute'),
          name: '收款单关联',
          meta: { title: '收款单关联', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder']},
        },
        {
          path: 'balance',
          component: () => import('@/views/int/receipt/balance'),
          name: '收款单结算',
          meta: { title: '收款单结算', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder']},
        },
        {
          path: 'manage',
          component: () => import('@/views/int/receipt/manage'),
          name: '收款单管理',
          meta: { title: '收款单管理', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder', 'intpurchase.view_user_intpurchaseorder']},
        }
      ]
    },
    {
      path: 'purchase',
      component: () => import('@/views/int/purchase'), // Parent router-view
      name: '采购',
      meta: { title: '采购', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'order',
          component: () => import('@/views/int/purchase/order'),
          name: '采购订单',
          meta: { title: '采购订单', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder']},
          children: [
            {
              path: 'submit',
              component: () => import('@/views/int/purchase/order/submit'),
              name: '采购订单递交',
              meta: { title: '采购订单递交', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder']},
            },
            {
              path: 'check',
              component: () => import('@/views/int/purchase/order/check'),
              name: '采购单处理',
              meta: { title: '采购订单处理', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder']},
            },
            {
              path: 'manage',
              component: () => import('@/views/int/purchase/order/manage'),
              name: '采购单组管理',
              meta: { title: '采购单组管理', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder']},
            },
            {
              path: 'allmanage',
              component: () => import('@/views/int/purchase/order/allmanage'),
              name: '采购单管理',
              meta: { title: '采购单管理', roles: ['AllPrivileges', 'intpurchase.view_handler_intpurchaseorder']},
            }
          ]
        },
        {
          path: 'exception',
          component: () => import('@/views/int/purchase/exception'),
          name: '异常单',
          meta: { title: '异常单', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder']},
          children: [
            {
              path: 'check',
              component: () => import('@/views/int/purchase/exception/check'),
              name: '异常单处理',
              meta: { title: '异常单处理', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder']},
            },
            {
              path: 'manage',
              component: () => import('@/views/int/purchase/exception/manage'),
              name: '异常单组管理',
              meta: { title: '异常单组管理', roles: ['AllPrivileges', 'intpurchase.view_intpurchaseorder']},
            },
            {
              path: 'allmanage',
              component: () => import('@/views/int/purchase/exception/allmanage'),
              name: '异常单管理',
              meta: { title: '异常单管理', roles: ['AllPrivileges', 'intpurchase.view_handler_intpurchaseorder']},
            },
          ]
        }
      ]
    },
  ]
}

export default intSalesChannelRouter
