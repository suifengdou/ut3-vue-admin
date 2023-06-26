import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getMOExport(params) {
  return request({
    url: '/dfc/manualorder/moexportmanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportMOExport(data) {
  return request({
    url: `/dfc/manualorder/moexportmanage/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportMOExport(data) {
  return request({
    url: `/dfc/manualorder/moexportmanage/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkMOExport(data) {
  return request({
    url: `/dfc/manualorder/moexportmanage/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectMOExport(data) {
  return request({
    url: `/dfc/manualorder/moexportmanage/reject/`,
    method: 'patch',
    data
  })
}


// 查询日志
export function getLogMOExport(data) {
  return request({
    url: `/dfc/manualorder/moexportmanage/get_log_details/`,
    method: 'patch',
    data
  })
}
