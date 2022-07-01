import request from '@/utils/request'

// 审核工单
export function deleteEWOPhoto(data) {
  return request({
    url: `/workorder/express/ewophoto/delete_photo/`,
    method: 'patch',
    data
  })
}
