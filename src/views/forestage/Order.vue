<template>
  <div>
    <Modal :navCart="cart" @removeCart="removeCartItem" @userLogin="getLogin"
    :orderList="orderData" />
    <Header class="sticky-top" :navCartItem="cartitem" :navSignin="loginStatus" @order="getOrder"
    :orderButton="orderStatus" />
    <loading :active.sync="isLoading"></loading>
    <div class="order container-fluid py-md-5">
      <div class="row">
        <div class="col-12 col-md-6 orderer" v-if="cartitem">
          <p class="h3 text-center">取件人資訊</p>
          <div class="delivery mb-5">
            <p>配送方式</p>
            <div class="delivery-option">
              <button type="button"  class="7Eleven button bg-biwacha"
              @click.prevent="delivery = '7Eleven', form.user.fee.shipping = 60,
              form.user.recipient.transport = '7-11門市取貨', form.user.fee.payment = '7-11門市取貨付款'"
              >
                7-11超商取貨
              </button>
              <button type="button" class="familyMart button bg-biwacha"
                @click.prevent="delivery = 'familyMart', form.user.fee.shipping = 60,
                form.user.recipient.transport = '全家門市取貨', form.user.fee.payment = '全家門市取貨付款'">
                全家超商取貨
              </button>
              <button type="button" class="transport button bg-biwacha"
                @click.prevent="delivery = 'transport', form.user.fee.shipping = 80,
                form.user.recipient.transport = '宅配到府', form.user.fee.payment = '宅配貨到付款'">
                宅配到府
              </button>
            </div>
          </div>
          <ValidationObserver tag="form"
            ref="observer" v-slot="{ valid }" @submit.prevent="creatOrder">
            <div>
              <div class="delivery-select">
                <button type="button"
                class="button bg-konjyo hide w-50"
                :class="{'visible': delivery == '7Eleven'}"
                data-toggle="modal" data-target="#testModal">
                    選擇7-11門市
                </button>
                <button type="button"
                class="button bg-konjyo hide w-50 position-absolute"
                :class="{'visible': delivery == 'familyMart'}"
                data-toggle="modal" data-target="#testModal">
                  選擇全家門市
                </button>
              </div>
              <div class="form-row hide" :class="{'visible': delivery != '',
                'form-height': delivery == '7Eleven'|| delivery == 'familyMart'}">
                <div class="col-6">
                  <ValidationProvider id="name" class="form"
                    rules="required" v-slot="{ valid, errors }">
                    <label for="username" class="label"
                    :class="{'label-border-error' : !valid && form.user.recipient.name !== '',
                    'label-border-success' : valid}">
                      取件人姓名
                    <input
                      type="text"
                      class="input"
                      id="username"
                      placeholder="Name"
                      v-model="form.user.recipient.name"
                    />
                    <span class="text-danger"
                    style="font-size:12px; font-weight: 400;">{{ errors[0] }}</span>
                    </label>
                  </ValidationProvider>
                </div>
                <div class="col-6">
                  <ValidationProvider class="form" rules="required|numeric|min:8|max:10"
                    v-slot="{ valid, errors }">
                    <label for="usertel" class="label"
                    :class="{'label-border-error' : !valid && form.user.recipient.tel !== '',
                      'label-border-success' : valid}">
                      取件人電話
                    <input id="usertel" class="input"
                      v-model="form.user.recipient.tel" type="tel"
                      placeholder="Tel" />
                    <span class="text-danger" style="font-size:12px; font-weight: 400;">
                      {{ errors[0] }}
                    </span>
                    </label>
                  </ValidationProvider>
                </div>
              </div>
              <div class="form-row hide mb-5" v-if="delivery == 'transport' || delivery == ''"
              :class="{'visible': delivery == 'transport'}">
                <div class="col-6">
                  <ValidationProvider class="form" rules="required" v-slot="{ valid, errors }">
                    <label for="usercountry" class="label"
                    :class="{'label-border-error' : !valid && form.user.recipient.country !== '',
                      'label-border-success' : valid}"
                    >選取國家
                      <select id="usercountry" class="form-control"
                      v-model="form.user.recipient.country">
                        <option>台灣</option>
                      </select>
                      <span class="text-danger" style="font-size:12px; font-weight: 400;">
                        {{ errors[0] }}
                      </span>
                    </label>
                  </ValidationProvider>
                </div>
                <div class="col-6">
                  <ValidationProvider class="form" rules="required" v-slot="{ valid, errors }">
                    <label for="usercity" class="label"
                    :class="{'label-border-error' : !valid && form.user.recipient.city !== '',
                      'label-border-success' : valid}"
                    >選取縣市
                      <select id="usercity" class="form-control" v-model="form.user.recipient.city"
                      :disabled="form.user.recipient.country === ''">
                        <option v-for="(item, i) in cities" :key="i">{{ item.name }}</option>
                      </select>
                      <span class="text-danger" style="font-size:12px; font-weight: 400;">
                        {{ errors[0] }}
                      </span>
                    </label>
                  </ValidationProvider>
                </div>
                <div class="col-6">
                  <ValidationProvider class="form" rules="required" v-slot="{ valid, errors }">
                    <label for="userdistrict" class="label"
                    :class="{'label-border-error' : !valid && form.user.recipient.district !== '',
                      'label-border-success' : valid}"
                    >選取鄉鎮市區
                      <select id="userdistrict" class="form-control"
                      v-model="form.user.recipient.district"
                      :disabled="form.user.recipient.city === ''">
                        <option v-for="(item, i) in filterData" :key="i">
                          {{ item.city }}
                        </option>
                      </select>
                      <span class="text-danger" style="font-size:12px; font-weight: 400;">
                        {{ errors[0] }}
                      </span>
                    </label>
                  </ValidationProvider>
                </div>
                <div class="col-6">
                  <ValidationProvider class="form" rules="required" v-slot="{ valid, errors }">
                    <label for="userzip" class="label"
                    :class="{'label-border-error' : !valid && form.user.recipient.zip !== '',
                      'label-border-success' : valid}"
                    >郵遞區號
                    <input id="userzip" class="input"
                      v-model="form.user.recipient.zip" type="text" disabled
                      placeholder="Zip" />
                      <span class="text-danger" style="font-size:12px; font-weight: 400;">
                        {{ errors[0] }}
                      </span>
                    </label>
                  </ValidationProvider>
                </div>
                <div class="col-12">
                  <ValidationProvider class="form" rules="required" v-slot="{valid, errors }">
                    <label for="useraddress" class="label"
                    :class="{'label-border-error' : !valid && form.user.recipient.address !== '',
                      'label-border-success' : valid}"
                    >取件人地址
                    <input id="useraddress" class="input"
                      v-model="form.user.recipient.address" type="text" placeholder="Address" />
                      <span class="text-danger" style="font-size:12px; font-weight: 400;">
                        {{ errors[0] }}
                      </span>
                    </label>
                  </ValidationProvider>
                </div>
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="check"
                  />
                  <label class="form-check-label"
                  for="check">
                  將資料存為預設地址</label
                  >
                </div>
              </div>
            </div>
            <button type="submit" class="button button-animated
              bg-biwacha hide align-self-end"
            :class="{'visible': delivery != ''}">
              送出訂單
            </button>
            <router-link to="/shop" class="d-block ml-5 d-md-none hide"
            :class="{'visible': delivery != ''}">
              <button class="button button-animated bg-biwacha">
                繼續選購
              </button>
            </router-link>
          </ValidationObserver>
        </div>
        <div class="col-12 col-md-6 cart" v-if="cartitem">
          <p class="h3 text-center mb-3">購物車</p>
            <div class="table-overflow">
              <table class="table">
                <thead>
                  <tr>
                    <th class="border-0" scope="col"></th>
                    <th class="border-0" scope="col"></th>
                    <th class="border-0" scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cart.carts" :key="item.id">
                    <th class="align-middle">
                      <button
                        type="button"
                        class="btn btn-outline-danger rounded btn-sm"
                        data-toggle="modal"
                        data-target="#removeCart"
                        @click.prevent="removeItem = item.id">
                        <i class="far fa-trash-alt fa-lg"></i>
                      </button>
                    </th>
                    <td>
                      <img :src="item.product.imageUrl" scope="row"/>
                    </td>
                    <td class="align-middle">
                      <tr>
                        <td width="100%">
                          {{ item.product.title }}
                        </td>
                      </tr>
                      <tr>
                        <td>
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
            <p class="h5 mb-3 pr-4 text-right text-tohoh">
              折扣後金額
              <span class="text-danger">
                {{ cart.final_total | currency }}
              </span>
            </p>
            <p class="h5 mb-3 text-right pr-4">
              運費
              <span class="text-secondary" v-if="form.user.fee.shipping == ''">待選擇</span>
              <span class="text-danger" v-else>{{ form.user.fee.shipping | currency }}</span>
            </p>
            <p class="h5 mb-3 text-right pr-4">
              總金額
              <span class="text-danger">
                {{ (cart.final_total + form.user.fee.shipping) | currency }}
              </span>
            </p>
            <form>
              <input class="form-control"
                type="text"
                v-model="coupon_code"
                placeholder="請輸入優惠碼" />
              <button type="button" class="btn"
                @click="addCouponCode" :disabled="isDisable"
                :class="{ 'text-success': coupon_code != '' }">
                發送
              </button>
              <i
                class="far fa-question-circle text-warning align-self-center ml-2 cart-animate"
                data-toggle="tooltip"
                data-placement="bottom"
                data-html="true"
                title="<div>無限優惠：<p>- 凡購買商品立即享9折 -</p></div>
                  <div>特別優惠：<div>總金額大於(滿)3000元 <div>輸入GentSkin</div>
                  </div><div>- 即可享7折 -</div></div>">
              </i>
            </form>
            <div class="text-center d-none d-md-block">
              <router-link class="text-decoration-none" to="/shop">
                <button class="button button-animated bg-biwacha">
                  繼續選購
                </button>
              </router-link>
            </div>
        </div>
        <div class="col empty" v-if="!cartitem">
          <div>
            <div class="h5 py-5">
              購物車目前無任何商品
            </div>
            <div class="py-5">
              <router-link
                class="button bg-konjyo"
                to="/shop"
                >繼續選購商品
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { ValidationProvider, ValidationObserver } from 'vee-validate'; // 驗證功能
import twzipcode from 'twzipcode-data';
import Modal from '@/components/forestage/Modal.vue';
import Header from '@/components/forestage/Header.vue';

