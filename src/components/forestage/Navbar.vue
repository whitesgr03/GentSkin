<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <header class="pt-2 bg-eerie">
      <div class="row align-items-center m-0">
        <div class="col-4"></div>
        <div class="col-4 text-center">
          <a class="logo text-white" href="#" @click.prevent="home">GentSkin</a>
        </div>
        <div class="col-4">
          <ul class="nav justify-content-end">
            <li class="nav-item mr-3">
              <button
                class="text-white bg-transparent border-0 d-flex icon align-items-end"
                type="button"
                data-toggle="modal"
                data-target="#orderModal"
              >
                <div class="button-container mr-2">
                  <i
                    class="fas fa-clipboard-list button-icon"
                    style="left: 13.5px; top: 12px;"
                  ></i>
                  <div class="button-border"></div>
                </div>
                <div>訂單</div>
              </button>
            </li>
            <li class="nav-item mr-3">
              <button
                class="text-white bg-transparent border-0 d-flex icon align-items-end"
                @click.prevent="loginBtn"
                type="button"
              >
                <div class="button-container mr-2">
                  <i
                    class="fas fa-user button-icon"
                    style="left: 12px; top: 12px;"
                  ></i>
                  <div class="button-border"></div>
                </div>
                <div>登入</div>
              </button>
            </li>
            <li class="nav-item">
              <button
                class="text-white bg-transparent border-0 d-flex icon align-items-end"
                type="button"
                id="dropdownMenuButton"
                data-toggle="modal"
                data-target="#cartModal"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div class="button-container mr-2">
                  <i
                    class="fas fa-shopping-cart button-icon"
                    style="left: 8px; top: 12px;"
                  >
                  </i>
                  <span
                    class="badge badge-pill badge-danger position-absolute"
                    style="top: 2px; right: -5px; font-size: 0.8rem; z-index:1;"
                    v-if="navCartItem != 0"
                    >{{ navCartItem }}</span
                  >
                  <div class="button-border"></div>
                </div>
                <div>購物車</div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <!-- 登入Modal -->
    <div
      class="modal animated fast"
      id="loginModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-768 modal-dialog-centered" role="document">
        <div
          class="model-container position-relative rounded"
          :class="{ 'right-panel-active': sign == true }"
        >
          <button
            type="button"
            class="btn modal-close closeModel position-absolute rounded-circle"
            style="top: -15px; right: -15px;"
            aria-label="Close"
          >
            <i
              class="fas fa-times position-absolute"
              style="bottom: 3px; right: 7px;"
            ></i>
          </button>
          <div class="form-container sign-up-container rounded">
            <form class="form-show bg-dark" @submit.prevent="creat">
              <h1 class="mb-4">註冊會員</h1>
              <div
                class="input-block mb-2"
                :class="{ 'input-block-error': errors.has('registeremail') }"
              >
                <label for="registeremail" class="input-label m-0">信箱</label>
                <input
                  type="email"
                  name="registeremail"
                  class="input-placeholder"
                  id="registeremail"
                  v-validate="'required|email'"
                  placeholder="Email@example.com"
                />
                <span
                  class="text-danger"
                  style="font-size:12px;"
                  v-if="errors.has('registeremail')"
                >
                  <i class="fas fa-exclamation-circle"></i>
                  email 必須是有效的電子郵件地址。
                </span>
              </div>
              <div
                class="input-block mb-2"
                :class="{
                  'input-block-error': errors.has('registerepassword')
                }"
              >
                <label for="registerepassword" class="input-label m-0"
                  >密碼</label
                >
                <input
                  type="password"
                  name="registerepassword"
                  id="registerepassword"
                  class="input-placeholder"
                  placeholder="Password"
                  v-validate="'required'"
                />
                <span
                  class="text-danger"
                  style="font-size:12px;"
                  v-if="errors.has('registerepassword')"
                >
                  <i class="fas fa-exclamation-circle"></i> 密碼欄位 不得留空。
                </span>
              </div>
              <div
                class="input-block mb-2"
                :class="{
                  'input-block-error': errors.has('confirmpassword')
                }"
              >
                <label for="confirmpassword" class="input-label m-0"
                  >確認密碼</label
                >
                <input
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  class="input-placeholder"
                  placeholder="Confirm Password"
                  v-validate="'required'"
                />
                <span
                  class="text-danger"
                  style="font-size:12px;"
                  v-if="errors.has('confirmpassword')"
                >
                  <i class="fas fa-exclamation-circle"></i> 密碼欄位 不得留空。
                </span>
              </div>
              <button class="btn-type mt-3">
                註冊
              </button>
            </form>
          </div>
          <div
            class="form-container sign-in-container rounded"
            style=" overflow: hidden;"
          >
            <form @submit.prevent="creat" class="form-show bg-dark">
              <h1 class="mb-5">會員登入</h1>
              <div
                class="input-block mb-4"
                :class="{ 'input-block-error': errors.has('loginemail') }"
              >
                <label for="loginemail" class="input-label m-0">信箱</label>
                <input
                  type="email"
                  name="loginemail"
                  class="input-placeholder"
                  id="loginemail"
                  v-validate="'required|email'"
                  placeholder="Email@example.com"
                />
                <span
                  class="text-danger"
                  style="font-size:12px;"
                  v-if="errors.has('loginemail')"
                >
                  <i class="fas fa-exclamation-circle"></i>
                  email 必須是有效的電子郵件地址。
                </span>
              </div>
              <div
                class="input-block mb-3 mt-1"
                :class="{ 'input-block-error': errors.has('loginpassword') }"
              >
                <label for="loginpassword" class="input-label m-0">密碼</label>
                <input
                  type="password"
                  name="loginpassword"
                  id="loginpassword"
                  class="input-placeholder"
                  placeholder="Password"
                  v-validate="'required'"
                />
                <span
                  class="text-danger"
                  style="font-size:12px;"
                  v-if="errors.has('loginpassword')"
                >
                  <i class="fas fa-exclamation-circle"></i> 密碼欄位 不得留空。
                </span>
              </div>

              <a class="text-white mb-3" href="#">忘記密碼？</a>
              <button class="btn-type">
                登入
              </button>
            </form>
          </div>
          <div
            class="overlay-container"
            :class="{
              'rounded-right': sign == false,
              'rounded-left': sign == true
            }"
          >
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <div
                  class="text-white rounded-circle p-3 border border-whihe login-content"
                >
                  <p class="pt-4">
                    已經註冊過了？
                  </p>
                  <button
                    class="btn-type login-btn border-white mt-3"
                    id="signIn"
                    @click="sign = false"
                  >
                    點此登入
                  </button>
                </div>
              </div>
              <div class="overlay-panel overlay-right">
                <div
                  class="text-dark rounded-circle p-3 border border-dark register-content"
                >
                  <p class="pt-4">
                    還沒有註冊嗎？
                  </p>
                  <button
                    class="btn-type register-btn border-dark mt-3"
                    id="signUp"
                    @click="sign = true"
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

    <!-- cartModal -->
    <div
      class="modal animated fadeInRight faster "
      id="cartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog-scrollable position-absolute w-25"
        role="document"
        style="right:0;   z-index:999;"
      >
        <div
          class="modal-content bg-kogecha text-white vh-100 mh-100 rounded-0"
          style="border-left: 1px solid black"
        >
          <div
            class="modal-title text-center p-4"
            style="border-bottom: 1px solid black"
            v-if="navCart.carts != ''"
          >
            <div class="h5 m-0">
              已選擇的商品
            </div>
          </div>

          <button
            type="button"
            class="close position-absolute"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="modal-body py-0 d-flex justify-content-center">
            <table class="table text-white" v-if="navCart.carts != ''">
              <thead>
                <th width="100"></th>
                <th>商品</th>
                <th width="75">價格</th>
              </thead>
              <tbody>
                <tr v-for="item in navCart.carts" :key="item.id">
                  <td>
                    <img
                      :src="item.product.imageUrl"
                      class="w-100 p-1 border"
                    />
                  </td>
                  <td class="align-middle pl-0" colspan="2">
                    <thead>
                      <th class=" border-0">{{ item.product.title }}</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          class="border-0 d-flex justify-content-between"
                          width="235"
                        >
                          <div>{{ item.qty }}/{{ item.product.unit }}</div>
                          <div>{{ item.final_total | currency }}</div>
                        </td>
                      </tr>
                    </tbody>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="text-center h4 align-self-center"
              v-if="navCart.carts == ''"
            >
              您還沒有選購任何商品
            </div>
          </div>
          <div
            class="d-flex justify-content-around align-items-center p-4"
            style="border-top: 1px solid black"
            v-if="navCart.carts != ''"
          >
            <div class="h5 mb-0">
              <span class="mr-3">總金額</span> {{ navCart.total | currency }}
            </div>
            <div>
              <a
                href="#"
                class="text-decoration-none "
                @click.prevent="payment"
              >
                <button class="btn-type btn-type3">
                  結帳
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 訂單查詢 Modal -->
    <div
      class="modal fade "
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        role="document"
        style="max-width: 768px;"
      >
        <div class="modal-content bg-dark">
          <button
            type="button"
            class="btn modal-close position-absolute rounded-circle"
            style="top: -15px; right: -15px;"
            data-dismiss="modal"
            aria-label="Close"
          >
            <i
              class="fas fa-times position-absolute"
              style="bottom: 3px; right: 7px;"
            ></i>
          </button>
          <div class="row">
            <div class="col-6">
              <img src="../../assets/images/navbar/order-1.jpg" alt="" />
            </div>

            <div class="col-6">
              <div class="row h-100 align-items-center">
                <div class="col-12">
                  <div class="modal-title text-center h1">
                    訂單查詢
                  </div>
                </div>
                <div class="col">
                  <div class="modal-body">
                    <form>
                      <div class="input-block">
                        <label for="ordernumber" class="input-label m-0"
                          >訂單編號</label
                        >
                        <input
                          type="text"
                          name="name"
                          id="ordernumber"
                          v-model="number"
                          class="input-placeholder"
                          placeholder="Number"
                          v-validate="'required'"
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col ">
                  <div class="modal-footer border-0  justify-content-center">
                    <button
                      type="button"
                      class="btn-type btn-type2 form-btn"
                      style="background-color:#B17844;"
                      @click.prevent="orderBtn"
                    >
                      開始查詢
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { timeout } from 'q'

