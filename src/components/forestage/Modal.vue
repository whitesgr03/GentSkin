<template>
  <div>
    <loading :active.sync="isLoading" loader="dots" style="z-index: 99999;"></loading>

    <!-- 優惠提示 Modal -->
    <div class="modal animated rollIn" id="saleModal"
      tabindex="-1" role="dialog" data-backdrop="static"
      aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <button
            type="button"
            class="button-close position-absolute"
            data-dismiss="modal"
            aria-label="Close">
            <i class="fas fa-times"></i>
          </button>
          <div class="modal-border">
              <h3 class="stroke">
                季節限定特價
                <br>
                <span>
                  全館購物即可享有以下折扣
                </span>
              </h3>
              <p>10% OFF</p>
              <button type="button" data-dismiss="modal" class="button button-slide">
                開始購物
              </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 手機板menu Modal -->
    <div
      class="modal animated fadeInLeft faster p-0 d-lg-none"
      id="menuModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      @click.prevent="$bus.$emit('closeMenu')">
      <div
        class="modal-dialog"
        role="document"
      >
        <div
          class="modal-content bg-black">
          <button type="button" class="close position-absolute  text-white"
          style="left: 10px; top: 0px; z-index: 1041; opacity: 1;"
          data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="modal-body">
            <div class="mobileMenu">
              <ul class="nav">
                <li class="nav-item nav-item-hide"
                  :class="{'nav-item-visible': loginStatus}">
                  <button
                    class="btn"
                    type="button"
                    data-toggle="modal"
                    data-target="#orderModal"
                  >
                  <i class="fas fa-2x fa-clipboard-list"></i>
                  </button>
                </li>
                <li class="nav-item">
                  <button
                    class="btn"
                    type="button"
                    data-toggle="modal"
                    data-target="#loginModal"
                    v-if="!loginStatus"
                  >
                    <i class="far fa-2x fa-user"></i>
                  </button>
                  <button
                    class="btn"
                    type="button"
                    data-toggle="modal"
                    data-target="#loginOutModal"
                    v-if="loginStatus"
                  >
                    <i class="fas fa-2x fa-user-tie"></i>
                  </button>
                </li>
              </ul>
            </div>
            <div class="mobileList">
              <ul class="nav flex-column">
                <li class="nav-item border-bottom">
                <a href="#" class="nav-link" data-dismiss="modal"
                @click.prevent="$router.push('/')">
                  首頁
                </a>
                </li>
                <li class="nav-item position-relative border-bottom">
                  <button id="shop" class="btn w-100 text-left py-0" type="button"
                  data-toggle="collapse" data-target="#product"
                  aria-expanded="false" aria-controls="product">
                    <a href="#" class="nav-link d-inline-block w-100 px-0"
                    @click="$router.push({ path: `/shop/all` }).catch(err => err)">
                      服飾
                    </a>
                    <div class="plus border-0 position-absolute"
                    style="right:0; top:12px;">
                      <div class="horizontal" style="width:12px; height:2px; left:4px;" ></div>
                      <div class="vertical" style="width:2px; height:12px; top:4px;"></div>
                    </div>
                  </button>
                  <div class="collapse" id="product">
                    <div class="accordion" id="accordionlist">
                      <div class="collapse-text">
                        <ul class="nav flex-column">
                          <li class="nav-item position-relative">
                            <button class="nav-link w-100 btn text-left shopList" type="button"
                            data-toggle="collapse" data-target="#tops"
                            aria-expanded="false" aria-controls="tops">
                            <a href="#" data-dismiss="modal"
                            @click.prevent="$bus.$emit('getCategorie', 'tops')">
                              上衣
                            </a>
                              <div class="plus border-0 position-absolute"
                              style="right:0; top:12px;">
                                <div class="horizontal" style="width:12px; height:2px;
                                left:4px;" ></div>
                                <div class="vertical" style="width:2px; height:12px;
                                top:4px;"></div>
                              </div>
                            </button>
                            <div class="collapse" id="tops" data-parent="#accordionlist">
                              <div class="collapse-text">
                                <ul class="nav flex-column">
                                  <li class="nav-item">
                                    <a href="#" class="nav-link" data-dismiss="modal"
                                    @click.prevent="
                                    $bus.$emit('getCategorie', 'tops', 't-shirt')">
                                      短袖
                                    </a>
                                  </li>
                                  <li class="nav-item">
                                    <a href="#" class="nav-link" data-dismiss="modal"
                                    @click.prevent="
                                    $bus.$emit('getCategorie', 'tops', 'shirt')">
                                      襯衫
                                    </a>
                                  </li>
                                  <li class="nav-item">
                                    <a href="#" class="nav-link" data-dismiss="modal"
                                    @click.prevent="
                                    $bus.$emit('getCategorie', 'tops', 'outer')">
                                      外套
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li class="nav-item position-relative">
                            <button class="nav-link w-100 btn text-left shopList" type="button"
                            data-toggle="collapse" data-target="#bottoms"
                            aria-expanded="false" aria-controls="bottoms">
                            <a href="#" data-dismiss="modal"
                            @click.prevent="$bus.$emit('getCategorie', 'bottoms')">
                              下身
                            </a>
                              <div class="plus border-0 position-absolute"
                              style="right:0; top:12px;">
                                <div class="horizontal" style="width:12px; height:2px;
                                left:4px;" ></div>
                                <div class="vertical" style="width:2px; height:12px;
                                top:4px;"></div>
                              </div>
                            </button>
                            <div class="collapse" id="bottoms" data-parent="#accordionlist">
                              <div class="collapse-text">
                                <ul class="nav flex-column">
                                  <li class="nav-item">
                                    <a href="#" class="nav-link" data-dismiss="modal"
                                    @click.prevent="
                                    $bus.$emit('getCategorie', 'bottoms', 'shorts')">
                                      短褲
                                    </a>
                                  </li>
                                  <li class="nav-item">
                                    <a href="#" class="nav-link" data-dismiss="modal"
                                    @click.prevent="
                                    $bus.$emit('getCategorie', 'bottoms', 'pants')">
                                      長褲
                                    </a>
                                  </li>
                                  <li class="nav-item">
                                    <a href="#" class="nav-link" data-dismiss="modal"
                                    @click.prevent="
                                    $bus.$emit('getCategorie', 'bottoms', 'jeans')">
                                      牛仔褲
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li class="nav-item position-relative">
                            <button class="nav-link w-100 btn text-left shopList" type="button"
                            data-toggle="collapse" data-target="#accessories"
                            aria-expanded="false" aria-controls="accessories">
                            <a href="#" data-dismiss="modal"
                            @click.prevent="
                            $bus.$emit('getCategorie', 'accessories')">
                              配件
                            </a>
                              <div class="plus border-0 position-absolute"
                              style="right:0; top:12px;">
                                <div class="horizontal" style="width:12px; height:2px;
                                left:4px;" ></div>
                                <div class="vertical" style="width:2px; height:12px;
                                top:4px;"></div>
                              </div>
                            </button>
                            <div class="collapse" id="accessories" data-parent="#accordionlist">
                              <div class="collapse-text">
                                <ul class="nav flex-column">
                                  <li class="nav-item">
                                    <a href="#" class="nav-link" data-dismiss="modal"
                                    @click.prevent="
                                    $bus.$emit('getCategorie', 'accessories', 'hat')">
                                      帽子
                                    </a>
                                  </li>
                                  <li class="nav-item">
                                    <a href="#" class="nav-link" data-dismiss="modal"
                                    @click.prevent="
                                    $bus.$emit('getCategorie', 'accessories', 'bag')">
                                      背包
                                    </a>
                                  </li>
                                  <li class="nav-item">
                                    <a href="#" class="nav-link" data-dismiss="modal"
                                    @click.prevent="
                                    $bus.$emit('getCategorie', 'accessories', 'shoes')">
                                      鞋子
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                          <li class="nav-item">
                            <a href="#" class="nav-link" data-dismiss="modal"
                            @click.prevent="$bus.$emit('getCategorie', 'all')">
                              All
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="nav-item border-bottom">
                <a href="#" class="nav-link" data-dismiss="modal"
                @click.prevent="$router.push('/article')">
                  主題
                </a>
                </li>
                <li class="nav-item border-bottom">
                <a href="#" class="nav-link" data-dismiss="modal"
                @click.prevent="$router.push('/about')">
                  關於
                </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 購物車 Modal -->
    <div
      class="modal animated fadeInRight faster p-0"
      id="cartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div
        class="modal-dialog"
        role="document"
        :class="{'modal-dialog-scrollable' : cartItem.carts.length !== 0}">
        <form class="modal-content bg-black" @submit.prevent="payment"
        v-if="cartItem.carts.length !== 0">
          <button type="button" class="close position-absolute text-white"
          style="right: 10px; top: 0px; opacity: 1;" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="modal-title text-center">
            <h5 class="my-4">
              購物車
            </h5>
          </div>
          <div class="modal-body">
            <div class="row" v-for="item in cartItem.carts" :key="item.id">
              <div class="col-5">
                <img class="w-100 border p-1" :src="item.product.imageUrl" />
              </div>
              <div class="col-7">
                <p>
                  {{ item.product.title }}
                </p>
                <div>
                  <p>
                    {{ item.final_total | currency }}
                  </p>
                  <p class="m-0">
                    {{ item.qty }}/{{ item.product.unit }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal-footer justify-content-around">
            <div class="h5 m-0">
              <span class="mr-3">總金額</span> {{ cartItem.total | currency }}
            </div>
              <button type="submit" class="button button-slide">
                結帳
              </button>
          </div>
        </form>
        <div class="modal-content bg-black justify-content-center"
        v-if="cartItem.carts.length === 0">
        <h5 class="m-0 text-center">
          您還沒有選購任何商品
        </h5>
        </div>
      </div>
    </div>

    <!-- 會員 Modal -->
    <div
      class="modal animated bounceInDown"
      id="loginModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark" :class="{ 'panel-slide': sign == true }">
          <div class="row panel m-0">
            <button
              type="button"
              class="button-close position-absolute"
              data-dismiss="modal"
              aria-label="Close"
            >
              <i class="fas fa-times"></i>
            </button>
            <div class="col-md-6 p-0 h-100">
              <div class="panel-signIn align-items-center justify-content-center">
                <div class="h1 mb-5">會員登入</div>
                <form class="form d-flex flex-column align-items-center" @submit.prevent="signIn">
                  <label for="loginAccount" class="label"
                  >帳號
                    <select id="loginAccount"
                    :class="{'select': accountData.length === 0,
                    'text-danger' : accountData.length === 0}"
                    :disabled="accountData.length === 0"
                    class="form-control" v-model="user.signIn.username"
                    @change="changeData(user.signIn.username)">
                      <option selected disabled value="" v-if="accountData.length === 0">
                        請先進行註冊
                      </option>
                      <option selected disabled value="" v-else>
                        請選取任一測試帳號
                      </option>
                      <option v-for="(item, i) in accountData"
                      :key="i" :value="item.username"
                      >
                      GentSkinTest 0{{ i + 1}}
                      </option>
                    </select>
                  </label>
                  <label for="loginPassword" class="label"
                    >密碼
                  <input
                    type="password"
                    disabled
                    id="loginPassword"
                    class="input"
                    :placeholder="loginInput"
                    v-model="user.signIn.password"
                  />
                  </label>
                  <p class="text-center">
                    註冊完畢後請登入帳號
                  </p>
                  <button type="submit" class="button button-slide"
                  :disabled="user.signIn.username === ''">
                    登入
                  </button>
                </form>
                <p class="mt-3 mb-0 d-md-none">還沒有註冊嗎？
                  <a href="#" class="text-info" @click.prevent="sign = true">
                    點此註冊
                  </a>
                </p>
              </div>
            </div>
            <div class="col col-md-6 p-0 h-100" :class="{ 'z-index': sign == true }">
              <div class="panel-signUp align-items-center justify-content-center">
                <div class="h1 mb-4">註冊會員</div>
                <form class="form mb-3 d-flex flex-column align-items-center"
                  @submit.prevent="signUp">
                  <label for="registerAccount" class="label"
                  >帳號
                    <select id="registerAccount"
                    class="form-control" v-model="user.signUp.username"
                    @change="changeData(user.signUp.username, true)">
                      <option selected disabled value="">請選取任一測試帳號</option>
                      <option v-for="(item, i) in newAccount"
                      :key="i" :value="item.username"
                      >
                        GentSkinTest 0{{ i + 1}}
                      </option>
                    </select>
                  </label>
                  <label for="registerPassword" class="label"
                    >密碼
                  <input
                    type="password"
                    disabled
                    id="registerPassword"
                    class="input"
                    placeholder="請先選擇帳號"
                    v-model="user.signUp.password"
                  />
                  </label>
                  <p class="text-center">
                    立即加入會員即可享更多優惠！
                  </p>
                  <button type="submit" class="button button-slide"
                  :disabled="user.signUp.username === ''">
                    註冊
                  </button>
                </form>
                  <p class="mt-3 d-md-none">已經註冊了？
                    <a href="#" class="text-info" @click.prevent="sign = false">
                      點此登入
                    </a>
                  </p>
              </div>
            </div>
          </div>
          <div class="overlay position-absolute" style="left:50%;">
            <div class="row m-0 overlay-bgc position-relative" style="left:-100%;">
              <div class="col-6 p-0">
                <div class="overlay-left align-items-center justify-content-center">
                  <div class="overlay-button text-white">
                    <p>
                      已經註冊過了？
                    </p>
                    <button
                      class="button button-pull button-pull-right"
                      type="button"
                      id="signIn"
                      @click.prevent="sign = false"
                    >
                      點此登入
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-6 p-0">
                <div class="overlay-right align-items-center justify-content-center">
                  <div class="overlay-button">
                    <p style="font-size: 1rem;">
                      還沒有註冊嗎？
                    </p>
                    <button
                      class="button button-pull button-pull-left"
                      type="button"
                      id="signUp"
                      @click.prevent="sign = true"
                    >
                      點此註冊
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 訂單查詢 Modal -->
    <div
      class="modal animated bounceInDown"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div
        class="modal-dialog modal-dialog-centered" >
        <div class="modal-content bg-dark">
          <div class="row m-0 h-100">
            <button
            type="button"
            class="button-close position-absolute"
            data-dismiss="modal"
            aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
            <div class="d-none d-md-block col-md-6 p-0 modal-img"></div>
            <div class="col-md-6">
              <div class="h1 text-center mt-3">
                我的訂單
              </div>
              <div class="table-overflow">
                <table v-for="item in orderList" :key="item.id"
                  class="table border border-secondary text-center my-2">
                  <thead>
                    <tr>
                      <th>訂單編號</th>
                      <th>日期</th>
                      <th>總金額</th>
                      <th class="d-none d-md-block">訂單狀態</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a class="text-primary" href="#" @click.prevent="order(item.id)">
                          {{ item.create_at }} </a>
                      </td>
                      <td>
                        {{ item.create_at | date }}
                      </td>
                      <td>
                        {{ (item.total + item.user.fee.shipping) | currency }}
                      </td>
                      <td class="d-none d-md-block">
                        <span class="text-warning">準備出貨</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 登出提示 Modal -->
    <div
      class="modal animated bounceInDown" id="loginOutModal"
      tabindex="-1" role="dialog" aria-labelledby="loginOutModal"
      aria-hidden="true">
      <div
        class="modal-dialog modal-dialog-centered"
        role="document"
      >
        <div
          class="modal-content flex-column  text-center bg-dark border border-secondary"
        >
          <p class="w-100 py-4 border-bottom border-secondary h5 m-0">
            你確定要登出嗎
          </p>
          <div class="d-flex justify-content-between">
            <button type="button"
            data-dismiss="modal"
            class="py-3 w-50 btn btn-outline-danger border-0 rounded-0"
            style="border-right: 1px solid #6c757d !important">
              取消
            </button>
            <button type="button" class="py-3 w-50 btn btn-outline-danger border-0"
            @click.prevent="loginOut">
              確定
            </button>
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
      sign: false,
      isLoading: false,
      loginStatus: false,
      loginInput: '註冊完畢後即可選擇帳號',
      removeItem: '',
      counter: 0,
      num: 0,
      cartItem: {
        carts: [],
      },
      orderList: [],
      accountData: [],
      newAccount:
      [{
        username: 'GenSkin',
        password: 'Test',
      }],
      user: {
        signUp: {
          username: '',
          password: '',
        },
        signIn: {
          username: '',
          password: '',
        },
      },
    };
  },
  methods: {
    checkLogin() {
      // 確認是否登入
      const vm = this;
      const getSite = sessionStorage.getItem('sign');
      if (getSite != null) {
        vm.newAccount.forEach((item) => {
          vm.user.signUp.username = item.username;
          vm.user.signUp.password = item.password;
        });
        vm.accountData.push(vm.user.signUp);
        vm.loginInput = '請先選擇帳號';
        vm.$bus.$emit('loginStatus', true);
        vm.loginStatus = true;
      }
    },
    signUp() {
      // 註冊
      const vm = this;
      vm.isLoading = true;
      if (vm.accountData.length === 0) {
        setTimeout(() => {
          vm.accountData.push(vm.user.signUp);
          vm.$bus.$emit('alert', '測試帳號已註冊成功');
          vm.loginInput = '請先選擇帳號';
          vm.sign = false;
          vm.isLoading = false;
        }, 1000);
      } else {
        setTimeout(() => {
          vm.isLoading = false;
          this.$bus.$emit('alert', '此帳號已被註冊');
        }, 1000);
      }
    },
    signIn() {
      // 登入
      const vm = this;
      vm.isLoading = true;
      if (vm.user.signIn.username !== '' && vm.user.signIn.password !== '') {
        setTimeout(() => {
          $('#loginModal').modal('hide');
          sessionStorage.setItem('sign', vm.user.signUp.username);
          vm.loginStatus = true;
          vm.$bus.$emit('loginStatus', true);
          vm.$bus.$emit('alert', '測試會員，您已成功登入！');
          vm.isLoading = false;
        }, 1000);
      }
    },
    getOrder(id) {
      // 取得歷史訂單
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.orderList.push(response.data.order);
        }
      });
    },
    order(id) {
      // 檢視訂單內容
      const vm = this;
      $('#orderModal').modal('hide');
      $('#orderModal').on('hidden.bs.modal', () => {
        $('#menuModal').modal('hide');
        vm.$bus.$emit('closeIcon');
        if (vm.$router.history.current.name === 'Check') {
          vm.$router.push('/');
          setTimeout(() => {
            vm.$router.push({ name: 'Check', params: { orderId: id } });
            $('html, body').animate({ scrollTop: 0 }, 1);
          }, 1);
        } else {
          vm.$router.push({ name: 'Check', params: { orderId: id } });
        }
      });
    },
    payment() {
      // 執行結帳動作
      const vm = this;
      if (vm.loginStatus === true) {
        $('#cartModal').modal('hide');
        vm.$bus.$emit('closeIcon');
        vm.$router.push('/order');
      } else {
        $('#cartModal').modal('hide');
        $('#loginModal').modal('show');
        vm.$bus.$emit('alert', '請先登入會員');
      }
    },
    changeData(account, signUp) {
      // 選取帳號帶入密碼
      const vm = this;
      if (signUp) {
        vm.newAccount.forEach((item) => {
          if (account === item.username) {
            vm.user.signUp.password = item.password;
          }
        });
      } else {
        vm.accountData.forEach((item) => {
          if (account === item.username) {
            vm.user.signIn.password = item.password;
          }
        });
      }
    },
    loginOut() {
      // 登出
      const vm = this;
      vm.isLoading = true;
      setTimeout(() => {
        sessionStorage.removeItem('sign');
        this.loginStatus = false;
        vm.$bus.$emit('loginStatus', false);
        vm.isLoading = false;
        if (vm.$router.history.current.name === 'Check'
          || vm.$router.history.current.name === 'Order') {
          vm.$router.push('/');
        }
        $('#loginOutModal').modal('hide');
        vm.$bus.$emit('alert', '您已成功登出！');
      }, 1000);
    },
  },
  mounted() {
    this.checkLogin();
    // 首次瀏覽顯示優惠資訊
    $('.mobileList .shopList').click(function menu(e) {
      e.preventDefault();
      if ($(this).find('.plus').hasClass('minus')) {
        $(this).find('.plus').removeClass('minus');
      } else {
        $('.mobileList .shopList').find('.plus').removeClass('minus');
        $(this).find('.plus').addClass('minus');
      }
    });
    $('#shop').click(function menu(e) {
      e.preventDefault();
      this.ckickList = true;
      if ($(this).find('.plus').hasClass('minus')) {
        $(this).find('.plus').removeClass('minus');
        $('.mobileList .shopList').find('.plus').removeClass('minus');
        setTimeout(() => {
          $('.mobileList .accordion').find('.collapse').removeClass('show');
        }, 200);
      } else {
        $(this).find('.plus').addClass('minus');
      }
    });
    $('#menuModal').on('hidden.bs.modal', function menu(e) {
      e.preventDefault();
      setTimeout(() => {
        if (!$(this).hasClass('show')) {
          $('.mobileList .btn').find('.plus').removeClass('minus');
          $('.mobileList').find('.collapse').removeClass('show');
        }
      }, 200);
    });
  },
  created() {
    setTimeout(() => {
      // 首次進入網站顯示折扣廣告並登出管理員帳號
      const getSite = sessionStorage.getItem('coupon');
      if (getSite == null) {
        const logout = `${process.env.VUE_APP_APIPATH}/logout`;
        this.$http.post(logout).then((response) => {
          if (response.data.success) {
            this.loginStatus = false;
            this.$bus.$emit('loginStatus', false); // 改變sidebar的登入圖示
          }
        });
        $('#saleModal').modal('show');
      }
    }, 500);
    this.$bus.$on('getCart', (item) => {
      this.cartItem = item;
      // 從siderbar取得資料帶給購物車modal
    });
    this.$bus.$on('orderId', (item) => {
      // order建立訂單後取得資料帶給訂單modal
      this.getOrder(item);
    });
  },
};
</script>
