/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const crmChannelRouter = {
  path: '/crm',
  component: Layout,
  redirect: 'noRedirect',
  name: 'crm',
  meta: {
    title: '客户关系',
    icon: 'nested',
    roles: ['order.view_oriorderinfo', 'service.view_orimaintenance', 'service.view_maintenance', 'callcenter.view_oricalllog', 'dialog.view_dialogtb', 'dialog.view_dialogow', 'dialog.view_dialogjd', 'customers.view_customer', 'labels.view_label', 'AllPrivileges']
  },
  children: [
    {
      path: 'order',
      component: () => import('@/views/crm/order'), // Parent router-view
      name: 'order',
      meta: { title: '订单系统', roles: ['order.view_oriorderinfo', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'oriorder',
          component: () => import('@/views/crm/order/oriorder'),
          name: 'oriorder',
          meta: { title: '原单', roles: ['order.view_oriorderinfo', 'AllPrivileges'] },
          children: [
            {
              path: 'oriordersockout',
              component: () => import('@/views/crm/order/oriorder/sockout'),
              name: 'oriordersockout',
              meta: { title: '原单出库', roles: ['AllPrivileges'] },
              children: [
                {
                  path: 'submit',
                  component: () => import('@/views/crm/order/oriorder/sockout/submit'),
                  name: 'oriordersockoutsubmit',
                  meta: { title: '原单出库提交', roles: ['AllPrivileges'] }
                },
                {
                  path: 'check',
                  component: () => import('@/views/crm/order/oriorder/sockout/check'),
                  name: 'oriordersockoutcheck',
                  meta: { title: '原单出库管理', roles: ['AllPrivileges'] }
                }
              ]
            },
            {
              path: 'oriorderdetails',
              component: () => import('@/views/crm/order/oriorder/details'),
              name: 'oriorderdetails',
              meta: { title: '原单明细', roles: ['order.view_bmsorderinfo', 'AllPrivileges'] },
              children: [
                {
                  path: 'submit',
                  component: () => import('@/views/crm/order/oriorder/details/submit'),
                  name: 'oriorderdetailssubmit',
                  meta: { title: '原单明细提交', roles: ['order.view_bmsorderinfo', 'AllPrivileges'] }
                },
                {
                  path: 'manage',
                  component: () => import('@/views/crm/order/oriorder/details/check'),
                  name: 'oriorderdetailsmanage',
                  meta: { title: '原单明细管理', roles: ['order.view_bmsorderinfo', 'AllPrivileges'] }
                }
              ]
            },
            {
              path: 'oriorderdecrypt',
              component: () => import('@/views/crm/order/bmsorder'),
              name: 'oriorderdecrypt',
              meta: { title: '订单解密库', roles: ['order.view_bmsorderinfo', 'AllPrivileges'] },
              children: [
                {
                  path: 'submit',
                  component: () => import('@/views/crm/order/bmsorder/submit'),
                  name: 'oriorderdecryptsubmit',
                  meta: { title: '订单解密库提交', roles: ['order.view_bmsorderinfo', 'AllPrivileges'] }
                },
                {
                  path: 'manage',
                  component: () => import('@/views/crm/order/bmsorder/manage'),
                  name: 'oriorderdecryptmanage',
                  meta: { title: '订单解密库管理', roles: ['order.view_bmsorderinfo', 'AllPrivileges'] }
                }
              ]
            },
            {
              path: 'oriordermanage',
              component: () => import('@/views/crm/customers/manage'),
              name: '原始订单管理',
              meta: { title: '原始订单管理', roles: ['customers.view_customer', 'AllPrivileges'] }
            },
          ]
        },
      ]
    },
    {
      path: 'customer',
      name: 'customer',
      component: () => import('@/views/crm/customers'),
      meta: { title: '客户档案', roles: ['customers.view_customer', 'AllPrivileges'] },
      children: [
        {
          path: 'manage',
          component: () => import('@/views/crm/customers/manage'),
          name: '档案管理',
          meta: { title: '档案管理', roles: ['customers.view_customer', 'AllPrivileges'] }
        },
        {
          path: 'cslabel',
          component: () => import('@/views/crm/customers/labels'),
          name: '标签档案',
          meta: { title: '标签档案', roles: ['customers.view_customer', 'AllPrivileges'] }
        },
        {
          path: 'csaddress',
          component: () => import('@/views/crm/csaddress/manage'),
          name: '收件信息',
          meta: { title: '收件信息', roles: ['customers.view_customer', 'AllPrivileges'] }
        },
        {
          path: 'csgoods',
          component: () => import('@/views/crm/csgoods/manage'),
          name: '已购货品',
          meta: { title: '已购货品', roles: ['customers.view_customer', 'AllPrivileges'] }
        },
      ]
    },
    {
      path: 'labelsystem',
      component: () => import('@/views/crm/order'), // Parent router-view
      name: 'labelsystem',
      meta: { title: '标签系统', roles: ['labels.view_label',  'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'label',
          component: () => import('@/views/crm/order/oriorder'),
          name: 'label',
          meta: { title: '标签', roles: ['labels.view_label',  'AllPrivileges'] },
          children: [
            {
              path: 'labelcategory',
              component: () => import('@/views/crm/label/labelcategory'),
              name: 'labelcategory',
              meta: { title: '标签类别', roles: ['labels.view_labelcategory', 'AllPrivileges'] },

            },
            {
              path: 'labelmanage',
              component: () => import('@/views/crm/label/label/manage'),
              name: 'labelmanage',
              meta: { title: '标签管理', roles: ['labels.view_label', 'AllPrivileges'] },

            },
          ]
        },
        {
          path: 'labelordersystem',
          component: () => import('@/views/crm/order/oriorder'),
          name: 'labelordersystem',
          meta: { title: '标签单', roles: ['labels.view_labelcustomerorder', 'AllPrivileges'] },
          children: [
            {
              path: 'labelorder',
              component: () => import('@/views/crm/order/oriorder/sockout'),
              name: 'labelorder',
              meta: { title: '标签单', roles: ['labels.view_labelcustomerorder', 'AllPrivileges'] },
              children: [
                {
                  path: 'submit',
                  component: () => import('@/views/crm/label/labelorder/order/submit'),
                  name: 'labelordersubmit',
                  meta: { title: '标签单提交', roles: ['labels.view_labelcustomerorder', 'AllPrivileges'] }
                },
                {
                  path: 'manage',
                  component: () => import('@/views/crm/label/labelorder/order/manage'),
                  name: 'labelordermanage',
                  meta: { title: '标签单管理', roles: ['labels.view_labelcustomerorder', 'AllPrivileges'] }
                }
              ]
            },
            {
              path: 'labelorderdetails',
              component: () => import('@/views/crm/order/oriorder/details'),
              name: 'labelorderdetails',
              meta: { title: '标签单明细', roles: ['labels.view_labelcustomerorder', 'AllPrivileges'] },
              children: [
                {
                  path: 'submit',
                  component: () => import('@/views/crm/label/labelorder/details/submit'),
                  name: 'labelorderdetailssubmit',
                  meta: { title: '明细提交', roles: ['labels.view_labelcustomerorder', 'AllPrivileges'] }
                },
                {
                  path: 'manage',
                  component: () => import('@/views/crm/label/labelorder/details/manage'),
                  name: 'labelorderdetailsmanage',
                  meta: { title: '明细管理', roles: ['labels.view_labelcustomerorder', 'AllPrivileges'] }
                }
              ]
            },
          ]
        },
      ]
    },
    {
      path: 'vipwechat',
      name: 'vipwechat',
      component: () => import('@/views/crm/vipwechat'),
      meta: { title: '微信VIP', roles: ['vipwechat.view_vipwechat', 'AllPrivileges'] },
      children: [
        {
          path: 'specialist',
          component: () => import('@/views/crm/vipwechat/specialist'),
          name: 'specialist',
          meta: { title: '专属客服', roles: ['vipwechat.view_specialist', 'AllPrivileges'] }
        },
        {
          path: 'myself',
          component: () => import('@/views/crm/vipwechat/myself'),
          name: 'myself',
          meta: { title: '导入客户', roles: ['vipwechat.view_vipwechat', 'AllPrivileges'] }
        },
        {
          path: 'manage',
          component: () => import('@/views/crm/vipwechat/manage'),
          name: '客户管理',
          meta: { title: '客户管理', roles: ['vipwechat.view_vipwechat', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'dialog',
      name: 'dialog',
      component: () => import('@/views/crm/dialog'),
      meta: { title: '客户对话', roles: ['dialog.view_dialogtb', 'dialog.view_dialogow', 'dialog.view_dialogjd', 'AllPrivileges'] },
      children: [
        {
          path: 'servicer',
          component: () => import('@/views/crm/dialog/servicer'),
          name: 'servicer',
          meta: { title: '对话-客服网名', roles: ['dialog.view_servicer', 'AllPrivileges'] }
        },
        {
          path: 'dialogtb',
          component: () => import('@/views/crm/dialog/dialogtb'),
          name: 'dialogtb',
          meta: { title: '淘系对话', roles: ['dialog.view_dialogtb', 'AllPrivileges'] },
          children: [
            {
              path: 'dialogtb',
              component: () => import('@/views/crm/dialog/dialogtb/dialogtb'),
              name: 'dialogtb-customer',
              meta: { title: '淘系对话-客户', roles: ['dialog.view_dialogtb', 'AllPrivileges'] }
            },
            {
              path: 'dialogtbdetailmyself',
              component: () => import('@/views/crm/dialog/dialogtb/dialogtbdetailmyself'),
              name: 'dialogtbdetailmyself',
              meta: { title: '淘系对话-提取-个人', roles: ['dialog.view_user_dialogtbdetail', 'AllPrivileges'] }
            },
            {
              path: 'dialogtbdetailsubmit',
              component: () => import('@/views/crm/dialog/dialogtb/dialogtbdetailsubmit'),
              name: 'dialogtbdetailsubmit',
              meta: { title: '淘系对话-提取', roles: ['dialog.view_handler_dialogtbdetail', 'AllPrivileges'] }
            },
            {
              path: 'dialogtbdetail',
              component: () => import('@/views/crm/dialog/dialogtb/dialogtbdetail'),
              name: 'dialogtbdetail',
              meta: { title: '淘系对话-信息', roles: ['dialog.view_dialogtbdetail', 'AllPrivileges'] }
            },
            {
              path: 'dialogtbwords',
              component: () => import('@/views/crm/dialog/dialogtb/dialogtbwords'),
              name: 'dialogtbwords',
              meta: { title: '淘系对话-分词', roles: ['dialog.view_dialogtbwords', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'dialogjd',
          component: () => import('@/views/crm/dialog/dialogjd'),
          name: 'dialogjd',
          meta: { title: '京东对话', roles: ['dialog.view_dialogjd', 'AllPrivileges'] },
          children: [
            {
              path: 'dialogjd',
              component: () => import('@/views/crm/dialog/dialogjd/dialogjd'),
              name: 'dialogjd-customer',
              meta: { title: '京东对话-客户', roles: ['dialog.view_dialogjd', 'AllPrivileges'] }
            },
            {
              path: 'dialogjddetailsubmit',
              component: () => import('@/views/crm/dialog/dialogjd/dialogjddetailsubmit'),
              name: 'dialogjddetailsubmit',
              meta: { title: '京东对话-提取', roles: ['dialog.view_dialogjddetail', 'AllPrivileges'] }
            },
            {
              path: 'dialogjddetail',
              component: () => import('@/views/crm/dialog/dialogjd/dialogjddetail'),
              name: 'dialogjddetail',
              meta: { title: '京东对话-信息', roles: ['dialog.view_dialogjddetail', 'AllPrivileges'] }
            },
            {
              path: 'dialogjdwords',
              component: () => import('@/views/crm/dialog/dialogjd/dialogjdwords'),
              name: 'dialogjdwords',
              meta: { title: '京东对话-分词', roles: ['dialog.view_dialogjdwords', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'dialogow',
          component: () => import('@/views/crm/dialog/dialogow'),
          name: 'dialogow',
          meta: { title: '官网对话', roles: ['dialog.view_dialogow', 'AllPrivileges'] },
          children: [
            {
              path: 'dialogowsubmit',
              component: () => import('@/views/crm/dialog/dialogow/dialogowsubmit'),
              name: 'dialogowsubmit',
              meta: { title: '官网对话-提取', roles: ['dialog.view_dialogow', 'AllPrivileges'] }
            },
            {
              path: 'dialogow',
              component: () => import('@/views/crm/dialog/dialogow/dialogow'),
              name: 'dialogow-customer',
              meta: { title: '官网对话-客户', roles: ['dialog.view_dialogow', 'AllPrivileges'] }
            },
            {
              path: 'dialogowdetail',
              component: () => import('@/views/crm/dialog/dialogow/dialogowdetail'),
              name: 'dialogowdetail',
              meta: { title: '官网对话-信息', roles: ['dialog.view_dialogowdetail', 'AllPrivileges'] }
            },
            {
              path: 'dialogowwords',
              component: () => import('@/views/crm/customers/manage'),
              name: 'dialogowwords',
              meta: { title: '官网对话-分词', roles: ['dialog.view_dialogowwords', 'AllPrivileges'] }
            }
          ]
        }

      ]
    },
    {
      path: 'callcenter',
      name: 'callcenter',
      component: () => import('@/views/crm/callcenter/'),
      meta: { title: '呼叫中心', roles: ['callcenter.view_oricalllog','AllPrivileges'] },
      children: [
        {
          path: 'oricalllogsubmit',
          component: () => import('@/views/crm/callcenter/oricalllogsubmit'),
          name: 'oricalllogsubmit',
          meta: { title: '原始记录-提取', roles: ['callcenter.view_oricalllog', 'AllPrivileges'] }
        },
        {
          path: 'oricalllogcheck',
          component: () => import('@/views/crm/callcenter/oricalllogcheck'),
          name: 'oricalllogcheck',
          meta: { title: '原始记录-递交', roles: ['callcenter.view_handler_calllogcheck', 'AllPrivileges'] }
        },
        {
          path: 'oricalllog',
          component: () => import('@/views/crm/callcenter/oricalllog'),
          name: 'oricalllog',
          meta: { title: '原始记录-管理', roles: ['callcenter.view_oricalllog', 'AllPrivileges'] }
        },
        {
          path: 'callloghandle',
          component: () => import('@/views/crm/callcenter/callloghandle'),
          name: 'callloghandle',
          meta: { title: '通话检查-处理', roles: ['callcenter.view_handler_calllogcheck', 'AllPrivileges'] }
        },
        {
          path: 'calllogexecute',
          component: () => import('@/views/crm/callcenter/calllogexecute'),
          name: 'calllogexecute',
          meta: { title: '通话检查-执行', roles: ['callcenter.view_user_calllogcheck', 'AllPrivileges'] }
        },
        {
          path: 'calllogcheck',
          component: () => import('@/views/crm/callcenter/calllogcheck'),
          name: 'calllogcheck',
          meta: { title: '通话检查-审核', roles: ['callcenter.view_handler_calllogcheck', 'AllPrivileges'] }
        },
        {
          path: 'calllog',
          component: () => import('@/views/crm/callcenter/calllog'),
          name: 'calllog',
          meta: { title: '通话检查-管理', roles: ['callcenter.view_calllog', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'service',
      name: 'service',
      component: () => import('@/views/crm/service'),
      meta: { title: '中央维修', roles: ['service.view_orimaintenance', 'service.view_maintenance', 'AllPrivileges'] },
      children: [

        {
          path: 'orimaintenance',
          component: () => import('@/views/crm/service/orimaintenance'),
          name: 'orimaintenance',
          meta: { title: '原始单', roles: ['service.view_orimaintenance', 'AllPrivileges'] },
          children: [
            {
              path: 'orimaintenancebefore',
              component: () => import('@/views/crm/service/orimaintenance/orimaintenancebefore'),
              name: 'orimaintenancebefore',
              meta: { title: '原始单-异常', roles: ['service.view_orimaintenance', 'AllPrivileges'] }
            },
            {
              path: 'orimaintenancesubmit',
              component: () => import('@/views/crm/service/orimaintenance/orimaintenancesubmit'),
              name: 'orimaintenancesubmit',
              meta: { title: '原始单-提交', roles: ['service.view_orimaintenance', 'AllPrivileges'] }
            },
            {
              path: 'orimaintenancemanage',
              component: () => import('@/views/crm/service/orimaintenance/orimaintenance'),
              name: 'orimaintenancemanage',
              meta: { title: '原始单-管理', roles: ['service.view_orimaintenance', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'maintenance',
          component: () => import('@/views/crm/service/maintenance'),
          name: 'maintenance',
          meta: { title: '维修单', roles: ['service.view_maintenance', 'AllPrivileges'] },
          children: [
            {
              path: 'maintenancesubmit',
              component: () => import('@/views/crm/service/maintenance/maintenancesubmit'),
              name: 'maintenancesubmit',
              meta: { title: '维修单-计算', roles: ['service.view_maintenance', 'AllPrivileges'] }
            },
            {
              path: 'maintenancejudgment',
              component: () => import('@/views/crm/service/maintenance/maintenancejudgment'),
              name: 'maintenancejudgment',
              meta: { title: '维修单-判责', roles: ['service.view_maintenance', 'AllPrivileges'] }
            },
            {
              path: 'maintenancemanage',
              component: () => import('@/views/crm/service/maintenance/maintenance'),
              name: 'maintenancemanage',
              meta: { title: '维修单-管理', roles: ['service.view_maintenance', 'AllPrivileges'] }
            }
          ]
        },
        {
          path: 'mantenancesummary',
          component: () => import('@/views/crm/service/maintenancesummary'),
          name: 'mantenancesummary',
          meta: { title: '维修统计', roles: ['service.view_maintenance', 'AllPrivileges'] }
        },
        {
          path: 'findandfound',
          component: () => import('@/views/crm/service/findandfound'),
          name: 'findandfound',
          meta: { title: '二次明细', roles: ['service.view_maintenance', 'AllPrivileges'] }
        }

      ]
    }
  ]
}

export default crmChannelRouter
