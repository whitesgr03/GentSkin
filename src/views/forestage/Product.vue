<template>
  <div>
    <div class="product py-3 py-lg-5" :class="{'vh-100' : index === 0 &&
    $route.params.item !== 'collections'}">

      <!-- 導覽列 -->
      <div class="container-sm">
        <div class="product-navbar">
          <div class="row py-5">
            <ul class="nav pb-3 py-md-0">
              <li class="nav-item">
                <a href="#" class="nav-link" @click.prevent="$store.dispatch('activeIcon', false),
                $router.push('/')">
                  首頁
                </a>
              </li>
              <li class="nav-item">
                <p class="nav-link m-0 px-0">/</p>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link"
                @click.prevent="$router.push({ path: `/shop/collections` }).catch(err => err)">
                  分類
                </a>
              </li>
              <li class="nav-item"  v-if="mainItem">
                <p class="nav-link m-0 px-0">/</p>
              </li>
              <li class="nav-item"  v-if="mainItem">
                <a href="#" class="nav-link"
                @click.prevent="$router.push({ path: `/shop/${routerName}` }).catch(err => err),
                item = '';">
                  {{ mainItem }}
                </a>
              </li>
              <li class="nav-item"  v-if="item">
                <p class="nav-link m-0 px-0">/</p>
              </li>
              <li class="nav-item"  v-if="item">
                <p class="m-0 nav-link">
                  {{ item }}
                </p>
              </li>
            </ul>
            <!-- 搜尋欄 -->
            <div class="search">
              <div class="search-border">
                <input type="text"
                  class="form-control border-0"
                  placeholder="Search..."
                  v-model="search"
                  @keyup.enter="searchItems = search,
                  $router.push({ path: `/shop/search` }).catch(err => err)"
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分類列表 -->
      <div class="collections" v-if="$route.params.item === 'collections'">
        <div class="row m-0 mb-5">
          <div class="col-12 pb-5 px-0">
            <div class="collections-warp">
              <div class="collections-img collections-img-tops w-50">
                <div class="collections-content">
                  <h4>上衣</h4>
                  <button type="button" class="button button-slide"
                  @click.prevent="$router.push({ path: `/shop/tops` }).catch(err => err)">
                    開始選購
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-lg-4 pl-lg-0">
            <div class="wrap">
              <a href="#" class="collections-img collections-img-tshirt"
              @click.prevent="$router.push({ path: `/shop/tops`, query:
              { item: 't-shirt' } }).catch(err => err)">
                <div class="wrap-shadow">
                  <div class="text-content">
                    <p class="underline m-0">短袖</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-6 col-lg-4">
            <div class="wrap">
              <a href="#" class="collections-img collections-img-shirt"
              @click.prevent="$router.push({ path: `/shop/tops`, query:
              { item: 'shirt' } }).catch(err => err)">
                <div class="wrap-shadow">
                  <div class="text-content">
                    <p class="underline m-0">襯衫</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-6 col-lg-4 pr-lg-0">
            <div class="wrap">
              <a href="#" class="collections-img collections-img-outer"
              @click.prevent="$router.push({ path: `/shop/tops`, query:
              { item: 'outer' } }).catch(err => err)">
                <div class="wrap-shadow">
                  <div class="text-content">
                  <p class="underline m-0">外套</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="row m-0 mb-5">
          <div class="col-12 pb-5 px-0">
            <div class="collections-warp">
              <div class="collections-img collections-img-bottoms w-50">
                <div class="collections-content">
                  <h4>下身</h4>
                  <button type="button" class="button button-slide"
                  @click.prevent="$router.push({ path: `/shop/bottoms` }).catch(err => err)">
                    開始選購
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-lg-4 pl-lg-0">
            <div class="wrap">
              <a href="#" class="collections-img collections-img-shorts"
              @click.prevent="$router.push({ path: `/shop/bottoms`, query:
              { item: 'shorts' } }).catch(err => err)">
                <div class="wrap-shadow">
                  <div class="text-content">
                    <p class="underline m-0">短褲</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-6 col-lg-4">
            <div class="wrap">
              <a href="#" class="collections-img collections-img-pants"
              @click.prevent="$router.push({ path: `/shop/bottoms`, query:
              { item: 'pants' } }).catch(err => err)">
                <div class="wrap-shadow">
                  <div class="text-content">
                    <p class="underline m-0">長褲</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-6 col-lg-4 pr-lg-0">
            <div class="wrap">
              <a href="#" class="collections-img collections-img-jeans"
              @click.prevent="$router.push({ path: `/shop/bottoms`, query:
              { item: 'jeans' } }).catch(err => err)">
                <div class="wrap-shadow">
                  <div class="text-content">
                    <p class="underline m-0">牛仔褲</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="row m-0 mb-5">
          <div class="col-12 pb-5 px-0">
            <div class="collections-warp">
              <div class="collections-img collections-img-accessories w-50">
                <div class="collections-content">
                  <h4>配件</h4>
                  <button type="button" class="button button-slide"
                  @click.prevent="$router.push({ path: `/shop/accessories` }).catch(err => err)">
                    開始選購
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-lg-4 pl-lg-0">
            <div class="wrap">
              <a href="#" class="collections-img collections-img-hat"
              @click.prevent="$router.push({ path: `/shop/accessories`,
              query: { item: 'hat' } }).catch(err => err)">
                <div class="wrap-shadow">
                  <div class="text-content">
                    <p class="underline m-0">帽子</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-6 col-lg-4">
            <div class="wrap">
              <a href="#" class="collections-img collections-img-bag"
              @click.prevent="$router.push({ path: `/shop/accessories`,
              query: { item: 'bag' } }).catch(err => err)">
                <div class="wrap-shadow">
                  <div class="text-content">
                    <p class="underline m-0">背包</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-6 col-lg-4 pr-lg-0">
            <div class="wrap">
              <a href="#" class="collections-img collections-img-shoes"
              @click.prevent="$router.push({ path: `/shop/accessories`,
              query: { item: 'shoes' } }).catch(err => err)">
                <div class="wrap-shadow">
                  <div class="text-content">
                    <p class="underline m-0">鞋子</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品顯示 -->
      <div class="container" v-if="$route.params.item !== 'collections'">
        <div class="product-item" v-if="filterItem">
          <div class="row">
            <div class="col-6 col-sm-4 col-md-3 my-3 " v-for="(item, i) in itemList" :key="i">
              <div :id="i"  class="product-item-wrap fadein-up" v-if="item.is_enabled"
              :style="{ transitionDelay: item.delay + 's' }">
                <router-link class="wrap d-block"
                :to ="{ path: `/content/${item.category}/${item.Item}`,
                query: { id :`${item.id}` }}">
                <img :src="item.imageUrl" alt="product-photo">
                </router-link>

                <div class="content">
                  <router-link class="d-inline-block underline"
                  :to ="{ path: `/content/${item.category}/${item.Item}`,
                  query: { id :`${item.id}` }}">
                    {{ item.title }}
                  </router-link>

                  <div class="text">
                    <p class="m-0 mr-3" v-if="item.origin_price > 0">
                      <del>{{ item.origin_price | currency }}</del>
                    </p>
                    <p class="m-0" :class="{'text-danger' : item.origin_price > 0}">
                      {{ item.price | currency }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="product-search  h-100" v-if="filterItem.length === 0">
          <div class="row justify-content-center align-items-center h-100">
            <p>沒有收尋到任何商品</p>
          </div>
        </div> -->
      </div>

      <!-- 商品滾動加載 -->
      <infinite-loading spinner="waveDots" class="loading"
      v-if="$route.params.item !== 'collections'"
      :identifier="infiniteId" @infinite="infiniteHandler">
        <span slot="no-more"></span>
        <span slot="no-results"></span>
      </infinite-loading>

    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import InfiniteLoading from 'vue-infinite-loading';
import { mapGetters, mapActions } from 'vuex';


export default {
  data() {
    return {
      index: 0,
      itemList: [],
      product: [],
      infiniteId: +new Date(),
      collections: '',
      mainItem: '',
      item: '',
      routerName: '',
      search: '',
      searchItems: '',
    };
  },
  computed: {
    ...mapGetters('productsModules', ['products']),
    filterItem() {
      // 篩選商品
      const vm = this;
      window.scrollTo(0, 0);
      const items = vm.$route.params.item;
      let product = [];
      if (items === 'all') {
        vm.mainItem = 'All';
        vm.routerName = 'all';
        vm.item = '';
        vm.search = '';
        product = this.products;
      } else if (items === 'search') {
        vm.mainItem = '';
        vm.routerName = '';
        vm.item = '';
        product = this.products.filter(item => item.title.indexOf(vm.searchItems) > -1);
      } else {
        if (vm.$route.query.item !== undefined) {
          vm.collections = vm.$route.query.item;
        } else {
          vm.collections = items;
        }
        vm.search = '';
        product = this.products.filter(item => item.category === vm.collections
        || item.Item === vm.collections);
        if (product.length !== 0) {
          vm.routerName = items;
          if (items === 'tops') {
            vm.mainItem = '上衣';
            if (vm.collections === 't-shirt') {
              vm.item = '短袖';
            } else if (vm.collections === 'shirt') {
              vm.item = '襯衫';
            } else if (vm.collections === 'outer') {
              vm.item = '外套';
            } else if (vm.collections === 'suit') {
              vm.item = '西裝';
            }
          } else if (items === 'bottoms') {
            vm.mainItem = '下身';
            if (vm.collections === 'shorts') {
              vm.item = '短褲';
            } else if (vm.collections === 'pants') {
              vm.item = '長褲';
            } else if (vm.collections === 'jeans') {
              vm.item = '牛仔褲';
            }
          } else if (items === 'accessories') {
            vm.mainItem = '配件';
            if (vm.collections === 'hat') {
              vm.item = '帽子';
            } else if (vm.collections === 'bag') {
              vm.item = '背包';
            } else if (vm.collections === 'shoes') {
              vm.item = '鞋類';
            }
          }
        } else {
          vm.mainItem = '';
          vm.item = '';
        }
      }
      const productItem = [];
      let seconds = 0;
      product.forEach((item, i) => {
        const element = item;
        if (i % 4 === 0) {
          productItem.push([]);
        }
        const index = parseInt(i / 4, 10);
        if (seconds === 0.3 * 4) {
          seconds = 0.3;
        } else {
          seconds += 0.3;
        }
        element.delay = seconds;
        productItem[index].push(element);
      });
      vm.infiniteId += 1;
      vm.index = 0;
      vm.itemList = [];
      return productItem;
    },
  },
  methods: {
    // 取得所有商品
    ...mapActions('productsModules', ['getProducts']),
    infiniteHandler($state) {
      // 讀取商品
      const vm = this;
      if (vm.filterItem.length >= vm.index + 1) {
        vm.itemList.push(...vm.filterItem[vm.index]);
        vm.index += 1;
        $state.loaded();
        setTimeout(() => {
          $('.fadein-up').addClass('fadein-up-show');
          $('.product-item-wrap').mousemove(function hover() {
            const hashtag = '#';
            const targetId = $(this).attr('id');
            $(hashtag + targetId).find('.underline').addClass('underline-active');
          });
          $('.product-item-wrap').mouseout(function hover() {
            const hashtag = '#';
            const targetId = $(this).attr('id');
            $(hashtag + targetId).find('.underline').removeClass('underline-active');
          });
          // 捲動頁面執行動畫
        }, 1);
      } else {
        $state.complete();
      }
    },
  },
  mounted() {
    // search欄動畫
    $('.form-control').focusin(() => {
      $('.search').addClass('search-border-LR');
      $('.search-border').addClass('search-border-TB');
    });
    $('.form-control').focusout(() => {
      $('.search').removeClass('search-border-LR');
      $('.search-border').removeClass('search-border-TB');
    });
    const symbol = '#';
    const scrollPos = $(window).scrollTop();
    const windowHeight = $(window).height();
    $('.fadein-up').each((i, item) => {
      const target = symbol + $(item).attr('id');
      const targerPos = $(target).offset().top;
      if (targerPos <= scrollPos + windowHeight) {
        $(item).addClass('fadein-up-show');
      }
    });
  },
  created() {
    this.getProducts();
  },
  components: {
    InfiniteLoading,
  },
};
</script>
