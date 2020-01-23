<template>
  <div>
    <nav class="col-md-2 sidebar">
      <div class="sidebar-sticky">
        <h5 class="px-3 mt-4 mb-5">
        功能列表
        </h5>
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link class="nav-link  text-white" to="/admin/products">
              <i class="fas fa-dolly-flatbed"></i>
              產品
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link  text-white" to="/admin/coupons">
              <i class="fas fa-gifts"></i>
              優惠碼
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link  text-white" to="/admin/orders">
              <i class="fas fa-clipboard-list"></i>
              歷史訂單
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link  text-white" to="/customer/orders">
              <i class="fas fa-shopping-basket"></i>
              模擬購物
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
