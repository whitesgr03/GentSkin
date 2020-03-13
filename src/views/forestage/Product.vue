<template>
  <div>
    <loading :active.sync="isLoading" loader="dots"></loading>
    <div class="product py-3 py-lg-5">
      <!-- 導覽列 -->
      <div class="container-sm">
        <div class="product-navbar">
          <div class="row py-5">
            <ul class="nav pb-3 py-md-0">
              <li class="nav-item">
                <a href="#" class="nav-link" @click.prevent="$bus.$emit('routerLink','/')">
                  首頁
                </a>
              </li>
              <li class="nav-item">
                <p class="nav-link m-0 px-0">/</p>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link"
                @click.prevent="getCategorie('collections')">
                  分類
                </a>
              </li>
              <li class="nav-item"  v-if="mainItem">
                <p class="nav-link m-0 px-0">/</p>
              </li>
              <li class="nav-item"  v-if="mainItem">
                <a href="#" class="nav-link"
                @click.prevent="getCategorie(routerName), item = '';">
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
                  @keyup.enter="searchItems = search, getCategorie('search')"
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
                  @click.prevent="getCategorie('tops')">
                    開始選購
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-lg-4 pl-lg-0">
            <div class="wrap">
              <a href="#" class="collections-img collections-img-tshirt"
              @click.prevent="getCategorie('tops', 't-shirt')">
                <div class="wrap-shadow">
                  <div class="text-content">
                    <p class="underline m-0">T-shirt</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-6 col-lg-4">
            <div class="wrap">
              <a href="#" class="collections-img collections-img-shirt"
              @click.prevent="getCategorie('tops', 'shirt')">
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
              @click.prevent="getCategorie('tops', 'outer')">
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
                  @click.prevent="getCategorie('bottoms')">
                    開始選購
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-lg-4 pl-lg-0">
            <div class="wrap">
              <a href="#" class="collections-img collections-img-shorts"
              @click.prevent="getCategorie('bottoms', 'shorts')">
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
              @click.prevent="getCategorie('bottoms', 'pants')">
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
              @click.prevent="getCategorie('bottoms', 'jeans')">
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
                  @click.prevent="getCategorie('accessories')">
                    開始選購
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-lg-4 pl-lg-0">
            <div class="wrap">
              <a href="#" class="collections-img collections-img-hat"
              @click.prevent="getCategorie('accessories', 'hat')">
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
              @click.prevent="getCategorie('accessories', 'bag')">
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
              @click.prevent="getCategorie('accessories', 'shoes')">
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
        <div class="product-item">
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
      </div>
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

export default {
  data() {
    return {
      index: 0,
      itemList: [],
      active: false,
      product: [],
      allProduct: [],
      infiniteId: +new Date(),
      status: {
        loadingItem: '',
      },
      collections: '',
      mainItem: '',
      item: '',
      routerName: '',
      search: '',
      searchItems: '',
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      // 取得所有商品
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.allProduct = response.data.products;
          vm.getitem(vm.allProduct);
          vm.isLoading = false;
        }
      });
    },
    infiniteHandler($state) {
      // 讀取商品
      const vm = this;
      if (vm.product.length >= vm.index + 1) {
        setTimeout(() => {
          vm.itemList.push(...vm.product[vm.index]);
          vm.index += 1;
          $state.loaded();
          $('.loading').removeClass('loading-height');
        }, 500);
        setTimeout(() => {
          $('.fadein-up').addClass('fadein-up-show');
          // eslint-disable-next-line
          $('.product-item-wrap').mousemove(function () {
            const hashtag = '#';
            const targetId = $(this).attr('id');
            $(hashtag + targetId).find('.underline').addClass('underline-active');
          });
          // eslint-disable-next-line
          $('.product-item-wrap').mouseout(function () {
            const hashtag = '#';
            const targetId = $(this).attr('id');
            $(hashtag + targetId).find('.underline').removeClass('underline-active');
          });
          // 捲動頁面執行動畫
        }, 550);
      } else {
        $state.complete();
      }
    },
    getitem(allData) {
      const vm = this;
      vm.isLoading = true;
      $('.loading').addClass('loading-height');
      const items = vm.$route.params.item;
      let product = [];
      if (items === 'all') {
        vm.mainItem = 'All';
        vm.routerName = 'all';
        vm.item = '';
        vm.search = '';
        product = allData;
        $('html, body').animate({ scrollTop: 0 }, 1);
      } else if (items === 'search') {
        product = allData.filter((item) => {
          vm.mainItem = 'All';
          vm.routerName = 'all';
          vm.item = '';
          $('html, body').animate({ scrollTop: 0 }, 1);
          return item.title.indexOf(vm.searchItems) > -1;
        });
      } else {
        if (vm.$route.query.item !== undefined) {
          vm.collections = vm.$route.query.item;
        } else {
          vm.collections = items;
        }
        product = allData.filter((item) => {
          vm.search = '';
          $('html, body').animate({ scrollTop: 0 }, 1);
          return item.category === vm.collections || item.Item === vm.collections;
        });
        if (product.length !== 0) {
          vm.routerName = items;
          if (items === 'tops') {
            vm.mainItem = '上衣';
            if (vm.collections === 't-shirt') {
              vm.item = 'T-shirt';
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
      vm.product = productItem;
      vm.index = 0;
      vm.itemList = [];
      vm.infiniteId += 1;
      vm.isLoading = false;
    },
    getCategorie(item, item2) {
      // 執行路由變更和商品篩選
      const vm = this;
      if (item === 'collections') {
        vm.$router.push('/').catch(err => err);
        setTimeout(() => {
          vm.$router.push({ path: `/shop/${item}`, query: { item: item2 } }).catch(err => err);
        }, 1);
      } else {
        vm.$router.push({ path: `/shop/${item}`, query: { item: item2 } }).catch(err => err);
        vm.getitem(vm.allProduct);
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
    $('html, body').animate({ scrollTop: 0 }, 1);
    this.getProducts();
    this.$bus.$on('getCategorie', (item, item2) => {
      // 手機板modal登出執行
      this.getCategorie(item, item2);
    });
  },
  components: {
    InfiniteLoading,
  },
};
</script>
