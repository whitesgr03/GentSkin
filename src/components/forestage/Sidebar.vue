<template>
  <div>
    <div class="f-sidebar py-lg-5">
      <!-- 桌機板商品橫向選單 -->
      <div class="dropright"
      :class="{'dropright-display' : menuList === true}">
        <ul class="nav">
          <li class="nav-item">
            <button type="button" class="btn nav-link"
            @click.prevent="$bus.$emit('getCategorie', 'tops'),
            collections = 'tops'"
            :class="{ 'active': collections == 'tops' }">
              <strong>上衣</strong>
            </button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn nav-link"
            @click.prevent="$bus.$emit('getCategorie', 'bottoms'),
            collections = 'bottoms'"
            :class="{ 'active': collections == 'bottoms' }">
              <strong>下身</strong>
            </button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn nav-link"
            @click.prevent="$bus.$emit('getCategorie', 'accessories'),
            collections = 'accessories'"
            :class="{ 'active': collections == 'accessories' }">
              <strong>配件</strong>
            </button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn nav-link"
            @click.prevent="$bus.$emit('getCategorie', 'all'),
            collections = 'all'"
            :class="{ 'active': collections == 'all' }">
              <strong>ALL</strong>
            </button>
          </li>
        </ul>
      </div>
      <!-- 功能按鈕 -->
      <div class="option">
        <button type="button" class="menu"
        data-toggle="modal" data-target="#menuModal"
        @click.prevent="mobileMenu = !mobileMenu"
        :class="{'menu-active' : mobileMenu}">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </button>
        <a href="#" class="logo mt-lg-5 text-center" @click.prevent="menu = false,
        $router.push('/')">
          GentSkin
        </a>
        <ul class="nav">
          <li class="nav-item nav-item-hide d-none d-lg-block"
            :class="{'nav-item-visible': loginStatus}">
            <button
              class="btn"
              type="button"
              data-toggle="modal"
              data-target="#orderModal"
            >
            <i class="fas fa-2x fa-clipboard-list"></i>
            </button>
          </li>
          <li class="nav-item">
            <button
              class="btn position-relative"
              type="button"
              id="dropdownMenuButton"
              data-toggle="modal"
              data-target="#cartModal"
            >
              <i class="fas fa-2x fa-shopping-bag"></i>
              <span
                class="badge badge-pill badge-darkRed"
                v-if="cartAmount != 0">
                {{ cartAmount }}
              </span>
            </button>
          </li>
          <li class="nav-item d-none d-lg-block">
            <button
              class="btn"
              type="button"
              data-toggle="modal"
              data-target="#loginModal"
              v-if="!loginStatus"
            >
              <i class="far fa-2x fa-user"></i>
            </button>
            <button
              class="btn"
              type="button"
              data-toggle="modal"
              data-target="#loginOutModal"
              v-if="loginStatus"
            >
              <i class="fas fa-2x fa-user-tie"></i>
            </button>
          </li>
        </ul>
      </div>
      <!-- 桌機板導航欄 -->
      <div class="menuList d-none d-lg-block">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="menu = false,
            $router.push('/')">
              首頁
            </a>
          </li>
          <li id="menu" class="nav-item position-relative">
            <a  href="#" class="nav-link" @click.prevent="
            $router.push({ path: `/shop/all` }).catch(err => err),
            menu = true, collections = 'all', menuList = true">
              服飾
              <i class="fas fa-angle-right animated fadeInLeft text-white"
              v-if="menu"></i>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="menu = false,
            $router.push('/article')">
              主題
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="menu = false,
            $router.push('/about')">
              關於
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      loginStatus: false,
      menuList: false,
      menu: false,
      mobileMenu: false,
      product: [],
      cartAmount: 0,
      collections: '',
    };
  },

  methods: {
    getCart() {
      // 取得購物車資料
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          const getSite = sessionStorage.getItem('coupon');
          // 透過sessionStorage可以分辨網頁是第一次開啟還是從後台轉回前台
          if (getSite == null) { // 如果是第一次開啟網頁則執行以下檢查資料的動作
            if (response.data.data.carts.length === 0) {
              vm.$bus.$emit('getCart', response.data.data); // 開起網頁後如果購物車是空的就將空的資料帶入購物車Modal
            } else { // 開起網頁後如果購物車有資料就將每一筆資料清空然後再重新取得資料接著再帶給購物車Modal
              response.data.data.carts.forEach((item) => {
                const removeItem = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
                this.$http.delete(removeItem).then(() => {
                  this.$http.get(api).then((responses) => {
                    vm.$bus.$emit('getCart', responses.data.data);
                  });
                });
              });
            }
            sessionStorage.setItem('coupon', true);
          } else { // 如果是後台轉回前台 則更新商品數量並直接帶入購物車資料
            vm.cartAmount = response.data.data.carts.length;
            vm.$bus.$emit('getCart', response.data.data);
          }
        }
      });
    },
    // getCategorie(item, item2) {
    //   // 執行路由變更和商品篩選
    //   const vm = this;
    //   if (this.$router.history.current.name === 'Product') {
    //     vm.$bus.$emit('getCategorie', item, item2);
    //   } else {
    //     vm.$router.push({ path: `/shop/${item}`, query: { item: item2 } }).catch(err => err);
    //   }
    //   // vm.collections = item; // 變更sidebar分類的顯示框
    //   // vm.menu = true; // 顯示sidebar分類的箭頭動畫
    // },
  },
  mounted() {
    // 桌機板進入服飾頁面時執行
    $('#menu').hover(() => {
      // hover服飾按鈕顯示下拉選單
      if (this.$router.history.current.name === 'Product'
      || this.$router.history.current.name === 'Content') {
        this.menuList = !this.menuList;
      }
    });
    $('.dropright').hover(() => {
      // hover下拉選單持續顯示下拉選單
      if (this.$router.history.current.name === 'Product'
      || this.$router.history.current.name === 'Content') {
        this.menuList = !this.menuList;
      }
    });
  },
  created() {
    this.getCart();
    this.$bus.$on('loginStatus', (item) => {
      // modal登入執行
      this.loginStatus = item;
    });
    this.$bus.$on('updateCart', () => {
      // 更新sidbar購物車數量和Modal中購物車的商品顯示
      this.getCart();
    });
    this.$bus.$on('activeIcon', (item) => {
      // 轉移並變更路徑並且顯示分類的箭頭和按鈕加上框
      // 使用到的compent有： content 的導航欄, home 的各項分類按鈕, 手機板 modal 的分類按鈕, order 的繼續選購
      this.collections = item; // 變更sidebar分類的顯示框
      this.menu = true; // 顯示sidebar分類的箭頭
    });
    this.$bus.$on('closeIcon', () => {
      // 關閉sidebar分類的箭頭
      this.menu = false;
    });
    this.$bus.$on('closeMenu', () => {
      // 手機板漢堡選單動畫
      this.mobileMenu = false;
    });
  },
};
</script>
