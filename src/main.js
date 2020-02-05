// npm 第三方套件內容
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay'; //  全螢幕讀取動畫
import 'vue-loading-overlay/dist/vue-loading.css'; //  全螢幕讀取動畫的CSS
import 'bootstrap'; //  載入bootstrap套件
import { extend } from 'vee-validate'; // 驗證規則
import * as rules from 'vee-validate/dist/rules'; // 驗證規則
import zhTW from 'vee-validate/dist/locale/zh_TW.json'; //  驗證規則中文化
import Animate from 'animate.css/animate.min.css'; // CSS動畫套件
import 'swiper/css/swiper.css'; //  輪播套件

//  自定義 套件內容 .
import App from './App.vue';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.config.productionTip = false;

//  全域方式啟用
Vue.use(VueAxios, axios);
Vue.use(Animate);


Object.keys(rules).forEach((rule) => { // 取的所有驗證規則
  extend(rule, {
    ...rules[rule],
    message: zhTW.messages[rule], // 將規則 message 中文化
  });
});

Vue.component('Loading', Loading); //  全螢幕讀取動畫
Vue.filter('currency', currencyFilter); //  千分號
Vue.filter('date', dateFilter); //  日期轉換

axios.defaults.withCredentials = true; //  跨域請求攜帶Cookie

new Vue({
  el: '#app',
  router,
  components: {
    App,
  },
  template: '<App/>',
  render: h => h(App),
}).$mount('#app');

router.beforeResolve((to, from, next) => {
  //  頁面登入驗證
  // console.log('目前從', from.name, '頁面,轉移到', to.name, '頁面');
  // console.log('目前從', from, '頁面,轉移到', to, '頁面', next);
  if (to.meta.requiresAuth) {
    //  如果要to的頁面有meta.requiresAuth的變數為ture的話就執行
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      //  console.log(response.data);
      if (response.data.success) {
        //  如果成功的話 將頁面從from(Login頁面)轉移到next(products，Login頁面轉移的設定)
        //  console.log('登入驗證通過')
        next();
      } else {
        //  console.log('登入驗證未通過')
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
