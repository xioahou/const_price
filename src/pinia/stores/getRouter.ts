// import type { RouteRecordRaw } from "vue-router"

// import { getDynamicRoutesApi } from "@@/apis/users/index"
// import { transformRoutes } from "@@/utils/transformRoutes"
// import { defineStore } from "pinia"
// import { pinia } from "@/pinia"
// import { router } from "@/router"

// export const useRouterStore = defineStore("routerStore", {
//   state: () => ({
//     dynamicRoutes: [] as RouteRecordRaw[]
//   }),
//   actions: {
//     async generateRoutes() {
//       // 1. 从后端获取路由数据
//       // const res = await fetch("").then(r => r.json())
//       const res: any = await getDynamicRoutesApi()
//       console.log("后台的路由", res)

//       // 2. 转换成 vue-router 可识别的格式
//       const asyncRoutes = transformRoutes(res.data.list)
//       console.log(asyncRoutes)

//       // 3. 添加到 router
//       asyncRoutes.forEach((route) => {
//         router.addRoute(route)
//       })
//       this.dynamicRoutes = asyncRoutes
//     }
//   }
// })
// export function usePermissionRouterStore() {
//   return useRouterStore(pinia)
// }
