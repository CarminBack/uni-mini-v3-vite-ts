import { getHotRecommendAPI } from '../../services/hot'; // /src/pages/hot/hot.vue
<script setup lang="ts">
import { getHotRecommendAPI } from '@/services/hot'
import type { SubTypeItem } from '@/types/hot'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]
// uniapp 获取页面参数方法
const query = defineProps<{
  type: string
}>()

// 根据query.type在hotMap中查找对应的元素，如果找不到则返回hotMap的第一个元素
const currentHot = hotMap.find((v) => v.type === query.type) || hotMap[0]
// 设置导航栏标题为currentHot的title
uni.setNavigationBarTitle({
  title: currentHot.title,
})

// 热门推荐封面图
const bannerPicture = ref('')
// 推荐选项
const subTypes = ref<(SubTypeItem & { finish?: boolean })[]>([])
// 高亮下标
const activeIndex = ref(0)
// 获取热门推荐数据
const getHotRecommendData = async () => {
  try {
    const res = await getHotRecommendAPI(currentHot.url, {
      page: 30,
      pageSize: 10,
    })
    // 如果请求成功，打印返回的数据
    console.log('热门推荐数据:', res)
    // 设置热门推荐封面图
    bannerPicture.value = res.result.bannerPicture
    subTypes.value = res.result.subTypes || []
  } catch (error) {
    // 如果请求失败，打印错误信息
    console.error('获取热门推荐数据失败:', error)
  }
}

// 滚动触底
const onScrolltolower = async () => {
  console.log('滚动到底部')
  const currsubTypes = subTypes.value[activeIndex.value]
  if (currsubTypes.goodsItems.page >= currsubTypes.goodsItems.pages) {
    // 标记已结束
    currsubTypes.finish = true
    return uni.showToast({
      title: '没有更多数据了',
      icon: 'none',
    })
  } else {
    // 当前页码累加
    currsubTypes.goodsItems.page++
  }
  // 调用API传参
  const res = await getHotRecommendAPI(currentHot.url, {
    subType: currsubTypes.id,
    page: currsubTypes.goodsItems.page,
    pageSize: currsubTypes.goodsItems.pageSize,
  })
  // 新的列表选项
  const newsubTypes = res.result.subTypes[activeIndex.value]
  // 更新当前选项的商品列表
  currsubTypes.goodsItems.items.push(...newsubTypes.goodsItems.items)
}

onLoad(() => {
  getHotRecommendData()
})
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="bannerPicture"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        :class="{ active: activeIndex === index }"
        v-for="(item, index) in subTypes"
        :key="item.id"
        class="text"
        @click="activeIndex = index"
        >{{ item.title }}</text
      >
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      v-for="(item, index) in subTypes"
      v-show="activeIndex === index"
      :key="item.id"
      scroll-y
      @scrolltolower="onScrolltolower"
      class="scroll-view"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in item.goodsItems.items"
          :key="goods.id"
          :url="`/pages/goods/goods?id=${goods.id}`"
        >
          <image class="thumb" :src="goods.picture"></image>
          <view class="name ellipsis">{{ goods.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">{{ item.finish ? '没有更多数据了' : '上拉加载更多' }}</view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.scroll-view {
  flex: 1;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
