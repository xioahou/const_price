export interface addRole {
  /** ID，必需，范围 1 ~ 2147483647 */
  id?: string;

  /** 名称，必需，<= 255 字符 */
  name: string;

  /** 权限，可选，<= 65535 字符 */
  auth?: string | null;

  /** 排序，必需，范围 -2147483648 ~ 2147483647，默认值 0 */
  sort: number|string;
}
