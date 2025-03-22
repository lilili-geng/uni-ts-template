<template>
    <app-container background-image="https://cdn.qumiyo.com/jtyp-app/images/NtmTTWGwZX1uh72zEo.png">
        <uni-nav-bar left-icon="closeempty" background-color="transparent" status-bar :border="false"
            @click-left="pageBack" />
        <!-- logo -->
        <view class="logo flex-center" />
        <view class="mb-60rpx box-border w-full flex items-center px-40rpx">
            <view class="mr-40rpx"
                :class="loginType !== 'password' ? 'text-40rpx text-#333 font-bold' : 'text-32rpx text-#666'"
                @click="handleLoginTypeChange">
                快捷登录
            </view>
            <view :class="loginType === 'password' ? 'text-40rpx text-#333 font-bold' : 'text-32rpx text-#666'"
                @click="handleLoginTypeChange">
                密码登录
            </view>
        </view>
        <!-- 登录 -->
        <view class="login">
            <view class="login__item">
                <view class="mr-2 b-r-1 b-#E6E6E6 b-r-solid pr-2 text-30rpx">
                    +86
                </view>
                <input v-model="formData.username" type="text" class="login__item__input" placeholder="请输入手机号"
                    placeholder-style="color: #B3B3B3;">
            </view>
            <view class="login__item">
                <template v-if="loginType === 'password'">
                    <input v-model="formData.password" type="text" class="login__item__input" placeholder="请输入密码"
                        placeholder-style="color: #B3B3B3;" :password="!showPassword" @confirm="handleLogin">
                    <view class="pl-10rpx" @click="onPasswordChange()">
                        <uni-icons v-if="formData.password !== ''" :type="showPassword ? 'eye' : 'eye-slash'"
                            size="20" />
                    </view>
                </template>
                <template v-else>
                    <input v-model="formData.code" type="text" class="login__item__input" placeholder="请输入短信验证码"
                        placeholder-style="color: #B3B3B3;" @confirm="handleLogin">
                    <view class="pr-32rpx text-28rpx" :class="[countdown === 60 ? 'c-#ff3430' : 'c-#666']"
                        @click="onSendCode">
                        <text>{{ codeButtonText }}</text>
                    </view>
                </template>
            </view>
        </view>
        <!-- links -->
        <view class="mt-20rpx flex items-center justify-end px-45rpx text-26rpx c-#808080">
            <text v-if="loginType === 'password'" class="text-#f52523"
                @click="handleToPage('/user/account/password?type=1')">
                忘记密码
            </text>
        </view>
        <!-- 按钮 -->
        <view class="login-btn">
            <view class="login-btn__submit" hover-class="op-80" @click="handleLogin">
                <text>登录</text>
            </view>
            <!-- <view class="login-btn__register" @click="handleRegister">
          <text>注册</text>
        </view> -->
        </view>
        <!-- 用户协议 -->
        <view class="agreement">
            <view class="agreement__inner" @click="onAgreeChange">
                <view class="flex flex-wrap items-center break-words px-45rpx text-24rpx c-#808080" :class="{
                    agreement__animation: shake,
                }">
                    <uni-icons :type="isAgree ? 'checkbox-filled' : 'circle'" :color="isAgree ? '#f52523' : '#cccccc'"
                        size="32rpx" />
                    <text class="ml-10rpx">
                        登录/注册表示同意
                    </text>
                    <text class="c-#f52523" @click.stop="goToWebview()">
                        《用户服务协议》
                    </text>
                    <text>和</text>
                    <text class="c-#f52523" @click.stop="goToWebview()">
                        《隐私政策》
                    </text>
                </view>
            </view>
            <view class="agreement__placeholder" />
        </view>
    </app-container>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { navTo, pageBack } from '@/utils'
import { isPhone } from '@/utils/validate'
import { getCodeFetcher, loginPwdFetcher, mobileloginFetcher } from '@/api/index/user'

// Define types for form data and other state variables
interface FormData {
    username: string
    password: string
    code: string
}

const userStore = useUserStore()

const loginType = ref<'code' | 'password'>('code')
const formData = ref<FormData>({
    username: '',
    password: '',
    code: '',
})

const showPassword = ref<boolean>(false)
const isAgree = ref<boolean>(false)
const shake = ref<boolean>(false)

const countdown = ref<number>(60)
const codeButtonText = ref<string>('发送验证码')

function onPasswordChange(): void {
    showPassword.value = !showPassword.value
}

