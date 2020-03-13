<template>
  <div>
    <div class="about" style="overflow: hidden;">
      <div class="about-bg align-items-center justify-content-center">
            <h2 class="stroke animated fadeInUp">about us</h2>
      </div>
      <div class="container py-5">
        <div class="about-title mt-5">
          <div class="mb-3 about-title-animate">
            <h3>從零開始</h3>
          </div>
          <p>
            我們的故事始於1990年，在一個小工作室裡，
            我們的品牌誕生了，我們使用最頂級的材料，聘請最卓越的手工藝師傅，
            我們對獨特設計和協作的熱情將我們的願景和商品帶入了生活，
            為的就是使顧客在 GentSkin 能夠找到最合適的商品，
          </p>
          </div>
          <div class="row mb-5">
            <div class="col-md-5 about-text">
              <div id="quality" class="fadein-left">
                <h3 class="mb-3">品質</h3>
                <p>
                  我們的產品集結了最好的材料和驚人的設計，創造出非常特別的商品。
                  我們關心且注重品質，創造每個人都可以享受的獨特商品。
                </p>
              </div>
            </div>
            <div class="col-12 col-md-7">
              <img src="../../assets/images/about/about-quality.jpg"
                id="quality-photo"
                alt="quality"
                class="about-img fadein-right"/>
            </div>
          </div>
          <div class="row mb-5">
            <div class="col-12 col-md-7">
              <img src="../../assets/images/about/about-design.jpg"
                id="design-photo"
                alt="design"
                class="about-img fadein-left"/>
            </div>
            <div class="col-md-5 about-text">
              <div id="design" class="fadein-right">
                <h3 class="mb-3">設計</h3>
                <p>
                  每種商品都色彩豐富，創意無限，是受到我們每天所看見的事物所啟發的靈感，
                  每種商品都代表著我們對生活世界的熱愛。希望它們也能讓您的生活更佳完美。
                </p>
              </div>
            </div>
          </div>
          <div class="row text-center mb-lg-5">
            <div class="col-12 mb-5">
              <h3 class="fadein-up"> 團隊夥伴 </h3>
            </div>
            <div class="col-6 col-md-3">
              <div class="team bg-dark fadein-up" style="transition-delay: .3s;">
                <img
                  src="../../assets/images/about/about-teammate-1.jpg"
                  class="w-100"
                  alt="CEO"
                />
                <p class="py-4 m-0">
                  <span>創辦人</span>
                </p>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="team bg-dark fadein-up" style="transition-delay: .6s;">
                <img
                  src="../../assets/images/about/about-teammate-2.jpg"
                  class="w-100"
                  alt="..."
                />
                <p class="py-4 m-0">
                  <span>公關</span>
                </p>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="team bg-dark fadein-up" style="transition-delay: .9s;">
                <img
                  src="../../assets/images/about/about-teammate-3.jpg"
                  class="w-100"
                  alt="..."
                />
                <p class="py-4 m-0">行銷</p>
              </div>
            </div>
            <div class="col-6 col-md-3">
              <div class="team bg-dark fadein-up" style="transition-delay: 1.2s;">
                <img
                  src="../../assets/images/about/about-teammate-4.jpg"
                  class="w-100"
                  alt="..."
                />
                <p class="py-4 m-0">編輯</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
  methods: {
    scroll() {
      // 捲動頁面執行動畫
      const symbol = '#';
      const scrollPos = $(window).scrollTop();
      const windowHeight = $(window).height();
      // 左
      $('.fadein-left').each((i, item) => {
        const target = symbol + $(item).attr('id');
        const targerPos = $(target).offset().top;
        if (targerPos <= scrollPos + windowHeight) {
          $(item).addClass('fadein-left-show');
        }
      });
      // 右
      $('.fadein-right').each((i, item) => {
        const target = symbol + $(item).attr('id');
        const targerPos = $(target).offset().top;
        if (targerPos <= scrollPos + windowHeight) {
          $(item).addClass('fadein-right-show');
        }
      });
      // 上
      if ($('.fadein-up').offset().top <= scrollPos + windowHeight) {
        $('.fadein-up').addClass('fadein-up-show');
      }
      // 標題框
      if ($('.about-title-animate').offset().top <= scrollPos + windowHeight) {
        $('.about-title-animate').addClass(' about-title-active');
      }
    },
  },
  created() {
    window.addEventListener('scroll', this.scroll);
    $('html, body').animate({ scrollTop: 0 }, 1);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll);
  },
};
</script>
