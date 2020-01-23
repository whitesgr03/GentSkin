<template>
  <div>
    <Modal :navCart="cart" @signIn="login" @userLogin="getLogin" :orderList="orderData"/>
    <Header class="sticky-top"  :navCartItem="cartitem" :navSignin="loginStatus" @signIn="login"
    @order="getOrder" :orderButton="orderStatus"/>
    <div class="article">
      <div class="article-bg align-items-center justify-content-center">
            <h2 class="stroke animated fadeInUp">articles</h2>
      </div>
    </div>
    <div class="container py-5">
      <div class="row">
          <div class="col-md-6 col-lg-4 fadein-up animated slow">
            <div class="wrapper">
              <img
                src="../../assets/images/article/article-1.jpg"
                class="article-img"
                alt="20191001"
              />
            </div>
            <div class="article-title">
              <h5>
                <a href="#">初秋換季怎麼搭？連結嶄新印象</a>
              </h5>
              <p>2019-10-01</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 fadein-up animated slow">
            <div class="wrapper">
              <img
                src="../../assets/images/article/article-2.jpg"
                class="article-img"
                alt="20190917"
              />
            </div>
            <div class="article-title">
              <h5>
                <a href="#">男生必學的「花襯衫穿搭」</a>
              </h5>
              <p>2019-09-17</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 fadein-up animated slow">
            <div class="wrapper">
              <img
                src="../../assets/images/article/article-3.jpg"
                class="article-img"
                alt="20190903"
              />
            </div>
            <div class="article-title">
              <h5>
                <a href="#">讓「西裝褲」成為你的日常穿搭選項！</a>
              </h5>
              <p>2019-09-03</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 fadein-up animated slow">
            <div class="wrapper">
              <img
                src="../../assets/images/article/article-4.jpg"
                class="article-img"
                alt="20190822"
              />
            </div>
            <div class="article-title">
              <h5>
                <a href="#">揮別老氣，搭配時尚都會Look</a>
              </h5>
              <p>2019-08-22</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 fadein-up animated slow h-100">
            <div class="wrapper">
              <img
                src="../../assets/images/article/article-5.jpg"
                class="article-img"
                alt="20190806"
              />
            </div>
            <div class="article-title">
              <h5>
                <a href="#">打造成熟時髦的紳士品格！</a>
              </h5>
              <p>2019-08-06</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 fadein-up animated slow">
            <div class="wrapper">
              <img
                src="../../assets/images/article/article-6.jpg"
                class="article-img"
                alt="20190720"
              />
            </div>
            <div class="article-title">
              <h5>
                <a href="#">適合日常穿搭的「皮鞋」，搞定所有場合！</a>
              </h5>
              <p>2019-07-20</p>
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
      const width = $(window).width();
      if (width > 992) {
        // const symbol = '#';
        const scrollPos = $(window).scrollTop();
        const windowHeight = $(window).height();
        $('.fadein-up').each((i, item) => {
        // const target = symbol + $(item).attr('id');
        // const target = item;
          const targerPos = $(item).offset().top;
          if (targerPos <= scrollPos + windowHeight) {
            $(item).addClass('fadeInUp');
          }
        });
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
