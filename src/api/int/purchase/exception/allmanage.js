import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getExceptionIPOAllManageList(params) {
  return request({
    url: '/int/exceptionipo/allmanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportExceptionIPOAllManage(data) {
  return request({
    url: `/int/exceptionipo/allmanage/export/`,
    method: 'patch',
    data
  })
}

