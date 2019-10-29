<template>
  <div>
    <footer class="py-4 bg-eerie">
      <div class="container">
        <div class="row d-flex justify-content-around mb-5">
          <ul class="nav flex-column">
            <li class="nav-item">
              <span class="nav-link h5 text-white">購物須知</span>
            </li>
            <li class="nav-item">
              <a class="nav-link footer-text" href="#">購買流程</a>
            </li>
            <li class="nav-item">
              <a class="nav-link footer-text" href="#">支付方式</a>
            </li>
            <li class="nav-item">
              <a class="nav-link footer-text" href="#">退貨政策</a>
            </li>
          </ul>
          <ul class="nav flex-column">
            <li class="nav-item">
              <span class="nav-link text-white h5">用戶協助</span>
            </li>
            <li class="nav-item">
              <a class="nav-link footer-text" href="#">客戶服務</a>
            </li>
            <li class="nav-item">
              <a class="nav-link footer-text" href="#">人才招募</a>
            </li>
            <li class="nav-item">
              <a class="nav-link footer-text" href="#">連絡我們</a>
            </li>
          </ul>

          <ul class="nav flex-column ul-mt">
            <div class="h5 nav-link mb-3">訂閱我們以取得最新優惠資訊</div>
            <form class="nav-link mb-4">
              <div class="form-row justify-content-between">
                <input
                  type="email"
                  class="form-control input-color"
                  id="staticEmail"
                  placeholder="email@example.com"
                  style="width:180px; "
                />
                <button
                  type="button"
                  class="btn-type btn-type3"
                  style="padding: 5px 20px;"
                >
                  訂閱
                </button>
              </div>
            </form>
            <div class="d-flex justify-content-between nav-link">
              <a href="#">
                <img
                  src="../../assets/images/footer/facebook.png"
                  alt="facebook link"
                />
              </a>
              <a href="#">
                <img
                  src="../../assets/images/footer/line.png"
                  alt="line link"
                />
              </a>
              <a href="#">
                <img
                  src="../../assets/images/footer/Instagram.png"
                  alt="Instagram link"
                />
              </a>
              <a href="#">
                <img
                  src="../../assets/images/footer/youtube.png"
                  alt="youtube link"
                />
              </a>
            </div>
          </ul>
        </div>
        <!-- 員工登入 -->
        <div class="text-center pl-3">
          <div>個人練習作品 無商業用途</div>
          <div>
            &copy;Copyright 2019 GentSkin
            <router-link to="/admin/products" class="text-white"
              ><i class="fas fa-user-tie fa-lg"></i>
            </router-link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
img {
  opacity: 0.7;
}

img:hover {
  opacity: 1;
}
</style>
