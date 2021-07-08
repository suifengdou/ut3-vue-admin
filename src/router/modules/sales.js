/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const salesChannelRouter = {
  path: '/sales',
  component: Layout,
  redirect: 'noRedirect',
  name: 'sales',
  meta: {
    title: '销售业务',
    icon: 'nested'
  },
  children: [
    {
      path: 'advance',
      component: () => import('@/views/sales/advance/index'), // Parent router-view
      name: 'invoice',
      meta: { title: '预存系统' },
      redirect: 'noRedirect',
      children: [
        {
          path: 'account',
          component: () => import('@/views/sales/advance/account/index'),
          name: '账户',
          meta: { title: '账户' },
          children: [
            {
              path: 'myaccount',
              component: () => import('@/views/sales/advance/account/myaccount/index'),
              name: '我的账户',
              meta: { title: '我的账户', roles: ['advancepayment.view_user_account', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/sales/advance/account/manage/index'),
              name: '账户管理',
              meta: { title: '账户管理', roles: ['advancepayment.view_account', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'prestore',
          component: () => import('@/views/sales/advance/prestore/index'),
          name: '预存管理',
          meta: { title: '预存管理' },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/sales/advance/prestore/submit/index'),
              name: '预存单提交',
              meta: { title: '预存单提交', roles: ['advancepayment.view_user_prestore', 'AllPrivileges'] }
            },
            {
              path: 'check',
              component: () => import('@/views/sales/advance/prestore/check/index'),
              name: '预存单审核',
              meta: { title: '预存单审核', roles: ['advancepayment.view_prestore', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/sales/advance/prestore/manage/index'),
              name: '预存单管理',
              meta: { title: '预存单管理', roles: ['advancepayment.view_user_prestore', 'advancepayment.view_prestore', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'expense',
          component: () => import('@/views/sales/advance/expense/index'),
          name: '支出管理',
          meta: { title: '支出管理', roles: ['advancepayment.view_expense', 'AllPrivileges'] }
        },
        {
          path: 'statement',
          component: () => import('@/views/sales/advance/statement/index'),
          name: '流水单管理',
          meta: { title: '流水单管理', roles: ['advancepayment.view_statements', 'AllPrivileges'] }
        },
        {
          path: 'verifyprestore',
          component: () => import('@/views/sales/advance/verifyprestore/index'),
          name: '预存校验管理',
          meta: { title: '预存校验管理', roles: ['advancepayment.view_verificationprestore', 'AllPrivileges'] }
        },
        {
          path: 'verifyexpense',
          component: () => import('@/views/sales/advance/verifyexpense/index'),
          name: '支出校验管理',
          meta: { title: '支出校验管理', roles: ['advancepayment.view_verificationexpenses', 'AllPrivileges'] }
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
      path: 'tailgoods',
      name: '尾货订单',
      component: () => import('@/views/sales/tailgoods/index'),
      meta: { title: '尾货订单' },
      children: [
        {
          path: 'oritailgoods',
          component: () => import('@/views/sales/tailgoods/oritailorder/index'),
          name: '原始尾货单',
          meta: { title: '原始尾货单', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/sales/tailgoods/oritailorder/submit/index'),
              name: '原始尾货单提交',
              meta: { title: '原始尾货单提交', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'check',
              component: () => import('@/views/sales/tailgoods/oritailorder/check/index'),
              name: '原始尾货单审核',
              meta: { title: '原始尾货单审核', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/sales/tailgoods/oritailorder/manage'),
              name: '原始尾货单管理',
              meta: { title: '原始尾货单管理', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'tailgoods',
          component: () => import('@/views/sales/tailgoods/tailorder/index'),
          name: '尾货单',
          meta: { title: '尾货单', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] },
          children: [
            {
              path: 'common',
              component: () => import('@/views/sales/tailgoods/tailorder/common/index'),
              name: '重损发货',
              meta: { title: '重损发货', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'commongoodsdetails',
              component: () => import('@/views/sales/tailgoods/tailorder/common/goodsdetails'),
              name: '重损发货明细',
              meta: { title: '重损发货明细', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'special',
              component: () => import('@/views/sales/tailgoods/tailorder/special/index'),
              name: '非重损发货',
              meta: { title: '非重损发货', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'specilgoodsdetails',
              component: () => import('@/views/sales/tailgoods/tailorder/special/goodsdetails'),
              name: '非重损发货明细',
              meta: { title: '非重损发货明细', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/sales/tailgoods/tailorder/manage'),
              name: '尾货单管理',
              meta: { title: '尾货单管理', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'verifyexpense',
              component: () => import('@/views/sales/tailgoods/tailorder/verifyexpense/index'),
              name: '支出校验管理',
              meta: { title: '支出校验管理', roles: ['advancepayment.view_verificationexpenses', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'refund',
          component: () => import('@/views/sales/tailgoods/refund/index'),
          name: '退款单',
          meta: { title: '退款单', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/sales/tailgoods/refund/submit'),
              name: '退款单提交',
              meta: { title: '退款单提交', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'check',
              component: () => import('@/views/sales/tailgoods/refund/check'),
              name: '退款单审核',
              meta: { title: '退款单审核', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'receival',
              component: () => import('@/views/sales/tailgoods/refund/receival'),
              name: '退款单收货',
              meta: { title: '退款单收货', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/sales/tailgoods/refund/manage'),
              name: '退款单管理',
              meta: { title: '退款单管理', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'verifyprestore',
              component: () => import('@/views/sales/tailgoods/tailorder/verifyexpense/index'),
              name: '退款单校验管理',
              meta: { title: '退款单验管理', roles: ['advancepayment.view_verificationexpenses', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'bills',
          component: () => import('@/views/sales/tailgoods/bills'),
          name: '对账单明细',
          meta: { title: '对账单明细', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        }
      ]
    }
  ]
}

export default salesChannelRouter
