import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getMaintenanceGoods(params) {
  return request({
    url: '/crm/service/maintenancegoods/',
    method: 'get',
    params
  })
}


// 导出工单
export function exportMaintenanceGoods(data) {
  return request({
    url: `/crm/service/maintenancegoods/export/`,
    method: 'patch',
    data
  })
}



// 查询日志
export function getLogMaintenanceGoods(data) {
  return request({
    url: `/crm/service/maintenancegoods/get_log_details/`,
    method: 'patch',
    data
  })
}

