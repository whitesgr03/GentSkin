<template>
  <div>
    <Navbar :navCart="cart" :navCartItem="cartitem" />
    <Menubar class="sticky-top" />

    <div
      class="jumbotron jumbotron-fluid d-flex align-items-center mb-0 journal-1"
    >
      <div class="container">
        <div class="text-center">
          <h3
            class="stroke"
            style="font-size: 4rem"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            NEWS
          </h3>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row pt-5" data-aos="fade-up" data-aos-duration="1500">
        <div class="col-4" style="margin-bottom: 5rem;">
          <div class="bg-transparent">
            <div class="card-wrapper">
              <div class="card-img">
                <img
                  src="../../assets/images/journal/journal-1.jpg"
                  class="card-img-top"
                  alt="..."
                />
              </div>
            </div>

            <div class="card-body text-center">
              <h5 class="card-title">2019-10-01</h5>
              <a href="#" class="h5 text-white">初秋換季怎麼搭？連結嶄新印象</a>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="bg-transparent">
            <div class="card-wrapper">
              <div class="card-img">
                <img
                  src="../../assets/images/journal/journal-2.jpg"
                  class="card-img-top"
                  alt="..."
                />
              </div>
            </div>
            <div class="card-body text-center">
              <h5 class="card-title">2019-09-17</h5>
              <a href="#" class="h5 text-white">男生必學的「花襯衫穿搭」</a>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="bg-transparent">
            <div class="card-wrapper">
              <div class="card-img">
                <img
                  src="../../assets/images/journal/journal-3.jpg"
                  class="card-img-top"
                  alt="..."
                />
              </div>
            </div>
            <div class="card-body text-center">
              <h5 class="card-title">2019-09-03</h5>
              <a href="#" class="h5 text-white"
                >讓「西裝褲」成為你的日常穿搭選項！</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row pb-5" data-aos="fade-up" data-aos-duration="1500">
        <div class="col-4" style="margin-bottom: 3rem;">
          <div class="bg-transparent">
            <div class="card-wrapper">
              <div class="card-img">
                <img
                  src="../../assets/images/journal/journal-4.jpg"
                  class="card-img-top"
                  alt="..."
                />
              </div>
            </div>
            <div class="card-body text-center">
              <h5 class="card-title">2019-08-22</h5>
              <a href="#" class="h5 text-white">揮別老氣，搭配時尚都會Look </a>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="bg-transparent">
            <div class="card-wrapper">
              <div class="card-img">
                <img
                  src="../../assets/images/journal/journal-5.jpg"
                  class="card-img-top"
                  alt="..."
                />
              </div>
            </div>
            <div class="card-body text-center">
              <h5 class="card-title">2019-08-06</h5>
              <a href="#" class="h5 text-white">打造成熟時髦的紳士品格！</a>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="bg-transparent">
            <div class="card-wrapper">
              <div class="card-img">
                <img
                  src="../../assets/images/journal/journal-6.jpg"
                  class="card-img-top"
                  alt="..."
                />
              </div>
            </div>
            <div class="card-body text-center">
              <h5 class="card-title">2019-07-20</h5>
              <a href="#" class="h5 text-white">
                覺得皮鞋太正式？推薦適合日常穿搭的「皮鞋」，搞定你所有場合！</a
              >
            </div>
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
    }
  },
  created() {
    this.getCart()
  },

  components: {
    Navbar,
    Menubar
  }
}
</script>
