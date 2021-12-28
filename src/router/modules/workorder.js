/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const workOrderRouter = {
  path: '/workorder',
  component: Layout,
  redirect: '/workorder/menu1/menu1-1',
  name: 'Nested',
  meta: {
    title: '工单系统',
    icon: 'workorder',
    roles: ['woinvoice.view_oriinvoice', 'woinvoice.view_deliverorder', 'express.view_expressworkorder', 'dealers.view_dealerworkorder', 'dealerparts.view_dealerparts', 'storage.view_storageworkorder', 'AllPrivileges']
  },
  children: [
    {
      path: 'invoice',
      component: () => import('@/views/workorder/woinvoice/index'), // Parent router-view
      name: 'invoice',
      meta: { title: '发票工单', icon: 'workorder', roles: ['woinvoice.view_oriinvoice', 'woinvoice.view_deliverorder', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'oriinvoiceapp',
          component: () => import('@/views/workorder/woinvoice/oriinvoice/index'),
          name: '原始发票工单',
          meta: { title: '原始发票工单', roles: ['woinvoice.view_oriinvoice', 'AllPrivileges'] },
          children: [
            {path: 'oriinvoiceapp',
              component: () => import('@/views/workorder/woinvoice/oriinvoice/oriinvapplica'),
              name: '原始工单申请',
              meta: { title: '原始工单申请', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'oriinvoicesubmit',
              component: () => import('@/views/workorder/woinvoice/oriinvoice/oriinvsubmit'),
              name: '原始工单提交',
              meta: { title: '原始工单提交', roles: ['woinvoice.view_user_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'oriinvoicehandle',
              component: () => import('@/views/workorder/woinvoice/oriinvoice/oriinvhandle'),
              name: '原始工单处理',
              meta: { title: '原始工单处理', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'oriinvoicemanage',
              component: () => import('@/views/workorder/woinvoice/oriinvoice/oriinvmanage'),
              name: '原始工单管理',
              meta: { title: '原始工单管理', roles: ['woinvoice.view_oriinvoice', 'AllPrivileges'] }
            }
          ]
        },

        {
          path: 'invoicehandle',
          component: () => import('@/views/workorder/woinvoice/invoice/index'),
          name: '开票工单',
          meta: { title: '开票工单', roles: ['woinvoice.view_invoice', 'AllPrivileges'] },
          children: [
            {
              path: 'invoicehandle',
              component: () => import('@/views/workorder/woinvoice/invoice/invhandle'),
              name: '开票工单处理',
              meta: { title: '开票工单处理', roles: ['woinvoice.view_handler_invoice', 'AllPrivileges'] }
            },
            {
              path: 'invoicemanage',
              component: () => import('@/views/workorder/woinvoice/invoice/invmanage'),
              name: '开票工单管理',
              meta: { title: '开票工单管理', roles: ['woinvoice.view_invoice', 'AllPrivileges'] }
            }
          ]
        },

        {
          path: 'deliverhandle',
          component: () => import('@/views/workorder/woinvoice/deliver/index'),
          name: '发票快递单',
          meta: { title: '发票快递单', roles: ['woinvoice.view_deliverorder', 'AllPrivileges'] },
          children: [
            {
              path: 'deliverhandle',
              component: () => import('@/views/workorder/woinvoice/deliver/invdeliver'),
              name: '快递单处理',
              meta: { title: '快递单处理', roles: ['woinvoice.view_deliverorder', 'AllPrivileges'] }
            },
            {
              path: 'delivermanage',
              component: () => import('@/views/workorder/woinvoice/deliver/invdelivermanage'),
              name: '快递单管理',
              meta: { title: '快递单管理', roles: ['woinvoice.view_deliverorder', 'AllPrivileges'] }
            }
          ]
        },
      ]
    },
    {
      path: 'express',
      name: '快递工单',
      component: () => import('@/views/workorder/express/index'),
      meta: { title: '快递工单', icon: 'workorder', roles: ['express.view_expressworkorder', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'reversecreate',
          component: () => import('@/views/workorder/express/reversecreate/index'),
          name: '快递逆向提交',
          meta: { title: '快递逆向提交', icon: 'workorder', roles: ['express.view_user_expressworkorder', 'AllPrivileges'] }
        },
        {
          path: 'create',
          component: () => import('@/views/workorder/express/create/index'),
          name: '快递正向提交',
          meta: { title: '快递正向提交', icon: 'workorder', roles: ['express.view_handler_expressworkorder', 'AllPrivileges'] }
        },
        {
          path: 'handle',
          component: () => import('@/views/workorder/express/handle/index'),
          name: '快递处理意见',
          meta: { title: '快递处理意见', icon: 'workorder', roles: ['express.view_user_expressworkorder', 'express.view_handler_expressworkorder', 'AllPrivileges'] }
        },
        {
          path: 'execute',
          component: () => import('@/views/workorder/express/execute'),
          name: '快递指令执行',
          meta: { title: '快递指令执行', icon: 'workorder', roles: ['express.view_user_expressworkorder', 'express.view_handler_expressworkorder', 'AllPrivileges'] }
        },
        {
          path: 'check',
          component: () => import('@/views/workorder/express/check/index'),
          name: '快递工单审核',
          meta: { title: '快递工单审核', icon: 'workorder', roles: ['express.view_check_expressworkorder', 'AllPrivileges'] }
        },
        {
          path: 'financehandle',
          component: () => import('@/views/workorder/express/financehandle/index'),
          name: '快递工单财审',
          meta: { title: '快递工单财审', icon: 'workorder', roles: ['express.view_audit_expressworkorder', 'AllPrivileges'] }
        },
        {
          path: 'manage',
          component: () => import('@/views/workorder/express/manage/index'),
          name: '快递工单管理',
          meta: { title: '快递工单管理', icon: 'workorder', roles: ['express.view_expressworkorder', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'storage',
      name: '仓储工单',
      component: () => import('@/views/workorder/storage/index'),
      meta: { title: '仓储工单', icon: 'workorder', roles: ['storage.view_storageworkorder', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'create',
          component: () => import('@/views/workorder/storage/create/index'),
          name: '仓储工单创建',
          meta: { title: '仓储工单创建', icon: 'workorder', roles: ['storage.view_storageworkorder', 'AllPrivileges'] }
        },
        {
          path: 'handle',
          component: () => import('@/views/workorder/storage/handle/index'),
          name: '仓储工单处理',
          meta: { title: '仓储工单处理', icon: 'workorder', roles: ['storage.view_storageworkorder', 'AllPrivileges'] }
        },
        {
          path: 'confirm',
          component: () => import('@/views/workorder/storage/confirm/index'),
          name: '仓储工单确认',
          meta: { title: '仓储工单确认', icon: 'workorder', roles: ['storage.view_storageworkorder', 'AllPrivileges'] }
        },
        {
          path: 'audit',
          component: () => import('@/views/workorder/storage/audit/index'),
          name: '仓储工单财审',
          meta: { title: '仓储工单财审', icon: 'workorder', roles: ['storage.view_audit_storageworkorder', 'AllPrivileges'] }
        },
        {
          path: 'manage',
          component: () => import('@/views/workorder/storage/manage/index'),
          name: '仓储工单管理',
          meta: { title: '仓储工单管理', icon: 'workorder', roles: ['storage.view_storageworkorder', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'dealers',
      name: '经销商工单',
      component: () => import('@/views/workorder/dealer/index'),
      meta: { title: '经销商工单', icon: 'workorder', roles: ['dealers.view_dealerworkorder', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'create',
          component: () => import('@/views/workorder/dealer/create'),
          name: '经销商工单提交',
          meta: { title: '经销商工单提交', icon: 'workorder', roles: ['dealers.view_user_dealerworkorder', 'AllPrivileges'] }
        },
        {
          path: 'handle',
          component: () => import('@/views/workorder/dealer/handle'),
          name: '经销商工单处理',
          meta: { title: '经销商工单处理', icon: 'workorder', roles: ['dealers.view_handler_dealerworkorder', 'AllPrivileges'] }
        },
        {
          path: 'Check',
          component: () => import('@/views/workorder/dealer/check'),
          name: '经销商工单复核',
          meta: { title: '经销商工单复核', icon: 'workorder', roles: ['dealers.view_user_dealerworkorder', 'AllPrivileges'] }
        },
        {
          path: 'confirm',
          component: () => import('@/views/workorder/dealer/confirm'),
          name: '经销商运营确认',
          meta: { title: '经销商运营确认', icon: 'workorder', roles: ['dealers.view_check_dealerworkorder', 'AllPrivileges'] }
        },
        {
          path: 'manage',
          component: () => import('@/views/workorder/dealer/manage'),
          name: '经销商工单管理',
          meta: { title: '经销商工单管理', icon: 'workorder', roles: ['dealers.view_dealerworkorder', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'dealerparts',
      name: '经销商配件',
      component: () => import('@/views/workorder/dealerparts/index'),
      meta: { title: '经销商配件', icon: 'workorder', roles: ['dealerparts.view_dealerparts', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'create',
          component: () => import('@/views/workorder/dealerparts/create'),
          name: '经销商配件提交',
          meta: { title: '经销商配件提交', icon: 'workorder', roles: ['dealerparts.view_user_dealerparts', 'AllPrivileges'] }
        },
        {
          path: 'submit',
          component: () => import('@/views/workorder/dealerparts/submit'),
          name: '经销商配件处理',
          meta: { title: '经销商配件处理', icon: 'workorder', roles: ['dealerparts.view_handler_dealerparts', 'AllPrivileges'] }
        },
        {
          path: 'manage',
          component: () => import('@/views/workorder/dealerparts/manage'),
          name: '经销商配件管理',
          meta: { title: '经销商配件管理', icon: 'workorder', roles: ['dealerparts.view_dealerparts', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'satisfaction',
      name: '用户体验工单',
      component: () => import('@/views/workorder/satisfaction'),
      meta: { title: '用户体验工单', icon: 'workorder', roles: ['express.view_expressworkorder', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'orisatisfaction',
          component: () => import('@/views/workorder/satisfaction/orisatisfaction'),
          name: '原始体验单',
          meta: { title: '原始体验单', icon: 'workorder', roles: ['express.view_user_expressworkorder', 'AllPrivileges'] },
          children: [
            {
              path: 'create',
              component: () => import('@/views/workorder/satisfaction/orisatisfaction/create'),
              name: '原单创建',
              meta: { title: '原单创建', icon: 'workorder', roles: ['dealers.view_user_dealerworkorder', 'AllPrivileges'] }
            },
            {
              path: 'handle',
              component: () => import('@/views/workorder/satisfaction/orisatisfaction/handle'),
              name: '原单处理',
              meta: { title: '原单处理', icon: 'workorder', roles: ['dealers.view_user_dealerworkorder', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/workorder/satisfaction/orisatisfaction/manage'),
              name: '原单管理',
              meta: { title: '原单管理', icon: 'workorder', roles: ['dealers.view_user_dealerworkorder', 'AllPrivileges'] }
            },
          ]
        },
        {
          path: 'satisfaction',
          component: () => import('@/views/workorder/satisfaction/satisfaction'),
          name: '体验单',
          meta: { title: '体验单', icon: 'workorder', roles: ['express.view_user_expressworkorder', 'AllPrivileges'] },
          children: [
            {
              path: 'handle',
              component: () => import('@/views/workorder/satisfaction/satisfaction/handle'),
              name: '体验单领取',
              meta: { title: '体验单领取', icon: 'workorder', roles: ['dealers.view_user_dealerworkorder', 'AllPrivileges'] }
            },
            {
              path: 'myself',
              component: () => import('@/views/workorder/satisfaction/satisfaction/myself'),
              name: '我的待执行',
              meta: { title: '我的待执行', icon: 'workorder', roles: ['dealers.view_user_dealerworkorder', 'AllPrivileges'] }
            },
            {
              path: 'execute',
              component: () => import('@/views/workorder/satisfaction/satisfaction/execute'),
              name: '待执行查询',
              meta: { title: '待执行查询', icon: 'workorder', roles: ['dealers.view_user_dealerworkorder', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/workorder/satisfaction/satisfaction/manage'),
              name: '体验单管理',
              meta: { title: '体验单管理', icon: 'workorder', roles: ['dealers.view_user_dealerworkorder', 'AllPrivileges'] }
            },
          ]
        },
        {
          path: 'service',
          component: () => import('@/views/workorder/satisfaction/service'),
          name: '服务单',
          meta: { title: '服务单', icon: 'workorder', roles: ['express.view_user_expressworkorder', 'AllPrivileges'] },
          children: [
            {
              path: 'myself',
              component: () => import('@/views/workorder/satisfaction/service/myself'),
              name: '服务单个人',
              meta: { title: '服务单个人', icon: 'workorder', roles: ['dealers.view_user_dealerworkorder', 'AllPrivileges'] }
            },
            {
              path: 'handle',
              component: () => import('@/views/workorder/satisfaction/service/handle'),
              name: '有效服务单',
              meta: { title: '有效服务单', icon: 'workorder', roles: ['dealers.view_user_dealerworkorder', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/workorder/satisfaction/service/manage'),
              name: '服务单管理',
              meta: { title: '服务单管理', icon: 'workorder', roles: ['dealers.view_user_dealerworkorder', 'AllPrivileges'] }
            },
          ]
        },
        {
          path: 'invoice',
          component: () => import('@/views/workorder/satisfaction/invoice'),
          name: '发货单',
          meta: { title: '发货单', icon: 'workorder', roles: ['express.view_user_expressworkorder', 'AllPrivileges'] },
          children: [
            {
              path: 'create',
              component: () => import('@/views/workorder/satisfaction/invoice/create'),
              name: '发货单创建',
              meta: { title: '发货单创建', icon: 'workorder', roles: ['dealers.view_user_dealerworkorder', 'AllPrivileges'] }
            },
            {
              path: 'check',
              component: () => import('@/views/workorder/satisfaction/invoice/check'),
              name: '发货单审核',
              meta: { title: '发货单审核', icon: 'workorder', roles: ['dealers.view_user_dealerworkorder', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/workorder/satisfaction/invoice/manage'),
              name: '发货单管理',
              meta: { title: '发货单管理', icon: 'workorder', roles: ['dealers.view_user_dealerworkorder', 'AllPrivileges'] }
            },
          ]
        },
      ]
    },

  ]
}

export default workOrderRouter
