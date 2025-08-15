// 统一处理 Cookie

import { CacheKey } from "@@/constants/cache-key"
import Cookies from "js-cookie"

export function getToken() {
  return Cookies.get(CacheKey.TOKEN)
}

export function setToken(token: string) {
  Cookies.set(CacheKey.TOKEN, token)
}

export function removeToken() {
  Cookies.remove(CacheKey.TOKEN)
}
export function getInfoToken() {
  return Cookies.get(CacheKey.INFO_TOKEN)
}
export function setInfoToken(token: string) {
  Cookies.set(CacheKey.INFO_TOKEN, token)
}
export function removeInfoToken() {
  Cookies.remove(CacheKey.INFO_TOKEN)
}
