/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const dfcRouter = {
  path: '/dfc',
  component: Layout,
  redirect: 'noRedirect',
  name: 'dfc',
  meta: {
    title: '数格转换',
    icon: 'nested',
    roles: ['AllPrivileges']
  },
  children: [
    {
      path: 'manualorder',
      component: () => import('@/views/dfc/manualorder'), // Parent router-view
      name: 'manualorder',
      meta: { title: '手工订单', roles: ['manualorder.view_manualorder', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'mosubmit',
          component: () => import('@/views/dfc/manualorder/submit'),
          name: 'mosubmit',
          meta: { title: '订单递交', roles: ['manualorder.view_manualorder', 'AllPrivileges'] }
        },
        {
          path: 'momanage',
          component: () => import('@/views/dfc/manualorder/manage'),
          name: 'momanage',
          meta: { title: '订单管理', roles: ['manualorder.view_user_manualorder', 'AllPrivileges'] }
        },
        {
          path: 'mogoodstrack',
          component: () => import('@/views/dfc/manualorder/modetailtrack'),
          name: 'mogoodstrack',
          meta: { title: '明细跟踪', roles: ['manualorder.view_mogoods', 'AllPrivileges'] }
        },
        {
          path: 'mogoodsmanage',
          component: () => import('@/views/dfc/manualorder/modetail'),
          name: 'mogoodsmanage',
          meta: { title: '明细管理', roles: ['manualorder.view_mogoods', 'AllPrivileges'] }
        },
        {
          path: 'moexport',
          component: () => import('@/views/dfc/manualorder/export/submit'),
          name: 'moexport',
          meta: { title: '格式输出', roles: ['manualorder.view_manualorderexport', 'AllPrivileges'] }
        },
        {
          path: 'moexportmanage',
          component: () => import('@/views/dfc/manualorder/export/manage'),
          name: 'moexportmanage',
          meta: { title: '输出管理', roles: ['manualorder.view_manualorderexport', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'compensation',
      name: '财务差价',
      component: () => import('@/views/dfc/compensation'),
      meta: { title: '财务差价', roles: ['AllPrivileges'] },
      children: [
        {
          path: 'compensation',
          component: () => import('@/views/dfc/compensation/compensation'),
          name: '原始差价单',
          meta: { title: '原始差价单', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/dfc/compensation/compensation/submit'),
              name: '原始差价单提交',
              meta: { title: '原始差价单提交', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/sales/tailgoods/oritailorder/manage'),
              name: '原始差价单管理',
              meta: { title: '原始尾货单管理', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'batchcompensation',
          component: () => import('@/views/dfc/compensation/batch'),
          name: '差价汇总单',
          meta: { title: '差价汇总单', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/sales/tailgoods/tailorder/common/index'),
              name: '差价汇总单提交',
              meta: { title: '差价汇总单提交', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'settle',
              component: () => import('@/views/sales/tailgoods/tailorder/common/goodsdetails'),
              name: '差价汇总单结算',
              meta: { title: '差价汇总单结算', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/sales/tailgoods/tailorder/special/index'),
              name: '差价汇总单管理',
              meta: { title: '差价汇总单管理', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'batchdetail',
          component: () => import('@/views/sales/tailgoods/refund/index'),
          name: '汇总明细单',
          meta: { title: '汇总明细单', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/sales/tailgoods/refund/submit'),
              name: '汇总明细单提交',
              meta: { title: '汇总明细单提交', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'check',
              component: () => import('@/views/sales/tailgoods/refund/check'),
              name: '汇总明细单结算',
              meta: { title: '汇总明细单结算', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'receival',
              component: () => import('@/views/sales/tailgoods/refund/receival'),
              name: '汇总明细单管理',
              meta: { title: '汇总明细单管理', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            }
          ]
        }
      ]
    },
    {
      path: 'tables',
      component: () => import('@/views/dfc/batchtable'), // Parent router-view
      name: 'gift',
      meta: { title: '表格处理', roles: ['AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'origindata',
          component: () => import('@/views/dfc/batchtable/origindata'),
          name: 'origindata',
          meta: { title: '原始表格' },
          children: [
            {
              path: 'odsubmit',
              component: () => import('@/views/dfc/batchtable/origindata/submit'),
              name: 'odsubmit',
              meta: { title: '表格递交' }
            },
            {
              path: 'odmanage',
              component: () => import('@/views/dfc/batchtable/origindata/manage'),
              name: 'odmanage',
              meta: { title: '表格管理' }
            }
          ]
        },
        {
          path: 'batchtable',
          component: () => import('@/views/dfc/batchtable/batchtable'),
          name: 'batchtable',
          meta: { title: '表格输出' },
          children: [
            {
              path: 'btsubmit',
              component: () => import('@/views/dfc/batchtable/batchtable/submit'),
              name: 'btsubmit',
              meta: { title: '输出处理' }
            },
            {
              path: 'btmanage',
              component: () => import('@/views/dfc/batchtable/batchtable/manage'),
              name: 'btmanage',
              meta: { title: '输出管理' }
            }
          ]
        }
      ]
    }
  ]
}

export default dfcRouter
