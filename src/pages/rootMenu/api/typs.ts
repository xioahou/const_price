export interface addMenu {
  /** 主键ID，可选，>=1 <=2147483647 */
  id?: string;

  /** 父级路由ID（0表示顶级），默认0 */
  parent_id?: string;

  /** 路由路径，必需，<=255字符 */
  path: string;

  /** 按钮标识（建议补充说明），必需 */
  button?: string;

  /** 组件路径，必需，<=255字符 */
  component: string;

  /** 重定向路径，必需，<=255字符 */
  redirect?: string;

  /** 路由名称，必需，<=100字符 */
  name: string;

  /** 菜单标题，必需，<=100字符 */
  title: string;

  /** 图标标识，必需，<=100字符 */
  elIcon?: string;

  /** 是否始终显示（2否/1是），默认1 */
  always_show?: string;

  /** 类型（1目录/2页面/3按钮），默认1 */
  type?: string;

  /** 排序值，默认0 */
  sort?: string;

  /** 状态（2禁用/1启用），默认1 */
  status?: string;
}
