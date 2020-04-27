<template>
  <div>
    <div class="content py-3 py-lg-5" :class="{'vh-100' : sameProducts.length === 0}">
      <div class="container" v-if="sameProducts.length !== 0">
        <!-- 導覽列 -->
        <ul class="nav py-5">
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="$store.dispatch('activeIcon', false),
                $router.push('/').catch(err => err)">
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
          <li class="nav-item">
            <p class="nav-link m-0 px-0">/</p>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link"
            @click.prevent="$router.push({ path: `/shop/${product.category}` }).catch(err => {})">
              {{ mainItem }}
            </a>
          </li>
          <li class="nav-item">
            <p class="nav-link m-0 px-0">/</p>
          </li>
          <li class="nav-item">
            <p class="m-0 nav-link">
              {{ item }}
            </p>
          </li>
        </ul>

        <!-- 商品資訊 -->
        <div class="row pb-5 mb-5">
          <div class="col-lg-6 pr-lg-5">
            <img :src="product.imageUrl" />
          </div>
          <div class="col-lg-6">
            <div class="itemInfo">
              <div class="">
                <h3 class="itemInfo-title mb-3">
                  <strong>
                    {{ product.title }}
                  </strong>
                </h3>
                <div class="itemInfo-price mb-3">
                  <h4 class="text-secondary ml-lg-5"
                    v-if="product.origin_price > 0"
                    >
                    <del>
                      {{ product.origin_price | currency }}
                    </del>
                  </h4>
                  <h4 class="ml-lg-0" v-if="product.price"
                  :class="{'text-danger' : product.origin_price > 0,
                  'ml-5' : product.origin_price > 0}">
                      {{ product.price | currency }}
                  </h4>
                </div>
              </div>
              <form class="form">
                <label for="amount" class="label my-3 mb-lg-5">
                  數量
                  <div class="d-flex justify-content-between pt-2 pt-lg-0">
                    <button class="btn p-0"
                      type="button" @click.prevent="getAmount('minus')">
                      <i class="fas fa-minus"></i>
                    </button>
                    <input
                      type="text"
                      class="input"
                      id="amount"
                      v-model="amount"
                      disabled
                    />
                    <button class="btn p-0"
                      type="button" @click.prevent="getAmount('plus')">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </label>
                <div class="button-warp">
                  <button
                    class="button button-slide mr-5 mb-sm-5"
                    @click.prevent="addtoCart(product.id, amount)"
                    :disabled="isDisable"
                  >
                    加入購物車
                    <i class="fas fa-xs fa-spinner fa-spin mr-1"
                      v-if="isAdding === product.id">
                    </i>
                  </button>
                  <button
                    class="button button-slide"
                    @click.prevent="buyNow(product.id, amount)"
                  >
                    立即購買
                  </button>
                </div>
              </form>
              <div class="content-introduce mt-5">
                <h5 class="text-info"><strong>商品介紹</strong></h5>
                <p>{{ product.description }} <br></p>
                <p>{{ product.content }}</p>
                <p>製造：台灣</p>
                <h5 class="text-info"><strong>季節優惠</strong></h5>
                <p class="m-0"><i class="fas fa-thumbs-up mr-2"></i>結帳時可輸入優惠碼享折扣</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 類似商品 -->
        <h4 class="text-center my-5">你可能會喜歡</h4>
        <carousel :per-page="pageNum" :paginationEnabled="false" :scrollPerPage="false"
        :mouse-drag="true" :autoplay="true" :autoplayTimeout="5500"
        :loop="true" :speed="3000">
            <slide v-for="item in sameProducts" :key="item.id" class="similarItem p-2">
              <div class="similarItem-img"
                :style="{backgroundImage: 'url(' + item.imageUrl + ')' }">
                  <div class="wrap-shadow">
                    <div class="similarItem-content">
                      <div class="similarItem-text">
                        <p class="h5">
                          {{ item.title }}
                        </p>
                        <p class="h4">
                          <span :class="{'text-danger' : item.origin_price > 0}">
                            {{ item.price | currency }}
                          </span>
                          <span class="h6" v-if="item.origin_price > 0">
                            <del>{{ item.origin_price | currency }} </del>
                          </span>
                        </p>
                      </div>
                      <a href="#" class="button button-slide text-center h-auto p-2"
                      @click.prevent="getItem(item.category,
                      item.Item, item.id)">
                        查看商品
                      </a>
                    </div>
                  </div>
                </div>
            </slide>
        </carousel>

      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import { mapGetters, mapActions } from 'vuex';


export default {
  data() {
    return {
      product: [],
      amount: 1,
      mainItem: '',
      item: '',
    };
  },
  computed: {
    ...mapGetters('productsModules', ['sameProducts', 'pageNum']),
    ...mapGetters('cartModules', ['isDisable', 'isAdding', 'cart']),
  },
  methods: {
    ...mapActions('productsModules', ['productCarousel']),
    getProduct(id) {
      // 取得選定商品資料
      const vm = this;
      vm.$store.dispatch('loading', true);
      const product = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      const mainItems = vm.$route.params.mainItem;
      const items = vm.$route.params.item;
      this.$http.get(product).then((response) => {
        if (response.data.success) {
          vm.product = response.data.product;
          this.$store.dispatch('productsModules/getProducts', vm.product);
          if (mainItems === 'tops') {
            vm.mainItem = '上衣';
            if (items === 't-shirt') {
              vm.item = '短袖';
            } else if (items === 'shirt') {
              vm.item = '襯衫';
            } else if (items === 'outer') {
              vm.item = '外套';
            } else if (items === 'suit') {
              vm.item = '西裝';
            }
          } else if (mainItems === 'bottoms') {
            vm.mainItem = '下身';
            if (items === 'shorts') {
              vm.item = '短褲';
            } else if (items === 'pants') {
              vm.item = '長褲';
            } else if (items === 'jeans') {
              vm.item = '牛仔褲';
            }
          } else if (mainItems === 'accessories') {
            vm.mainItem = '配件';
            if (items === 'hat') {
              vm.item = '帽子';
            } else if (items === 'bag') {
              vm.item = '背包';
            } else if (items === 'shoes') {
              vm.item = '鞋類';
            }
          }
        }
        this.$store.dispatch('loading', false);
      });
    },
    getAmount(item) {
      // 商品數量限制範圍
      const vm = this;
      if (item === 'plus' && vm.amount < 5) {
        vm.amount += 1;
      } else if (item === 'minus' && vm.amount > 1) {
        vm.amount -= 1;
      } else if (vm.amount < 1) {
        vm.amount = 1;
      } else {
        vm.$store.dispatch('activeAlert', '商品數量範圍 1 - 5');
      }
    },
    addtoCart(id, amount) {
      // 加入購物車
      this.$store.dispatch('cartModules/addtoCart', { id, amount });
    },
    buyNow(id, amount) {
      this.$store.dispatch('cartModules/buyNow', { id, amount });
    },
    getItem(category, item, id) {
      // 點擊相似商品的變更資料
      const vm = this;
      vm.$router.push({ path: `/content/${category}/${item}`, query: { id } });
      vm.getProduct(id);
      window.scrollTo(0, 0);
    },
  },
  created() {
    this.getProduct(this.$route.query.id);
    this.productCarousel();
  },
  components: {
    Carousel,
    Slide,
  },
};
</script>
