/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const workOrderRouter = {
  path: '/workorder',
  component: Layout,
  redirect: '/workorder/menu1/menu1-1',
  name: 'Nested',
  meta: {
    title: '工单系统',
    icon: 'workorder'
  },
  children: [
    {
      path: 'invoice',
      component: () => import('@/views/workorder/woinvoice/index'), // Parent router-view
      name: 'invoice',
      meta: { title: '发票工单', icon: 'workorder', roles: ['woinvoice.view_oriinvoice', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'oriinvoiceapp',
          component: () => import('@/views/workorder/woinvoice/oriinvapplica'),
          name: '原始发票工单申请',
          meta: { title: '原始发票工单申请', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'oriinvoicesubmit',
          component: () => import('@/views/workorder/woinvoice/oriinvsubmit'),
          name: '原始发票工单提交',
          meta: { title: '原始发票工单提交', icon: 'workorder', roles: ['woinvoice.view_user_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'oriinvoicehandle',
          component: () => import('@/views/workorder/woinvoice/oriinvhandle'),
          name: '原始发票工单处理',
          meta: { title: '原始发票工单处理', icon: 'workorder', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'oriinvoicemanage',
          component: () => import('@/views/workorder/woinvoice/oriinvmanage'),
          name: '原始发票工单管理',
          meta: { title: '原始发票工单管理', icon: 'workorder', roles: ['woinvoice.view_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'invoicehandle',
          component: () => import('@/views/workorder/woinvoice/invhandle'),
          name: '发票开票工单处理',
          meta: { title: '发票开票工单处理', icon: 'workorder', roles: ['woinvoice.view_handler_invoice', 'AllPrivileges'] }
        },
        {
          path: 'invoicemanage',
          component: () => import('@/views/workorder/woinvoice/invmanage'),
          name: '发票开票工单管理',
          meta: { title: '发票开票工单管理', icon: 'workorder', roles: ['woinvoice.view_invoice', 'AllPrivileges'] }
        },
        {
          path: 'deliverhandle',
          component: () => import('@/views/workorder/woinvoice/invdeliver'),
          name: '发票快递单处理',
          meta: { title: '发票快递单处理', icon: 'workorder', roles: ['woinvoice.view_deliverorder', 'AllPrivileges'] }
        },
        {
          path: 'delivermanage',
          component: () => import('@/views/workorder/woinvoice/invdelivermanage'),
          name: '发票快递单管理',
          meta: { title: '发票快递单管理', icon: 'workorder', roles: ['woinvoice.view_deliverorder', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'express',
      name: '快递工单',
      component: () => import('@/views/workorder/express/index'),
      meta: { title: '快递工单', icon: 'workorder' },
      redirect: 'noRedirect',
      children: [
        {
          path: 'reversecreate',
          component: () => import('@/views/workorder/express/reversecreate/index'),
          name: '快递逆向提交',
          meta: { title: '快递逆向提交', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'create',
          component: () => import('@/views/workorder/express/create/index'),
          name: '快递正向提交',
          meta: { title: '快递正向提交', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'handle',
          component: () => import('@/views/workorder/express/handle/index'),
          name: '快递逆向处理',
          meta: { title: '快递逆向处理', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'supplierhandle',
          component: () => import('@/views/workorder/express/supplierhandle/index'),
          name: '快递正向处理',
          meta: { title: '快递正向处理', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'check',
          component: () => import('@/views/workorder/express/check/index'),
          name: '快递工单审核',
          meta: { title: '快递工单审核', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'financehandle',
          component: () => import('@/views/workorder/express/financehandle/index'),
          name: '快递工单财审',
          meta: { title: '快递工单财审', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'manage',
          component: () => import('@/views/workorder/express/manage/index'),
          name: '快递工单管理',
          meta: { title: '快递工单管理', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'storage',
      name: '仓储工单',
      component: () => import('@/views/workorder/storage/index'),
      meta: { title: '仓储工单', icon: 'workorder' },
      redirect: 'noRedirect',
      children: [
        {
          path: 'reversecreate',
          component: () => import('@/views/workorder/storage/reversecreate/index'),
          name: '仓储逆向提交',
          meta: { title: '仓储逆向提交', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'create',
          component: () => import('@/views/workorder/storage/create/index'),
          name: '仓储正向提交',
          meta: { title: '仓储正向提交', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'handle',
          component: () => import('@/views/workorder/storage/handle/index'),
          name: '仓储逆向处理',
          meta: { title: '仓储逆向处理', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'supplierhandle',
          component: () => import('@/views/workorder/storage/supplierhandle/index'),
          name: '仓储正向处理',
          meta: { title: '仓储正向处理', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'check',
          component: () => import('@/views/workorder/storage/check/index'),
          name: '仓储工单审核',
          meta: { title: '仓储工单审核', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'financehandle',
          component: () => import('@/views/workorder/storage/financehandle/index'),
          name: '仓储工单财审',
          meta: { title: '仓储工单财审', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'manage',
          component: () => import('@/views/workorder/storage/manage/index'),
          name: '仓储工单管理',
          meta: { title: '仓储工单管理', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'dealers',
      name: '经销商工单',
      component: () => import('@/views/workorder/dealer/index'),
      meta: { title: '经销商工单', icon: 'workorder' },
      redirect: 'noRedirect',
      children: [
        {
          path: 'create',
          component: () => import('@/views/workorder/dealer/submit'),
          name: '经销商工单提交',
          meta: { title: '经销商工单提交', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'handle',
          component: () => import('@/views/workorder/dealer/handle'),
          name: '经销商工单处理',
          meta: { title: '经销商工单处理', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'Check',
          component: () => import('@/views/workorder/dealer/check'),
          name: '经销商工单复核',
          meta: { title: '经销商工单复核', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'confirm',
          component: () => import('@/views/workorder/dealer/confirm'),
          name: '经销商运营确认',
          meta: { title: '经销商运营确认', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'manage',
          component: () => import('@/views/workorder/dealer/manage'),
          name: '经销商工单管理',
          meta: { title: '经销商工单管理', icon: 'workorder', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        }
      ]
    }
  ]
}

export default workOrderRouter
