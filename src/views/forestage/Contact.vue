<template>
  <div>
    <div class="contact">
      <div class="contact-bg align-items-center justify-content-center">
            <h2 class="stroke animated fadeInUp">Contant Us</h2>
      </div>
      <div class="container py-5">
        <!-- 店面位置 -->
        <div class="location">
          <h2 class="text-center mb-5">店面位置</h2>
          <iframe class="location-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2814.3265843174277!2d121.54883004515727!3d25.04214824382953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abc50ad89187%3A0xd1bbed18c5665961!2z5b-g5a2d5pWm5YyW56uZ!5e0!3m2!1szh-TW!2stw!4v1561515120612!5m2!1szh-TW!2stw"
          frameborder="0" allowfullscreen>
          </iframe>
          <div class="location-info">
            <div class="row">
              <div class="col-lg-6">
                <p>
                  <i class="fas fa-map-marker-alt mr-3"></i>
                  台北市大安區忠孝東路四段182號
                </p>
                <p>
                  <i class="fas fa-phone mr-2"></i>
                  0916628955
                </p>
              </div>
              <div class="col-lg-6 pl-5 text-center">
                <p>營業時間：</p>
                <p>周一 - 周五 , 8:30am - 10:30pm</p>
                <p>周六 , 周日 8:30am - 11:00pm</p>
                <p>周日 , 8:30am - 10:00pm</p>
              </div>
            </div>
            <a href="http://tinyurl.com/y2ypnvg3" target="_blank"
            class="location-button button button-slide p-2">
              立即前往
            </a>
          </div>
        </div>

        <!-- 聯繫表單 -->
        <form class="form">
          <div class="pt-5 text-center">
            <p>需要幫助嗎？可以在
              <router-link to="/helper" class="text-info">
                問題協助
              </router-link>
              中找尋你所遇到的問題。</p>
            <p>有任何問題請填寫下面表格，我們將盡快與您連絡。</p>
          </div>
          <div class="form-row justify-content-center">
            <div class="col-6">
              <label for="userName" class="label">聯絡人姓名
                <input id="userName" class="input" type="text"
                  placeholder="請輸入姓名" />
              </label>
            </div>
            <div class="col-6">
              <label for="userTel" class="label">聯絡人電話
                <input id="userTel" class="input" type="tel"
                  placeholder="請輸入電話" />
              </label>
            </div>
            <div class="col-12">
              <label for="userEmail" class="label">聯絡人信箱
                <input id="userEmail" class="input" type="email"
                  placeholder="請輸入信箱" />
              </label>
            </div>
            <div class="col-12">
              <label for="userMessage" class="label">訊息內容
                <textarea id="userMessage" class="input" rows="5"
                style="resize: none;"
                  placeholder="請在此輸入內容" />
              </label>
            </div>
            <button type="submit" class="button button-slide">確認送出</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
    };
  },
  methods: {
    scroll() {
      // 從Footer點選後下拉至目標
      let height = 0;
      const w = window.innerWidth;
      if (w <= 1023) {
        height = 112;
      } else {
        height = 32;
      }
      if (this.$route.params.scroll !== undefined) {
        const targerPos = $(`${this.$route.params.scroll}`).offset().top;
        $('html, body').animate({ scrollTop: (targerPos - height) }, 400);
      }
    },
  },
  mounted() {
    this.scroll();
  },
};
</script>