function handleLoginTypeChange(): void {
    formData.value.password = ''
    formData.value.code = ''
    loginType.value = loginType.value === 'password' ? 'code' : 'password'
}

function startCountdown(): void {
    countdown.value--
    if (countdown.value > 1) {
        codeButtonText.value = `重新发送(${countdown.value}s)`
        setTimeout(() => {
            startCountdown()
        }, 1000)
    } else {
        countdown.value = 60
        codeButtonText.value = '发送验证码'
    }
}

async function onSendCode(): Promise<void> {
    if (countdown.value !== 60) return
    if (!isPhone(formData.value.username)) {
        uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
        return
    }
    try {
        uni.showLoading()
        await getCodeFetcher({
            mobile: formData.value.username,
            perfix: 86,
            imgcaptcha: '',
            identifier: '',
            event: ''
        })
        uni.showToast({ title: '发送成功', icon: 'none' })
    } finally {
        startCountdown()
    }
}

// Handle login with either password or code
async function handleLogin(): Promise<void> {
    const { username, password, code } = formData.value

    if (username === '') {
        uni.showToast({ title: '请输入手机号码', icon: 'none' })
        return
    } else if (loginType.value === 'password' && password === '') {
        uni.showToast({ title: '请输入密码', icon: 'none' })
        return
    } else if (loginType.value === 'code' && code === '') {
        uni.showToast({ title: '请输入验证码', icon: 'none' })
        return
    } else if (!isAgree.value) {
        shake.value = true
        uni.showToast({ title: '请同意协议', icon: 'none' })
        return
    }

    uni.showLoading()

    // try {
    //     const res = await loginPwdFetcher({
    //         mobile: username,
    //         password,
    //         code,
    //         type: 2,
    //         client_id: appStore.clientInfo.clientid,
    //     })
    //     if (res.success) {
    //         userStore.token = res.data.token
    //         await userStore.getUserInfo()
    //         uni.removeStorageSync('USER_CODE')
    //         uni.showToast({ title: '登录成功', icon: 'success' })
    //         setTimeout(() => {
    //             uni.reLaunch({ url: '/pages/tabbar/index' })
    //         }, 1000)
    //     }
    // } finally {
    //     uni.hideLoading()
    // }
}

function onAgreeChange(): void {
    isAgree.value = !isAgree.value
}

function handleToPage(url: string): void {
    uni.navigateTo({ url })
}

function goToWebview() {
    navTo(`/pages/webview/index?url=${encodeURIComponent('')}`)
}

watch(() => shake.value, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            shake.value = false
        }, 500)
    }
})

onLoad(() => { })
</script>


<style lang="scss" scoped>
.logo {
    width: 308rpx;
    height: 70rpx;
    background-image: url('https://ydht.oss-cn-shenzhen.aliyuncs.com/jtyp-app/images/user/loginlogo.png');
    background-size: cover;
    margin: 130rpx auto;
}

.login {
    padding: 0 45rpx;
    box-sizing: border-box;

    .login__item {
        display: flex;
        align-items: center;
        height: 100rpx;
        border-bottom: 1px solid #cfcfcf;
    }

    .login__item__input {
        flex: 1;
        height: 100rpx;
        font-size: 30rpx;
        line-height: 100rpx;
    }
}

.login-btn {
    margin-top: 150rpx;
    padding: 0 40rpx;
    box-sizing: border-box;

    .login-btn__submit {
        height: 80rpx;
        margin-bottom: 30rpx;
        color: #fff;
        font-size: 30rpx;
        line-height: 80rpx;
        text-align: center;
        background: #f52523;
        border-radius: 50rpx;
    }

    .login-btn__register {
        height: calc(80rpx - 2px);
        margin-bottom: 30rpx;
        color: #f52523;
        font-size: 30rpx;
        line-height: calc(80rpx - 2px);
        text-align: center;
        border: 1px solid #f52523;
        border-radius: 50rpx;
    }
}

.agreement {
    position: fixed;
    bottom: 0;
    left: 0;

    .agreement__inner {
        padding-bottom: calc(var(--window-bottom) + 20rpx);
    }

    .agreement__animation {
        animation: shakeAnimal 800ms ease-in-out;
    }

    .agreement__placeholder {
        height: 56rpx;
        padding-bottom: var(--window-bottom);
    }
}

@keyframes shakeAnimal {

    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate3d(+2px, 0, 0);
    }

    30%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate3d(+4px, 0, 0);
    }

    50% {
        transform: translate3d(-4px, 0, 0);
    }
}
</style>
