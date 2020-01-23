<template>
  <div>
    <Modal :navCart="cart" @signIn="login" @userLogin="getLogin" :orderList="orderData"/>
    <Header class="sticky-top" :navCartItem="cartitem" :navSignin="loginStatus"
    @signIn="login" @order="getOrder" :orderButton="orderStatus"/>
    <!-- 首頁輪播 -->
    <div class="home swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide swiper-bg-1 justify-content-end">
          <div class="swiper-content">
            <h3 class="stroke">
              <span>2019</span> <br /> YOUR <br />AUTUMN <br />WARDROBE
            </h3>
              <router-link tag="button" to="/shop" class="button button-animated bg-biwacha">
                立即選購
              </router-link>
          </div>
        </div>
        <div class="swiper-slide swiper-bg-2">
          <div class="swiper-content">
            <h3 class="stroke">
              <span>秋季時尚</span> <br /> CONSCIOUS <br /><span>LIFE</span>
            </h3>
            <router-link tag="button" to="/article" class="button button-animated bg-biwacha">
            閱讀更多
            </router-link>
          </div>
        </div>
        <div class="swiper-slide swiper-bg-3 justify-content-end">
          <div class="swiper-content">
            <h3 class="stroke">
              NEW STYLE <br /> ARRIVALS
            </h3>
            <router-link tag="button" to="/shop" class="button button-animated bg-biwacha">
            檢視單品
            </router-link>
          </div>
        </div>
      </div>
      <div class="swiper-button-prev d-none d-md-block"></div>
      <div class="swiper-button-next d-none d-md-block"></div>
      <div class="swiper-scrollbar"></div>
    </div>
    <!-- 推薦導覽 -->
    <div class="container my-5">
      <div class="row">
        <div class="recommend col-12 col-md-4">
          <div class="wrapper">
            <router-link tag="div" to="/shop" class="recommend-bg recommend-bg-1">
            </router-link>
          </div>
          <div class="text-center">
            <router-link tag="button" to="/shop" class="recommend-btn h5">
              <p class="recommend-text-1 m-0 d-none d-md-block">New Arrival</p>
              <p class="recommend-text-2 m-0">新品上市</p>
            </router-link>
          </div>
        </div>
        <div class="recommend col-12 col-md-4">
          <div class="wrapper">
            <router-link tag="div" to="/shop" class="recommend-bg recommend-bg-2">
            </router-link>
          </div>
          <div class="text-center">
            <router-link tag="button" to="/shop" class="recommend-btn h5">
              <p class="recommend-text-1 m-0 d-none d-md-block">Hot Item</p>
              <p class="recommend-text-2 m-0">熱銷推薦</p>
            </router-link>
          </div>
        </div>
        <div class="recommend col-12 col-md-4">
          <div class="wrapper">
            <router-link tag="div" to="/shop" class="recommend-bg recommend-bg-3">
            </router-link>
          </div>
          <div class="text-center">
            <router-link tag="button" to="/shop" class="recommend-btn h5">
              <p class="recommend-text-1 m-0 d-none d-md-block">On Sale</p>
              <p class="recommend-text-2 m-0">特價商品</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 限時優惠 -->
    <div class="sale promo justify-content-center align-items-center text-center">
      <div class="sale-content">
          <h3 class="stroke">
            <span>special promo</span> <br/> Autumn Sale
          </h3>
          <ul class="countdown stroke">
            <li class="countdown-item"><p id="week"></p>weeks</li>
            <li class="countdown-item"><p id="days"></p>days</li>
            <li class="countdown-item"><p id="hours"></p>Hours</li>
            <li class="countdown-item"><p id="minutes"></p>Minutes</li>
            <li class="countdown-item"><p id="seconds"></p>Seconds</li>
          </ul>
          <button class="button button-animated bg-biwacha"
          data-toggle="modal"
          data-target="#saleModal">
            無限時優惠
          </button>
      </div>
    </div>
    <!-- 分類導覽 -->
    <div class="category">
        <div class="row m-0">
          <div class="col-md-8 p-0">
            <div class="row m-0">
              <div class="col-6 col-md-5 p-0 px-2">
                <div class="wrapper">
                  <router-link tag="div" to="/shop" class="category-bg category-tops">
                    <div class="category-shadow">
                      <div class="category-text stroke">Tops</div>
                    </div>
                  </router-link>
                </div>
              </div>
              <div class="col-6 col-md-7 p-0 px-2">
                <div class="wrapper">
                  <router-link tag="div" to="/shop" class="category-bg category-coat">
                    <div class="category-shadow">
                      <div class="category-text stroke">Outers</div>
                    </div>
                  </router-link>
                </div>
              </div>
              <div class="col-6 col-md-7 col-lg-8 p-0 px-2">
                <div class="wrapper">
                  <router-link tag="div" to="/shop" class="category-bg category-shoes">
                    <div class="category-shadow">
                      <div class="category-text stroke">Shoes</div>
                    </div>
                  </router-link>
                </div>
              </div>
              <div class="col-6 col-md-5 col-lg-4 p-0 px-2">
                <div class="wrapper">
                  <router-link tag="div" to="/shop" class="category-bg category-bottoms">
                    <div class="category-shadow">
                      <div class="category-text stroke"><span>Bottoms</span></div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 p-0">
            <div class="row m-0">
              <div class="col-6 col-md-12 p-0 px-2">
                <div class="wrapper">
                  <router-link tag="div" to="/shop" class="category-bg category-accessories">
                    <div class="category-shadow">
                      <div class="category-text stroke"><span>Accessories</span></div>
                    </div>
                  </router-link>
                </div>
              </div>
              <div class="col-6 col-md-12 p-0 px-2">
                <div class="wrapper">
                  <router-link tag="div" to="/shop" class="category-bg category-suit">
                    <div class="category-shadow">
                      <div class="category-text stroke">Suit</div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <!-- 折價優惠 -->
    <div class="sale discount justify-content-center align-items-center text-center">
      <div class="sale-content">
          <h3 class="stroke">
            Special Offer <br /> <span>特價優惠</span> <br>
          </h3>
          <p class="stroke">
            <i class="fas fa-search-dollar mr-3"></i>結帳金額滿
            <strong class="text-danger"> $3000 </strong>元
            <br>
            <i class="fas fa-thumbs-up mr-3"></i>即可使用優惠
            <strong class="text-danger"> 30% OFF </strong>折扣
          </p>
          <router-link tag="button" to="/shop"
            class="button button-animated bg-biwacha">
            立即購物
          </router-link>
      </div>
    </div>
    <!-- 店面位置 -->
    <div class="container py-5" id="location">
      <div class="row justify-content-center align-items-center ">
        <h2 class="d-md-none">店面位置<i class="fas fa-map-marker-alt ml-3"></i></h2>
        <div class="col-12 col-md-7 ">
          <div class="map">
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2814.3265843174277!2d121.54883004515727!3d25.04214824382953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abc50ad89187%3A0xd1bbed18c5665961!2z5b-g5a2d5pWm5YyW56uZ!5e0!3m2!1szh-TW!2stw!4v1561515120612!5m2!1szh-TW!2stw"
            frameborder="0" allowfullscreen>
            </iframe>
          </div>
        </div>
        <div class="col-12 col-md-5">
          <div class="content">
            <h2 class="d-none d-md-block">店面位置<i class="fas fa-map-marker-alt ml-3"></i></h2>
            <p>台北市大安區忠孝東路四段182號
              <br>
              <span>
                Mon - Fri, 8:30am - 10:30pm
                <br>
                Saturday, 8:30am - 10:30pm
                <br>
                Sunday, 8:30am - 10:30pm
              </span>
            </p>
            <button class="button bg-konjyo">
              <a href="http://tinyurl.com/y2ypnvg3" target="_blank">
              立即前往
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Swiper from 'swiper';
import Modal from '@/components/forestage/Modal.vue';
import Header from '@/components/forestage/Header.vue';

