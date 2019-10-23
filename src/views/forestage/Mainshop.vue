<template>
  <div>
    <Navbar :navCart="cart" :navCartItem="cartitem" />
    <Menubar class="sticky-top" />
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide carousel-bgc-3 d-flex align-items-center">
          <div class="container">
            <div class="row">
              <div class="col-4" data-aos="fade-up" data-aos-duration="2000">
                <div class="text-center">
                  <h3 class="h2 stroke" style="letter-spacing:15px;">
                    秋季時尚
                  </h3>
                  <h3 class="stroke" style="font-size: 4rem;">
                    CONSCIOUS
                  </h3>
                  <h3
                    class="stroke"
                    style="font-size: 4rem; letter-spacing:5px;"
                  >
                    LIFE
                  </h3>
                </div>
                <div class=" d-flex justify-content-center">
                  <router-link
                    tag="button"
                    to="/journal"
                    class="btn-type mt-3"
                    style="background-color:#B17844;"
                  >
                    閱讀更多
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide carousel-bgc-1 d-flex align-items-center">
          <div class="container ">
            <div class="row justify-content-end">
              <div class="col-4">
                <div class="text-center">
                  <h3 class="h2 stroke" style="letter-spacing:10px;">2019</h3>
                  <h3 class="stroke" style="font-size: 4rem;">
                    YOUR <br />AUTUMN <br />WARDROBE
                  </h3>
                </div>
                <div class=" d-flex justify-content-center">
                  <router-link
                    tag="button"
                    to="/shop"
                    class="btn-type mt-3"
                    style="background-color:#B17844;"
                  >
                    立即選購
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide carousel-bgc-2 d-flex align-items-center">
          <div class="container">
            <div class="row">
              <div class="col-4">
                <div class="text-center">
                  <h3 class="stroke" style="font-size: 3rem ">NEW STYLE</h3>
                  <h3 class="stroke" style="font-size: 4rem">ARRIVALS</h3>
                </div>
                <div class=" d-flex justify-content-center">
                  <router-link
                    tag="button"
                    to="/shop"
                    class="btn-type mt-3"
                    style="background-color:#B17844;"
                  >
                    檢視單品
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-scrollbar"></div>
    </div>

    <div class="container ">
      <div class="row py-5">
        <div class="col-4">
          <div class="card-wrapper">
            <router-link tag="div" to="/shop" class="card-img card-img-1">
            </router-link>
          </div>
          <div class="text-center">
            <router-link
              tag="button"
              to="/shop"
              class="card-btn card-text-1  mt-2"
            >
              <span>New Arrival</span>
            </router-link>
          </div>
        </div>
        <div class="col-4">
          <div class="card-wrapper">
            <router-link tag="div" to="/shop" class="card-img card-img-2">
            </router-link>
          </div>
          <div class="text-center">
            <router-link
              tag="button"
              to="/shop"
              class="card-btn card-text-2  mt-2"
            >
              <span>Hot Item</span>
            </router-link>
          </div>
        </div>
        <div class="col-4">
          <div class="card-wrapper">
            <router-link tag="div" to="/shop" class="card-img card-img-3">
            </router-link>
          </div>
          <div class="text-center">
            <router-link
              tag="button"
              to="/shop"
              class="card-btn card-text-3  mt-2"
            >
              <span>On Sale</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div
      class="jumbotron jumbotron-fluid d-flex justify-content-center align-items-center mb-0 jumbotron-1"
    >
      <div class="container">
        <div class="text-center">
          <h3 class="stroke" style="letter-spacing:5px;">
            SPECIAL PROMO
          </h3>
          <h3 class="stroke" style="font-size: 4rem">Autumn Sale</h3>
          <ul class="p-0 countdown-text">
            <li class="countdown-timer"><span id="week"></span>weeks</li>
            <li class="countdown-timer"><span id="days"></span>days</li>
            <li class="countdown-timer"><span id="hours"></span>Hours</li>
            <li class="countdown-timer"><span id="minutes"></span>Minutes</li>
            <li class="countdown-timer"><span id="seconds"></span>Seconds</li>
          </ul>
        </div>
        <div class=" d-flex justify-content-center">
          <button
            class="btn-type btn-14 mt-3"
            style="background-color:#B17844;"
          >
            限時優惠
          </button>
        </div>
      </div>
    </div>

    <div class="container-fluid px-2 py-5">
      <div class="form-row">
        <div class="col-md-8">
          <div class="form-row">
            <div class="col-md-5 mt-gutter">
              <div class="card-categories">
                <div class="card-image categories-tops">
                  <div class="card-background" style="height: 350px;">
                    <div class="card-label">Tops</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-7 mt-gutter">
              <div class="card-categories">
                <div class="card-image categories-coat">
                  <div class="card-background" style="height: 350px;">
                    <div class="card-label">Outers</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8 mt-gutter">
              <div class="card-categories">
                <div class="card-image categories-suit">
                  <div class="card-background" style="height: 400px;">
                    <div class="card-label">Suit</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 mt-gutter">
              <div class="card-categories">
                <div class="card-image categories-shoes">
                  <div class="card-background" style="height: 400px;">
                    <div class="card-label">Shoes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-row">
            <div class="col-md-12 mt-gutter">
              <div class="card-categories">
                <div class="card-image categories-bottoms">
                  <div class="card-background" style="height: 400px;">
                    <div class="card-label">Bottoms</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12 mt-gutter">
              <div class="card-categories">
                <div class="card-image categories-accessories">
                  <div class="card-background" style="height: 350px;">
                    <div class="card-label">Accessories</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="jumbotron jumbotron-fluid d-flex justify-content-center align-items-center mb-0 jumbotron-2"
    >
      <div class="container">
        <div class="stroke text-center">
          <h3 style="letter-spacing:5px;">
            <span style="font-size: 4rem">OPENING </span
            ><span style="font-size: 3rem"> OFFER</span>
          </h3>
          <div class="my-5" style="font-size: 2.5rem;">
            <P style=" letter-spacing:10px;">
              慶祝開幕
            </P>
            <p><i class="fas fa-check mr-3"></i> 結帳時輸入代碼可享折扣</p>
          </div>
        </div>
        <div class=" d-flex justify-content-center">
          <button class="btn-type mt-3" style="background-color:#B17844;">
            立即查看
          </button>
        </div>
      </div>
    </div>

    <div class="container py-5" id="tag">
      <div class="row">
        <div class="col-md-7">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2814.3265843174277!2d121.54883004515727!3d25.04214824382953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abc50ad89187%3A0xd1bbed18c5665961!2z5b-g5a2d5pWm5YyW56uZ!5e0!3m2!1szh-TW!2stw!4v1561515120612!5m2!1szh-TW!2stw"
            width="100%"
            height="550"
            frameborder="0"
            style="border:0"
            allowfullscreen
          ></iframe>
        </div>
        <div
          class="col-md-5 d-flex align-items-center justify-content-center mt-2"
        >
          <div>
            <h2 class="mb-4">店面位置</h2>
            <p>台北市大安區忠孝東路四段182號</p>
            <p>Mon - Fri, 8:30am - 10:30pm</p>
            <p>Saturday, 8:30am - 10:30pm</p>
            <p>Sunday, 8:30am - 10:30pm</p>
            <a href="http://tinyurl.com/y2ypnvg3" target="_blank">
              <button class="btn-type mt-3" style="background-color:#B17844;">
                立即前往
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Navbar from '@/components/forestage/Navbar.vue'
import Menubar from '@/components/forestage/Menubar.vue'
import Swiper from 'swiper'

