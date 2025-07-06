<script setup lang="ts">
import { getHomeGoodsGuessLikeAPI } from '@/services/home'
import type { GuessItem } from '@/types/home'
import { onMounted, ref } from 'vue'
import type { PageParams } from '../types/global'

//组件挂载完毕
onMounted(() => {
  getHomeGoodsGuessLikeData()
})

// 分页参数
// 定义一个名为PageParams的常量，类型为PageParams的Required类型
const PageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
}

// 已结束标记
const finish = ref(false)
// 获取猜你喜欢数据
const guessList = ref<GuessItem[]>([])
const getHomeGoodsGuessLikeData = async () => {
  if (finish.value) {
    return uni.showToast({
      title: '没有更多数据了',
      icon: 'none',
    })
  }
  const res = await getHomeGoodsGuessLikeAPI(PageParams)
  //   数组追加
  guessList.value.push(...res.result.items)
  // 如果数据长度小于 pageSize，说明没有更多数据了
  if (res.result.pages < PageParams.page) {
    finish.value = true
  } else {
    // 页码自增
    PageParams.page++
  }
}
// 重置数据
const resetData = () => {
  // 重置分页参数
  PageParams.page = 1
  PageParams.pageSize = 10
  // 重置猜你喜欢列表
  guessList.value = []
  // 重置结束标记
  finish.value = false
}

// 暴露方法
defineExpose({
  getMore: getHomeGoodsGuessLikeData,
  resetData,
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessList"
      :key="item.id"
      :url="`/pages/goods/goods?id=${item.id}`"
    >
      <image class="image" mode="aspectFill" :src="item.picture"></image>
      <view class="name">{{ item.name }}</view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text"> {{ finish ? '没有更多数据了' : '上拉加载更多' }} </view>
</template>

<style lang="scss">
:host {
  display: block;
}
/* 分类标题 */
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

/* 猜你喜欢 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }
  .image {
    width: 304rpx;
    height: 304rpx;
  }
  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }
  .small {
    font-size: 80%;
  }
}
// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
