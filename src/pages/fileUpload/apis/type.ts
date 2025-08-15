// 接口参数类型定义
export interface QueryParams {
  /** 页码，必需 */
  page?: string|number;

  /** 每页数量限制，必需 */
  limit?: string|number;

  /** 后台管理员 id，可选 */
  admin_id?: string|number;

  /** 前台用户 id，必需 */
  user_id?: string |number;
}
