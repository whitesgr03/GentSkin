<template>
  <div>
    <nav class="col-md-2 d-none d-md-block sidebar text-white">
      <div class="sidebar-sticky">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1"
        >
          <span>管理員</span>
          <a class="d-flex align-items-center" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link  text-white" to="/admin/products">
              <i class="fas fa-gift"></i>
              產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link  text-white" to="/admin/orders">
              <i class="fas fa-dolly-flatbed"></i>
              訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link  text-white" to="/admin/coupons">
              <i class="fas fa-ticket-alt"></i>
              優惠卷
            </router-link>
          </li>
        </ul>

        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 "
        >
          <span>模擬功能</span>
          <a class="d-flex align-items-center " href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link  text-white" to="/customer/orders">
              <i class="fas fa-shopping-cart"></i>
              模擬訂單
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