export default {
  props: [`navCart`, `navCartItem`],
  data() {
    return {
      isLoading: false,
      sign: false,
      number: '',
      loginText: '',
      order: []
    }
  },

  methods: {
    // getCart() {
    //   const vm = this
    //   const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
    //   this.$http.get(api).then(response => {
    //     vm.cart = response.data.data
    //     vm.cartitem = response.data.data.carts.length
    //     // console.log('home 購物車資料', response.data)
    //   })
    // },
    getOrder() {
      const vm = this
      const orderList = new Set()
      for (let i = 1; i <= 10; i++) {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${i}` //從後端取的orderId
        this.$http.get(api).then(response => {
          response.data.orders.forEach((item, i) => {
            orderList.add(item.id)
          })
        })
      }
      vm.order = orderList
      // console.log(vm.order)
    },
    home() {
      const vm = this
      vm.$router.push('/')
      $('html, body').animate({ scrollTop: 0 }, 1)
    },
    payment() {
      $('#cartModal').modal('hide')
      const vm = this
      vm.$router.push('/order')
      $('html, body').animate({ scrollTop: 0 }, 1)
    },
    loginBtn() {
      const vm = this
      const login = $('#loginModal')
      $(() => {
        login.addClass('rollIn')
        login.modal({ backdrop: 'static', keyboard: false })
      })
      login.on('show.bs.modal', () => {
        $('#loginModal').keyup(() => {
          // 使用ESC關閉modal
          if (event.keyCode == 27) {
            login.on(
              'webkitAnimationEnd oanimationend msAnimationEnd animationend',
              () => {
                $('.model-container').removeClass('right-panel-active')
                vm.sign = false
                login.modal('hide')
              }
            )
            login
              .removeClass('rollIn')
              .addClass('rollOut')
              .addClass('faster')
          }
        })
        $('.closeModel').one('click', () => {
          // 按X關閉modal
          login.on(
            'webkitAnimationEnd oanimationend msAnimationEnd animationend',
            () => {
              $('.model-container').removeClass('right-panel-active')
              vm.sign = false
              login.modal('hide')
            }
          )
          login
            .removeClass('rollIn')
            .addClass('rollOut')
            .addClass('faster')
        })
        login.on('hidden.bs.modal', () => {
          login.removeClass('rollOut').removeClass('faster')
          login.off(
            'webkitAnimationEnd oanimationend msAnimationEnd animationend'
          )
          $('.closeModel').off('click')
        })
      })
    },
    orderBtn() {
      const vm = this
      if (vm.number != '') {
        vm.order.forEach((item, i) => {
          if (item == vm.number) {
            $('#orderModal').modal('hide')
            vm.$router.push(`/`)
            setTimeout(() => {
              vm.$router.push(`check/${item}`)
            }, timeout)
          }
        })
      } else {
        this.$bus.$emit('message:push', '輸入錯誤或是不存在的編號', 'tohoh')
      }
    }
  },
  created() {
    this.getOrder()
    // this.getCart()
  }
}
</script>

<style scoped>
@media (min-width: 576px) {
  .modal-768 {
    max-width: 768px;
    margin: 1.75rem auto;
  }
}
.table td {
  border-bottom: none;
  border-top: none;
}
.table th {
  border-bottom: 1px solid black;
  border-top: none;
}
</style>
