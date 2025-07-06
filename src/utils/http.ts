import { useMemberStore } from '@/stores'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const httpInterceptor = {
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

export const http = (options: UniApp.RequestOptions) => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(new Error(`HTTP error: ${res.statusCode}`))
        }
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
