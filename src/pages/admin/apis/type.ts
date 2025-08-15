export interface RouteQuery {
  /** 页码，必需 */
  page: string | number

  /** 每页数量，必需 */
  limit: string | number

  /** 用户名，可选 */
  username?: string

  /** 类型，可选 */
  type?: string

  /** 路由名称，可选 */
  name?: string

  /** 状态，可选 */
  status?: string
}

export interface addAdmin {
  username: string // 登录账户，必需
  password: string // 密码，必需
  name: string // 姓名，必需
  type?: string // 类型（1超级管理员，2普通管理员），必需
  role_id?: string // 角色id，逗号隔开，超级管理员没有这个字段，可选
  status: string // 状态（1正常，2停用），必需
  id?: string // 可选
}
