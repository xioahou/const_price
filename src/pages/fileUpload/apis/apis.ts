import type * as File from "./type"
import { request } from "@/http/axios"
export const getFileListApi = (data: File.QueryParams) => {
  return request({
    url: "/auth.Upload/index",
    method: "get",
    params:data
  })
}
