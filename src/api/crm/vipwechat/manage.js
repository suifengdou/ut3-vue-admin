import request from '@/utils/request'

// 获取列表
export function getVIPWechatManageList(params) {
  return request({
    url: '/crm/vipwechat/vipwmanage/',
    method: 'get',
    params
  })
}

// 创建工单
export function createVIPWechatManage(data) {
  return request({
    url: `/crm/vipwechat/vipwmanage/`,
    method: 'post',
    data
  })
}


// 导出工单
export function exportVIPWechatManage(data) {
  return request({
    url: `/crm/vipwechat/vipwmanage/export/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkVIPWechatManage(data) {
  return request({
    url: `/crm/vipwechat/vipwmanage/check/`,
    method: 'patch',
    data
  })
}

