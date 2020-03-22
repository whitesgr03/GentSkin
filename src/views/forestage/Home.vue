<template>
  <div>
    <div class="home">
      <!-- 輪播 -->
      <div id="carouselControls" class="carousel slide carousel-fade"
      data-ride="carousel" style="height: 100vh;">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner h-100">
          <div class="carousel-item active carousel-img carousel-img-1">
          <div class="carousel-content">
              <h3 class="stroke mb-5">
                New Collection
              </h3>
              <a href="#" class="carousel-button"
              @click.prevent="$bus.$emit('categorie', 'collections')">
                立即選購
              </a>
            </div>
          </div>
          <div class="carousel-item carousel-img carousel-img-2">
          <div class="carousel-content">
              <h3 class="stroke mb-5">
                Selfhood Style
              </h3>
              <router-link to="/article" class="carousel-button">
                主題文章
              </router-link>
            </div>
          </div>
          <div class="carousel-item carousel-img carousel-img-3">
          <div class="carousel-content">
              <h3 class="stroke mb-5">
                New Season Arrivals
              </h3>
              <a href="#" class="carousel-button"
              @click.prevent="$bus.$emit('categorie', 'all')">
                檢視單品
              </a>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselControls"
        role="button" data-slide="prev">
          <i class="fas fa-3x fa-chevron-left"></i>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselControls"
        role="button" data-slide="next">
          <i class="fas fa-3x fa-chevron-right"></i>
          <span class="sr-only">Next</span>
        </a>
      </div>

      <!-- 推薦導覽 -->
      <div class="container-lg">
        <div class="recommend">
          <h3 class="text-center m-0">選購專區</h3>
          <div class="row justify-content-center">
            <div class="col-6 col-lg-4">
              <div class="wrap">
                <a href="#" class="recommend-img recommend-img-1"
                @click.prevent="$bus.$emit('categorie', 'all')">
                  <div class="wrap-shadow">
                    <button type="button" class="button button-active">
                      新品推薦
                    </button>
                  </div>
                </a>
              </div>
            </div>
            <div class="col-6 col-lg-4">
              <div class="wrap">
                <a href="#" class="recommend-img recommend-img-2"
                @click.prevent="$bus.$emit('categorie', 'all')">
                  <div class="wrap-shadow">
                    <button type="button" class="button button-active">
                      特價商品
                    </button>
                  </div>
                </a>
              </div>
            </div>
            <div class="col-6 col-lg-4">
              <div class="wrap">
                <a href="#" class="recommend-img recommend-img-3"
                @click.prevent="$bus.$emit('categorie', 'all')">
                  <div class="wrap-shadow">
                    <button type="button" class="button button-active">
                      人氣商品
                    </button>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 優惠資訊(上) -->
      <div class="saleInfo">
        <div class="saleInfo-img saleInfo-img-1">
          <div class="saleInfo-content saleInfo-content-left">
            <h4>季節特惠</h4>
            <p class="m-0">因應季節變化，凡購買商品直接享有9折優惠 !</p>
          </div>
        </div>
      </div>

      <!-- 特色商品輪播 -->
      <div class="container-lg">
        <div class="featured" >
          <h3 class="text-center">精選系列</h3>
          <carousel :per-page="page" :paginationEnabled="false" :scrollPerPage="false"
          :mouse-drag="true" :autoplay="true" :autoplayTimeout="3500"
          :loop="true" :speed="3000">
              <slide v-for="item in products" :key="item.id" class="p-2" style="height: 50vh;">
                <div class="featured-img"
                  :style="{backgroundImage: 'url(' + item.imageUrl + ')' }">
                    <div class="wrap-shadow">
                      <div class="featured-content">
                        <div class="featured-text">
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
                        <router-link :to ="{ path: `/content/${item.category}/${item.Item}`,
                        query: { id :`${item.id}` }}" class="button button-slide p-2">
                          查看商品
                        </router-link>
                      </div>
                    </div>
                  </div>
              </slide>
          </carousel>

        </div>
      </div>

      <!-- 優惠資訊(下) -->
      <div class="saleInfo">
        <div class="saleInfo-img saleInfo-img-2">
          <div class="saleInfo-content saleInfo-content-right">
            <h4>專屬優惠</h4>
            <p class="m-0">
              結帳時使用優惠碼 GentSkin <br class="d-sm-none">
              立即享有5折兼享免運優惠 !
            </p>
          </div>
        </div>
      </div>

      <!-- 分類導覽 -->
      <div class="category">
        <h3 class="text-center m-0">商品分類</h3>
        <div class="row m-0 py-4">
          <div class="col-6">
            <div class="row">
              <div class="col-12 pb-lg-5 pl-md-0 category-wrap-h65">
                <div class="wrap">
                  <a href="#" class="category-img category-img-tops"
                  @click.prevent="$bus.$emit('categorie', 'tops', 't-shirt')">
                    <div class="wrap-shadow">
                      <p class="underline">上衣</p>
                    </div>
                  </a>
                </div>
              </div>
              <div class="col-md-6 pl-md-0 category-wrap-h35">
                <div class="wrap">
                  <a href="#" class="category-img category-img-shoes"
                  @click.prevent="$bus.$emit('categorie', 'accessories', 'shoes')">
                    <div class="wrap-shadow">
                      <p class="underline">鞋類</p>
                    </div>
                  </a>
                </div>
              </div>
              <div class="col-md-6 category-wrap-h35">
                <div class="wrap">
                  <a href="#" class="category-img category-img-bottoms"
                  @click.prevent="$bus.$emit('categorie', 'bottoms')">
                    <div class="wrap-shadow">
                      <p class="underline">下身</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-md-6 category-wrap-h35">
                <div class="wrap">
                  <a href="#" class="category-img category-img-coat"
                  @click.prevent="$bus.$emit('categorie', 'tops', 'outer')">
                    <div class="wrap-shadow">
                      <p class="underline">外套</p>
                    </div>
                  </a>
                </div>
              </div>
              <div class="col-md-6 pr-md-0 category-wrap-h35">
                <div class="wrap">
                  <a href="#" class="category-img category-img-accessories"
                  @click.prevent="$bus.$emit('categorie', 'accessories', 'hat')">
                    <div class="wrap-shadow">
                      <p class="underline">配件</p>
                    </div>
                  </a>
                </div>
              </div>
              <div class="col-12 pt-lg-5 pr-md-0 category-wrap-h65">
                <div class="wrap">
                  <a href="#" class="category-img category-img-suit"
                  @click.prevent="$bus.$emit('categorie', 'tops', 'suit')">
                    <div class="wrap-shadow">
                      <p class="underline">西裝</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 主題文章 -->
      <div class="container-lg">
        <div class="theme">
          <h3 class="text-center m-0">主題文章</h3>
          <div class="row">
            <div class="col-sm-6 col-lg-4">
              <div class="theme-wrap">
                <div class="wrap">
                  <router-link to="/article" class="theme-img theme-img-1"></router-link>
                </div>
                <div class="theme-content p-3">
                  <div>
                    <router-link to="/article" class="h5">男士必學的「燈芯絨穿搭」</router-link>
                    <p class="theme-text">
                      除非您沒有穿著西裝的習慣，否則您會注意到西裝剪裁正在經歷歷史上最大的一次翻新。
                      因為越來越少的人需要正式西裝來工作，所以選擇一套西裝變得越來越著重於風格，
                      而不是著裝要求。這意味著裁縫：比以往更多的選擇，更多的面料，更多的款式。
                      燈芯絨西服是引領這種重新思考的裁縫潮流的新潮。
                    </p>
                  </div>
                  <router-link to="/article" class="underline">
                    閱讀更多
                  </router-link>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="theme-wrap">
                <div class="wrap">
                  <router-link to="/article" class="theme-img theme-img-2"></router-link>
                </div>
                <div class="theme-content p-3">
                  <div>
                    <router-link to="/article" class="h5">讓西裝成為日常穿搭選項！</router-link>
                    <p class="theme-text">
                      無論我們從事什麼職業，我們都從事自我銷售業務。
                      每天，我們都致力於將自己推銷給雇主，客戶和潛在的合作夥伴（無論是專業的人還是浪漫的人）。
                      而且，沒有比這套西裝更具說服力的了，西裝是一件經過適當剪裁和定型的服裝，可以給男人帶來信心，
                      並給其他人帶來對男人的信心。
                    </p>
                  </div>
                  <router-link to="/article" class="underline">
                    閱讀更多
                  </router-link>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4">
              <div class="theme-wrap">
                <div class="wrap">
                  <router-link to="/article" class="theme-img theme-img-3"></router-link>
                </div>
                <div class="theme-content p-3">
                  <div>
                    <router-link to="/article" class="h5">打造成熟時髦的紳士品格！</router-link>
                    <p class="theme-text">
                      他們說，在生活中，您必須發揮自己的能力，這是事實。但是，您也可以通過一些穿搭方式將風格建立層次。
                      一套合適的西裝可以修飾（隱藏）自身的缺點：就像戴著Instagram濾鏡，
                      或者在頭頂上不斷散發出令人讚嘆的光芒四處走動。穿上它，
                      突然之間你就像變成一個完整的男人，完美且煥然一新的感覺。
                    </p>
                  </div>
                  <router-link to="/article" class="underline">
                    閱讀更多
                  </router-link>
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
import $ from 'jquery';
import { Carousel, Slide } from 'vue-carousel';

export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      // 取得所有商品
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      if (this.$route.params.data === 'check') {
        this.$bus.$emit('checkLogin');
      }
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.products = response.data.products.filter(item => item.Item === 'suit');
        }
      });
    },
    winWidth() {
      const vm = this;
      const w = window.innerWidth;
      if (w <= 767) {
        vm.page = 2;
      } else if (w <= 1023) {
        vm.page = 3;
      } else {
        vm.page = 4;
      }
    },
  },
  mounted() {
    $('.carousel').carousel({
      interval: 5000,
      pause: false,
    });
  },
  created() {
    this.getProducts();
    this.winWidth();
    $('html, body').animate({ scrollTop: 0 }, 1);
  },
  components: {
    Carousel,
    Slide,
  },
};
</script>
