<template>
  <div>
    <Modal :navCart="cart" @signIn="login" @userLogin="getLogin" :orderList="orderData"/>
    <Header class="sticky-top" :navCartItem="cartitem" :navSignin="loginStatus" @signIn="login"
    @order="getOrder" :orderButton="orderStatus" @cartData="getCart"/>
    <loading :active.sync="isLoading"></loading>
    <ul class="nav ml-5 justify-content-center">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            首頁
          </router-link>
        </li>
        <li class="nav-item">
          <p class="py-2">></p>
        </li>
        <li class="nav-item">
          <router-link to="/shop" class="nav-link">
            服飾
          </router-link>
        </li>
        <li class="nav-item">
          <p class="py-2">></p>
        </li>
        <li class="nav-item">
          <p class="py-2 px-3">{{ product.category }}</p>
        </li>
      </ul>
    <div class="content container my-md-5 mb-5" v-if="amount > 0">
      <div class="row justify-content-around">
        <div class="col-md-7">
          <img :src="product.imageUrl" class="content-img" />
        </div>
        <div class="col-md-5 d-flex flex-column justify-content-around">
          <div class="content-text">
            <h2 class="content-title">
              <strong>
                {{ product.title }}
              </strong>
            </h2>
            <div class="content-price">
              <p class="h3" v-if="product.price">
                <strong>
                  {{ product.price | currency }}元
                </strong>
              </p>
              <p class="h3" v-if="!product.price">
                <strong>
                  {{ product.origin_price | currency }}元
                </strong>
              </p>
              <p class="h5 text-secondary ml-5"
                v-if="product.origin_price > 0">
                <del>
                  原價 {{ product.origin_price | currency }}元
                </del>
              </p>
            </div>
            <form class="h5">
              <label for="num" class="m-0">數量：</label>
              <select id="num" class="custom-select align-baseline" v-model="amount">
                <option :value="num" v-for="num in 5" :key="num">
                  {{ num }} {{ product.unit }}
                </option>
              </select>
            </form>
            <div class="d-flex justify-content-around">
              <button
                class="button bg-konjyo text-white"
                @click.prevent="addtoCart(product.id, amount)"
                :disabled="isDisable"
              >
                加入購物車
                <i class="fas fa-spinner fa-spin mr-1"
                  v-if="status.loadingItem === product.id">
                </i>
              </button>
              <button
                class="button bg-konjyo text-white"
                @click.prevent="buyNow(product.id, amount)"
              >
                立即購買
              </button>
            </div>
          </div>
          <div class="content-introduce">
            <h5 class="text-info"><strong>商品介紹</strong></h5>
            <p>{{ product.description }} <br></p>
            <p>{{ product.content }}</p>
            <p>製造：台灣</p>
            <h5 class="text-info"><strong>開幕優惠</strong></h5>
            <p><i class="fas fa-thumbs-up mr-2"></i>結帳時可輸入優惠碼享折扣</p>
          </div>
        </div>
      </div>
      <div class="swiper-container my-sm-5" v-if="isLoading === false">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <h4 class="text-center">你可能會喜歡</h4>
            <div class="row">
              <div class="col-6 col-md-3" v-for="item in sameProduct" :key="item.id">
                  <img :src="item.imageUrl" class="product-img" alt="product-photo"
                    @click.prevent="getSameProduct(item.id)"/>
                  <div class="product-content">
                    <p class="product-title text-center h5"
                      @click.prevent="getSameProduct(item.id)">
                      {{ item.title }}
                    </p>
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
import Swiper from 'swiper';
import $ from 'jquery';
import Modal from '@/components/forestage/Modal.vue';
import Header from '@/components/forestage/Header.vue';

