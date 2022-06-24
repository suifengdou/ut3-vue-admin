import request from '@/utils/request'

// 二手尾货单发货明细操作API
// 获取列表
export function getProductCatalogManageList(params) {
  return request({
    url: '/sales/productcatalog/productcatalogmanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportProductCatalogManage(data) {
  return request({
    url: `/sales/productcatalog/productcatalogmanage/export/`,
    method: 'patch',
    data
  })
}

