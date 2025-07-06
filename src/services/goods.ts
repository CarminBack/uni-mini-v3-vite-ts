import type { GoodsResult } from '@/types/goods'
import { http } from '@/utils/http'
/**
 *
 * @param id 商品ID
 * @description 根据商品ID获取商品详情
 * @returns
 */
export const getGoodsByIdAPI = (id: string) => {
  // 使用http方法，发送GET请求，请求地址为/goods/{id}
  return http<GoodsResult>({
    url: `/goods`,
    method: 'GET',
    data: { id },
  })
}