export default {
  data() {
    return {
      loginStatus: false,
      cart: [],
      cartitem: [],
      orderData: [],
      orderStatus: '',
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const getSite = sessionStorage.getItem('couponModal');
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.cartitem = response.data.data.carts.length;
        if (getSite == null) {
          $('#saleModal').modal('show');
          sessionStorage.setItem('couponModal', 'coupon');
        }
        // console.log('購物車資料', response.data)
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
      vm.loginStatus = item;
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
    countdowntimer() {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const week = day * 7;
      const countDown = new Date('Oct 08, 2020 00:00:00').getTime();
      const x = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDown - now;
        $('#week').html(Math.floor(distance / week));
        $('#days').html(Math.floor((distance % week) / day));
        $('#hours').html(Math.floor((distance % day) / hour));
        $('#minutes').html(Math.floor((distance % hour) / minute));
        $('#seconds').html(Math.floor((distance % minute) / second));
        if (distance < 0) {
          clearInterval(x);
          $('.countdown-timer').html('活動已經結束');
        }
      }, second);
    },
  },
  mounted() {
    new Swiper('.swiper-container', { // eslint-disable-line no-new
      // Optional parameters
      effect: 'fade',
      loop: true,
      speed: 1000,
      // auto
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
      },
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  },
  created() {
    this.getCart();
    this.getLogin();
    this.countdowntimer();
  },
  components: {
    Modal,
    Header,
  },
};
</script>
