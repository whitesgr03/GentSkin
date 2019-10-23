<template>
  <div>
    <Navbar :navCart="cart" :navCartItem="cartitem" />
    <Menubar class="sticky-top" />
    <loading :active.sync="isLoading"></loading>
    <div class="container py-5">
      <div class="row justify-content-center">
        <form class="col-md " @submit.prevent="parOrder">
          <!--送出資料後觸發parOrder讓後端資料的order.is_paid更新-->
          <div class="h3 text-center py-3 mb-3">訂單資訊</div>
          <table class="table text-white text-center border">
            <thead>
              <tr>
                <th>訂單編號</th>
                <th>日期</th>
                <th>訂單狀態</th>
                <th>總價</th>
                <th>寄件資訊</th>
                <th>付款</th>
                <th>聯絡客服</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <!--將vm.order獲取的資料帶入-->
                <td class="align-middle">
                  <a
                    href="#"
                    @click.prevent="doCopy"
                    class="text-decoration-none"
                    >{{ order.id }}</a
                  >
                  <i
                    class="far fa-question-circle text-warning ml-2 js-flash"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    data-html="true"
                    title="<div>複製編號在查詢時使用</div>"
                  >
                  </i>
                </td>
                <td class="align-middle">
                  {{ order.create_at | date }}
                </td>
                <td class="align-middle text-success">
                  訂單成立
                </td>
                <td class="align-middle">
                  {{ order.total | currency }}
                </td>
                <td class="align-middle">
                  <i
                    class="fas fa-dolly-flatbed fa-lg"
                    style="cursor: pointer"
                    data-toggle="modal"
                    data-target="#recipientModal"
                  ></i>
                  <!-- 寄件Modal -->
                  <div
                    class="modal fade"
                    id="recipientModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                  >
                    <div
                      class="modal-dialog modal-dialog-centered "
                      role="document"
                    >
                      <div class="modal-content bg-dark">
                        <div class="modal-header ">
                          <h5 class="modal-title" id="exampleModalCenterTitle">
                            訂單貨號：({{ order.create_at }})，收件資訊如下：
                          </h5>
                          <button
                            type="button"
                            class="close position-absolute"
                            data-dismiss="modal"
                            aria-label="Close"
                            style="top:0"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body text-left">
                          <p>收貨人姓名：{{ order.user.name }}</p>
                          <p>收貨人電話：{{ order.user.tel }}</p>
                          <p class="m-0">
                            收貨人地址：{{ order.user.address }}
                          </p>
                        </div>
                        <div class="modal-footer">
                          <p class="m-0">個人練習作品 無商業用途</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="align-middle">
                  <span v-if="!order.is_paid" class="text-danger"
                    >尚未付款</span
                  >
                  <span v-else class="text-success">付款完成</span>
                  <!--觸發parOrder更新資料後將變更為付款完成-->
                </td>
                <td class="align-middle">
                  <i
                    class="fas fa-edit fa-lg"
                    style="cursor: pointer"
                    data-toggle="modal"
                    data-target="#serviceModal"
                  ></i>
                  <!-- 客服Modal -->
                  <div
                    class="modal fade"
                    id="serviceModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                  >
                    <div
                      class="modal-dialog modal-dialog-centered"
                      style="max-width: 650px;"
                      role="document"
                    >
                      <div class="modal-content bg-dark">
                        <div class="text-left border-bottom p-3">
                          <h5
                            class="modal-title mb-3"
                            id="exampleModalCenterTitle"
                          >
                            訂單問題查詢
                          </h5>
                          <p class="m-0">
                            訂購人姓名：{{ order.user.name }}
                            <span class="ml-5"
                              >訂購人Email：{{ order.user.email }}</span
                            >
                          </p>
                          <button
                            type="button"
                            class="close position-absolute"
                            data-dismiss="modal"
                            aria-label="Close"
                            style="top:0"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <table class="table text-white m-0">
                            <tbody>
                              <tr>
                                <td>
                                  <div class="custom-control custom-radio">
                                    <input
                                      type="radio"
                                      id="customRadioInline1"
                                      name="customRadioInline1"
                                      class="custom-control-input"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customRadioInline1"
                                      >查出貨進度</label
                                    >
                                  </div>
                                </td>
                                <td>
                                  <div class="custom-control custom-radio ">
                                    <input
                                      type="radio"
                                      id="customRadioInline2"
                                      name="customRadioInline1"
                                      class="custom-control-input"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customRadioInline2"
                                      >退 / 換貨問題</label
                                    >
                                  </div>
                                </td>
                                <td>
                                  <div class="custom-control custom-radio ">
                                    <input
                                      type="radio"
                                      id="customRadioInline3"
                                      name="customRadioInline1"
                                      class="custom-control-input"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customRadioInline3"
                                      >付款問題</label
                                    >
                                  </div>
                                </td>
                                <td>
                                  <div class="custom-control custom-radio ">
                                    <input
                                      type="radio"
                                      id="customRadioInline4"
                                      name="customRadioInline1"
                                      class="custom-control-input"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customRadioInline4"
                                      >發票問題</label
                                    >
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="modal-footer">
                          <p class="m-0">個人練習作品 無商業用途</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="h5 py-3 m-0">商品明細</div>
          <table class="table text-white">
            <tbody v-for="item in order.products" :key="item.id">
              <tr>
                <td width="350">商品ID：{{ item.product.id }}</td>
                <td>{{ item.product.title }}</td>
                <td width="150">{{ item.qty }}{{ item.product.unit }}</td>
                <td width="140">{{ item.final_total | currency }}</td>
                <td class="text-danger" width="120">
                  <span v-if="!order.is_paid" class="text-danger"
                    >尚未出貨</span
                  >
                  <span v-else class="text-warning">等待出貨</span>
                  <!--觸發parOrder更新資料後將變更為等待出貨-->
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right pt-2 pr-3" v-if="order.is_paid === false">
            <!--尚未觸發parOrder更新order.is_paid時為false會顯示 點此付款 true時就會消失-->
            <button
              class="btn-type"
              style="background-color:#B17844; padding: 5px 20px;"
            >
              測試付款
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- 完成付款Modal -->
    <div
      class="modal fade"
      id="payModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content bg-dark">
          <div class="modal-body text-center p-4 h4">
            <div class="mb-3">感謝您使用付款功能</div>
            <div>已完成交易，準備進行出貨</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/forestage/Navbar.vue'
