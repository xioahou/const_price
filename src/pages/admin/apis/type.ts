export interface RouteQuery {
  /** 页码，必需 */
  page: string

  /** 每页数量，必需 */
  limit: string

  /** 用户名，可选 */
  username?: string

  /** 类型，可选 */
  type?: string

  /** 路由名称，可选 */
  name?: string

  /** 状态，可选 */
  status?: string
}
