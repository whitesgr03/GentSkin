import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    //前台
    {
      path: '*', //避免用戶輸入不存在的路徑
      redirect: '/' //將重新導向login頁面
    },
    {
      path: '/', //虛擬路徑
      component: () => import('@/views/Home.vue'), //對應的vue檔名稱
      children: [
        {
          path: '/',
          name: 'Mainshop',
          component: () => import('@/views/forestage/Mainshop.vue')
          // 首頁
        },
        {
          path: 'about',
          name: 'ShopAboutUs',
          component: () => import('@/views/forestage/ShopAbout.vue')
          // 關於
        },
        {
          path: 'journal',
          name: 'ShopJournal',
          component: () => import('@/views/forestage/ShopJournal.vue')
          // 關於我
        },
        {
          path: 'shop',
          name: 'ShopProducts',
          component: () => import('@/views/forestage/ShopProducts.vue')
          // 產品列表
        },
        {
          path: 'content/:itemId',
          name: 'ShopContent',
          component: () => import('@/views/forestage/ShopContent.vue')
          // 產品內容
        },
        {
          path: 'order',
          name: 'ShopOrder',
          component: () => import('@/views/forestage/ShopOrder.vue')
          // 產品訂單
        },
        {
          path: 'check/:orderId',
          name: 'ShopCheck',
          component: () => import('@/views/forestage/ShopCheck.vue')
          // 訂單明細
        }
      ]
    },
    // {
    //   path: '/product',
    //   name: 'product',
    //   component: () => import('@/views/product.vue'),
    //   children: [

    //   ]
    // },

    // {
    //   path: '/payment',
    //   name: 'PayMent',
    //   component: () => import('@/views/Home.vue'),
    //   children: [

    //   ]
    // },

    //登入
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },

    //後台
    {
      path: '/admin',
      component: () => import('@/views/Dashboard.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/backstage/Products.vue'),
          meta: { requiresAuth: true } //進入此頁面時需要驗證的變數
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('@/views/backstage/Products.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'orders',
          name: 'Orders',
          component: () => import('@/views/backstage/Orders.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: () => import('@/views/backstage/Coupons.vue'),
          meta: { requiresAuth: true }
        }
      ]
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
          meta: { requiresAuth: true }
        },
        {
          path: 'check/:orderId', //對應CustomerCheck中的this.$route.params.orderId;
          name: 'CustomerCheck',
          component: () => import('@/views/backstage/CustomerCheck.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
