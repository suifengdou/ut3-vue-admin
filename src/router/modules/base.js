/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const baseRouter = {
  path: '/base',
  component: Layout,
  redirect: 'noRedirect',
  name: 'base',
  meta: {
    title: '基础设置',
    icon: 'nested',
    roles: ['goods.view_goods', 'AllPrivileges']
  },
  children: [
    {
      path: 'company',
      name: '公司管理',
      component: () => import('@/views/base/company/index'),
      meta: { title: '公司管理', roles: ['company.view_company', 'AllPrivileges'] }
    },
    {
      path: 'center',
      name: '中心管理',
      component: () => import('@/views/base/center/index'),
      meta: { title: '中心管理', roles: ['department.view_department',  'AllPrivileges'] }
    },
    {
      path: 'department',
      name: '部门管理',
      component: () => import('@/views/base/department/index'),
      meta: { title: '部门管理', roles: ['department.view_department',  'AllPrivileges'] }
    },
    {
      path: 'platform',
      name: '平台管理',
      component: () => import('@/views/base/platform/index'),
      meta: { title: '平台管理', roles: ['shop.view_platform', 'AllPrivileges'] }
    },
    {
      path: 'shop',
      name: '店铺管理',
      component: () => import('@/views/base/shop/index'),
      meta: { title: '店铺管理', roles: ['shop.view_shop', 'AllPrivileges'] }
    },
    {
      path: 'goods',
      component: () => import('@/views/base/goods/'), // Parent router-view
      name: 'goods',
      meta: { title: '货品', roles: ['goods.view_goods', 'goods.view_user_goods', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'goodscategory',
          component: () => import('@/views/base/goods/category'),
          name: '货品类型',
          meta: { title: '货品类型', roles: ['goods.view_goodscategory', 'AllPrivileges'] }
        },
        {
          path: 'query',
          component: () => import('@/views/base/goods/query'),
          name: '货品查询',
          meta: { title: '货品查询', roles: ['goods.view_goods', 'AllPrivileges'] }
        },
        {
          path: 'bom',
          component: () => import('@/views/base/goods/bom'),
          name: '简易BOM',
          meta: { title: '简易BOM', roles: ['goods.view_goods', 'AllPrivileges'] }
        },
        {
          path: 'manage',
          component: () => import('@/views/base/goods/manage'),
          name: '货品管理',
          meta: { title: '货品管理', roles: ['goods.view_user_goods', 'AllPrivileges'] }
        }
      ]
    },
    {
      path: 'warehouse',
      component: () => import('@/views/base/warehouse'), // Parent router-view
      name: 'warehouse',
      meta: { title: '仓库', roles: ['warehouse.view_warehouse', 'AllPrivileges'] },
      redirect: 'noRedirect',
      children: [
        {
          path: 'warehousetype',
          component: () => import('@/views/base/warehouse/warehousetype'),
          name: '类型管理',
          meta: { title: '类型管理', roles: ['warehouse.view_warehouse', 'AllPrivileges'] }
        },
        {
          path: 'warehousemanage',
          component: () => import('@/views/base/warehouse/warehouse'),
          name: '仓库管理',
          meta: { title: '仓库管理', roles: ['warehouse.view_warehouse', 'AllPrivileges'] }
        }
      ]
    }
  ]
}

export default baseRouter