import Menubar from '@/components/forestage/Menubar.vue'
import $ from 'jquery'

export default {
  data() {
    return {
      isLoading: false,
      orderId: '',
      order: {
        user: {}
      },
      cart: [],
      cartitem: []
    }
  },
  methods: {
    getCart() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      this.$http.get(api).then(response => {
        vm.cart = response.data.data
        vm.cartitem = response.data.data.carts.length
        // console.log('home 購物車資料', response.data)
      })
    },
    getOrder() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}` //從後端取的orderId
      vm.isLoading = true
      this.$http.get(api).then(response => {
        vm.order = response.data.order
        // console.log('結帳資料', response)
        vm.isLoading = false
      })
    },
    parOrder() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.isLoading = true
      this.$http.post(api).then(response => {
        if (response.data.success) {
          setTimeout(() => {
            $('#payModal').modal('show')
          }, 1000)
          setTimeout(() => {
            $('#payModal').modal('hide')
          }, 4000)
        }
        this.getOrder()
        // console.log('付款完成', response)
      })
    },
    doCopy() {
      const vm = this
      vm.$copyText(vm.order.id).then(e => {
        this.$bus.$emit('message:push', '已將編號複製到剪貼簿', 'tohoh')
        // console.log(e)
      })
    }
  },
  created() {
    $(function() {
      $('[data-toggle="tooltip"]').tooltip()
    }),
      (this.orderId = this.$route.params.orderId) //對應route中的orderId
    this.getOrder()
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
  border: none;
}
.btn-type:after {
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
.btn-type:hover {
  border: 1px solid rgba(255, 255, 255, 0.8);
  color: rgba(255, 255, 255, 0.8);
}
.btn-type:hover:after {
  left: 0;
  width: 100%;
}
</style>