export default {
  data() {
    return {
      products: [],
      product: {},
      sameProduct: [],
      cart: [],
      cartitem: [],
      orderData: [],
      add: '',
      itemId: '',
      amount: '',
      addNew: '',
      orderStatus: '',
      isLoading: false,
      isDisable: false,
      loginStatus: false,
      status: {
        loadingItem: '',
      },
    };
  },
  methods: {
    getProduct(id) {
      const vm = this;
      const Api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      this.$http.get(Api).then((response) => {
        vm.products = response.data.products;
      });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        vm.amount = 1;
        vm.isLoading = false;
        vm.sameProduct = vm.products.filter(item => item.category === vm.product.category
        && item.title !== vm.product.title);
      });
    },
    getSameProduct(id) {
      const vm = this;
      vm.$router.push(`${id}`);
      this.getProduct(id);
      this.getSwiper();
    },
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.cartitem = response.data.data.carts.length;
        // console.log(vm.cart.carts);
      });
    },
    addtoCart(id, amount) {
      const vm = this;
      if (vm.loginStatus) {
        vm.isDisable = true;
        vm.status.loadingItem = id;
        const cartData = vm.cart.carts.filter(item => item.product_id === id);
        if (cartData.length === 0) {
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
          const cart = {
            product_id: id,
            qty: amount,
          };
          this.$http.post(api, { data: cart }).then((response) => {
            if (response.data.success) {
              setTimeout(() => {
                vm.isDisable = false;
                vm.status.loadingItem = '';
                vm.getCart();
                this.$bus.$emit('alert', '商品已加入購物車');
              }, 1000);
            }
          });
        } else if (cartData.length > 0) {
          let num = amount;
          cartData.forEach((item) => {
            num += item.qty;
          });
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cartData[0].id}`;
          vm.$http.delete(api).then((response) => {
            if (response.data.success) {
              const Api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
              const cart = {
                product_id: id,
                qty: num,
              };
              this.$http.post(Api, { data: cart }).then((responses) => {
                if (responses.data.success) {
                  setTimeout(() => {
                    vm.isDisable = false;
                    vm.status.loadingItem = '';
                    vm.getCart();
                    this.$bus.$emit('alert', '商品已加入購物車');
                  }, 1000);
                }
              });
            }
          });
        }
      } else if (!vm.loginStatus) {
        setTimeout(() => {
          $('#loginModal').modal('show');
          this.$bus.$emit('alert', '請先登入會員！');
        }, 1000);
      }
    },
    buyNow(id, amount) {
      const vm = this;
      if (vm.loginStatus) {
        vm.isLoading = true;
        const cartData = vm.cart.carts.filter(item => item.product_id === id);
        if (cartData.length === 0) {
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
          const cart = {
            product_id: id,
            qty: amount,
          };
          this.$http.post(api, { data: cart }).then((response) => {
            if (response.data.success) {
              setTimeout(() => {
                vm.isLoading = false;
                this.$bus.$emit('alert', '商品已加入購物車');
                vm.$router.push('/order');
              }, 1000);
            }
          });
        } else if (cartData.length > 0) {
          let num = amount;
          cartData.forEach((item) => {
            num += item.qty;
          });
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cartData[0].id}`;
          vm.$http.delete(api).then((response) => {
            if (response.data.success) {
              const Api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
              const cart = {
                product_id: id,
                qty: num,
              };
              this.$http.post(Api, { data: cart }).then((responses) => {
                if (responses.data.success) {
                  setTimeout(() => {
                    vm.isLoading = false;
                    this.$bus.$emit('alert', '商品已加入購物車');
                    vm.$router.push('/order');
                  }, 1000);
                }
              });
            }
          });
        }
      } else if (!vm.loginStatus) {
        setTimeout(() => {
          $('#loginModal').modal('show');
          this.$bus.$emit('alert', '請先登入會員！');
        }, 2000);
      }
    },
    getLogin() {
      const vm = this;
      const getAccount = JSON.parse(sessionStorage.getItem('myAccount'));
      if (getAccount !== null) {
        const verify = getAccount.find(item => item.login === true);
        if (verify !== undefined) {
          vm.loginStatus = true;
          vm.orderStatus = verify.orderID;
        }
      }
    },
    login(item) {
      const vm = this;
      setTimeout(() => {
        vm.loginStatus = item;
      }, 1);
    },
    getOrder() {
      const vm = this;
      const accountData = JSON.parse(sessionStorage.getItem('myAccount'));
      const verify = accountData.filter(item => item.login === true);
      if (verify[0].orderID !== undefined) {
        vm.orderData = [];
        verify[0].orderID.forEach((item) => {
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${item}`;
          this.$http.get(api).then((response) => {
            vm.orderData.push(response.data.order);
          });
        });
        // console.log(vm.orderData);
      }
    },
    getSwiper() {
      setTimeout(() => {
        new Swiper('.swiper-container', { // eslint-disable-line no-new
        });
      }, 800);
    },
  },
  created() {
    this.itemId = this.$route.params.id; // 須和路由設置一樣id名稱
    this.getSwiper();
    this.getProduct(this.itemId);
    this.getCart();
    this.getLogin();
  },
  components: {
    Modal,
    Header,
  },
};
</script>
