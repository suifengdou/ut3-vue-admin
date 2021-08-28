/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const crmChannelRouter = {
  path: '/crm',
  component: Layout,
  redirect: 'noRedirect',
  name: 'crm',
  meta: {
    title: '客户关系',
    icon: 'nested'
  },
  children: [
    {
      path: 'order',
      component: () => import('@/views/sales/advance/index'), // Parent router-view
      name: 'order',
      meta: { title: '订单系统' },
      redirect: 'noRedirect',
      children: [
        {
          path: 'oriorder',
          component: () => import('@/views/crm/order/oriorder'),
          name: 'oriorder',
          meta: { title: '原始订单' },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/crm/order/oriorder/submit'),
              name: 'oriordersubmit',
              meta: { title: '原始订单提交', roles: ['advancepayment.view_user_account', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/crm/order/oriorder/manage'),
              name: 'oriordermanage',
              meta: { title: '原始订单管理', roles: ['advancepayment.view_account', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'bmsorder',
          component: () => import('@/views/crm/order/bmsorder'),
          name: 'bmsorder',
          meta: { title: 'BMS订单' },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/crm/order/bmsorder/submit'),
              name: 'bmsordersubmit',
              meta: { title: 'BMS订单提交', roles: ['advancepayment.view_user_account', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/crm/order/bmsorder/manage'),
              name: 'bmsordermanage',
              meta: { title: 'BMS订单管理', roles: ['advancepayment.view_account', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'utorder',
          component: () => import('@/views/crm/order/order'),
          name: 'utorder',
          meta: { title: '订单' },
          children: [
            {
              path: 'submit',
              component: () => import('@/views/crm/order/order/submit/index'),
              name: '订单提交',
              meta: { title: '订单提交', roles: ['advancepayment.view_user_prestore', 'AllPrivileges'] }
            },
            {
              path: 'manage',
              component: () => import('@/views/crm/order/order/manage/index'),
              name: '订单管理',
              meta: { title: '订单管理', roles: ['advancepayment.view_user_prestore', 'advancepayment.view_prestore', 'AllPrivileges'] }
            }
          ]
        }
      ]
    },
    {
      path: 'customer',
      name: 'customer',
      component: () => import('@/views/crm/customers'),
      meta: { title: '客户档案' },
      children: [
        {
          path: 'manage',
          component: () => import('@/views/crm/customers/manage'),
          name: 'manage',
          meta: { title: '档案管理', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'blacklist',
          component: () => import('@/views/crm/customers/manage'),
          name: '黑名单',
          meta: { title: '黑名单', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'dialog',
      name: 'dialog',
      component: () => import('@/views/crm/dialog'),
      meta: { title: '客户对话' },
      children: [
        {
          path: 'servicer',
          component: () => import('@/views/crm/dialog/servicer'),
          name: 'servicer',
          meta: { title: '对话-客服网名', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'dialogtb',
          component: () => import('@/views/crm/dialog/dialogtb'),
          name: 'dialogtb',
          meta: { title: '淘系对话', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] },
          children: [
            {
              path: 'dialogtb',
              component: () => import('@/views/crm/dialog/dialogtb/dialogtb'),
              name: 'dialogtb',
              meta: { title: '淘系对话-客户', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'dialogtbdetailmyself',
              component: () => import('@/views/crm/dialog/dialogtb/dialogtbdetailmyself'),
              name: 'dialogtbdetailmyself',
              meta: { title: '淘系对话-提取-个人', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'dialogtbdetailsubmit',
              component: () => import('@/views/crm/dialog/dialogtb/dialogtbdetailsubmit'),
              name: 'dialogtbdetailsubmit',
              meta: { title: '淘系对话-提取', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'dialogtbdetail',
              component: () => import('@/views/crm/dialog/dialogtb/dialogtbdetail'),
              name: 'dialogtbdetail',
              meta: { title: '淘系对话-信息', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'dialogtbwords',
              component: () => import('@/views/crm/dialog/dialogtb/dialogtbwords'),
              name: 'dialogtbwords',
              meta: { title: '淘系对话-分词', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'dialogjd',
          component: () => import('@/views/crm/dialog/dialogjd'),
          name: 'dialogjd',
          meta: { title: '京东对话', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] },
          children: [
            {
              path: 'dialogjd',
              component: () => import('@/views/crm/dialog/dialogjd/dialogjd'),
              name: 'dialogjd',
              meta: { title: '京东对话-客户', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'dialogjddetailsubmit',
              component: () => import('@/views/crm/dialog/dialogjd/dialogjddetailsubmit'),
              name: 'dialogjddetailsubmit',
              meta: { title: '京东对话-提取', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'dialogjddetail',
              component: () => import('@/views/crm/dialog/dialogjd/dialogjddetail'),
              name: 'dialogjddetail',
              meta: { title: '京东对话-信息', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'dialogjdwords',
              component: () => import('@/views/crm/dialog/dialogjd/dialogjdwords'),
              name: 'dialogjdwords',
              meta: { title: '京东对话-分词', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'dialogow',
          component: () => import('@/views/crm/dialog/dialogow'),
          name: 'dialogow',
          meta: { title: '官网对话', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] },
          children: [
            {
              path: 'dialogowsubmit',
              component: () => import('@/views/crm/dialog/dialogow/dialogowsubmit'),
              name: 'dialogowsubmit',
              meta: { title: '官网对话-提取', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'dialogow',
              component: () => import('@/views/crm/dialog/dialogow/dialogow'),
              name: 'dialogow',
              meta: { title: '官网对话-客户', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'dialogowdetail',
              component: () => import('@/views/crm/customers/manage'),
              name: 'dialogowdetail',
              meta: { title: '官网对话-信息', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'dialogowwords',
              component: () => import('@/views/crm/customers/manage'),
              name: 'dialogowwords',
              meta: { title: '官网对话-分词', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            }
          ]
        }

      ]
    },
    {
      path: 'callcenter',
      name: 'callcenter',
      component: () => import('@/views/crm/callcenter/oricalllog'),
      meta: { title: '呼叫中心' },
      children: [
        {
          path: 'oricalllog',
          component: () => import('@/views/crm/customers/manage'),
          name: 'oricalllog',
          meta: { title: '原始通话记录', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'calllog',
          component: () => import('@/views/crm/callcenter/calllog'),
          name: 'calllog',
          meta: { title: '通话记录', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'service',
      name: 'service',
      component: () => import('@/views/crm/service'),
      meta: { title: '中央维修' },
      children: [
        {
          path: 'mantenancesummary',
          component: () => import('@/views/crm/dialog/servicer'),
          name: 'mantenancesummary',
          meta: { title: '维修统计', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
        },
        {
          path: 'orimaintenance',
          component: () => import('@/views/crm/service/orimaintenance'),
          name: 'orimaintenance',
          meta: { title: '原始单', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] },
          children: [
            {
              path: 'orimaintenancesubmit',
              component: () => import('@/views/crm/service/orimaintenance/orimaintenancesubmit'),
              name: 'orimaintenancesubmit',
              meta: { title: '原始单-提交', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'orimaintenancebefore',
              component: () => import('@/views/crm/dialog/dialogtb/dialogtbdetailmyself'),
              name: 'orimaintenancebefore',
              meta: { title: '原始单-修前异常', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'orimaintenanceworking',
              component: () => import('@/views/crm/dialog/dialogtb/dialogtbdetailsubmit'),
              name: 'orimaintenanceworking',
              meta: { title: '原始单-修中异常', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'orimaintenance',
              component: () => import('@/views/crm/dialog/dialogtb/dialogtbdetail'),
              name: 'orimaintenance',
              meta: { title: '原始单-管理', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'maintenance',
          component: () => import('@/views/crm/dialog/dialogjd'),
          name: 'maintenance',
          meta: { title: '维修单', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] },
          children: [
            {
              path: 'maintenancesubmit',
              component: () => import('@/views/crm/dialog/dialogjd/dialogjd'),
              name: 'maintenancesubmit',
              meta: { title: '维修单-计算', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'maintenancejudgment',
              component: () => import('@/views/crm/dialog/dialogjd/dialogjddetailsubmit'),
              name: 'maintenancejudgment',
              meta: { title: '维修单-判责', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            },
            {
              path: 'maintenance',
              component: () => import('@/views/crm/dialog/dialogjd/dialogjddetail'),
              name: 'maintenance',
              meta: { title: '维修单-管理', roles: ['woinvoice.view_handler_oriinvoice', 'AllPrivileges'] }
            }
          ]
        }

      ]
    }
  ]
}

export default crmChannelRouter
