export interface loginPwdInterface {
    account: string
    password: string
}


export interface mobileLoginInterface {
    mobile: string
    captcha: string
}


export interface getCodeFetcherInterface {
    mobile: string
    perfix: number
    imgcaptcha: string
    identifier: string
    event: string
}
