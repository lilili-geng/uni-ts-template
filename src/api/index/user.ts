import { loginPwdInterface, mobileLoginInterface, getCodeFetcherInterface } from '@/interface'
import { fetcher } from '@/utils/fetcher'



// 账号密码登录
export const loginPwdFetcher = (data: loginPwdInterface) => {
    return fetcher.post<loginPwdInterface>('/api/user/login', data)
}

// 手机快捷登录
export const mobileloginFetcher = (data: mobileLoginInterface) => {
    return fetcher.post<mobileLoginInterface>('/api/user/mobilelogin', data)
}


// 获取验证码
export const getCodeFetcher = (data: getCodeFetcherInterface) => {
    return fetcher.post<getCodeFetcherInterface>('/api/sms/juhesend', data)
}
