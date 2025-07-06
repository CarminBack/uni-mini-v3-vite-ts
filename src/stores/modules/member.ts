import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<any>()

    // 保存会员信息，登录时使用
    const setProfile = (val: any) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  // TODO: 持久化
  {
    // 网页端可用，移动端不可用
    // persist: true,
    // 持久化配置
    // 这里使用 uni.getStorageSync 和 localStorage.getItem 兼容 uni-app
    // uni.getStorageSync 在小程序中使用，localStorage 在浏览器中使用
    // 注意：在 uni-app 中，localStorage 可能不被支持
    // 需要根据实际情况调整
    // 这里的 persist 配置是 Pinia 的持久化插件配置
    persist: {
      storage: {
        getItem: (key: string) => {
          return uni.getStorageSync(key) || localStorage.getItem(key)
        },
        setItem: (key: string, value: string) => {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
