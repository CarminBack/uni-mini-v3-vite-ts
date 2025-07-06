// 分类列表-小程序
// GET
// /category/top

import type { CategoryTopItem } from '@/types/category'
import { http } from '@/utils/http'

/**
 *
 * @returns 分类列表
 * @description 获取分类列表
 */
export const getCategoryTopApi = () => {
  // 使用http方法，发送GET请求，请求地址为/category/top
  return http<CategoryTopItem[]>({
    url: '/category/top',
    method: 'GET',
  })
}
