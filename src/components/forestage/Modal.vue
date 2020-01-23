<template>
  <div>
    <loading :active.sync="isLoading" style="z-index: 9999;"></loading>
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
            <div class="col-12 col-md-6">
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
            <div class="col-12 col-md-6 p-0">
              <div class="panel-signIn align-items-center justify-content-center">
                <div class="h1 mb-5">會員登入</div>
                <form class="form d-flex flex-column align-items-center" @submit.prevent="signIn">
                  <!-- <label for="loginEmail" class="label">
                    信箱
                  <input
                    type="email"
                    class="input"
                    id="loginEmail"
                    v-model="user.signIn.account"
                    placeholder="Email@example.com"
                  />
                  </label>
                  <label for="loginPassword" class="label">密碼
                  <input
                    type="password"
                    id="loginPassword"
                    class="input"
                    v-model="user.signIn.password"
                    placeholder="Password"
                  />
                  </label> -->
                  <label for="loginAccount" class="label"
                  >帳號
                    <select id="loginAccount"
                    :class="{'select': accountData.length === 0}"
                    :disabled="accountData.length === 0"
                    class="form-control" v-model="user.signIn.account"
                    @change="changeData(user.signIn.account)">
                      <option selected disabled value="" v-if="accountData.length === 0">
                        請先註冊帳號
                      </option>
                      <option selected disabled value="" v-else>
                        請選取任一測試帳號
                      </option>
                      <option v-for="(item, i) in accountData"
                      :key="i" :value="item.account"
                      >
                      {{ item.account }}
                      </option>
                    </select>
                  </label>
                  <label for="loginName" class="label"
                    >暱稱
                  <input
                    type="text"
                    disabled
                    id="loginName"
                    class="input"
                    placeholder="請先選擇測試帳號"
                    v-model="user.signIn.name"
                  />
                  </label>
                  <p class="text-center">
                    註冊完畢後即可選擇帳號
                  </p>
                  <button type="submit" class="button button-animated bg-biwacha"
                  :disabled="user.signIn.account === ''">
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
                  <!-- <label for="registeremail" class="label">會員名稱<input
                    type="email"
                    class="input"
                    id="registeremail"
                    v-model="user.signUp.account"
                    placeholder="Email@example.com"
                  />
                  </label> -->
                  <!-- <label for="registerepassword" class="label">帳號
                  <input
                    type="password"
                    id="registerepassword"
                    class="input"
                    v-model="user.signUp.password"
                    placeholder="Password"
                  />
                  </label> -->
                  <!-- <label for="confirmpassword" class="label">確認密碼
                  <input
                    type="password"
                    id="confirmpassword"
                    class="input"
                    placeholder="Confirm Password"
                  />
                  </label> -->
                  <label for="registerAccount" class="label"
                  >帳號
                    <select id="registerAccount"
                    class="form-control" v-model="user.signUp.account"
                    @change="changeData(user.signUp.account, 'GentSkinTest 0')">
                      <option selected disabled value="">請選取任一測試帳號</option>
                      <option v-for="(item, i) in newAccount"
                      :key="i" :value="('GentSkinTest 0'+ item.account)"
                      >
                        GentSkinTest 0{{item.account}}
                      </option>
                    </select>
                  </label>
                  <label for="registerName" class="label"
                    >暱稱
                  <input
                    type="text"
                    disabled
                    id="registerName"
                    class="input"
                    placeholder="請先選擇測試帳號"
                    v-model="user.signUp.name"
                  />
                  </label>
                  <p class="text-center">
                    測試帳號將於網頁關閉時完全清除
                  </p>
                  <button type="submit" class="button button-animated bg-biwacha"
                  :disabled="user.signUp.account === ''">
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
                      class="button"
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
                      class="button"
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
        :class="{'modal-dialog-scrollable' : navCart.carts != ''}"
      >
        <div
          class="modal-content bg-kogecha"
          v-if="navCart.carts != ''">
          <button type="button" class="close position-absolute" style="right: 0; top:-10px"
          data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          <div
            class="modal-title text-center"
          >
            <h5 class="my-4">
              已選擇的商品
            </h5>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <tr>
                  <th style="border-bottom: 1px solid black;" width="90" scope="col"></th>
                  <th style="border-bottom: 1px solid black;" scope="col">
                      <td>商品</td>
                      <td class="td-width text-right">價格</td>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in navCart.carts" :key="item.id">
                  <th>
                    <img :src="item.product.imageUrl" scope="row"/>
                  </th>
                  <td class="align-middle">
                    <tr>
                      <td>
                        {{ item.product.title }}
                      </td>
                    </tr>
                    <tr>
                      <td width="100%">
                        {{ item.qty }}/{{ item.product.unit }}
                      </td>
                      <td>
                        {{ item.final_total | currency }}
                      </td>
                    </tr>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="modal-footer justify-content-around">
            <div class="h5 m-0">
              <span class="mr-3">總金額</span> {{ navCart.total | currency }}
            </div>
              <a href="#" class="button bg-konjyo" @click.prevent="payment">結帳</a>
          </div>
        </div>
        <div class="modal-content bg-kogecha justify-content-center"
        v-if="navCart.carts == ''">
        <h5 class="m-0 text-center">
          您還沒有選購任何商品
        </h5>
        </div>
      </div>
    </div>
    <!-- 優惠提示 Modal -->
    <div class="modal animated rollIn" id="saleModal"
      tabindex="-1" role="dialog" data-backdrop="static"
      aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-border">
              <h3 class="stroke">
                無限時優惠
                <br>
                <span>
                  全館購物即可享有以下折扣
                </span>
              </h3>
              <p>10% OFF</p>
              <button type="button" data-dismiss="modal"
              class="button button-animated bg-biwacha">
                開始購物
              </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除提示 Modal -->
    <div
      class="modal animated bounceInDown" id="removeCart"
      tabindex="-1" role="dialog" aria-labelledby="removeCartLabel"
      aria-hidden="true">
      <div
        class="modal-dialog modal-dialog-centered"
        role="document"
      >
        <div
          class="modal-content bg-dark border border-secondary"
        >
          <div class="modal-body text-center p-4 h4">
            你確定要移除這項商品嗎
          </div>

          <div
            class="row text-center  border-top border-secondary m-0"
          >
            <div
              data-dismiss="modal"
              class="col-md-6 p-0 btn btn-outline-danger border-0"
            >
              <div class="p-2 border-right border-secondary">
                取消
              </div>
            </div>

            <div
              class="col-md-6 p-0 btn btn-outline-danger border-0"
            >
              <div
                class="p-2"
                @click.prevent="$emit('removeCart', '')"
              >
                確定
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 客服Modal -->
    <div class="modal animated bounceInDown" id="serviceModal" tabindex="-1"
      role="dialog" aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div
        class="modal-dialog modal-dialog-centered"
        style="max-width: 650px;"
        role="document"
      >
        <div class="modal-content bg-dark">
          <button
            type="button"
            class="button-close position-absolute"
            data-dismiss="modal"
            aria-label="Close">
            <i class="fas fa-times"></i>
            </button>
          <div class="text-md-left text-center border-bottom p-3">
            <h5 class="m-0">訂單問題查詢</h5>
          </div>
          <div class="modal-body">
            <div class="custom-control custom-radio">
              <input type="radio" id="progress" name="customerService" class="custom-control-input">
              <label class="custom-control-label" for="progress">查出貨進度</label>
            </div>
            <div class="custom-control custom-radio">
              <input type="radio" id="return" name="customerService" class="custom-control-input">
              <label class="custom-control-label" for="return">退 / 換貨問題</label>
            </div>
            <div class="custom-control custom-radio">
              <input type="radio" id="payment" name="customerService" class="custom-control-input">
              <label class="custom-control-label" for="payment">付款問題</label>
            </div>
            <div class="custom-control custom-radio">
              <input type="radio" id="invoice" name="customerService" class="custom-control-input">
              <label class="custom-control-label" for="invoice">發票問題</label>
            </div>
          </div>
          <div class="text-md-right text-center border-top p-3">
            <p class="m-0">此為測試用，無任何功能</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 超商取貨Modal -->
    <div
      class="modal animated bounceInDown"
      id="testModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content bg-dark">
          <div class="modal-body text-center p-4 h4">
            <p>已為您選擇距離您最近的門市</p>
            <p class="m-0">請點選送出訂單完成交易</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 測試付款Modal -->
    <div
      class="modal animated fadeIn"
      id="payModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content bg-dark">
          <div class="modal-body h4 text-center">
            正在建立訂單
            <span class="one">.</span>
            <span class="two">.</span>
            <span class="three">.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import $ from 'jquery';

