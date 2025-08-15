import type * as Admin from "./type"
import { request } from "@/http/axios"

export function getAdminListApi(params: Admin.RouteQuery) {
  return request({
    url: "/auth.Admin/index",
    method: "get",
    params
  })
}
export function addAdminApi(data: Admin.addAdmin) {
  return request({
    url: "/auth.Admin/adminSubmit",
    method: "post",
    data
  })
}
export function editStatusApi(data:any) {
  return request({
    url: "/auth.Admin/adminStatus",
    method: "post",
    data
  })
}
export function delAdminApi(id:number|string) {
  return request({
    url: '/auth.Admin/adminDelete',
    method: 'post',
    data: {
      id
    }
  }
  )
}
