<template>
  <view
    class="app-container"
    :style="[
      backgroundColor ? { backgroundColor: transparent ? '' : backgroundColor } : '',
      backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : '',
    ]"
  >
    <slot name="default" />
  </view>
</template>

<script setup lang="ts">
/**
 * app 容器
 * @description 根节点容器
 */
import { getCurrentInstance, onMounted, provide, ref } from 'vue'
// import { useRouterAfter } from '@/utils/router'

const props = defineProps({
  /**
   * 容器的背景颜色
   */
  backgroundColor: {
    type: String,
    default: '#ffffff',
  },
  /**
   * 容器的背景图片
   */
  backgroundImage: {
    type: String,
    default: '',
  },
  /**
   * 是否透明背景
   */
  transparent: {
    type: [Boolean, String],
    default: false,
  },
  /**
   * 导航
   */
  navbar: {
    type: Object,
    default: () => {
      return {
        background: '',
        fontColor: '',
      }
    },
  },
})
// const proxy = getCurrentInstance()?.proxy ?? null
// 当前页面
// const currentPage = getCurrentPages().pop()
// 本页面是否是taBar页面
// let isTabBarPage = false

// 初始化
function onInit() {
  /**
   * 读取pages.json中的tabbar页面列表
   */
  // const barLit = uni.$app.tabBar?.list ?? []
  // for (let i = 0; i < barLit.length; i++) {
  //   if (currentPage?.route === barLit[i].pagePath) {
  //     isTabBarPage = true
  //     break
  //   }
  // }
  setAppStyle()
}
// 设置 app 样式
function setAppStyle() {
  // #ifdef H5
  document.body.style.background = props.backgroundColor || ''
  // #endif

  // #ifdef APP
  if (plus?.webview?.currentWebview()?.setStyle) {
    plus.webview.currentWebview().setStyle({
      background: props.backgroundColor, // 窗口的背景颜色
      backgroundColorTop: props.backgroundColor, // 窗口顶部背景颜色值
      backgroundColorBottom: props.backgroundColor, // 窗口底部背景颜色
      userSelect: true, // 用户是否可选择内容
      webviewBGTransparent: true, // webview的背景是否透明
    })
  }
  // #endif

  // try {
  //   if (isTabBarPage) {
  //     uni.setTabBarStyle({
  //       backgroundColor: props.navbar.background,
  //       borderStyle: 'white',
  //       color: props.navbar.fontColor,
  //       selectedColor: uni.$app.tabBar.selectedColor,
  //     }).catch(() => {})
  //   }
  // } catch (error) {
  //   console.log('error --->', error)
  // }
}

// onLoad((opts) => {
//   try {
//     useRouterAfter({
//       path: currentPage?.route ?? '',
//       opts,
//       context: proxy ?? null,
//     })
//   } catch (error) {
//     console.log('error --->', error)
//   }
// })

onMounted(() => {
  onInit()
})
</script>

<style>
.app-container {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100%;
  background-attachment: fixed;
  background-position: 0px 0px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
