<template>
  <div>
    <div class="helper">
      <div class="helper-bg align-items-center justify-content-center">
          <h2 class="stroke animated fadeInUp">Helper</h2>
      </div>
      <div class="container">
        <div class="row my-5">
          <div class="col-lg-4 d-none d-lg-block">
            <div class="d-flex sticky-top" style="top: 88px; z-index: 1;">
              <ul class="nav m-0">
                <p class="nav-link h4 mb-5">
                  問題導覽
                </p>
                <li class="nav-item">
                  <a class="nav-link scrollTop" href="#Q1">購買及支付</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link scrollTop" href="#Q2">訂單及物流</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link scrollTop" href="#Q3">售後服務</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-8">
            <ul class="nav">
              <li id="Q1" class="nav-item nav-underline h3 mb-5">
                購買及支付
              </li>
              <li class="nav-item">
                <button class="btn"
                type="button" data-toggle="collapse"
                data-target="#Q1-1" aria-expanded="false"
                aria-controls="Q1-1">
                購買流程
                <div class="plus">
                  <div class="horizontal"></div>
                  <div class="vertical"></div>
                </div>
                </button>
                <div class="collapse multi-collapse" id="Q1-1">
                  <div class="collapse-text">
                    <p>您可以瀏覽我們的網站；根據商品分類挑選；或通過搜尋找到您喜愛的商品。</p>
                    <p>選中商品後您可將其加入購物車，然後繼續進行選購。
                      待全部選購完成後，點擊購物車進入結算頁面付款結帳。
                    </p>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <button class="btn"
                type="button" data-toggle="collapse"
                data-target="#Q1-2" aria-expanded="false"
                aria-controls="Q1-2">
                付款方式
                <div class="plus">
                  <div class="horizontal"></div>
                  <div class="vertical"></div>
                </div>
                </button>
                <div class="collapse multi-collapse" id="Q1-2">
                  <div class="collapse-text">
                    <p>我們希望您能獲得輕鬆的線上購物體驗！因此，我們提供您商品免付費服務。</p>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="nav">
              <li id="Q2" class="nav-item nav-underline h3 mb-5">
                訂單及物流
              </li>
              <li class="nav-item">
                <button class="btn"
                type="button" data-toggle="collapse"
                data-target="#Q2-1" aria-expanded="false"
                aria-controls="Q2-1">
                  訂單查詢及處理
                  <div class="plus">
                    <div class="horizontal"></div>
                    <div class="vertical"></div>
                  </div>
                </button>
                <div class="collapse multi-collapse" id="Q2-1">
                  <div class="collapse-text">
                    當您下單成功後，在帳戶的訂單中會得到一個訂單號碼，點擊訂單號碼便可查詢訂單詳情<br>
                    <br>
                    <p>您可於對訂單進行如下更改：</p>
                    <ul>
                      <li>修改商品數量或尺寸：若您下訂了錯誤的商品，您可以在訂單問題中選擇修改數量或尺寸。</li>
                      <li>取消訂單：若您於下定後尚未付款，您可以在訂單問題中選擇取消訂單。</li>
                      <li>申請退換貨：若您對所收到的產品不滿意，您可以在訂單問題中選擇退 / 換貨申請。</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <button class="btn"
                type="button" data-toggle="collapse"
                data-target="#Q2-2" aria-expanded="false"
                aria-controls="Q2-2">
                  配送方式及時間
                  <div class="plus">
                    <div class="horizontal"></div>
                    <div class="vertical"></div>
                  </div>
                </button>
                <div class="collapse multi-collapse" id="Q2-2">
                  <div class="collapse-text">
                    <p>您可以在在帳戶的訂單中查詢所有訂單的物流進度。</p>
                    <p>宅配或貨到付款</p>
                    <ul class="mb-5">
                      <li>下訂單的成立日起預計 2-4 天。</li>
                      <li>惟在天氣狀況不佳及交通道路中斷等配送困難的情況下，送達時間有可能變動。</li>
                    </ul>
                    <p>超商取貨</p>
                    <ul class="mb-5">
                      <li>下訂單的隔天起預計台灣本島為 2-3 天，離島為 4-5 天</li>
                    </ul>
                    <p>※ 確定出貨時將寄送 E-MAIL 通知，到貨日依實際簡訊通知為準。</p>
                    <p>※ 訂單中所有商品到齊後一次發送。</p>
                    <p>※ 離島的商品送達時間會因天氣狀況、飛機及船隻班次而有變動的可能性。</p>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <button class="btn"
                type="button" data-toggle="collapse"
                data-target="#Q2-3" aria-expanded="false"
                aria-controls="Q2-3">
                  運費優惠
                  <div class="plus">
                    <div class="horizontal"></div>
                    <div class="vertical"></div>
                  </div>
                </button>
                <div class="collapse multi-collapse" id="Q2-3">
                  <div class="collapse-text">
                    <p>宅配或貨到付款</p>
                    <ul class="mb-5" style="list-style-type: none;">
                      <li>NT 85 元</li>
                    </ul>
                    <p>超商取貨</p>
                    <ul class="mb-5" style="list-style-type: none;">
                      <li>NT 60 元</li>
                    </ul>
                    單筆訂單金額滿 NT 1200 元即可享免運費。
                  </div>
                </div>
              </li>
            </ul>
            <ul class="nav">
              <li id="Q3" class="nav-item nav-underline h3 mb-5">
                售後服務
              </li>
              <li class="nav-item">
                <button class="btn"
                type="button" data-toggle="collapse"
                data-target="#Q3-1" aria-expanded="false"
                aria-controls="Q3-1">
                  退 / 換貨政策
                  <div class="plus">
                    <div class="horizontal"></div>
                    <div class="vertical"></div>
                  </div>
                </button>
                <div class="collapse multi-collapse" id="Q3-1">
                  <div class="collapse-text">
                      <p>顧客於商品送達的30天內皆可辦理線上換貨，更換同款商品不同尺寸、不同顏色，更換尺寸顏色恕不進行價差找補。</p>
                      <p>顧客於商品送達的7天內皆可辦理線上退貨。</p>
                      <p>如您發現無法使用線上退 / 換貨申請時，請於
                        <router-link to="/contact" tag="a" class="text-info">
                          連繫我們
                        </router-link>
                        填寫表單辦理退 / 換貨。
                      </p>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <button class="btn"
                type="button" data-toggle="collapse"
                data-target="#Q3-2" aria-expanded="false"
                aria-controls="Q3-2">
                  退 / 換貨流程
                  <div class="plus">
                    <div class="horizontal"></div>
                    <div class="vertical"></div>
                  </div>
                </button>
                <div class="collapse multi-collapse" id="Q3-2">
                  <div class="collapse-text">
                    <p>
                      購買商品後於訂單中查看，選擇訂單紀錄中您欲退 / 換貨的訂單編號，
                      於頁面中點選訂單問題即可選擇申請退 / 換貨。
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
      if (this.$route.params.scroll !== undefined) {
        const targerPos = $(`${this.$route.params.scroll}`).offset().top;
        $('html, body').animate({ scrollTop: (targerPos - 60) }, 400);
      }
    },
  },
  mounted() {
    this.scroll();
    $('.helper .btn').click(function dropdowns(e) {
      e.preventDefault();
      if ($(this).find('.plus').hasClass('minus')) {
        $(this).find('.plus').removeClass('minus');
        $(this).removeClass('bg-secondary');
      } else {
        $(this).find('.plus').addClass('minus');
        $(this).addClass('bg-secondary');
      }
    });
    $('.helper .scrollTop').click(function dropdowns(e) {
      e.preventDefault();
      const target = $(this).attr('href');
      const targerPos = $(target).offset().top;
      $('html, body').animate({ scrollTop: (targerPos - 32) }, 400);
    });
  },
  created() {
    $('html, body').animate({ scrollTop: 0 }, 1);
  },
};
</script>
