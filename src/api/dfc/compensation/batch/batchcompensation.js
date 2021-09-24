import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getBatchCompensationList(params) {
  return request({
    url: '/dfc/compensation/batchcompensation/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportBatchCompensation(data) {
  return request({
    url: `/dfc/compensation/batchcompensation/export/`,
    method: 'patch',
    data
  })
}

