<template>
  <div>
    <div class="check py-5">
      <div class="container">
        <h3 class="text-center mb-5">訂單資訊</h3>
        <p>訂單ID：<span class="text-success">{{ order.id }}</span></p>
        <div class="d-flex justify-content-between align-items-center">
          <p class=" m-0">訂單狀態：<span class="text-warning">準備出貨</span></p>
          <button type="button" class="btn px-0"
            data-toggle="modal" data-target="#serviceModal">
            <i class="fas fa-edit">聯絡客服</i>
          </button>
        </div>
        <div class="check-cartInfo">
          <div class="row justify-content-center py-md-3">
            <div class="col-md-8 mb-5 mb-md-0">
              <div class="overflow">
                <div class="row m-0 py-3 align-items-center"
                v-for="item in order.products" :key="item.id">
                  <div class="col-6">
                    <img class="w-50 border p-1" :src="item.product.imageUrl" />
                  </div>
                  <div class="col-6">
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
            </div>
            <div class="col-md-4">
              <div class="row flex-column justify-content-center h-100 px-5">
                <div class="d-flex justify-content-between">
                  <p >小計</p>
                  <p class="text-danger">
                    {{ order.total | currency }}元
                  </p>
                </div>
                <div class="d-flex justify-content-between" v-if="order.user.fee">
                  <p >運費</p>
                  <p class="text-danger">
                    {{ order.user.fee.shipping | currency }}元
                  </p>
                </div>
                <div class="d-flex justify-content-between" v-if="order.user.fee">
                  <p >總金額</p>
                  <p class="text-danger">
                    {{ (order.total + order.user.fee.shipping) | currency }}元
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="check-receiverInfo">
          <div class="row py-3">
            <div class="col-md-6">
              <ul class="list-group" v-if="order.user.recipient">
                <li class="h3 list-group-item text-success">聯絡資訊</li>
                <li class="list-group-item">姓名： {{ order.user.recipient.name }} </li>
                <li class="list-group-item">電話： {{ order.user.recipient.tel }} </li>
                <li class="list-group-item pr-md-0" v-if="order.user.recipient.transport == '宅配到府'">
                  地址：
                  {{ order.user.recipient.country }}
                  {{ order.user.recipient.city }}
                  {{ order.user.recipient.zip }}
                  {{ order.user.recipient.district }}
                  <br>
                  {{ order.user.recipient.address }}
                </li>
              </ul>
            </div>
            <div class="col-md-3">
              <ul class="list-group" v-if="order.user.fee">
                <li class="h3 list-group-item text-biwacha">付款方式</li>
                <li class="list-group-item">{{  order.user.fee.payment }}</li>
              </ul>
            </div>
            <div class="col-md-3">
              <ul class="list-group" v-if="order.user.recipient">
                <li class="h3 list-group-item text-biwacha">配送方式</li>
                <li class="list-group-item">{{ order.user.recipient.transport }}</li>
              </ul>
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
        role="document">
        <form class="modal-content bg-dark" @submit.prevent="getHelper(question)">
          <button
          type="button"
          class="button-close position-absolute"
          data-dismiss="modal"
          aria-label="Close">
          <i class="fas fa-times"></i>
          </button>
          <div class="text-md-left text-center border-bottom p-3">
            <h5 class="m-0">問題查詢</h5>
          </div>
          <div class="modal-body">
            <div class="custom-control custom-radio">
              <input type="radio" id="progress" name="customerService"
              value="delivery" class="custom-control-input" v-model="question">
              <label class="custom-control-label" for="progress">何時出貨</label>
            </div>
            <div class="custom-control custom-radio">
              <input type="radio" id="return" name="customerService"
              value="#Q3" class="custom-control-input" v-model="question">
              <label class="custom-control-label" for="return">商品瑕疵</label>
            </div>
            <div class="custom-control custom-radio">
              <input type="radio" id="payment" name="customerService"
              value="#Q1" class="custom-control-input" v-model="question">
              <label class="custom-control-label" for="payment">如何付款</label>
            </div>
            <div class="custom-control custom-radio">
              <input type="radio" id="invoice" name="customerService"
              value="receipt" class="custom-control-input" v-model="question">
              <label class="custom-control-label" for="invoice">訂單查詢</label>
            </div>
          </div>
          <div class="text-md-right text-center border-top p-3">
            <button type="submit" class="button button-slide text-white"
            :disabled="question === ''">
              查詢
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      order: {
        user: {},
      },
      question: '',
    };
  },
  methods: {
    getOrderData(id) {
      // 取得訂單資訊
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`; // 從後端取的orderId
      vm.$store.dispatch('loading', true);
      this.$http.get(api).then((response) => {
        vm.order = response.data.order;
        vm.$store.dispatch('loading', false);
      });
    },
    getHelper(value) {
      // 客服選項跳轉頁面
      const vm = this;
      $('#serviceModal').modal('hide');
      $('#serviceModal').on('hidden.bs.modal', () => {
        if (value === 'delivery' || value === 'receipt') {
          vm.$router.push({ name: 'Helper', params: { scroll: '#Q2' } });
        } else {
          vm.$router.push({ name: 'Helper', params: { scroll: value } });
        }
      });
    },
  },
  created() {
    this.getOrderData(this.$route.params.orderId);
  },
};
</script>