export default {
  props: ['navCart', 'orderList'],
  data() {
    return {
      sign: false,
      isLoading: false,
      loginStatus: false,
      change: false,
      number: '',
      num: 0,
      accountData: [],
      newAccount:
      [{
        account: '1',
        name: '體貼的家豪',
      },
      {
        account: '2',
        name: '幽默的俊傑',
      },
      {
        account: '3',
        name: '開朗的淑惠',
      },
      {
        account: '4',
        name: '溫柔的美玲',
      }],
      user: {
        signUp: {
          account: '',
          name: '',
          login: false,
          // password: '',
        },
        signIn: {
          account: '',
          name: '',
          // password: '',
        },
      },
    };
  },
  methods: {
    getData() {
      const vm = this;
      if (JSON.parse(sessionStorage.getItem('myAccount') !== null)) {
        vm.accountData = JSON.parse(sessionStorage.getItem('myAccount'));
      }
    },
    signUp() {
      const vm = this;
      vm.isLoading = true;
      // sessionStorage.clear();
      // sessionStorage.removeItem('myAccount');
      const getAccount = JSON.parse(sessionStorage.getItem('myAccount'));
      if (getAccount === null) {
        const newAccount = [];
        newAccount.push(vm.user.signUp);
        sessionStorage.setItem('myAccount', JSON.stringify(newAccount));
        vm.accountData = JSON.parse(sessionStorage.getItem('myAccount'));
        // console.log(vm.accountData);
        setTimeout(() => {
          vm.isLoading = false;
          vm.sign = false;
          // vm.user.signUp.account = '';
          // vm.user.signUp.password = '';
          this.$bus.$emit('alert', '註冊成功，登入立即享購！');
        }, 2000);
      } else {
        const verify = getAccount.find(item => item.account === vm.user.signUp.account
        && item.password === vm.user.signUp.password);
        if (verify === undefined) {
          getAccount.push(vm.user.signUp);
          sessionStorage.setItem('myAccount', JSON.stringify(getAccount));
          vm.accountData = JSON.parse(sessionStorage.getItem('myAccount'));
          setTimeout(() => {
            vm.isLoading = false;
            vm.sign = false;
            // vm.user.signUp.account = '';
            // vm.user.signUp.password = '';
            this.$bus.$emit('alert', '註冊成功，登入立即享購！');
          }, 2000);
        } else {
          setTimeout(() => {
            vm.isLoading = false;
            this.$bus.$emit('alert', '此帳號已被註冊');
          }, 2000);
        }
      }
    },
    signIn() {
      const vm = this;
      vm.isLoading = true;
      vm.accountData = JSON.parse(sessionStorage.getItem('myAccount'));
      const verify = vm.accountData.filter(item => item.account === vm.user.signIn.account
        && item.password === vm.user.signIn.password);
      setTimeout(() => {
        if (verify.length === 1) {
          verify[0].login = true;
          sessionStorage.removeItem('myAccount');
          sessionStorage.setItem('myAccount', JSON.stringify(vm.accountData));
          vm.isLoading = false;
          this.$bus.$emit('alert', `${vm.user.signIn.name}，您已成功登入！`);
          $('#loginModal').modal('hide');
          vm.loginStatus = true;
          vm.$emit('signIn', vm.loginStatus);
          // vm.user.signIn.account = '';
          // vm.user.signIn.password = '';
          vm.$emit('userLogin');
        } else {
          vm.isLoading = false;
          this.$bus.$emit('alert', '您輸入的帳號密碼有誤！');
        }
      }, 2000);
    },
    order(id) {
      const vm = this;
      $('#orderModal').modal('hide');
      if (vm.$router.history.current.name === 'Check') {
        vm.$router.push('/');
        setTimeout(() => {
          vm.$router.push(`check/${id}`);
        }, 1);
      } else {
        vm.$router.push(`check/${id}`);
      }
    },
    payment() {
      const vm = this;
      $('#cartModal').modal('hide');
      vm.$router.push('/order');
      $('html, body').animate({ scrollTop: 0 }, 1);
    },
    changeData(item, test) {
      const vm = this;
      if (test === 'GentSkinTest 0') {
        vm.newAccount.forEach((account) => {
          if (item === (test + account.account)) {
            vm.user.signUp.name = account.name;
          }
        });
      } else {
        vm.accountData.forEach((account) => {
          if (item === account.account) {
            vm.user.signIn.name = account.name;
          }
        });
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>
