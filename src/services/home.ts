import type { BannerItem } from '@/types/home'
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
