/** 首页-广告区域数据类型 */
export type BannerItem = {
  /** 跳转链接 */
  hrefUrl: string
  /** id */
  id: string
  /** 图片链接 */
  imgUrl: string
  /** 跳转类型 */
  type: number
}

/** 首页-前台分类数据类型 */
export type CategoryItem = {
  /** id */
  id: string
  /** 分类名称 */
  name: string
  /** 分类图标 */
  icon: string
}
