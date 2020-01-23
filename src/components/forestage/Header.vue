<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="header">
      <!-- <div class="d-flex justify-content-center">
        <router-link to="/admin/products">
          <i class="fas fa-user-tie fa-lg"></i>
        </router-link>
      </div> -->
        <div class="row align-items-center">
          <div class="position-absolute d-flex" style="left: 15px; z-index: 1;">
            <button type="button" class="header-button" @click.prevent="btnAnimate">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <button v-if="menu === true" type="button" class="btn header-search"
            @click.prevent="searchAnimate">
              <i class="fas fa-search"></i>
            </button>
          </div>
          <div class="search position-absolute d-md-none"
          :class="{ 'search-display': moveData == true}"
            style="right: 20%; bottom: -50px;">
            <div class="search-border">
              <input type="text"
                class="form-control"
                placeholder="Search..."
                v-model="search"
                @keydown="searchButton"
                >
            </div>
          </div>
          <div class="col-12 text-center p-0">
            <router-link to="/home" class="logo">
              GentSkin
            </router-link>
          </div>
          <div class="position-absolute" style="right: 15px; z-index: 1;">
            <ul class="nav">
              <li class="nav-item nav-item-hide d-md-block d-none"
                :class="{'nav-item-visible': navSignin}">
                <button
                  class="btn d-flex align-items-end position-relative"
                  type="button"
                  data-toggle="modal"
                  data-target="#orderModal"
                  @click="$emit('order')"
                >
                <i class="fas fa-clipboard-list position-absolute"
                style="left:18px; top:20px"></i>
                <div class="icon-border"></div>
                <p>訂單</p>
                </button>
              </li>
              <li class="nav-item nav-item-hide" :class="{'nav-item-visible': navSignin}">
                <button
                  class="btn d-flex align-items-end position-relative"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="modal"
                  data-target="#cartModal"
                >
                  <i class="fas fa-shopping-cart position-absolute"
                  style="left:12px; top:20px"></i>
                  <span
                    class="badge badge-pill badge-danger position-absolute"
                    style="top: 8px; left: 30px;"
                    v-if="navCartItem != 0"
                    >{{ navCartItem }}
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
                  v-if="!navSignin"
                >
                  <i class="fas fa-user position-absolute"
                    style="left:16px; top:20px"></i>
                  <i class="fas fa-sign-in-alt position-absolute"
                  style="left:14px; top:18px"></i>
                  <div class="icon-border"></div>
                  <p class="fa-user-text">會員</p>
                  <p class="fa-sign-text">登入</p>
                </button>
                <button
                  class="btn d-flex align-items-end position-relative"
                  type="button"
                  v-if="navSignin"
                  @click.prevent="loginOut"
                >
                  <i class="fas fa-user-tie position-absolute"
                    style="left:16px; top:20px"></i>
                  <i class="fas fa-sign-out-alt position-absolute"
                  style="left:16px; top:18px"></i>
                  <div class="icon-border"></div>
                  <p class="fa-user-text">會員</p>
                  <p class="fa-sign-text">登出</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
    </div>
    <div class="navBar">
      <div class="row align-items-center m-0">
        <div class="position-absolute d-md-block d-none"
          style="left: 15px; z-index: 1;">
          <router-link to="/home" class="logo logoHide">
              GentSkin
          </router-link>
        </div>
        <div class="col-6 d-md-none p-0 navBar-transition"
        :class="{'col-12': !navSignin}">
          <button
          class="w-100 navBar-btn"
          type="button"
          v-if="!navSignin"
          data-toggle="modal"
          data-target="#loginModal">
          <i class="fas fa-user"></i>
          登入
          </button>
          <button
          class="w-100 navBar-btn"
          type="button"
          v-if="navSignin"
          @click.prevent="loginOut">
          <i class="fas fa-user-tie"></i>
          登出
          </button>
        </div>
        <div class="col-6 d-md-none p-0 position-absolute navBar-transition"
        style="top: 0; right: 0;"
        :class="{'navBar-btn-hide': !navSignin}">
          <button
            class="w-100 navBar-btn"
            type="button"
            data-toggle="modal"
            data-target="#orderModal"
            @click="$emit('order')">
            訂單
          </button>
        </div>
        <div class="col-12 p-0">
          <ul class="nav justify-content-md-center">
            <li id="menu" class="nav-item">
              <router-link to="/shop" class="nav-link nav-underline position-relative">
                服飾
                <i class="fas fa-angle-down position-absolute animated fadeInLeft
                  d-md-block d-none"
                  style="right:-8px; top:15px;"
                  v-if="menu === true"></i>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link nav-underline">
                關於
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/article" class="nav-link nav-underline">
                主題
              </router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link nav-underline"
              @click.prevent="map">
                位置
              </a>
            </li>
          </ul>
        </div>
        <div class="menu position-absolute bg-dark d-md-block d-none"
        style="top:61px; left:0; right:0;"
          v-if="menu === true">
          <div class="warrp">
            <ul class="nav flex-column">
              <li class="nav-item">
                <button type="button" @click.prevent="$emit('menuItem', '')"
                :class="{ 'active': categorie == '' }">
                  <strong>ALL</strong>
                </button>
              </li>
            </ul>
            <ul class="nav flex-column">
              <li class="nav-item">
                <button type="button" @click.prevent="$emit('menuItem', '上衣')"
                :class="{ 'active': categorie == '上衣' }">
                  <strong>上衣</strong>
                </button>
              </li>
              <li class="nav-item">
                <button type="button">
                  短 TEE
                </button>
              </li>
              <li class="nav-item">
                <button type="button">
                  襯衫
                </button>
              </li>
              <li class="nav-item">
                <button type="button">
                  外套
                </button>
              </li>
            </ul>
            <ul class="nav flex-column">
              <li class="nav-item">
                <button type="button" @click.prevent="$emit('menuItem', '下身')"
                :class="{ 'active': categorie == '下身' }">
                  <strong>下身</strong>
                </button>
              </li>
              <li class="nav-item">
                <button type="button">
                  長褲
                </button>
              </li>
              <li class="nav-item">
                <button type="button">
                  西裝褲
                </button>
              </li>
              <li class="nav-item">
                <button type="button">
                  牛仔褲
                </button>
              </li>
            </ul>
            <ul class="nav flex-column">
              <li class="nav-item">
                <button type="button" @click.prevent="$emit('menuItem', '配件')"
                :class="{ 'active': categorie == '配件' }">
                  <strong>配件</strong>
                </button>
              </li>
              <li class="nav-item">
                <button type="button">
                  帽子
                </button>
              </li>
              <li class="nav-item">
                <button type="button">
                  包包
                </button>
              </li>
              <li class="nav-item">
                <button type="button">
                  鞋類
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="search position-absolute d-md-block d-none" style="right: 80px;"
          v-if="menu === true">
            <div class="search-border">
              <input type="text"
                class="form-control"
                placeholder="Search..."
                v-model="search"
                @keydown="searchButton"
                >
              <button type="button" class="search-button position-absolute"
                @click.prevent="searchButton('click')"
                style="right: 0px; top: 5px;">
                <i class="fas fa-search"></i>
              </button>
            </div>
        </div>
        <div class="position-absolute d-md-block d-none"
          style="right:10px; z-index: 1;" v-if="navSignin">
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
                v-if="navCartItem != 0">
                {{ navCartItem }}
              </span>
            </i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  props: ['navCartItem', 'menu', 'categorie', 'moveData', 'navSignin', 'orderButton'],
  data() {
    return {
      isDisable: false,
      isLoading: false,
      accountData: [],
      num: 0,
      loginText: '',
      search: '',
      animate: false,
    };
  },

  methods: {
    searchButton(type) {
      const vm = this;
      setTimeout(() => {
        vm.$emit('searchInput', vm.search);
        if (type === 'click') {
          vm.search = '';
        }
      }, 200);
    },
    searchAnimate() {
      const vm = this;
      const scrollPos = $(window).scrollTop();
      $('.header-button').removeClass('header-button-animate');
      $('.navBar').removeClass('navBar-animate');
      if (scrollPos > 50 && vm.animate === false) {
        $('html, body').animate({ scrollTop: 0 }, 200);
      }
      if (vm.animate === vm.moveData) {
        vm.animate = !vm.animate;
        vm.$emit('move', vm.animate);
      } else {
        vm.animate = true;
        vm.$emit('move', vm.animate);
      }
    },
    loginOut() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api).then((response) => {
        if (response.data.success && response.data.data.carts !== 0) {
          response.data.data.carts.forEach((item) => {
            const Api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
            vm.$http.delete(Api).then(() => {});
          });
        }
      });
      vm.accountData = JSON.parse(sessionStorage.getItem('myAccount'));
      const verify = vm.accountData.filter(item => item.login === true);
      verify[0].login = false;
      sessionStorage.removeItem('myAccount');
      sessionStorage.setItem('myAccount', JSON.stringify(vm.accountData));
      setTimeout(() => {
        vm.isLoading = false;
        if (vm.$router.history.current.name === 'Check'
        || vm.$router.history.current.name === 'Order') {
          vm.$router.push('/');
        }
        vm.$emit('signIn', false);
        vm.$emit('cartData');
        this.$bus.$emit('alert', '您已成功登出！');
      }, 2000);
    },
    map() {
      const vm = this;
      vm.$router.push('/');
      $('.navBar').removeClass('navBar-animate');
      $('.header-button').removeClass('header-button-animate');
      setTimeout(() => {
        const target = $('#location').offset().top;
        $('html, body').animate({ scrollTop: target - 55 }, 500);
      }, 1);
    },
    btnAnimate() {
      const vm = this;
      vm.animate = false;
      vm.$emit('move', vm.animate);
      $('.header-button').toggleClass('header-button-animate');
      $('.navBar').toggleClass('navBar-animate');
    },
    payment() {
      $('#cartModal').modal('hide');
      const vm = this;
      vm.$router.push('/order');
      $('html, body').animate({ scrollTop: 0 }, 1);
    },
    navbarAnimate() {
      const scrollPos = $(window).scrollTop();
      if (scrollPos >= 50) {
        $('.header').addClass('display');
        $('.navBar').addClass('position');
        $('.logoHide').addClass('logoShow').addClass('swing');
        $('.search-display').addClass('search-hide');
      } else {
        $('.header').removeClass('display');
        $('.navBar').removeClass('position');
        $('.logoHide').removeClass('logoShow').removeClass('swing');
        $('.search-display').removeClass('search-hide');
      }
    },
  },
  mounted() {
    $('.form-control').focusin(() => {
      $('.search').addClass('search-border-LR');
      $('.search-border').addClass('search-border-TB');
    });
    $('.form-control').focusout(() => {
      $('.search').removeClass('search-border-LR');
      $('.search-border').removeClass('search-border-TB');
    });
    $('#menu').hover(() => {
      const width = $(window).width();
      if (width > 1024) {
        $('.menu').toggleClass('menu-display');
      }
    });
    $('.menu').hover(() => {
      $('.menu').toggleClass('menu-display');
    });
    $('#menu').click(() => {
      const width = $(window).width();
      if (width >= 768 && width <= 1024) {
        $('.menu').toggleClass('menu-display');
      }
    });
  },
  created() {
    window.addEventListener('scroll', this.navbarAnimate);
  },
};
</script>
