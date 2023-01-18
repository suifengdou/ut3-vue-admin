import request from '@/utils/request'


// 获取列表
export function getLabelCustomerOrder(params) {
  return request({
    url: '/crm/label/labelcustomerorder/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportLabelCustomerOrder(data) {
  return request({
    url: `/crm/label/labelcustomerorder/export/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogLabelCustomerOrder(data) {
  return request({
    url: `/crm/label/labelcustomerorder/get_log_details/`,
    method: 'patch',
    data
  })
}


