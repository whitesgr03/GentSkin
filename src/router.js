import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    // 前台
    {
      path: '*', // 避免用戶輸入不存在的路徑
      redirect: '/', // 將重新導向首頁
    },
    {
      path: '/',
      component: () => import('@/views/Index.vue'),
      // 前台主頁
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('@/views/forestage/Home.vue'),
          // 首頁
        },
        {
          path: 'article',
          name: 'Article',
          component: () => import('@/views/forestage/Article.vue'),
          // 主題文章
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('@/views/forestage/About.vue'),
          // 關於我
        },
        {
          path: 'helper',
          name: 'Helper',
          component: () => import('@/views/forestage/Helper.vue'),
          // 問題服務
        },
        {
          path: 'contact',
          name: 'Contact',
          component: () => import('@/views/forestage/Contact.vue'),
          // 聯絡資訊
        },
        {
          path: 'shop/:item',
          name: 'Product',
          component: () => import('@/views/forestage/Product.vue'),
          // 商品列表
        },
        {
          path: 'content/:mainItem/:item',
          name: 'Content',
          component: () => import('@/views/forestage/Content.vue'),
          // 商品內容
        },
        {
          path: 'order',
          name: 'Order',
          component: () => import('@/views/forestage/Order.vue'),
          meta: { requiresLogin: true },
          // 產品訂單
        },
        {
          path: 'check',
          name: 'Check',
          component: () => import('@/views/forestage/Check.vue'),
          // 訂單明細
        },
      ],
    },

    // 登入
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
    },

    // 後台
    {
      path: '/admin',
      component: () => import('@/views/Dashboard.vue'),
      // 後台主頁
      children: [
        {
          path: 'products',
          name: 'Products',
          component: () => import('@/views/backstage/Products.vue'),
          // 商品新增修改
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          // 客戶訂單查詢修改
          component: () => import('@/views/backstage/Orders.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          // 優惠碼新增修改
          component: () => import('@/views/backstage/Coupons.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 300);
    });
  },
});
