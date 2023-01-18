import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getLabelCenter(params) {
  return request({
    url: '/crm/label/labelcenter/',
    method: 'get',
    params
  })
}

// 创建工单
export function createLabelCenter(data) {
  return request({
    url: `/crm/label/labelcenter/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateLabelCenter(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/label/labelcenter/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportLabelCenter(data) {
  return request({
    url: `/crm/label/labelcenter/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportLabelCenter(data) {
  return request({
    url: `/crm/label/labelcenter/excel_import/`,
    method: 'patch',
    data
  })
}


