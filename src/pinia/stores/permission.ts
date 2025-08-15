import type { RouteRecordRaw } from "vue-router"
import { getDynamicRoutesApi } from "@@/apis/users/index"
import { transformRoutes } from "@@/utils/transformRoutes"
import { pinia } from "@/pinia"
import { constantRoutes, dynamicRoutes, router } from "@/router"
import { routerConfig } from "@/router/config"
import { flatMultiLevelRoutes } from "@/router/helper"
import {setDynamicRoutes,getDynamicRoutes} from '@@/utils/cache/local-storage'

function hasPermission(roles: string[], route: RouteRecordRaw) {
  const routeRoles = route.meta?.roles
  return routeRoles ? roles.some(role => routeRoles.includes(role)) : true
}

function filterDynamicRoutes(routes: RouteRecordRaw[], roles: string[]) {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tempRoute = { ...route }
    if (hasPermission(roles, tempRoute)) {
      if (tempRoute.children) {
        tempRoute.children = filterDynamicRoutes(tempRoute.children, roles)
      }
      res.push(tempRoute)
    }
  })
  return res
}

export const usePermissionStore = defineStore("permission", () => {
  // 可访问的路由
  const routes = ref<RouteRecordRaw[]>([])

  // 有访问权限的动态路由
  const addRoutes = ref<RouteRecordRaw[]>([])

  // 根据角色生成可访问的 Routes（可访问的路由 = 常驻路由 + 有访问权限的动态路由）
  const setRoutes = async (roles: string[]) => {
    // console.log(112333)
    const res: any = await getDynamicRoutesApi()
    // console.log(res)
    if (res.code === 200) {
  setDynamicRoutes(res.data.list)
}
    // 2. 转换成 vue-router 可识别的格式
    console.log('动态路由',getDynamicRoutes());

    const asyncRoutes = transformRoutes(getDynamicRoutes())
    // console.log(asyncRoutes)

    // 3. 添加到 router
    asyncRoutes.forEach((route) => {
      router.addRoute(route)
    })
    addRoutes.value = asyncRoutes
    const accessedRoutes = filterDynamicRoutes(asyncRoutes, roles)
    set(accessedRoutes)
  }

  // 所有路由 = 所有常驻路由 + 所有动态路由
  const setAllRoutes = () => {
    set(addRoutes)
  }

  // 统一设置
  const set = async (accessedRoutes: RouteRecordRaw[]) => {
    // console.log("accessedRoutes", accessedRoutes)

    // await
    routes.value = constantRoutes.concat(accessedRoutes)
    addRoutes.value = accessedRoutes
  }
  // console.log("setAllRouters", addRoutes)

  return { routes, addRoutes, setRoutes, setAllRoutes }
})

/**
 * @description 在 SPA 应用中可用于在 pinia 实例被激活前使用 store
 * @description 在 SSR 应用中可用于在 setup 外使用 store
 */
export function usePermissionStoreOutside() {
  return usePermissionStore(pinia)
}
