<template>
  <div>
    <Navbar :navCart="cart" :navCartItem="cartitem" />
    <Menubar class="sticky-top" />
    <loading :active.sync="isLoading"></loading>
    <div class="container py-5 vh-75">
      <div class="row justify-content-center ">
        <div class="col-md-6 px-5">
          <div class="bg-transparent" v-if="cart.carts != ''">
            <div class="card-header py-3 mb-3 border-0">
              <div class="h3 text-center m-0">訂購資訊</div>
            </div>
            <form @submit.prevent="creatOrder">
              <div class="card-body py-3">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <div
                      class="input-block"
                      :class="{ 'input-block-error': errors.has('name') }"
                    >
                      <label for="username" class="input-label m-0"
                        >收件人姓名</label
                      >
                      <input
                        type="text"
                        name="name"
                        id="username"
                        v-model="form.user.name"
                        class="input-placeholder"
                        placeholder="Name"
                        v-validate="'required'"
                      />
                      <span
                        class="text-danger"
                        style="font-size:12px;"
                        v-if="errors.has('name')"
                      >
                        <i class="fas fa-exclamation-circle"></i> 姓名欄位
                        不得留空。
                      </span>
                    </div>
                  </div>

                  <div class="form-group col-md-6">
                    <div
                      class="input-block"
                      :class="{ 'input-block-error': errors.has('tel') }"
                    >
                      <label for="usertel" class="input-label m-0"
                        >收件人電話</label
                      >
                      <input
                        type="text"
                        name="tel"
                        id="usertel"
                        v-model="form.user.tel"
                        class="input-placeholder"
                        placeholder="Tel"
                        v-validate="'required'"
                      />
                      <span
                        class="text-danger"
                        style="font-size:12px;"
                        v-if="errors.has('tel')"
                      >
                        <i class="fas fa-exclamation-circle"></i> 電話欄位
                        不得留空。
                      </span>
                    </div>
                  </div>
                  <div class="form-group col-md">
                    <div
                      class="input-block"
                      :class="{ 'input-block-error': errors.has('email') }"
                    >
                      <label for="email" class="input-label m-0">Email</label>
                      <input
                        type="email"
                        name="email"
                        v-model="form.user.email"
                        class="input-placeholder"
                        id="email"
                        v-validate="'required|email'"
                        placeholder="Email@example.com"
                      />
                      <span
                        class="text-danger"
                        style="font-size:12px;"
                        v-if="errors.has('email')"
                      >
                        <i class="fas fa-exclamation-circle"></i>
                        {{ errors.first('email') }}
                      </span>
                    </div>
                  </div>

                  <div class="form-group col-md">
                    <div
                      class="input-block"
                      :class="{ 'input-block-error': errors.has('city') }"
                    >
                      <label for="usercity" class="input-label m-0">城市</label>
                      <input
                        type="text"
                        name="city"
                        id="usercity"
                        v-model="form.user.city"
                        class="input-placeholder"
                        placeholder="City"
                        v-validate="'required'"
                      />
                      <span
                        class="text-danger"
                        style="font-size:12px;"
                        v-if="errors.has('city')"
                      >
                        <i class="fas fa-exclamation-circle"></i> 城市欄位
                        不得留空。
                      </span>
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <div
                      class="input-block"
                      :class="{ 'input-block-error': errors.has('country') }"
                    >
                      <label for="usercountry" class="input-label m-0"
                        >國家</label
                      >
                      <input
                        type="text"
                        name="country"
                        id="usercountry"
                        v-model="form.user.country"
                        class="input-placeholder"
                        placeholder="Country"
                        v-validate="'required'"
                      />
                      <span
                        class="text-danger"
                        style="font-size:12px;"
                        v-if="errors.has('country')"
                      >
                        <i class="fas fa-exclamation-circle"></i> 國家欄位
                        不得留空。
                      </span>
                    </div>
                  </div>

                  <div class="form-group col-md-6">
                    <div
                      class="input-block"
                      :class="{ 'input-block-error': errors.has('zip') }"
                    >
                      <label for="userzip" class="input-label m-0"
                        >郵遞區號</label
                      >
                      <input
                        type="text"
                        name="zip"
                        id="userzip"
                        v-model="form.user.zip"
                        class="input-placeholder"
                        placeholder="Zip"
                        v-validate="'required'"
                      />
                      <span
                        class="text-danger"
                        style="font-size:12px;"
                        v-if="errors.has('zip')"
                      >
                        <i class="fas fa-exclamation-circle"></i> 郵遞區號
                        不得留空。
                      </span>
                    </div>
                  </div>

                  <div class="form-group col-md-12">
                    <div
                      class="input-block"
                      :class="{ 'input-block-error': errors.has('address') }"
                    >
                      <label for="useraddress" class="input-label m-0"
                        >收件人地址</label
                      >
                      <input
                        type="text"
                        name="address"
                        id="useraddress"
                        v-model="form.user.address"
                        class="input-placeholder"
                        placeholder="Address"
                        v-validate="'required'"
                      />
                      <span
                        class="text-danger"
                        style="font-size:12px;"
                        v-if="errors.has('address')"
                      >
                        <i class="fas fa-exclamation-circle"></i> 地址欄位
                        不得留空。
                      </span>
                    </div>
                  </div>

                  <div class="form-group form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="exampleCheck1"
                    />
                    <label class="form-check-label " for="exampleCheck1"
                      >將資料存為預設地址</label
                    >
                  </div>
                </div>
              </div>
              <div class="card-footer p-0   border-0 text-center">
                <button
                  class="btn-type btn-type2"
                  style="background-color:#B17844;"
                >
                  送出訂單
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-md-6 border-left px-5 ">
          <div class=" bg-transparent " v-if="cart.carts != ''">
            <div class="card-header py-3 mb-3 border-0">
              <div class="h3 text-center m-0">購物車</div>
            </div>
            <div class="card-body p-0 card-overflow">
              <table class="table text-white ">
                <thead>
                  <th width="30"></th>
                  <th width="160"></th>
                  <th></th>
                  <th></th>
                </thead>
                <tbody>
                  <tr v-for="item in cart.carts" :key="item.id">
                    <td class="align-middle">
                      <button
                        type="button"
                        class="btn btn-outline-danger rounded btn-sm"
                        data-target="#removeCart"
                        data-toggle="modal"
                      >
                        <i class="far fa-trash-alt fa-lg"></i>
                      </button>
                      <!-- 刪除提示Modal -->
                      <div
                        class="modal fade"
                        id="removeCart"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="removeCartLabel"
                        aria-hidden="true"
                      >
                        <div
                          class="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div
                            class="modal-content bg-dark  border border-secondary"
                          >
                            <div class="modal-body text-center p-4 h4">
                              你確定要移除這項商品嗎
                            </div>

                            <div
                              class="row text-center  border-top border-secondary m-0"
                            >
                              <div
                                data-dismiss="modal"
                                class="col-6 p-0 btn btn-outline-danger border-0"
                              >
                                <div class="p-2 border-right border-secondary">
                                  取消
                                </div>
                              </div>

                              <div
                                class="col-6 p-0 btn btn-outline-danger border-0"
                              >
                                <div
                                  class="p-2"
                                  @click.prevent="removeCartItem(item.id)"
                                >
                                  確定
                                  <!-- removeCartItem(item.id) 按下按鈕移除單一筆資料 -->
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <img
                        :src="item.product.imageUrl"
                        class="w-100 p-1 border"
                      />
                    </td>
                    <td class="align-middle px-0" colspan="2">
                      <thead>
                        <th class="border-0" style="padding:0.75rem;">
                          {{ item.product.title }}
                        </th>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            class=" d-flex justify-content-between"
                            width="230"
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
            </div>
            <div class="card-footer py-3  mt-3 border-0">
              <div class="">
                <div
                  class="h5 mb-3 text-right pr-4"
                  v-if="cart.final_total == cart.total"
                >
                  <span class="mr-3">總金額</span>
                  {{ cart.total | currency }}
                </div>
                <div
                  class="h5 mb-3 text-right pr-4 text-tohoh"
                  v-if="cart.final_total !== cart.total"
                >
                  <span class="mr-3">折扣後金額</span>
                  {{ cart.final_total | currency }}
                </div>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control input-color"
                    v-model="coupon_code"
                    placeholder="請輸入優惠碼"
                  />
                  <!--在後端資料庫中抓取與v-model相同的文字做為比對-->
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-dark text-white"
                      type="button"
                      @click="addCouponCode"
                      :disabled="coupon_code == ''"
                    >
                      <!--addCouponCode 比對成功時將可帶入折扣-->
                      套用優惠碼
                    </button>
                    <i
                      class="far fa-question-circle text-warning align-self-center ml-2 js-flash"
                      data-toggle="tooltip"
                      data-placement="right"
                      data-html="true"
                      title="<p>優惠期間：</p><p>輸入vip - 75折</p><div>輸入vvip - 5折</div>"
                    >
                    </i>
                  </div>
                </div>
              </div>
              <div class="text-center pt-4" v-if="cart.carts != ''">
                <router-link class="text-decoration-none" to="/shop">
                  <button
                    class="btn-type btn-type2 "
                    style="background-color:#B17844; "
                  >
                    繼續選購
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md text-center " v-if="cart.carts == ''">
          <div class="h5 py-5">
            購物車目前無任何商品
          </div>
          <div class="py-5">
            <router-link
              class="btn-type text-decoration-none"
              to="/shop"
              style=" background-color:#1f468c; color:white"
              >繼續選購商品
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Navbar from '@/components/forestage/Navbar.vue'
import Menubar from '@/components/forestage/Menubar.vue'

