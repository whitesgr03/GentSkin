<template>
  <div>
    <div class="f-sidebar py-lg-5">
      <!-- 桌機板商品橫向選單 -->
      <div class="dropright"
      :class="{'dropright-display' : menuList === true}">
        <ul class="nav">
          <li class="nav-item">
            <button type="button" class="btn nav-link"
            @click.prevent="activeIcon(true, 'tops'),
            $router.push({ path: `/shop/tops` }).catch(err => err)"
            :class="{ 'active': menuIcon == 'tops' }">
              <strong>上衣</strong>
            </button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn nav-link"
            @click.prevent="activeIcon(true, 'bottoms'),
            $router.push({ path: `/shop/bottoms` }).catch(err => err)"
            :class="{ 'active': menuIcon == 'bottoms' }">
              <strong>下身</strong>
            </button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn nav-link"
            @click.prevent="activeIcon(true, 'accessories'),
            $router.push({ path: `/shop/accessories` }).catch(err => err)"
            :class="{ 'active': menuIcon == 'accessories' }">
              <strong>配件</strong>
            </button>
          </li>
          <li class="nav-item">
            <button type="button" class="btn nav-link"
            @click.prevent="activeIcon(true, 'all'),
            $router.push({ path: `/shop/all` }).catch(err => err)"
            :class="{ 'active': menuIcon == 'all' }">
              <strong>ALL</strong>
            </button>
          </li>
        </ul>
      </div>
      <!-- 功能按鈕 -->
      <div class="option">
        <button type="button" class="menu"
        data-toggle="modal" data-target="#menuModal"
        @click.prevent="mobileMenuClose"
        :class="{'menu-active' : mobileMenu}">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </button>
        <a href="#" class="logo mt-lg-5 text-center"
        @click.prevent="activeIcon(false, ''),
        $router.push('/').catch(err => err)">
          GentSkin
        </a>
        <ul class="nav">
          <li class="nav-item nav-item-hide d-none d-lg-block"
            :class="{'nav-item-visible': login}">
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
                v-if="cartAmout !== 0">
                {{ cartAmout }}
              </span>
            </button>
          </li>
          <li class="nav-item d-none d-lg-block">
            <button
              class="btn"
              type="button"
              data-toggle="modal"
              data-target="#loginModal"
              v-if="!login"
            >
              <i class="far fa-2x fa-user"></i>
            </button>
            <button
              class="btn"
              type="button"
              data-toggle="modal"
              data-target="#loginOutModal"
              v-if="login"
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
            <a href="#" class="nav-link" @click.prevent="activeIcon(false, ''),
            $router.push('/').catch(err => err)">
              首頁
            </a>
          </li>
          <li id="menu" class="nav-item position-relative">
            <a  href="#" class="nav-link" @click.prevent="
            $router.push({ path: `/shop/all` }).catch(err => err),
            activeIcon(true, 'all'), menuList = true">
              服飾
              <i class="fas fa-angle-right animated fadeInLeft text-white"
              v-if="arrowIcon"></i>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="activeIcon(false, ''),
            $router.push('/article').catch(err => err)">
              主題
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="activeIcon(false, ''),
            $router.push('/about').catch(err => err)">
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
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      menuList: false,
    };
  },
  computed: {
    ...mapGetters('cartModules', ['cartAmout']),
    ...mapGetters(['arrowIcon', 'menuIcon', 'mobileMenu', 'login']),
  },
  methods: {
    activeIcon(status, category) {
      this.$store.dispatch('activeIcon', { status, category });
    },
    mobileMenuClose() {
      this.$store.dispatch('mobileMenuClose', true);
    },
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
};
</script>
