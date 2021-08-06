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
    roles: ['users.view_userprofile', 'AllPrivileges']
  },
  children: [
    {
      path: 'goods',
      component: () => import('@/views/base/goods/goodsroot'), // Parent router-view
      name: 'goods',
      meta: { title: '货品' },
      redirect: 'noRedirect',
      children: [
        {
          path: 'goodscategory',
          component: () => import('@/views/base/goods/goodscategory'),
          name: '货品类型',
          meta: { title: '货品类型' }
        },
        {
          path: 'parts',
          component: () => import('@/views/base/goods/parts'),
          name: '配件',
          meta: { title: '配件' }
        },
        {
          path: 'product',
          component: () => import('@/views/base/goods/machine'),
          name: '整机',
          meta: { title: '整机' }
        },
        {
          path: 'gift',
          component: () => import('@/views/base/goods/gift'),
          name: '礼品',
          meta: { title: '礼品' }
        },
        {
          path: 'manage',
          component: () => import('@/views/base/goods/index'),
          name: '货品管理',
          meta: { title: '货品管理' }
        }
      ]
    },
    {
      path: 'platform',
      name: '平台管理',
      component: () => import('@/views/base/platform/index'),
      meta: { title: '平台管理' }
    },
    {
      path: 'shop',
      name: '店铺管理',
      component: () => import('@/views/base/shop/index'),
      meta: { title: '店铺管理' }
    },
    {
      path: 'warehouse',
      component: () => import('@/views/base/warehouse'), // Parent router-view
      name: 'warehouse',
      meta: { title: '仓库' },
      redirect: 'noRedirect',
      children: [
        {
          path: 'warehousetype',
          component: () => import('@/views/base/warehouse/warehousetype'),
          name: '类型管理',
          meta: { title: '类型管理' }
        },
        {
          path: 'warehousemanage',
          component: () => import('@/views/base/warehouse/warehouse'),
          name: '仓库管理',
          meta: { title: '仓库管理' }
        }
      ]
    },
    {
      path: 'company',
      name: '公司管理',
      component: () => import('@/views/base/company/index'),
      meta: { title: '公司管理' }
    },
    {
      path: 'department',
      name: '部门管理',
      component: () => import('@/views/base/department/index'),
      meta: { title: '部门管理' }
    }
  ]
}

export default baseRouter
