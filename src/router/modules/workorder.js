/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const workOrderRouter = {
  path: '/workorder',
  component: Layout,
  redirect: '/workorder/menu1/menu1-1',
  name: 'Nested',
  meta: {
    title: '工单系统',
    icon: 'nested'
  },
  children: [
    {
      path: 'invoice',
      component: () => import('@/views/workorder/menu1/index'), // Parent router-view
      name: 'invoice',
      meta: { title: '发票工单', roles: ['woinvoice.view_oriinvoice', 'AllPrivileges'] },
      redirect: '/workorder/oriinvoicemanage',
      children: [
        {
          path: 'oriinvoiceapp',
          component: () => import('@/views/workorder/woinvoice/oriinvapplica'),
          name: '原始发票工单申请',
          meta: { title: '原始发票工单申请', roles: ['woinvoice.view_applicant_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'oriinvoicesubmit',
          component: () => import('@/views/workorder/woinvoice/oriinvsubmit'),
          name: '原始发票工单提交',
          meta: { title: '原始发票工单提交', roles: ['woinvoice.view_user_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'oriinvoicehandle',
          component: () => import('@/views/workorder/woinvoice/oriinvhandle'),
          name: '原始发票工单处理',
          meta: { title: '原始发票工单处理', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'oriinvoicemanage',
          component: () => import('@/views/workorder/woinvoice/oriinvmanage'),
          name: '原始发票工单管理',
          meta: { title: '原始发票工单管理', roles: ['woinvoice.view_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'invoicehandle',
          component: () => import('@/views/workorder/woinvoice/invhandle'),
          name: '发票开票工单处理',
          meta: { title: '发票开票工单处理', roles: ['woinvoice.view_handler_invoice', 'AllPrivileges'] }
        },
        {
          path: 'invoicemanage',
          component: () => import('@/views/workorder/woinvoice/invmanage'),
          name: '发票开票工单管理',
          meta: { title: '发票开票工单管理', roles: ['woinvoice.view_invoice', 'AllPrivileges'] }
        },
        {
          path: 'deliverhandle',
          component: () => import('@/views/workorder/woinvoice/invdeliver'),
          name: '发票快递单处理',
          meta: { title: '发票快递单处理', roles: ['woinvoice.view_deliverorder', 'AllPrivileges'] }
        },
        {
          path: 'delivermanage',
          component: () => import('@/views/workorder/woinvoice/invdelivermanage'),
          name: '发票快递单管理',
          meta: { title: '发票快递单管理', roles: ['woinvoice.view_deliverorder', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: () => import('@/views/workorder/menu2/index'),
      meta: { title: 'Menu 2' }
    },
    {
      path: 'menu3',
      name: 'Menu3',
      component: () => import('@/views/workorder/menu2/index'),
      meta: { title: 'Menu 3' }
    },
    {
      path: 'menu4',
      name: 'Menu4',
      component: () => import('@/views/workorder/menu2/index'),
      meta: { title: 'Menu 4' }
    }
  ]
}

export default workOrderRouter