export default {
  data() {
    return {
      isLoading: false,
      isDisable: false,
      loginStatus: false,
      coupon_code: '',
      removeItem: '',
      cart: [],
      cartitem: [],
      accountData: [],
      orderData: [],
      newOrder: '',
      delivery: '',
      cities: '',
      zipCode: '',
      orderStatus: '',
      form: {
        user: {
          recipient: {
            name: '',
            tel: '',
            country: '',
            city: '',
            district: '',
            zip: '',
            address: '',
            transport: '',
          },
          fee: {
            shipping: '',
            payment: '',
          },
        },
      },
    };
  },

  methods: {
    getCart() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.cartitem = response.data.data.carts.length;
        this.autoCoupon();
        setTimeout(() => {
          vm.isLoading = false;
        }, 1000);
        // console.log('購物車資料', vm.cart.carts);
      });
    },
    getZipCode() {
      const vm = this;
      vm.zipCode = twzipcode().zipcodes;
      vm.cities = twzipcode().counties;
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
    autoCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const Api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const coupon = {
        code: 'discount',
      };

      if (vm.cart.total < 3000 || vm.cart.final_total === vm.cart.total) {
        this.$http.post(api, { data: coupon }).then(() => {
          // console.log('自動套用10%優惠卷', response)
        });
        setTimeout(() => {
          this.$http.get(Api).then((response) => {
            vm.cart = response.data.data;
            vm.cartitem = response.data.data.carts.length;
          });
        }, 1000);
      }
    },
    creatOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      const number = '000';
      const random = String(Math.floor(Math.random() * 5) + 6) + number;
      vm.$refs.observer.validate().then((result) => {
        vm.isLoading = true;
        if (result) {
          vm.isLoading = false;
          $('#payModal').modal({
            backdrop: 'static',
          });
          $('#payModal').modal('show');
          this.$http.post(api, { data: order }).then((response) => {
            // console.log('建立訂單', response.data)
            if (response.data.success) {
              const Api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${response.data.orderId}`;
              this.$http.post(Api).then(() => {});
              vm.accountData = JSON.parse(sessionStorage.getItem('myAccount'));
              const verify = vm.accountData.filter(item => item.login === true);
              if (verify[0].orderID === undefined) {
                verify[0].orderID = [response.data.orderId];
              } else {
                verify[0].orderID.push(response.data.orderId);
              }
              setTimeout(() => {
                sessionStorage.removeItem('myAccount');
                sessionStorage.setItem('myAccount', JSON.stringify(vm.accountData));
                $('#payModal').modal('hide');
                vm.$router.push(`check/${response.data.orderId}`); // 確保傳入orderId
              }, Number(random));
            }
          });
        } else {
          this.$bus.$emit('alert', '欄位輸入錯誤或不完整');
          vm.isLoading = false;
        }
      });
    },
    removeCartItem() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${vm.removeItem}`;
      $('#removeCart').modal('hide');
      this.$http.delete(api).then(() => {
        vm.getCart();
        this.$bus.$emit('alert', '商品已被刪除');
        vm.isLoading = false;
      });
    },
    addCouponCode() {
      const vm = this;
      vm.isDisable = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      if (vm.cart.total >= 3000) {
        vm.isLoading = true;
        this.$http.post(api, { data: coupon }).then((response) => {
          if (response.data.success) {
            vm.getCart();
            vm.coupon_code = '';
            this.$bus.$emit('alert', '已使用優惠碼');
          } else {
            this.$bus.$emit('alert', '錯誤的優惠碼');
          }
          vm.isLoading = false;
          setTimeout(() => {
            vm.isDisable = false;
          }, 2000);
          // console.log('優惠卷', response)
        });
      } else {
        this.$bus.$emit('alert', '未符合優惠條件');
        setTimeout(() => {
          vm.isDisable = false;
        }, 2000);
      }
    },
  },
  computed: {
    filterData() {
      const vm = this;
      let city = [];
      let district = [];
      if (vm.form.user.recipient.city !== '') { // 選擇城市後篩選鄉鎮市區
        vm.form.user.recipient.zip = '';
        city = vm.zipCode.filter(item => item.county === vm.form.user.recipient.city);
        if (vm.form.user.recipient.district !== '') { // 選擇區域後帶入郵遞區號
          district = city.filter(item => item.city === vm.form.user.recipient.district);
          district.forEach((item) => {
            vm.form.user.recipient.zip = item.id;
          });
        }
        // console.log(district);
      }
      // console.log(city);
      return city;
    },
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip();
  },
  created() {
    this.getCart();
    this.getZipCode();
    this.getLogin();
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    Modal,
    Header,
  },
};
</script>
