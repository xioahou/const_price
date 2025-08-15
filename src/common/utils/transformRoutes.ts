// src/utils/route.ts
import type { RouteRecordRaw } from "vue-router"

// vite 的动态导入

export function transformRoutes(serverRoutes: any[]): RouteRecordRaw[] {
  // console.log("serverRoutes: ", serverRoutes)
  const modules = import.meta.glob("@/pages/**/*.vue")
  // console.log("modules: ", modules)
  return serverRoutes.map((route) => {
    const temp: RouteRecordRaw = {
      path: route.path,
      name: route.name,
      meta: route.meta || {}
    }

    // 处理 component
    if (route.component) {
      const compPath = `/src/pages/${route.component}/index.vue`
      // console.log("compPath: ", compPath)

      if (modules[compPath]) {
        temp.component = modules[compPath] as any
      } else {
        // console.warn(`组件路径不存在: ${compPath}`)
        temp.component = () => import("@/pages/error/404.vue")
      }
    }

    // 递归处理 children
    if (route.children && route.children.length) {
      temp.children = transformRoutes(route.children)
    }

    return temp
  })
}
