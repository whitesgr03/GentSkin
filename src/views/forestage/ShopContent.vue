<template>
  <div>
    <Navbar :navCart="cart" :navCartItem="cartitem" />
    <Menubar class="sticky-top" :navCart="cart" :navCartItem="cartitem" />
    <loading :active.sync="isLoading"></loading>

    <div class="container pt-5" v-if="!isLoading">
      <h4 class="text-center m-0">{{ product.category }}</h4>
      <div class="row justify-content-around py-5 mb-5">
        <div class="col-5">
          <img :src="product.imageUrl" class="card-img-top" />
        </div>
        <div class="col-4 ">
          <h2 class="h2">
            <strong>{{ product.title }}</strong>
          </h2>
          <div class="mt-4">
            <span class="h3" v-if="product.price"
              ><strong>{{ product.price | currency }}元</strong>
            </span>
            <span v-if="product.origin_price > 0">
              <del class="h5 text-secondary ml-5"
                >原價 {{ product.origin_price | currency }}元
              </del>
            </span>
            <span class="h3 text-info" v-if="!product.price"
              ><strong>{{ product.origin_price | currency }}元</strong></span
            >
          </div>

          <div class="mt-4 d-flex  align-items-end">
            <label for="num" class="h5">數量：</label>
            <select v-model="amount" class="custom-select  w-25 input-color">
              <option :value="num" v-for="num in 5" :key="num">
                {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="d-flex justify-content-between mt-4">
            <button
              class="btn-type btn-type3 p-0"
              style="width:140px; height:50px;"
              @click="addtoCart(product.id, amount)"
              :disabled="isDisable"
            >
              <i
                class="fas fa-spinner fa-spin mr-1"
                v-if="status.loadingItem === product.id"
              ></i
              >加入購物車
            </button>
            <button
              class="btn-type btn-type3  p-0"
              style="width:140px; height:50px;"
              @click="buyNow(product.id, amount)"
            >
              立即購買
            </button>
          </div>

          <div class="my-5 text-center text-md-left ">
            <div class="d-md-none">
              <h2 class="mt-4 mt-md-0 text-center text-md-left">
                <strong>{{ product.title }}</strong>
              </h2>
            </div>
            <h5 class="text-info mb-4"><strong>商品介紹</strong></h5>
            <p class="mb-5">{{ product.description }}</p>
            <p>{{ product.content }}</p>
            <p>製造：台灣</p>
          </div>
          <div class="pt-3 text-md-left">
            <h5 class="text-info"><strong>開幕優惠</strong></h5>
            <i class="fas fa-thumbs-up mr-2"></i>結帳時可輸入優惠碼享折扣
          </div>
        </div>
      </div>

      <h4 class="text-center pt-5">你可能會喜歡</h4>
      <div class="swiper-container" v-if="products.length != 0">
        <div class="swiper-wrapper py-5">
          <div class="swiper-slide" v-for="item in filterdata" :key="item.id">
            <div class="card border-0 bg-transparent" v-if="item.is_enabled">
              <a href="#" @click="sameProduct(item.id)">
                <img class="card-img-top" alt="..." :src="item.imageUrl" />
              </a>
              <div class="card-body px-0">
                <div class="d-flex justify-content-between align-items-end m-0">
                  <h5>
                    <a
                      href="#"
                      class="text-white text-decoration-none"
                      @click="sameProduct(item.id)"
                      >{{ item.title }}
                    </a>
                  </h5>
                  <del class="h6 text-muted" v-if="item.origin_price > 0">
                    原價 {{ item.origin_price | currency }} 元
                  </del>
                </div>
                <div class="text-right mt-2">
                  <div class="h6" v-if="!item.price">
                    <span class="h5">{{ item.origin_price | currency }}</span>
                    元
                  </div>
                  <div class="h6" v-if="item.price">
                    <span class="h5">{{ item.price | currency }}</span>
                    元
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/forestage/Navbar.vue'
import Menubar from '@/components/forestage/Menubar.vue'
import Swiper from 'swiper'

export default {
  data() {
    return {
      products: [],
      product: {},
      add: '',
      itemId: '',
      amount: '',
      addNew: '',
      isLoading: false,
      isDisable: false,
      status: {
        loadingItem: ''
      },
      cart: [],
      cartitem: []
    }
  },
  methods: {
    getProduct(id) {
      const vm = this
      const Api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      this.$http.get(Api).then(response => {
        vm.products = response.data.products
      })
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.isLoading = true
      this.$http.get(api).then(response => {
        vm.product = response.data.product
        vm.amount = 1
        vm.isLoading = false
        // console.log('目前商品id', response.data.product.id)
      })
    },
    sameProduct(id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.isLoading = true
      this.$http.get(api).then(response => {
        vm.product = response.data.product
        vm.amount = 1
        vm.getswiper()
        setTimeout(() => {
          vm.isLoading = false
        }, 800)
      })
    },
    addtoCart(id, qty) {
      const vm = this
      vm.isDisable = true
      vm.status.loadingItem = id

      if (vm.addNew != '') {
        // 刪除重複加入的相同id商品 以便執行初次加入
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${this.addNew}`
        this.$http.delete(api).then(response => {})
      }
      // 初次加入
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(api, { data: cart }).then(response => {
        vm.addNew = response.data.data.id
        vm.getCart()
        this.$bus.$emit('message:push', '商品已加入購物車', 'tohoh')
        setTimeout(() => {
          vm.isDisable = false
          vm.status.loadingItem = ''
        }, 1000)
      })
    },

    buyNow(id, qty = 1) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(api, { data: cart }).then(response => {
        vm.isLoading = false
        vm.$router.push('/order')
      })
    },

    getCart() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      this.$http.get(api).then(response => {
        vm.cart = response.data.data
        vm.cartitem = response.data.data.carts.length
        // console.log('目前購物車資料', response.data.data.carts)
      })
    },
    getswiper() {
      this.$nextTick(() => {
        setTimeout(() => {
          new Swiper('.swiper-container', {
            slidesPerView: 4,
            spaceBetween: 40,
            loop: true,
            speed: 2000,
            autoplay: {
              delay: 4000,
              disableOnInteraction: false
            }
          })
        }, 800)
      })
    }
  },
  computed: {
    filterdata() {
      const vm = this
      vm.filteritem = vm.products.filter((item, i) => {
        if (vm.product.title != item.title) {
          return item.category == vm.product.category
        }
      })
      return vm.filteritem
    }
  },
  created() {
    this.itemId = this.$route.params.itemId //須和路由設置一樣id名稱
    this.getProduct(this.itemId)
    this.getswiper()
    this.getCart()
  },

  components: {
    Navbar,
    Menubar
  }
}
</script>

<style scoped>
.btn-type3:disabled {
  background-color: rgba(31, 70, 140, 0.5);
}
</style>