export default {
  data() {
    return {
      cart: [],
      isLoading: false,
      coupon_code: '',
      products: [],
      cart: [],
      cartitem: [],
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          city: '',
          country: '',
          zip: '',
          address: ''
        },
        message: ''
      }
    }
  },

  methods: {
    getCart() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      this.$http.get(api).then(response => {
        vm.cart = response.data.data
        vm.cartitem = response.data.data.carts.length
        vm.isLoading = false
        // console.log('購物車資料', response.data)
      })
    },
    creatOrder() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      vm.isLoading = true
      const order = vm.form
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(api, { data: order }).then(response => {
            // console.log('建立訂單', response.data)
            if (response.data.success) {
              vm.$router.push(`check/${response.data.orderId}`) //確保傳入orderId
            }
            vm.isLoading = false
          })
        } else {
          // console.log('欄位輸入不完整')
          this.$bus.$emit('message:push', '欄位輸入不完整', 'tohoh')
          vm.isLoading = false
        }
      })
    },
    removeCartItem(id) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      this.$http.delete(api).then(response => {
        vm.getCart()
        this.$bus.$emit('message:push', '商品已被刪除', 'tohoh')
      })

      $('#removeCart').modal('hide')
    },
    addCouponCode() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.isLoading = true
      this.$http.post(api, { data: coupon }).then(response => {
        const coupon = response.data
        if (coupon.success) {
          vm.getCart()
          vm.coupon_code = ''
          this.$bus.$emit('message:push', '已使用優惠卷', 'tohoh')
        } else {
          this.$bus.$emit('message:push', '請輸入正確的優惠碼', 'tohoh')
        }
        vm.isLoading = false
        // console.log('優惠卷', message)
        // 修正付款完成後某些按鈕會套入hove
        // console.log('優惠卷', coupon)
      })
    },
    goForm() {
      const vm = this
      vm.$router.push('/payment/form')
    }
  },
  created() {
    $(function() {
      $('[data-toggle="tooltip"]').tooltip()
    }),
      this.getCart()
  },
  components: {
    Navbar,
    Menubar
  }
}
</script>

<style scoped>
.table td {
  border-bottom: none;
  border-top: none;
}
.table th {
  border-bottom: none;
  border-top: none;
  padding: 0px;
}

.form-group {
  margin-bottom: 2rem;
}

.btn-type2:after {
  position: absolute;
  border-radius: 19px;
  content: '';
  width: 0;
  height: 100%;
  top: 0;
  right: 0;
  z-index: -1;
  background: #000;
  transition: all 0.3s cubic-bezier(0.42, 0, 1, 1);
}
.btn-type2:hover {
  border: 1px solid rgba(255, 255, 255, 0.8);
  color: rgba(255, 255, 255, 0.8);
}
.btn-type2:hover:after {
  left: 0;
  width: 100%;
}
</style>
