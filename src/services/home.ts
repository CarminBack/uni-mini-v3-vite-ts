import type { PageResult } from '@/types/global'
import type { BannerItem, CategoryItem, GuessItem, HotItem } from '@/types/home'
import { http } from '@/utils/http'

/**
 *
 * @param distributionSite 广告区域展示位置1 为首页（默认值）2 为商品分类页
 */
export const getHomeBannerAPI = async (distributionSite = 1) => {
  return http<BannerItem[]>({
    url: '/home/banner',
    method: 'GET',
    data: {
      distributionSite,
    },
  })
}

/**
 * 首页-前台分类-小程序
 */
export const getHomeCategoryAPI = async () => {
  return http<CategoryItem[]>({
    url: '/home/category/mutli',
    method: 'GET',
  })
}

/**
 首页-热门推荐-小程序
GET
/home/hot/mutli
 */
export const getHomeHotAPI = async () => {
  return http<HotItem[]>({
    url: '/home/hot/mutli',
    method: 'GET',
  })
}

/**
 * 猜你喜欢-小程序
GET
/home/goods/guessLike
 */
export const getHomeGoodsGuessLikeAPI = async () => {
  return http<PageResult<GuessItem>>({
    url: '/home/goods/guessLike',
    method: 'GET',
  })
}
