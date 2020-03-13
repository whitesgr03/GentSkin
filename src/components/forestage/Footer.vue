<template>
  <div>
    <div class="footer">
      <div class="container">
        <!-- 介紹與服務 -->
        <div class="row mb-5">
          <div class="col-lg-6 d-none d-lg-block">
            <div class="d-flex flex-column">
              <h4 class="mb-5">
                關於GentSkin
              </h4>
              <p>
                我們的故事始於1990年，在一個小工作室裡，
                我們的品牌誕生了，我們使用最頂級的材料，聘請最卓越的手工藝師傅，
                我們對獨特設計和協作的熱情將我們的願景和商品帶入了生活，
                為的就是使顧客在 GentSkin 能夠找到最合適的商品，
              </p>
            </div>
          </div>
          <div class="col col-lg-6">
            <div class="row justify-content-around">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <h4 class="mb-4">
                    問題協助
                  </h4>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link"
                  @click.prevent="$bus.$emit('routerLink','/helper')">
                    購買及支付
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link"
                  @click.prevent="$bus.$emit('routerLink','Helper', '#Q2' )">
                    訂單及物流
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link"
                  @click.prevent="$bus.$emit('routerLink','Helper', '#Q3' )">
                    售後服務
                  </a>
                </li>
              </ul>
              <ul class="nav flex-column">
                <li class="nav-item">
                  <h4 class="mb-4">
                    客戶服務
                  </h4>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link"
                  @click.prevent="$bus.$emit('routerLink','/contact')">
                    聯繫我們
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link"
                  @click.prevent="$bus.$emit('routerLink','Contact', '.location' )">
                    店面查詢
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 個人連結 -->
        <div class="d-flex flex-column align-items-center">
            <ul class="nav">
              <li class="nav-item">
                <a href="https://tinyurl.com/rdejmwv" target="_blank"
                class="nav-link">
                  <i class="fab fa-lg fa-github"></i>
                </a>
              </li>
              <li class="nav-item">
                <a href="https://tinyurl.com/qmhf5sd" target="_blank"
                class="nav-link">
                  <i class="fab fa-lg fa-linkedin"></i>
                </a>
              </li>
            </ul>
            <!-- 員工登入 -->
            <router-link to="/admin/products" class="d-md-inline-block d-none" >
              &copy; 2020 - GentSkin
              <i class="fas fa-user-tie"></i>
            </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
