<template>
  <div>
    <Modal :navCart="cart" @userLogin="getLogin" :orderList="orderData" />
    <Header class="sticky-top" :navCartItem="cartitem" :navSignin="loginStatus" @order="getOrder"
    :orderButton="orderStatus"/>
    <loading :active.sync="isLoading"></loading>

    <div class="check container py-5">
      <h3 class="text-center mb-5">訂單資訊</h3>
      <p>訂單ID：<span class="text-midori">{{ order.id }}</span></p>
      <div class="d-flex justify-content-between align-items-center">
        <p class=" m-0">訂單狀態：<span class="text-warning">準備出貨</span></p>
        <button type="button" class="btn px-0"
          data-toggle="modal" data-target="#serviceModal">
          <i class="fas fa-edit">聯絡客服</i>
        </button>
      </div>
      <div class="check-info row justify-content-center py-md-3">
        <div class="col-12 col-md-8">
          <div class="table-overflow py-md-5">
            <table class="table">
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td  width="120">
                    <img :src="item.product.imageUrl" scope="row"/>
                  </td>
                  <td class="align-middle">{{ item.product.title }}</td>
                  <td width="60" class="align-middle text-right">
                    {{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="align-middle text-right"><span class="text-danger">
                    {{ item.final_total | currency }} </span>
                    <span class="d-md-inline-block d-none">元</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-12 col-md-4 d-flex align-items-center py-3 ">
          <table class="table">
            <tbody>
              <tr>
                <td>小計</td>
                <td class="text-right"><span class="text-danger">
                  {{ order.total | currency }} </span>元</td>
              </tr>
              <tr>
                <td>運費</td>
                <td class="text-right">
                  <span class="text-danger" v-if="order.user.fee">
                  {{ order.user.fee.shipping | currency }}
                  </span>元
                </td>
              </tr>
              <tr>
                <td class="pt-5">總金額</td>
                <td class="text-right pt-5">
                  <span class="text-danger" v-if="order.user.fee">
                    {{ (order.total + order.user.fee.shipping) | currency }}
                  </span>元
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        <div class="row border-top py-3">
          <div class="col-12 col-md-4">
            <ul class="list-group" v-if="order.user.recipient">
              <li class="h3 list-group-item text-midori">聯絡資訊</li>
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
          <div class="col-12 col-md-4">
            <ul class="list-group" v-if="order.user.fee">
              <li class="h3 list-group-item text-biwacha">付款方式</li>
              <li class="list-group-item">{{  order.user.fee.payment }}</li>
            </ul>
          </div>
          <div class="col-12 col-md-4">
            <ul class="list-group" v-if="order.user.recipient">
              <li class="h3 list-group-item text-biwacha">配送方式</li>
              <li class="list-group-item">{{ order.user.recipient.transport }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Modal from '@/components/forestage/Modal.vue';
import Header from '@/components/forestage/Header.vue';

export default {
  data() {
    return {
      isLoading: false,
      loginStatus: false,
      orderId: '',
      orderStatus: '',
      order: {
        user: {},
      },
      cart: [],
      cartitem: [],
      orderData: [],
    };
  },
  methods: {
    getOrderData() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`; // 從後端取的orderId
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.order = response.data.order;
        // console.log('結帳資料', vm.order);
        vm.isLoading = false;
      });
    },
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.cartitem = response.data.data.carts.length;
        // console.log('home 購物車資料', response.data);
      });
    },
    getLogin() {
      const vm = this;
      const getAccount = JSON.parse(sessionStorage.getItem('myAccount'));
      if (getAccount !== null) {
        const verify = getAccount.find(item => item.login === true);
        if (verify !== undefined) {
          vm.loginStatus = true;
          vm.orderStatus = verify.orderID;
        }
      }
    },
    getOrder() {
      const vm = this;
      const accountData = JSON.parse(sessionStorage.getItem('myAccount'));
      const verify = accountData.filter(item => item.login === true);
      if (verify[0].orderID !== undefined) {
        vm.orderData = [];
        verify[0].orderID.forEach((item) => {
          const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${item}`;
          this.$http.get(api).then((response) => {
            vm.orderData.push(response.data.order);
          });
        });
        // console.log(vm.orderData);
      }
    },
  },
  created() {
    this.orderId = this.$route.params.orderId; // 對應route中的orderId
    this.getOrderData();
    this.getCart();
    this.getLogin();
  },
  components: {
    Modal,
    Header,
  },
};
</script>
