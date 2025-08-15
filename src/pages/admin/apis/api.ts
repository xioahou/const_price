import type * as Admin from "./type"
import { request } from "@/http/axios"

export function getAdminListApi(params: Admin.RouteQuery) {
  return request({
    url: "/auth.Admin/index",
    method: "get",
    params
  })
}
