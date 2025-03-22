
export default function useUpload<T = string>(formData: Record<string, any> = {}) {
  const loading = ref(false)
  const error = ref(false)
  const data = ref<T>()
  const run = () => {
    // #ifdef MP-WEIXIN
    uni.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res) => {
        loading.value = true
        const tempFilePath = res.tempFiles[0].tempFilePath
        uploadFile<T>({ tempFilePath, formData, data, error, loading })
      },
      fail: (err) => {
        console.error('uni.chooseMedia err->', err)
        error.value = true
      },
    })
    // #endif
    // #ifndef MP-WEIXIN
    uni.chooseImage({
      count: 1,
      success: (res) => {
        loading.value = true
        const tempFilePath = res.tempFilePaths[0]
        uploadFile<T>({ tempFilePath, formData, data, error, loading })
      },
      fail: (err) => {
        console.error('uni.chooseImage err->', err)
        error.value = true
      },
    })
    // #endif
  }

  return { loading, error, data, run }
}

function uploadFile<T>(options) {
  options = {
    ...{
      url: '',
      files: undefined,
      fileType: undefined,
      file: undefined,
      filePath: undefined,
      name: 'file',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000,
      formData: undefined,
    },
    ...options,
  }

  return new Promise((resolve, reject) => {
    uni.uploadFile({
      ...options,
      success: async (response) => {
        const res = JSON.parse(response.data)
        res.success = res.code === 1
        if (res.success) {
          resolve(res)
        }
        else {
          if (res.code === 401) {
            uni.showModal({
              title: '登录失效',
              content: '请重新登录',
              // showCancel: false,
              success: (res) => {
                if (res.confirm) {
                  uni.reLaunch({ url: '/user/account/login' })
                }
              },
            })
            reject(res)
          }
          else {
            uni.showToast({
              icon: 'none',
              title: res.msg || '请求错误',
            })
            reject(res)
          }
        }
      },
      fail: (error) => {
        console.log('uploadFile:error --->', error)
        uni.showToast({
          icon: 'none',
          title: '网络错误，请重试',
        })
        reject(error)
      },
    })
  })
}
