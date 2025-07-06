import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'
import { http } from '@/utils/http'

/**
 * 通用热门推荐类型
 * @param url 请求地址
 * @param data 请求参数
 * @returns
 */
type HotParams = PageParams & { subType?: string }
export const getHotRecommendAPI = (url: string, data?: HotParams) => {
  return http<HotResult>({
    url,
    method: 'GET',
    data,
  })
}
