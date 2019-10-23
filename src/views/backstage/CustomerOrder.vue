<template>
  <div>
    <!--商品列表-->
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div
        class="col-md-3 mb-4"
        v-for="item in products"
        :key="item.id"
        v-if="item.is_enabled"
      >
        <!--透過vm.products將資料從後端取出顯示在畫面上  v-if代表未啟用商品時不顯示-->
        <div class="card border-0 shadow-sm bg-dark">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          >
            <!--使用動態樣式帶入背景圖片 在使用ES6方式帶入圖片連結-->
          </div>
          <div class="card-body ">
            <span class="badge badge-primary float-right ml-2">{{
              item.category
            }}</span>
            <h5 class="card-title">
              <a href="#" class="text-white">{{ item.title }}</a>
            </h5>

            <div class="text-right align-items-baseline">
              <div class="h6" v-if="!item.price">
                <span class="h5">{{ item.origin_price | currency }}</span> 元
              </div>
              <del class="card-text h6 text-muted" v-if="item.price"
                >原價 {{ item.origin_price | currency }} 元</del
              >
              <!--如果未出現折扣時將只會顯示原價-->
              <!-- <div >{{item.content}}</div> -->

              <div class="h6" v-if="item.price">
                <span class="h5">現在只要 {{ item.price | currency }}</span> 元
              </div>
            </div>
          </div>
          <div class="card-footer d-flex  border-light">
            <button
              type="button"
              class="btn btn-outline-info btn-sm"
              @click="getProduct(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              <!--getProduct(item.id) 透過id取的單一的資料 如果loadingItem與id相同則觸發動畫-->
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              <!--addtoCart(item.id) 透過id取的單一的資料 如果loadingItem與id相同則觸發動畫-->
              加到購物車
            </button>
          </div>
        </div>
      </div>
      <!--分頁props-->
    </div>
    <Pagination :paginations="pagination" @getPage="getProducts" />
    <hr class="bg-secondary" />

    <!--購物車內容-->
    <div v-if="cart.carts != ''">
      <!--如果購物車內沒有商品的話 不顯示在畫面上-->
      <div class="my-5 row justify-content-center">
        <div class="my-5 row justify-content-center border p-5">
          <div class="h3 text-center pb-4">購物車資訊</div>
          <table class="table text-white">
            <thead>
              <th></th>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <!--透過vm.cart中的carts帶入後端資料-->
                <td class="align-middle">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="removeCartItem(item.id)"
                  >
                    <!--removeCartItem(item.id) 按下按鈕移除單一筆資料-->
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
                <td class="align-middle">
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td class="align-middle">
                  {{ item.qty }}/{{ item.product.unit }}
                </td>
                <td class="align-middle text-right">
                  {{ item.final_total | currency }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">總金額</td>
                <td class="text-right">{{ cart.total | currency }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <!--加上則扣後最終金額不等於原始總金額時才會顯示-->
                <td colspan="3" class="text-right text-success">折扣後金額</td>
                <td class="text-right text-success">
                  {{ cart.final_total | currency }}
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input
              type="text"
              class="form-control input-color"
              v-model="coupon_code"
              placeholder="請輸入優惠碼"
            />
            <!--在後端資料庫中抓取與v-model相同的文字做為比對-->
            <div class="input-group-append">
              <button
                class="btn btn-outline-info "
                type="button"
                @click="addCouponCode"
              >
                <!--addCouponCode 比對成功時將可帶入折扣-->
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--填寫資料表單-->
      <div class="my-5 row justify-content-center ">
        <form class="col-md-6 border p-5" @submit.prevent="creatOrder">
          <!--傳送資料時觸發creatOrder函式-->

          <div class="form-group">
            <div class="h3 text-center">個人資訊</div>
            <label for="useremail">Email</label>
            <input
              type="email"
              class="form-control input-color"
              name="email"
              id="useremail"
              v-model="form.user.email"
              v-validate="'required|email'"
              :class="{ 'is-invalid': errors.has('email') }"
              placeholder="請輸入 Email"
            />
            <span class="text-danger" v-if="errors.has('email')">
              <i class="fas fa-exclamation-circle"></i>
              {{ errors.first('email') }} email@example.com
            </span>
          </div>

          <div class="form-group">
            <label for="username">收件人姓名</label>
            <input
              type="text"
              class="form-control input-color"
              name="name"
              id="username"
              v-model="form.user.name"
              v-validate="'required'"
              :class="{ 'is-invalid': errors.has('name') }"
              placeholder="請輸入姓名"
            />
            <span class="text-danger" v-if="errors.has('name')">
              <i class="fas fa-exclamation-circle"></i> 姓名欄位 不得留空。
            </span>
          </div>

          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input
              type="tel"
              class="form-control input-color"
              name="tel"
              id="usertel"
              v-model="form.user.tel"
              v-validate="'required'"
              :class="{ 'is-invalid': errors.has('tel') }"
              placeholder="請輸入電話"
            />
            <span class="text-danger" v-if="errors.has('tel')">
              <i class="fas fa-exclamation-circle"></i> 電話欄位 不得留空。
            </span>
          </div>

          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input
              type="text"
              class="form-control input-color"
              name="address"
              id="useraddress"
              v-model="form.user.address"
              v-validate="'required'"
              :class="{ 'is-invalid': errors.has('address') }"
              placeholder="請輸入地址"
            />
            <span class="text-danger" v-if="errors.has('address')">
              <i class="fas fa-exclamation-circle"></i> 地址欄位 不得留空。
            </span>
          </div>

          <div class="form-group">
            <label for="comment">留言</label>
            <textarea
              name
              id="comment"
              class="form-control input-color"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-danger">送出訂單</button>
          </div>
        </form>
      </div>
    </div>

    <!--查看更多 模板-->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0 bg-dark text-white">
          <div class="pr-2">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-center">
              <img :src="product.imageUrl" class="img-fluid" alt />
            </div>

            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.title }}</p>
              <footer class="blockquote-footer text-right text-white">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="text-right align-items-baseline">
              <div class="h5" v-if="!product.price">
                <span class="h4">{{ product.origin_price | currency }}</span
                >元
              </div>
              <del class="h6 text-muted" v-if="product.price">
                原價
                <span class="h5">{{ product.origin_price | currency }}</span
                >元
              </del>

              <div class="h5" v-if="product.price">
                現在只要
                <span class="h4">{{ product.price | currency }}</span
                >元
              </div>
            </div>
            <select class="form-control mt-3 input-color" v-model="number">
              <option :value="num" v-for="num in 10" :key="num"
                >選購 {{ num }} {{ product.unit }}</option
              >
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-nowrap mr-3">
              小計
              <strong>{{ (product.num * product.price) | currency }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-success"
              @click.prevent="addtoCart(product.id, number)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="product.id === status.loadingItem"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/backstage/Pagination'

export default {
  data() {
    return {
      products: [],
      product: {},
      cart: [],
      number: '',
      pagination: {},
      status: {
        loadingItem: ''
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      isLoading: false,
      coupon_code: ''
    }
  },
  methods: {
    getProducts(page) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      vm.isLoading = true //啟用讀取動畫
      this.$http.get(api).then(response => {
        vm.products = response.data.products
        vm.isLoading = false //資料讀取完成後再停用動畫
        vm.pagination = response.data.pagination
        console.log('販賣的物品', response.data)
      })
    },
    getProduct(id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.status.loadingItem = id
      this.$http.get(api).then(response => {
        vm.product = response.data.product
        $('#productModal').modal('show')
        vm.number = 1
        vm.status.loadingItem = ''
      })
    },
    addtoCart(id, qty = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }

      this.$http.post(api, { data: cart }).then(response => {
        vm.getCart()
        vm.status.loadingItem = ''
        $('#productModal').modal('hide')
        console.log('加入商品', response)
      })
    },
    getCart() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      this.$http.get(api).then(response => {
        vm.cart = response.data.data
        // console.log('購物車資料', response.data.data)
        vm.isLoading = false
      })
    },
    removeCartItem(id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      this.$http.delete(api).then(response => {
        console.log('刪除', response)
        vm.getCart()
        vm.isLoading = false
      })
    },
    addCouponCode() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.isLoading = true
      this.$http.post(api, { data: coupon }).then(response => {
        // console.log('優惠卷', response.data)
        if (response.data.success) {
          vm.getProducts()
        } else {
          vm.getProducts()
          // console.log('優惠卷使用失敗')
        }
        vm.getCart()
        vm.isLoading = false
      })
    },
    creatOrder() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(api, { data: order }).then(response => {
            // console.log('建立訂單', response.data)
            if (response.data.success) {
              vm.$router.push(`/customer/check/${response.data.orderId}`) //確保傳入orderId
            }
          })
        } else {
          // console.log('欄位不完整')
        }
      })
    }
  },
  created() {
    this.getProducts()
    this.getCart()
  },
  components: {
    Pagination
  }
}
</script>

<style scoped></style>
