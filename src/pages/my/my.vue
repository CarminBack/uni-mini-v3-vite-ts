<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { http } from '@/utils/http'
const memberStore = useMemberStore()

const getData = async () => {
  const res = await http({
    method: 'GET',
    url: '/home/banner', // Replace with your actual API endpoint
    header: {},
  })
  console.log('请求成功', res)
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋',
          token: '123',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="getData()" size="mini" plain type="warn">请求接口</button>
  </view>
</template>

<style lang="scss">
//
</style>
