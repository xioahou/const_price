import type * as Users from "./type"
import { request } from "@/http/axios"

/** 获取当前登录用户详情 */
export function getCurrentUserApi() {
  return request<Users.CurrentUserResponseData>({
    url: "users/me",
    method: "get"
  })
}
// 获取动态路由
export function getDynamicRoutesApi() {
  return request({
    url: "/index.Index/getRoutes",
    method: "get"
  })
  // return ({
  //   data:
  //     [
  //       {
  //         path: "/permission",
  //         component: "layouts",
  //         redirect: "/permission/page-level",
  //         name: "Permission",
  //         meta: {
  //           title: "权限演示",
  //           elIcon: "Lock",

  //           alwaysShow: true
  //         },
  //         children: [
  //           {
  //             type: 1, // 1:页面级 2:按钮级
  //             path: "page-level",
  //             component: "demo/level2",
  //             name: "PermissionPageLevel",
  //             meta: {
  //               title: "页面级"

  //             }
  //           },

  //           {
  //             path: "button-level",
  //             component: "demo/element-plus",
  //             name: "PermissionButtonLevel",
  //             meta: {
  //               title: "按钮级",
  //               alwaysShow: true
  //             }
  //           }
  //         ]
  //       }
  //     ]
  // }
  // )
}