export default {
  data() {
    return {
      cart: [],
      cartitem: []
    }
  },
  methods: {
    getCart() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      this.$http.get(api).then(response => {
        vm.cart = response.data.data
        vm.cartitem = response.data.data.carts.length
        // console.log('購物車資料', response.data)
      })
    },
    countdowntimer() {
      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7
      let countDown = new Date('Oct 08, 2020 00:00:00').getTime(),
        x = setInterval(() => {
          let now = new Date().getTime(),
            distance = countDown - now
          $('#week').html(Math.floor(distance / week))
          $('#days').html(Math.floor((distance % week) / day))
          $('#hours').html(Math.floor((distance % day) / hour))
          $('#minutes').html(Math.floor((distance % hour) / minute))
          $('#seconds').html(Math.floor((distance % minute) / second))
          if (distance < 0) {
            clearInterval(x)
            $('.countdown-text').html('活動已經結束')
          }
        }, second)
    }
  },
  created() {
    this.getCart()
    this.countdowntimer()
  },
  mounted() {
    new Swiper('.swiper-container', {
      // Optional parameters
      effect: 'fade',
      loop: true,
      speed: 1000,
      // auto
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      // If we need pagination
      pagination: {
        el: '.swiper-pagination'
      },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar'
      }
    })
  },

  components: {
    Navbar,
    Menubar
  }
}
</script>

<style scoped>
.swiper-container {
  height: 700px;
}
.swiper-button-prev {
  background-image: url(../../assets/images/main/arrow_left.png);
  background-size: 70px 87px;
  width: 70px;
  height: 87px;
  left: -15px;
}
.swiper-button-next {
  background-image: url(../../assets/images/main/arrow_right.png);
  background-size: 70px 87px;
  width: 70px;
  height: 87px;
  right: -15px;
}

.btn-type:after {
  position: absolute;
  border-radius: 19px;
  content: '';
  width: 0;
  height: 100%;
  top: 0;
  right: 0;
  z-index: -1;
  background: #000;
  transition: all 0.3s cubic-bezier(0.42, 0, 1, 1);
}
.btn-type:hover {
  border: 1px solid rgba(255, 255, 255, 0.8);
  color: rgba(255, 255, 255, 0.8);
}
.btn-type:hover:after {
  left: 0;
  width: 100%;
}
</style>
