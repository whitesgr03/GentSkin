<template>
  <div>
    <Navbar :navCart="cart" :navCartItem="cartitem" />
    <Menubar class="sticky-top" :navCart="cart" :navCartItem="cartitem"/>

    <div
      class="jumbotron jumbotron-fluid d-flex align-items-center justify-content-center mb-0 about-1"
    >
      <div class="container">
        <div class="text-center">
          <h3
            class="stroke"
            style="font-size: 4rem"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            ABOUT US
          </h3>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="text-center py-5" data-aos="fade-up" data-aos-duration="1500">
        <h2 class="text-black mb-3" style="font-size:3rem;">How We Started</h2>
        <p class="h5">
          Founded in 1990 by designer Kings Man, we've always believed in the
          power of locally made goods. The quality of the craftsmanship and the
          local artisans we employ are what make GentSkin our mission in life.
        </p>
      </div>

      <div class="row py-5">
        <div
          class="col-6 align-self-center"
          data-aos="fade-right"
          data-aos-duration="1500"
          data-aos-offset="200"
        >
          <h3 style="font-size:2rem;">卓越品質</h3>
          <p>
            Source only the finest materials. And share those stories with
            you—down to the true cost of every product we make. It’s a new way
            of doing things.
          </p>
        </div>
        <div
          class="col-6 d-flex justify-content-end"
          data-aos="fade-left"
          data-aos-duration="1500"
        >
          <img
            src="../../assets/images/about/about-photo.jpg"
            alt=""
            style="width:500px;"
          />
        </div>
      </div>
      <div class="row py-3">
        <div class="col-6" data-aos="fade-right" data-aos-duration="1500">
          <img
            src="../../assets/images/about/about-photo2.jpg"
            alt=""
            style="height:700px;"
          />
        </div>
        <div
          class="col-6 align-self-center"
          data-aos="fade-left"
          data-aos-duration="1500"
          data-aos-offset="100"
        >
          <h3 style="font-size:2rem;">設計理念</h3>
          <p class="">
            We’re not big on trends. We want you to wear our pieces for years,
            even decades, to come. That’s why we source the finest materials and
            factories for our timeless products.
          </p>
        </div>
      </div>
      <div class="row py-3">
        <div
          class="col-6 align-self-center"
          data-aos="fade-right"
          data-aos-duration="1500"
          data-aos-offset="200"
        >
          <h3 style="font-size:2rem;">道德方針</h3>
          <p>
            We work with the best factories around the world. We visit them
            often and build strong personal relationships with the owners. Each
            factory is given a compliance audit to evaluate factors like fair
            wages, reasonable hours, and environment.
          </p>
        </div>
        <div
          class="col-6 d-flex justify-content-end"
          data-aos="fade-left"
          data-aos-duration="1500"
        >
          <img
            src="../../assets/images/about/about-photo4.jpg"
            alt=""
            style="height:700px;"
          />
        </div>
      </div>

      <div class=" pt-5">
        <h2
          class="text-black text-center"
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-offset="100"
        >
          Our Team
        </h2>
      </div>
      <div
        class="row py-5"
        data-aos="fade-left"
        data-aos-duration="1500"
        data-aos-offset="300"
      >
        <div class="col-3">
          <div class="bg-dark rounded">
            <img
              src="../../assets/images/about/about-photo10.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <p class="card-text text-center">CEO & Founder</p>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="rounded  bg-dark">
            <img
              src="../../assets/images/about/about-photo6.jpg"
              class="card-img-top "
              alt="..."
            />
            <div class="card-body">
              <p class="card-text text-center">Marketing & PR</p>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="rounded  bg-dark w-100">
            <img
              src="../../assets/images/about/about-photo8.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <p class="card-text text-center">Shipping & Distribution</p>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="rounded  bg-dark w-100">
            <img
              src="../../assets/images/about/about-photo9.jpg"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <p class="card-text text-center">Photographer</p>
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
