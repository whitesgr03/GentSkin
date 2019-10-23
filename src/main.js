// npm 第三方套件內容
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay' //全螢幕讀取動畫
import 'vue-loading-overlay/dist/vue-loading.css' //全螢幕讀取動畫的CSS
import 'bootstrap' //載入bootstrap套件
import VeeValidate from 'vee-validate' //驗證功能
import zhTW from 'vee-validate/dist/locale/zh_TW' //驗證功能中文化
import VueI18n from 'vue-i18n'
import Animate from 'animate.css/animate.min.css'
import 'swiper/dist/css/swiper.min.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import VueClipboard from 'vue-clipboard2'

//自定義 套件內容
import App from './App.vue'
import router from './router'
import './bus'
import currencyFilter from './filters/currency'
import dateFilter from './filters/date'

Vue.config.productionTip = false

//全域方式啟用
Vue.use(VueAxios, axios)
Vue.use(VueI18n)
Vue.use(Animate)
Vue.use(VueClipboard)
AOS.init()

Vue.component('Loading', Loading) //全螢幕讀取動畫
Vue.filter('currency', currencyFilter) //千分號
Vue.filter('date', dateFilter) //日期轉換

axios.defaults.withCredentials = true //跨域請求攜帶Cookie

const i18n = new VueI18n({
  //VeeValidate中文語系
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
})

new Vue({
  i18n, //使用中文語系
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')

new Vue({
  router,
  components: { App },
  template: '<App/>'
})

router.beforeResolve((to, from, next) => {
  //頁面登入驗證
  console.log('目前從', from.name, '頁面,轉移到', to.name, '頁面')
  if (to.meta.requiresAuth) {
    //如果要to的頁面有meta.requiresAuth的變數為ture的話就執行
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check` //api路徑
    axios.post(api).then(response => {
      //使用axios將變數傳入後端伺服器
      // console.log(response.data);
      if (response.data.success) {
        //如果成功的話 將頁面從from(Login頁面)轉移到next(products，Login頁面轉移的設定)
        console.log('登入驗證通過')
        next()
      } else {
        //如果驗證不成功的話 停留在Login頁面
        console.log('登入驗證未通過')
        next({
          path: '/login'
        })
      }
    })
  } else {
    //如果不需要查看meta.requiresAuth的變數就直接放行轉移頁面
    next()
  }
})
