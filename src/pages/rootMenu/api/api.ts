import type * as Menu from "./typs"
import { request } from "@/http/axios"

export function getMenuListApi() {
  return request({
    url: "/auth.Menus/index",
    method: "get"

  })
}
export function addMenuApi(data: Menu.addMenu) {
  return request({
    url: "/auth.Menus/submit",
    method: "post",
    data
  })
}
export function delMenuApi(id: number | string) {
  return request({
    url: "/auth.Menus/del",
    method: "delete",
    data: { id }
  })
}
export function getCatalogListApi() {
  return request({
    url: "/index.Index/getRoutes",
    method: "get"
  })
}
