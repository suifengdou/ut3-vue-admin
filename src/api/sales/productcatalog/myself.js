import request from '@/utils/request'

// 二手尾货单发货明细操作API
// 获取列表
export function getProductCatalogMyselfList(params) {
  return request({
    url: '/sales/productcatalog/myproductcatalog/',
    method: 'get',
    params
  })
}
// 创建工单
export function createProductCatalogMyself(data) {
  return request({
    url: `/sales/productcatalog/myproductcatalog/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateProductCatalogMyself(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/sales/productcatalog/myproductcatalog/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportProductCatalogMyself(data) {
  return request({
    url: `/sales/productcatalog/myproductcatalog/export/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkProductCatalogMyself(data) {
  return request({
    url: `/sales/productcatalog/myproductcatalog/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectProductCatalogMyself(data) {
  return request({
    url: `/sales/productcatalog/myproductcatalog/reject/`,
    method: 'patch',
    data
  })
}
