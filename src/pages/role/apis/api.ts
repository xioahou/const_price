import type * as Role from "./type"
import { request } from "@/http/axios"

export function getRoleListApi() {
  return request({
    url: "/auth.Role/index",
    method: "get"
  })
}
export function addRoleApi(data:Role.addRole) {
  return request({
    url: '/auth.Role/submit',
    method: 'post',
    data
  })
}
export function delRoleApi(id:number) {
  return request({
    url: '/auth.Role/del',
    method: 'delete',
    data: {
      id
    }
  })
}


