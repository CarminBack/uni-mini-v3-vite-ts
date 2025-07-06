import { useMemberStore } from '@/stores'

// 定义请求的基础URL
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const httpInterceptor = {
  // 在请求前添加公共参数
  invoke(options: UniApp.RequestOptions) {
    // 在请求前添加公共参数
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    options.timeout = 10000 // 设置请求超时时间为10秒
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
      // 这里可以添加其他公共请求头
    }
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header['Authorization'] = `Bearer ${token}`
    }
    // console.log(options)
  },
  //   fail(err) {
  //     console.error('Request failed:', err)
  //   },
  complete() {
    // 可以在这里添加请求完成后的逻辑
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

// 封装请求函数
interface Data<T> {
  code: string
  message: string
  result: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 获取用户信息存储
          const memberStore = useMemberStore()
          memberStore.clearProfile() // 清除用户信息
          uni.navigateTo({
            url: '/pages/login/login',
          })
          reject(new Error('Unauthorized access, please log in again.'))
        } else {
          uni.showToast({
            icon: 'none',
            title: `${(res.data as Data<T>).message || '请求失败，请稍后再试'}`,
          })
          reject(new Error(`HTTP error: ${res.statusCode}`))
        }
      },
      fail: (err) => {
        uni.showToast({
          icon: 'none',
          title: `网络错误,换个网络试试`,
        })
        reject(err)
      },
    })
  })
}
