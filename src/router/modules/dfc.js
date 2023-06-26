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
    roles: ['compensation.view_compensation', 'compensation.view_batchcompensation', 'manualorder.view_manualorderexport', 'manualorder.view_manualorder', 'batchtable.view_origindata', 'AllPrivileges']
  },
  children: [
    {
      path: 'manualorder',
      component: () => import('@/views/dfc/manualorder'), // Parent router-view
      name: 'manualorder',
      meta: { title: '手工订单', roles: ['manualorder.view_manualorderexport', 'manualorder.view_manualorder', 'AllPrivileges'] },
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
          path: 'moexportcheck',
          component: () => import('@/views/dfc/manualorder/export/check'),
          name: 'moexportcheck',
          meta: { title: '发货导入', roles: ['manualorder.view_manualorderexport', 'AllPrivileges'] }
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
      meta: { title: '财务差价', roles: ['compensation.view_compensation', 'compensation.view_batchcompensation', 'AllPrivileges'] },
      children: [
        {
          path: 'compensation',
          component: () => import('@/views/dfc/compensation/compensation'),
          name: '原始差价单',
          meta: { title: '原始差价单', roles: ['compensation.view_compensation', 'AllPrivileges'] },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/dfc/compensation/compensation/submit'),
              name: '原始差价单创建',
              meta: { title: '原始差价单创建', roles: ['compensation.view_user_compensation', 'AllPrivileges'] }
            },
            {
              path: 'check',
              component: () => import('@/views/dfc/compensation/compensation/check'),
              name: '原始差价单提交',
              meta: { title: '原始差价单提交', roles: ['compensation.view_handler_compensation', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/dfc/compensation/compensation/manage'),
              name: '原始差价单管理',
              meta: { title: '原始差价单管理', roles: ['compensation.view_compensation', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'batchcompensation',
          component: () => import('@/views/dfc/compensation/batch'),
          name: '差价汇总单',
          meta: { title: '差价汇总单', roles: ['compensation.view_batchcompensation', 'AllPrivileges'] },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/dfc/compensation/batch/submit'),
              name: '差价汇总单提交',
              meta: { title: '差价汇总单提交', roles: ['compensation.view_user_batchcompensation', 'AllPrivileges'] }
            },
            {
              path: 'settle',
              component: () => import('@/views/dfc/compensation/batch/settle'),
              name: '差价汇总单结算',
              meta: { title: '差价汇总单结算', roles: ['compensation.view_handler_batchcompensation', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/dfc/compensation/batch/manage'),
              name: '差价汇总单管理',
              meta: { title: '差价汇总单管理', roles: ['compensation.view_batchcompensation', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'batchdetail',
          component: () => import('@/views/dfc/compensation/batchdetail'),
          name: '汇总明细单',
          meta: { title: '汇总明细单', roles: ['compensation.view_batchcompensation', 'AllPrivileges'] },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/dfc/compensation/batchdetail/submit'),
              name: '汇总明细单提交',
              meta: { title: '汇总明细单提交', roles: ['compensation.view_user_batchcompensation', 'AllPrivileges'] }
            },
            {
              path: 'settle',
              component: () => import('@/views/dfc/compensation/batchdetail/settle'),
              name: '汇总明细单结算',
              meta: { title: '汇总明细单结算', roles: ['compensation.view_handler_batchcompensation', 'AllPrivileges'] }
            },
            {
              path: 'receival',
              component: () => import('@/views/dfc/compensation/batchdetail/manage'),
              name: '汇总明细单管理',
              meta: { title: '汇总明细单管理', roles: ['compensation.view_batchcompensation', 'AllPrivileges'] }
            }
          ]
        }
      ]
    },
    {
      path: 'tables',
      component: () => import('@/views/dfc/batchtable'), // Parent router-view
      name: 'tables',
      meta: { title: '表格处理', roles: ['batchtable.view_origindata', 'batchtable.view_batchtable', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'origindata',
          component: () => import('@/views/dfc/batchtable/origindata'),
          name: 'origindata',
          meta: { title: '原始表格', roles: ['batchtable.view_origindata', 'AllPrivileges'] },
          children: [
            {
              path: 'odsubmit',
              component: () => import('@/views/dfc/batchtable/origindata/submit'),
              name: 'odsubmit',
              meta: { title: '表格递交', roles: ['batchtable.view_origindata', 'AllPrivileges'] }
            },
            {
              path: 'odmanage',
              component: () => import('@/views/dfc/batchtable/origindata/manage'),
              name: 'odmanage',
              meta: { title: '表格管理', roles: ['batchtable.view_origindata', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'batchtable',
          component: () => import('@/views/dfc/batchtable/batchtable'),
          name: 'batchtable',
          meta: { title: '表格输出', roles: ['batchtable.view_batchtable', 'AllPrivileges'] },
          children: [
            {
              path: 'btsubmit',
              component: () => import('@/views/dfc/batchtable/batchtable/submit'),
              name: 'btsubmit',
              meta: { title: '输出处理', roles: ['batchtable.view_batchtable', 'AllPrivileges'] }
            },
            {
              path: 'btmanage',
              component: () => import('@/views/dfc/batchtable/batchtable/manage'),
              name: 'btmanage',
              meta: { title: '输出管理', roles: ['batchtable.view_batchtable', 'AllPrivileges'] }
            }
          ]
        }
      ]
    }
  ]
}

export default dfcRouter
