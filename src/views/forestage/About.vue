<template>
  <div>
    <Modal :navCart="cart"  @signIn="login" @userLogin="getLogin" :orderList="orderData" />
    <Header class="sticky-top"  :navCartItem="cartitem" :navSignin="loginStatus" @signIn="login"
    @order="getOrder" :orderButton="orderStatus" />
    <div class="about" style="overflow: hidden;">
      <div class="about-bg align-items-center justify-content-center">
            <h2 class="stroke animated fadeInUp">about us</h2>
      </div>
      <div class="container py-5">
        <div class="row mb-5">
          <div class="col-12">
            <div class="about-title">
              <h3>How We Started</h3>
                <p>
                  Founded in 1990 by designer Kings Man, we've always believed in the
                  power of locally made goods. The quality of the craftsmanship and the
                  local artisans we employ are what make GentSkin our mission in life.
                </p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 about-text">
              <div id="quality" class="fadein-left animated">
                <h3>卓越品質</h3>
                <p>
                  Source only the finest materials. And share those stories with
                  you—down to the true cost of every product we make. It’s a new way
                  of doing things.
                </p>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <img src="../../assets/images/about/about-photo.jpg"
                id="quality-photo"
                alt="quality"
                class="about-img fadein-right animated"/>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <img src="../../assets/images/about/about-photo2.jpg"
                id="design-photo"
                alt="design"
                class="about-img fadein-left animated"/>
            </div>
            <div class="col-md-6 about-text">
              <div id="design" class="fadein-right animated">
                <h3>設計理念</h3>
                <p>
                  We’re not big on trends. We want you to wear our pieces for years,
                  even decades, to come. That’s why we source the finest materials and
                  factories for our timeless products.
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 about-text">
              <div id="policy" class="fadein-left animated">
                <h3>道德方針</h3>
                <p>
                  We work with the best factories around the world. We visit them
                  often and build strong personal relationships with the owners. Each
                  factory is given a compliance audit to evaluate factors like fair
                  wages, reasonable hours, and environment.
                </p>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <img src="../../assets/images/about/about-photo4.jpg"
                id="policy-photo"
                alt="policy"
                class="about-img fadein-right animated"/>
            </div>
          </div>
        </div>
        <div class="row text-center fadein-up animated mb-5">
          <div class="col-12 mb-5">
            <h3> Our Team </h3>
          </div>
          <div class="col-6 col-md-3">
            <div class="team bg-dark">
              <img
                src="../../assets/images/about/about-photo10.jpg"
                class="w-100"
                alt="CEO"
              />
              <p class="py-4 m-0">
                <span>CEO & Founder</span>
              </p>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="team bg-dark">
              <img
                src="../../assets/images/about/about-photo6.jpg"
                class="w-100"
                alt="..."
              />
              <p class="py-4 m-0">
                <span>Marketing & PR</span>
              </p>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="team bg-dark">
              <img
                src="../../assets/images/about/about-photo8.jpg"
                class="w-100"
                alt="..."
              />
              <p class="py-4 m-0">Distribution</p>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="team bg-dark">
              <img
                src="../../assets/images/about/about-photo9.jpg"
                class="w-100"
                alt="..."
              />
              <p class="py-4 m-0">Photographer</p>
            </div>
          </div>
        </div>
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
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.cartitem = response.data.data.carts.length;
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
    scroll() {
      const symbol = '#';
      const scrollPos = $(window).scrollTop();
      const windowHeight = $(window).height();
      // console.log('目前', scrollPos + windowHeight);
      $('.fadein-left').each((i, item) => {
        const target = symbol + $(item).attr('id');
        const targerPos = $(target).offset().top;
        if (targerPos <= scrollPos + windowHeight) {
          $(item).addClass('fadeInLeft');
        }
        // console.log('各個id', target);
        // console.log('各個位置', targerPos);
      });
      $('.fadein-right').each((i, item) => {
        const target = symbol + $(item).attr('id');
        const targerPos = $(target).offset().top;
        if (targerPos <= scrollPos + windowHeight) {
          $(item).addClass('fadeInRight');
        }
      });
      if ($('.fadein-up').offset().top <= scrollPos + windowHeight) {
        $('.fadein-up').addClass('fadeInUp');
      }
    },
  },
  created() {
    this.getCart();
    this.getLogin();
    window.addEventListener('scroll', this.scroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll);
  },
  components: {
    Modal,
    Header,
  },
};
</script>
