import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getCompensationCheckList(params) {
  return request({
    url: '/dfc/compensation/compensationcheck/',
    method: 'get',
    params
  })
}

// 创建
export function createCompensationCheck(data) {
  return request({
    url: `/dfc/compensation/compensationcheck/`,
    method: 'post',
    data
  })
}

// 更新
export function updateCompensationCheck(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/dfc/compensation/compensationcheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出
export function exportCompensationCheck(data) {
  return request({
    url: `/dfc/compensation/compensationcheck/export/`,
    method: 'patch',
    data
  })
}

// 导入
export function excelImportCompensationCheck(data) {
  return request({
    url: `/dfc/compensation/compensationcheck/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核
export function checkCompensationCheck(data) {
  return request({
    url: `/dfc/compensation/compensationcheck/check/`,
    method: 'patch',
    data
  })
}

// 取消
export function rejectCompensationCheck(data) {
  return request({
    url: `/dfc/compensation/compensationcheck/reject/`,
    method: 'patch',
    data
  })
}


// 设置特殊
export function setSpecialCompensationCheck(data) {
  return request({
    url: `/dfc/compensation/compensationcheck/set_special/`,
    method: 'patch',
    data
  })
}


// 重置标签
export function resetTagCompensationCheck(data) {
  return request({
    url: `/dfc/compensation/compensationcheck/reset_tag/`,
    method: 'patch',
    data
  })
}
