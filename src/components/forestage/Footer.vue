<template>
  <div>
    <div class="footer">
      <div class="container">
        <div class="row justify-content-around mb-4 mb-md-5">
          <ul class="nav flex-column">
            <li class="nav-item">
              <p class="nav-link h5">購物須知</p>
            </li>
            <li class="nav-item">
              <a class="nav-link text-color" href="#">購買流程</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-color" href="#">支付方式</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-color" href="#">退貨政策</a>
            </li>
          </ul>
          <ul class="nav flex-column">
            <li class="nav-item">
              <p class="nav-link h5">用戶協助</p>
            </li>
            <li class="nav-item">
              <a class="nav-link text-color" href="#">客戶服務</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-color" href="#">人才招募</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-color" href="#">連絡我們</a>
            </li>
          </ul>
          <ul class="nav flex-column justify-content-between mt-4 m-md-0">
            <li class="nav-item">
              <p class="nav-link h5 mb-4">訂閱我們以取得最新優惠資訊</p>
            </li>
            <li class="nav-item align-self-center mb-4">
              <div class="input-group">
                <input type="email" class="form-control"
                placeholder="email@example.com" >
                <div class="input-group-append">
                  <button class="btn btn-konjyo" type="button">
                    訂閱
                  </button>
                </div>
              </div>
            </li>
            <li class="nav-item">
              <ul class="nav justify-content-around">
                <li class="nav-item">
                  <a href="#"><img src="../../assets/images/footer/facebook.png"
                  alt="facebook"/></a>
                </li>
                <li class="nav-item">
                  <a href="#"><img src="../../assets/images/footer/line.png"
                  alt="line"/></a>
                </li>
                <li class="nav-item">
                  <a href="#"><img src="../../assets/images/footer/Instagram.png"
                  alt="instagram"/></a>
                </li>
                <li class="nav-item">
                  <a href="#"><img src="../../assets/images/footer/youtube.png"
                  alt="youtube"/></a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="text-center">
          <p>個人練習作品 無商業用途</p>
          <p>&copy;Copyright 2019
            <!-- 員工登入 -->
            <router-link to="/admin/products" class="d-md-inline-block d-none" >
            GentSkin
            <i class="fas fa-user-tie fa-lg"></i>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
