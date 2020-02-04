<template>
  <div>
    <Modal :navCart="cart" @signIn="login" @userLogin="getLogin" :orderList="orderData"/>
    <Header class="sticky-top" :navCartItem="cartItem" :menu="dropdownMenu"
      :categorie="categories" :moveData="moveDown" @move="moveAnimate" @searchInput="searchItem"
      @menuItem="changeItem" :navSignin="loginStatus" @signIn="login" @order="getOrder"
      :orderButton="orderStatus"/>
    <div class="product container py-3 py-md-5">
      <div class="row">
        <ul class="category nav justify-content-around d-md-none"
        :class="{ 'category-moveDown': moveDown == true, 'category-moveUp': categories != ''}">
          <li class="nav-item">
            <button type="button" class="nav-link"
              :class="{ 'nav-active': categories == '' }"
              @click.prevent="categories = '', search = '', moveDown = false">
              ALL
            </button>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#top"
              :class="{ 'nav-active': categories == '上衣' }"
              @click.prevent="categories = '上衣', search = '', moveDown = false">
              上衣
              <i class="far fa-xs fa-plus-square"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#bottom"
              :class="{ 'nav-active': categories == '下身' }"
              @click.prevent="categories = '下身', search = '', moveDown = false">下身
              <i class="far fa-xs fa-plus-square"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#accessorie"
              :class="{ 'nav-active': categories == '配件' }"
              @click.prevent="categories = '配件', search = '', moveDown = false">
            配件
              <i class="far fa-xs fa-plus-square"></i></a>
          </li>
        </ul>
        <ul id="top" class="item nav justify-content-around d-md-none animated"
          :class="{ 'item-display': categories == '上衣' }">
          <li class="nav-item">
            <a class="" href="#">短TEE</a>
          </li>
          <li class="nav-item">
            <a class="" href="#">襯衫</a>
          </li>
          <li class="nav-item">
            <a class="" href="#">外套</a>
          </li>
        </ul>
        <ul id="bottom" class="item nav justify-content-around d-md-none animated"
          :class="{ 'item-display': categories == '下身' }">
          <li class="nav-item">
            <a class="" href="#">長褲</a>
          </li>
          <li class="nav-item">
            <a class="" href="#">西裝褲</a>
          </li>
          <li class="nav-item">
            <a class="" href="#">牛仔褲</a>
          </li>
        </ul>
        <ul id="accessorie" class="item nav justify-content-around d-md-none animated"
          :class="{ 'item-display': categories == '配件' }">
          <li class="nav-item">
            <a class="" href="#">帽子</a>
          </li>
          <li class="nav-item">
            <a class="" href="#">包包</a>
          </li>
          <li class="nav-item">
            <a class="" href="#">鞋類</a>
          </li>
        </ul>
        <div class="col-6 col-md-4 my-3" v-for="item in filterItem[pages]" :key="item.id">
          <!--透過pagination[pages]使類別在All時頁面會顯示頁碼-->
          <div v-if="item.is_enabled">
            <img :src="item.imageUrl" class="product-img" alt="product-photo"
              @click.prevent="getContent(item.id)" />
            <div class="product-content">
              <div class="d-md-flex justify-content-between align-items-end">
                <p class="product-title h5" @click.prevent="getContent(item.id)">
                  {{ item.title }}
                </p>
                <p class="product-origin h6 text-muted" v-if="item.origin_price > 0">
                  <del>原價 {{ item.origin_price | currency }} 元</del>
                </p>
              </div>
                <p class="product-price h5"> {{ item.price | currency }}元</p>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination justify-content-center d-none d-md-flex" >
        <ul class="nav">
          <li class="mx-2" v-for="page in filterItem.length" :key="page"
          @click.prevent="pagination">
            <button type="button" class="btn"
              @click.prevent="pages = page - 1"
              :class="{ btnColor: pages === page - 1 }">
              {{ page }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Modal from '@/components/forestage/Modal.vue';
import Header from '@/components/forestage/Header.vue';

export default {
  data() {
    return {
      products: [],
      cart: [],
      cartItem: [],
      item: [],
      orderData: [],
      status: {
        loadingItem: '',
      },
      categories: '',
      search: '',
      orderStatus: '',
      pages: 0,
      dropdownMenu: true,
      moveDown: false,
      loginStatus: false,
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
        vm.isLoading = false;
        // console.log('販賣的物品', response.data.products);
      });
    },
    getContent(id) {
      const vm = this;
      vm.$router.push(`content/${id}`);
    },
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.cartItem = response.data.data.carts.length;
        // console.log('購物車資料', response.data.data.carts);
      });
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
    pagination() {
      const vm = this;
      if (vm.pages >= 0) {
        $('html, body').animate({ scrollTop: 0 }, 1);
      }
    },
    changeItem(item) {
      const vm = this;
      vm.categories = item;
      vm.search = '';
    },
    searchItem(item) {
      const vm = this;
      vm.search = item;
    },
    moveAnimate(item) {
      const vm = this;
      vm.moveDown = item;
      vm.categories = '';
    },
  },
  computed: {
    filterItem() {
      const vm = this;
      const width = $(window).width();
      let product = [];
      if (vm.categories !== '' && vm.search === '') {
        product = vm.products.filter((item) => {
          vm.pages = 0;
          $('html, body').animate({ scrollTop: 0 }, 1);
          return item.category === vm.categories;
        });
        // console.log('categories', product)
      } else if (vm.search !== '') {
        product = vm.products.filter((item) => {
          vm.pages = 0;
          return item.title.indexOf(vm.search) > -1;
        });
        // console.log('search', product)
      } else {
        product = vm.products;
      }
      const pagination = [];
      product.forEach((item, i) => {
        if (width >= 768) {
          if (i % 6 === 0) {
            pagination.push([]);
          } // i % 6 = 3 代表想要新增幾頁分頁
          const page = parseInt(i / 6, 10); // 6代表每頁分頁要放幾筆資料
          pagination[page].push(item);
        } else {
          if (i % product.length === 0) {
            pagination.push([]);
          }
          const page = parseInt(i / product.length, 10);
          pagination[page].push(item);
        }
      });
      // console.log(pagination);
      return pagination;
    },
  },
  created() {
    this.getProducts();
    this.getCart();
    this.getLogin();
    $('html, body').animate({ scrollTop: 0 }, 1);
  },
  components: {
    Modal,
    Header,
  },
};
</script>
