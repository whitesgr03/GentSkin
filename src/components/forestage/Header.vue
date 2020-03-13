<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="main">
      <div class="header">
        <div class="row align-items-center">
          <!-- 行動版漢堡菜單 -->
          <div class="position-absolute d-flex" style="left: 15px; z-index: 1;">
            <button type="button" class="header-button" @click.prevent="mobileMenu = !mobileMenu"
            :class="{'header-button-animate' : mobileMenu}">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <!-- 行動版搜尋按鈕 -->
            <button v-if="menu" type="button" class="btn header-search"
            @click.prevent="$bus.$emit('navClass')">
              <i class="fas fa-search"></i>
            </button>
          </div>
          <!-- 回首頁logoBtn -->
          <div class="col-12 text-center py-1 p-md-0 pt-md-3">
            <div @click.prevent="linkBtn(false, 'menu')">
              <router-link to="/home" class="logo">
                  GentSkin
              </router-link>
            </div>
          </div>
          <!-- 桌機板功能按鈕 -->
          <div class="position-absolute" style= "right: 15px; z-index: 1;">
            <ul class="nav">
              <li class="nav-item nav-item-hide d-md-block d-none"
                :class="{'nav-item-visible': loginStatus}">
                <button
                  class="btn d-flex align-items-end position-relative"
                  type="button"
                  data-toggle="modal"
                  data-target="#orderModal"
                >
                <i class="fas fa-clipboard-list position-absolute"
                style="left:19px; top:20px"></i>
                <div class="icon-border"></div>
                <p>訂單</p>
                </button>
              </li>
              <li class="nav-item nav-item-hide" :class="{'nav-item-visible': loginStatus}">
                <button
                  class="btn d-flex align-items-end position-relative"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="modal"
                  data-target="#cartModal"
                >
                  <i class="fas fa-shopping-cart position-absolute"
                  style="left:15px; top:22px"></i>
                  <span
                    class="badge badge-pill badge-danger position-absolute"
                    style="top: 8px; left: 35px;"
                    v-if="cartAmount != 0"
                    >{{ cartAmount }}
                    </span>
                  <div class="icon-border"></div>
                  <p>購物車</p>
                </button>
              </li>
              <li class="nav-item nav-sign d-md-block d-none">
                <button
                  class="btn d-flex align-items-end position-relative"
                  type="button"
                  data-toggle="modal"
                  data-target="#loginModal"
                  v-if="!loginStatus"
                >
                  <i class="fas fa-user position-absolute"
                    style="left:18px; top:20px"></i>
                  <i class="fas fa-sign-in-alt position-absolute"
                  style="left:18px; top:20px"></i>
                  <div class="icon-border"></div>
                  <p class="fa-user-text">會員</p>
                  <p class="fa-sign-text">登入</p>
                </button>
                <button
                  class="btn d-flex align-items-end position-relative"
                  type="button"
                  v-if="loginStatus"
                  @click.prevent="loginOut"
                >
                  <i class="fas fa-user-tie position-absolute"
                    style="left:18px; top:20px"></i>
                  <i class="fas fa-sign-out-alt position-absolute"
                  style="left:18px; top:20px"></i>
                  <div class="icon-border"></div>
                  <p class="fa-user-text">會員</p>
                  <p class="fa-sign-text">登出</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
    </div>
    <div class="navBar" :class="{'navBar-animate' : mobileMenu}">
      <!-- 桌機板隱藏式回首頁按鈕 -->
      <div class="position-absolute d-md-block d-none"
        style="left: 15px; z-index: 1;" @click.prevent="linkBtn(false, 'menu')">
        <router-link to="/home" class="logo logoHide">
            GentSkin
        </router-link>
      </div>
      <div class="row align-items-center m-0">
        <!-- 行動板登入登出按鈕 -->
        <div class="col-6 d-md-none p-0 navBar-transition"
        :class="{'col-12': !loginStatus}">
          <button
          class="w-100 navBar-btn"
          type="button"
          v-if="!loginStatus"
          data-toggle="modal"
          data-target="#loginModal">
          <i class="fas fa-user"></i>
          登入
          </button>
          <button
          class="w-100 navBar-btn"
          type="button"
          v-if="loginStatus"
          @click.prevent="loginOut">
          <i class="fas fa-user-tie"></i>
          登出
          </button>
        </div>
        <!-- 行動版查詢訂單按鈕 -->
        <div class="col-6 d-md-none p-0 position-absolute navBar-transition"
        style="top: 0; right: 0;" :class="{'navBar-btn-hide': !loginStatus}">
          <button
            class="w-100 navBar-btn"
            type="button"
            data-toggle="modal"
            data-target="#orderModal">
            訂單
          </button>
        </div>
        <!-- 導航欄 -->
        <div class="col-12 p-0">
          <ul class="nav justify-content-md-center">
            <li class="nav-item d-none d-md-block" @click.prevent="linkBtn(false, 'menu')">
              <router-link to="/"
              class="nav-link nav-underline position-relative">
                首頁
              </router-link>
            </li>
            <li id="menu" class="nav-item" @click.prevent="linkBtn(true)">
              <router-link to="/shop"
              class="nav-link nav-underline position-relative">
                服飾
                <i class="fas fa-angle-down position-absolute animated fadeInLeft
                  d-md-block d-none"
                  style="right:-8px; top:12px;"
                  v-if="menu"></i>
              </router-link>
            </li>
            <li class="nav-item" @click.prevent="linkBtn(false, 'menu')">
              <router-link to="/article" class="nav-link nav-underline">
                主題
              </router-link>
            </li>
            <li class="nav-item" @click.prevent="linkBtn(false, 'menu')">
              <router-link to="/about" class="nav-link nav-underline">
                關於
              </router-link>
            </li>
          </ul>
        </div>
        <!-- 桌機板商品下拉選單 -->
        <div class="menu position-absolute bg-dark d-md-block d-none"
        style="top:57px; left:0; right:0;" :class="{'menu-display' : menuList === true}">
          <div class="warrp">
            <ul class="nav flex-column">
              <li class="nav-item">
                <button type="button" @click.prevent="getCategorie('')"
                :class="{ 'active': categorie == '' }">
                  <strong>ALL</strong>
                </button>
              </li>
            </ul>
            <ul class="nav flex-column">
              <li class="nav-item">
                <button type="button" @click.prevent="getCategorie('上衣')"
                :class="{ 'active': categorie == '上衣' }">
                  <strong>上衣</strong>
                </button>
              </li>
              <li class="nav-item">
                <button type="button"  @click.prevent="getCategorie('短 TEE')"
                :class="{ 'active': categorie == '短 TEE' }">
                  短 TEE
                </button>
              </li>
              <li class="nav-item">
                <button type="button" @click.prevent="getCategorie('襯衫')"
                :class="{ 'active': categorie == '襯衫' }">
                  襯衫
                </button>
              </li>
              <li class="nav-item">
                <button type="button" @click.prevent="getCategorie('外套')"
                :class="{ 'active': categorie == '外套' }">
                  外套
                </button>
              </li>
            </ul>
            <ul class="nav flex-column">
              <li class="nav-item">
                <button type="button" @click.prevent="getCategorie('下身')"
                :class="{ 'active': categorie == '下身' }">
                  <strong>下身</strong>
                </button>
              </li>
              <li class="nav-item">
                <button type="button" @click.prevent="getCategorie('長褲')"
                :class="{ 'active': categorie == '長褲' }">
                  長褲
                </button>
              </li>
              <li class="nav-item">
                <button type="button" @click.prevent="getCategorie('西裝褲')"
                :class="{ 'active': categorie == '西裝褲' }">
                  西裝褲
                </button>
              </li>
              <li class="nav-item">
                <button type="button" @click.prevent="getCategorie('牛仔褲')"
                :class="{ 'active': categorie == '牛仔褲' }">
                  牛仔褲
                </button>
              </li>
            </ul>
            <ul class="nav flex-column">
              <li class="nav-item">
                <button type="button" @click.prevent="getCategorie('配件')"
                :class="{ 'active': categorie == '配件' }">
                  <strong>配件</strong>
                </button>
              </li>
              <li class="nav-item">
                <button type="button" @click.prevent="getCategorie('帽子')"
                :class="{ 'active': categorie == '帽子' }">
                  帽子
                </button>
              </li>
              <li class="nav-item">
                <button type="button" @click.prevent="getCategorie('包包')"
                :class="{ 'active': categorie == '包包' }">
                  包包
                </button>
              </li>
              <li class="nav-item">
                <button type="button" @click.prevent="getCategorie('鞋類')"
                :class="{ 'active': categorie == '鞋類' }">
                  鞋類
                </button>
              </li>
            </ul>
          </div>
        </div>
        <!-- 桌機板搜尋欄 -->
        <div class="search position-absolute d-md-block d-none" style="right: 80px;"
          :class="{'search-hide' : menu === false}">
            <div class="search-border">
              <input type="text"
                class="form-control"
                placeholder="Search..."
                v-model="search"
                @keydown.enter="getSearch()"
                >
              <button type="button" class="search-button position-absolute"
                @click.prevent="getSearch()"
                style="right: 0px; top: 8px;">
                <i class="fas fa-search"></i>
              </button>
            </div>
        </div>
        <!-- 桌機板隱藏式購物車按鈕 -->
        <div class="position-absolute d-md-block d-none"
          style="right:10px; z-index: 1;" v-if="loginStatus">
          <button
            class="btn logoHide animated"
            type="button"
            data-toggle="modal"
            data-target="#cartModal"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-cart-plus fa-2x position-relative">
              <span
                class="badge badge-pill badge-danger position-absolute"
                style=" top:-5px; right:-15px; font-size: 1rem;"
                v-if="cartAmount != 0">
                {{ cartAmount }}
              </span>
            </i>
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      isDisable: false,
      isLoading: false,
      loginStatus: false,
      menuList: false,
      menu: false,
      mobileMenu: false,
      cart: [],
      cartAmount: 0,
      search: '',
      categorie: '',
    };
  },

  methods: {
    getCart() {
      // 取得購物車資料
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.cart = response.data.data;
          vm.cartAmount = response.data.data.carts.length;
          vm.$bus.$emit('getCart', vm.cart);
        }
      });
    },
    loginOut() {
      // 登出
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          setTimeout(() => {
            vm.isLoading = false;
            if (vm.$router.history.current.name === 'Check'
            || vm.$router.history.current.name === 'Order') {
              vm.$router.push('/');
            }
            vm.loginStatus = false;
            // vm.$emit('getcartItem');
            vm.$bus.$emit('alert', '您已成功登出！');
          }, 2000);
        }
      });
    },
    getSearch() {
      // 執行搜尋功能
      const vm = this;
      setTimeout(() => {
        vm.$bus.$emit('filterItem', vm.search);
        if (vm.search !== '') {
          $('html, body').animate({ scrollTop: 0 }, 1);
        }
      }, 200);
    },
    getCategorie(item) {
      // 執行產品篩選
      const vm = this;
      vm.$bus.$emit('filterItem', item, 'categorie');
      vm.categorie = item;
    },
    linkBtn(item, i) {
      // 行動版換頁面時關閉選單並清空搜尋欄
      // 桌機板換頁面時將選單隱藏並清空搜尋欄
      const vm = this;
      if (i === 'menu') {
        vm.menuList = item;
        vm.menu = item;
        vm.search = '';
      } else {
        vm.mobileMenu = false;
        vm.menuList = item;
        vm.menu = item;
      }
    },
    getLocation() {
      // 點選位置移動到地圖
      const vm = this;
      vm.$router.push('/');
      $('.navBar').removeClass('navBar-animate');
      $('.header-button').removeClass('header-button-animate');
      setTimeout(() => {
        const target = $('#location').offset().top;
        $('html, body').animate({ scrollTop: target - 55 }, 500);
      }, 200);
    },
    navbarAnimate() {
      // 捲動視窗改變navBar
      const scrollPos = $(window).scrollTop();
      if (scrollPos >= 50) {
        // 螢幕最頂端超過50px後執行
        $('.header').addClass('display'); // 桌機板header消失
        $('.navBar').addClass('position'); // 桌機板navBar置頂
        $('.logoHide').addClass('logoShow'); // 桌機板顯示隱藏logo
      } else {
        $('.header').removeClass('display');
        $('.navBar').removeClass('position');
        $('.logoHide').removeClass('logoShow');
      }
    },
  },
  mounted() {
    // focus搜尋欄時加入動畫
    $('.form-control').focusin(() => {
      $('.search').addClass('search-border-LR');
      $('.search-border').addClass('search-border-TB');
    });
    $('.form-control').focusout(() => {
      $('.search').removeClass('search-border-LR');
      $('.search-border').removeClass('search-border-TB');
    });
    // 桌機板進入服飾頁面時執行
    $('#menu').hover(() => {
      // hover服飾按鈕顯示下拉選單
      if (this.$router.history.current.name === 'Product') {
        this.menuList = !this.menuList;
      }
    });
    $('.menu').hover(() => {
      // hover下拉選單持續顯示下拉選單
      if (this.$router.history.current.name === 'Product') {
        this.menuList = !this.menuList;
      }
    });
  },
  beforeCreate() {
    const vm = this;
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    vm.$http.post(api).then((response) => {
      if (response.data.success) {
        vm.loginStatus = true;
      } else if (!response.data.success) {
        vm.loginStatus = false;
      }
    });
  },
  created() {
    // this.getCart();
    // window.addEventListener('scroll', this.navbarAnimate);
    // this.$bus.$on('login', () => {
    //   this.loginStatus = true;
    // });
    // this.$bus.$on('getAmount', () => {
    //   this.getCart();
    // });
    // this.$bus.$on('menu', (item, i) => {
    //   this.linkBtn(item, i);
    // });
  },
};
</script>
