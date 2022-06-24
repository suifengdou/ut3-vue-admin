/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const salesChannelRouter = {
  path: '/sales',
  component: Layout,
  redirect: 'noRedirect',
  name: 'sales',
  meta: {
    title: '销售业务',
    icon: 'nested',
    roles: ['advancepayment.view_statements', 'advancepayment.view_user_account', 'tailgoods.view_refundorder', 'AllPrivileges']
  },
  children: [
    {
      path: 'productcatalog',
      component: () => import('@/views/sales/productcatalog/index'), // Parent router-view
      name: '货品销售预设',
      meta: { title: '货品销售预设', roles: ['productcatalog.view_productcatalog', 'productcatalog.view_user_productcatalog', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'myself',
          component: () => import('@/views/sales/productcatalog/myself'),
          name: '我的货品销售',
          meta: { title: '我的货品销售', roles: ['productcatalog.view_user_productcatalog', 'AllPrivileges'] }
        },
        {
          path: 'manage',
          component: () => import('@/views/sales/productcatalog/manage'),
          name: '货品销售管理',
          meta: { title: '货品销售管理', roles: ['productcatalog.view_productcatalog', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'advance',
      component: () => import('@/views/sales/advance/index'), // Parent router-view
      name: '预存系统',
      meta: { title: '预存系统', roles: ['advancepayment.view_statements', 'advancepayment.view_user_account', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'account',
          component: () => import('@/views/sales/advance/account/index'),
          name: '账户',
          meta: { title: '账户', roles: ['advancepayment.view_statements', 'advancepayment.view_user_account', 'AllPrivileges']},
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
          meta: { title: '预存管理', roles: ['advancepayment.view_prestore', 'AllPrivileges']},
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
              meta: { title: '预存单审核', roles: ['advancepayment.view_handler_prestore', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/sales/advance/prestore/manage/index'),
              name: '预存单管理',
              meta: { title: '预存单管理', roles: ['advancepayment.view_prestore', 'AllPrivileges'] }
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
          meta: { title: '预存校验管理', roles: ['advancepayment.view_handler_prestore', 'AllPrivileges'] }
        },
        {
          path: 'adverifyexpense',
          component: () => import('@/views/sales/advance/verifyexpense/index'),
          name: '预支出校验管理',
          meta: { title: '预支出校验管理', roles: ['advancepayment.view_handler_prestore', 'AllPrivileges'] }
        },
        {
          path: 'expendlist',
          component: () => import('@/views/sales/advance/expendlist/index'),
          name: '支出冲销管理',
          meta: { title: '支出冲销管理', roles: ['advancepayment.view_handler_prestore', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'tailgoods',
      name: '尾货订单',
      component: () => import('@/views/sales/tailgoods/index'),
      meta: { title: '尾货订单', roles: ['tailgoods.view_refundorder', 'AllPrivileges'] },
      children: [
        {
          path: 'oritailgoods',
          component: () => import('@/views/sales/tailgoods/oritailorder/index'),
          name: '原始尾货单',
          meta: { title: '原始尾货单', roles: ['tailgoods.view_oritailorder', 'AllPrivileges'] },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/sales/tailgoods/oritailorder/submit/index'),
              name: '原始尾货单提交',
              meta: { title: '原始尾货单提交', roles: ['tailgoods.view_user_oritailorder', 'AllPrivileges'] }
            },
            {
              path: 'check',
              component: () => import('@/views/sales/tailgoods/oritailorder/check/index'),
              name: '原始尾货单审核',
              meta: { title: '原始尾货单审核', roles: ['tailgoods.view_handler_oritailorder', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/sales/tailgoods/oritailorder/manage'),
              name: '原始尾货单管理',
              meta: { title: '原始尾货单管理', roles: ['tailgoods.view_oritailorder', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'tailgoods',
          component: () => import('@/views/sales/tailgoods/tailorder/index'),
          name: '尾货单',
          meta: { title: '尾货单', roles: ['tailgoods.view_tailorder', 'AllPrivileges'] },
          children: [
            {
              path: 'common',
              component: () => import('@/views/sales/tailgoods/tailorder/common/index'),
              name: '重损发货',
              meta: { title: '重损发货', roles: ['tailgoods.view_user_tailorder', 'AllPrivileges'] }
            },
            {
              path: 'commongoodsdetails',
              component: () => import('@/views/sales/tailgoods/tailorder/common/goodsdetails'),
              name: '重损发货明细',
              meta: { title: '重损发货明细', roles: ['tailgoods.view_user_togoods', 'AllPrivileges'] }
            },
            {
              path: 'special',
              component: () => import('@/views/sales/tailgoods/tailorder/special/index'),
              name: '非重损发货',
              meta: { title: '非重损发货', roles: ['tailgoods.view_handler_tailorder', 'AllPrivileges'] }
            },
            {
              path: 'specilgoodsdetails',
              component: () => import('@/views/sales/tailgoods/tailorder/special/goodsdetails'),
              name: '非重损发货明细',
              meta: { title: '非重损发货明细', roles: ['tailgoods.view_handler_togoods', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/sales/tailgoods/tailorder/manage'),
              name: '尾货单管理',
              meta: { title: '尾货单管理', roles: ['tailgoods.view_tailorder', 'AllPrivileges'] }
            },
            {
              path: 'verifyexpense',
              component: () => import('@/views/sales/tailgoods/tailorder/verifyexpense'),
              name: '支出校验管理',
              meta: { title: '支出校验管理', roles: ['advancepayment.view_verificationexpenses', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'refund',
          component: () => import('@/views/sales/tailgoods/refund/index'),
          name: '退款单',
          meta: { title: '退款单', roles: ['tailgoods.view_refundorder', 'AllPrivileges'] },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/sales/tailgoods/refund/submit'),
              name: '退款单提交',
              meta: { title: '退款单提交', roles: ['tailgoods.view_user_refundorder', 'AllPrivileges'] }
            },
            {
              path: 'check',
              component: () => import('@/views/sales/tailgoods/refund/check'),
              name: '退款单审核',
              meta: { title: '退款单审核', roles: ['tailgoods.view_handler_refundorder', 'AllPrivileges'] }
            },
            {
              path: 'receival',
              component: () => import('@/views/sales/tailgoods/refund/receival'),
              name: '退款单收货',
              meta: { title: '退款单收货', roles: ['tailgoods.view_check_refundorder', 'AllPrivileges'] }
            },
            {
              path: 'audit',
              component: () => import('@/views/sales/tailgoods/refund/audit'),
              name: '退款单结算',
              meta: { title: '退款单结算', roles: ['tailgoods.view_user_refundorder', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/sales/tailgoods/refund/manage'),
              name: '退款单管理',
              meta: { title: '退款单管理', roles: ['tailgoods.view_refundorder', 'AllPrivileges'] }
            },
            {
              path: 'verifyprestore',
              component: () => import('@/views/sales/tailgoods/refund/verifyprestore'),
              name: '退款单校验预存',
              meta: { title: '退款单校验预存', roles: ['advancepayment.view_verificationexpenses', 'AllPrivileges'] }
            },
            {
              path: 'verifyaccount',
              component: () => import('@/views/sales/tailgoods/refund/verifyaccount'),
              name: '退款单校验对账',
              meta: { title: '退款单校验对账', roles: ['advancepayment.view_verificationexpenses', 'AllPrivileges'] }
            },
          ]
        },
        {
          path: 'bills',
          component: () => import('@/views/sales/tailgoods/bills'),
          name: '对账单明细',
          meta: { title: '对账单明细', roles: ['tailgoods.view_accountinfo', 'AllPrivileges'] }
        }
      ]
    }
  ]
}

export default salesChannelRouter
