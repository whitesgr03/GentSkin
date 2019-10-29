<template>
  <div>
    <Navbar :navCart="cart" :navCartItem="cartitem" />
    <Menubar class="sticky-top" :navCart="cart" :navCartItem="cartitem" />
    <loading :active.sync="isLoading"></loading>
    <div class="container py-5 vh-75">
      <div class="row justify-content-center ">
        <div class="col-md-6 px-5">
          <div class="bg-transparent" v-if="cart.carts != ''">
            <div class="card-header py-3 mb-3 border-0">
              <div class="h3 text-center m-0">訂購資訊</div>
            </div>
            <form @submit.prevent="creatOrder">
              <div class="card-body py-3 mb-5">
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
                      <label for="useremail" class="input-label m-0"
                        >Email</label
                      >
                      <input
                        type="email"
                        name="email"
                        v-model="form.user.email"
                        class="input-placeholder"
                        id="useremail"
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
                <button class="btn-type btn-type2">
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
                        data-toggle="modal"
                        data-target="#removeCart"
                        @click.prevent="removeItem = item.id"
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
                                  @click.prevent="removeCartItem"
                                >
                                  確定
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
              <div class="h5 mb-3 text-right pr-4 text-secondary">
                <del>總金額 {{ cart.total | currency }}</del>
              </div>

              <div class="h5 mb-3 text-right pr-4 text-tohoh">
                折扣後金額 {{ cart.final_total | currency }}
              </div>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control input-color bg-RIKYUNEZUMI border-RIKYUNEZUMI"
                  v-model="coupon_code"
                  placeholder="請輸入優惠碼"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-RIKYUNEZUMI"
                    type="button"
                    @click="addCouponCode"
                    :disabled="isDisable"
                    :class="{ 'text-success': coupon_code != '' }"
                  >
                    使用優惠
                  </button>
                  <i
                    class="far fa-question-circle text-warning align-self-center ml-2 js-flash"
                    data-toggle="tooltip"
                    data-placement="right"
                    data-html="true"
                    title="<div>秋季優惠：<p>- 凡購買商品立即享9折 -</p></div>
                      <div>開幕優惠：<div>總金額滿3000元 <div>輸入autumn</div></div><div>- 即可享7折 -</div></div>"
                  >
                  </i>
                </div>
              </div>

              <div class="text-center pt-4">
                <router-link class="text-decoration-none" to="/shop">
                  <button class="btn-type btn-type2 ">
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
              class="btn-type btn-type3 text-decoration-none"
              to="/shop"
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
      isLoading: false,
      isDisable: false,
      coupon_code: '',
      removeItem: '',
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
        }
      }
    }
  },

  methods: {
    getCart() {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      this.$http.get(api).then(response => {
        vm.cart = response.data.data
        vm.cartitem = response.data.data.carts.length
        this.autoCoupon()
        setTimeout(() => {
          vm.isLoading = false
        }, 1000)
        // console.log('購物車資料', response.data)
      })
    },
    autoCoupon() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const Api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const coupon = {
        code: 'grandopening'
      }

      if (vm.cart.total < 3000 || vm.cart.final_total == vm.cart.total) {
        this.$http.post(api, { data: coupon }).then(response => {
          // console.log('自動套用10%優惠卷', response)
        })
        setTimeout(() => {
          this.$http.get(Api).then(response => {
            vm.cart = response.data.data
            vm.cartitem = response.data.data.carts.length
          })
        }, 1000)
      }
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
    removeCartItem() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${vm.removeItem}`
      $('#removeCart').modal('hide')
      vm.isLoading = true
      this.$http.delete(api).then(response => {
        vm.getCart()
        this.$bus.$emit('message:push', '商品已被刪除', 'tohoh')
        setTimeout(() => {
          vm.isLoading = false
        }, 1500)
      })
    },
    addCouponCode() {
      const vm = this
      vm.isDisable = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      if (vm.cart.total >= 3000) {
        vm.isLoading = true
        this.$http.post(api, { data: coupon }).then(response => {
          if (response.data.success) {
            vm.getCart()
            vm.coupon_code = ''
            this.$bus.$emit('message:push', '已使用優惠碼', 'tohoh')
          } else {
            this.$bus.$emit('message:push', '錯誤的優惠碼', 'tohoh')
          }
          vm.isLoading = false
          setTimeout(() => {
            vm.isDisable = false
          }, 2000)
          // console.log('優惠卷', response)
        })
      } else {
        this.$bus.$emit('message:push', '未符合優惠條件', 'tohoh')
        setTimeout(() => {
          vm.isDisable = false
        }, 2000)
      }
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
</style>
