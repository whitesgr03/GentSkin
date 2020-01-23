import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    // 前台
    {
      path: '*', // 避免用戶輸入不存在的路徑
      redirect: '/', // 將重新導向login頁面
    },
    {
      path: '/', // 虛擬路徑
      component: () => import('@/views/Index.vue'), // 對應的vue檔名稱
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('@/views/forestage/Home.vue'),
          // 首頁
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('@/views/forestage/About.vue'),
          meta: { requiresLogin: true },
          // 關於
        },
        {
          path: 'article',
          name: 'Article',
          component: () => import('@/views/forestage/Article.vue'),
          // 關於我
        },
        {
          path: 'shop',
          name: 'Product',
          component: () => import('@/views/forestage/Product.vue'),
          // 產品列表
        },
        {
          path: 'content/:id',
          name: 'Content',
          component: () => import('@/views/forestage/Content.vue'),
          // 產品內容
        },
        {
          path: 'order',
          name: 'Order',
          component: () => import('@/views/forestage/Order.vue'),
          meta: { requiresLogin: true },
          // 產品訂單
        },
        {
          path: 'check/:orderId',
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
      children: [
        {
          path: 'products',
          name: 'Products',
          component: () => import('@/views/backstage/Products.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: () => import('@/views/backstage/Orders.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: () => import('@/views/backstage/Coupons.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },

    {
      path: '/customer',
      name: 'Customer',
      component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'orders',
          name: 'CustomerOrder',
          component: () => import('@/views/backstage/CustomerOrder.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'check/:orderId', // 對應CustomerCheck中的this.$route.params.orderId;
          name: 'CustomerCheck',
          component: () => import('@/views/backstage/CustomerCheck.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
