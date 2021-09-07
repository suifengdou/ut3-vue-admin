import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getInventoryManageList(params) {
  return request({
    url: '/psi/inventory/inventorymanage/',
    method: 'get',
    params
  })
}

// 创建工单
export function createInventoryManage(data) {
  return request({
    url: `/psi/inventory/inventorymanage/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateInventoryManage(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/psi/inventory/inventorymanage/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportInventoryManage(data) {
  return request({
    url: `/psi/inventory/inventorymanage/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportInventoryManage(data) {
  return request({
    url: `/psi/inventory/inventorymanage/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkInventoryManage(data) {
  return request({
    url: `/psi/inventory/inventorymanage/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectInventoryManage(data) {
  return request({
    url: `/psi/inventory/inventorymanage/reject/`,
    method: 'patch',
    data
  })
}

