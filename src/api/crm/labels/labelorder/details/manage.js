import request from '@/utils/request'


// 获取列表
export function getLabelCustomerOrderDetails(params) {
  return request({
    url: '/crm/label/labelcustomerorderdetails/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportLabelCustomerOrderDetails(data) {
  return request({
    url: `/crm/label/labelcustomerorderdetails/export/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogLabelCustomerOrdeDetails(data) {
  return request({
    url: `/crm/label/labelcustomerorderdetails/get_log_details/`,
    method: 'patch',
    data
  })
}


