<template>
  <div>
    <loading :active.sync="isLoading" loader="dots" style="z-index: 1;"></loading>
    <div class="order container-fluid" :class="{'vh-100' : cart.length === 0}">

      <div class="row" v-if="cart.total > 0">
        <!-- 寄件資訊 -->
          <div class="col-md-6" >
            <div class="receiver">
              <p class="h3 text-center">取件人資訊</p>
              <div class="delivery mb-5">
                <p>配送方式</p>
                <div class="delivery-option">
                  <button type="button"  class="button bg-black text-white"
                  @click.prevent="delivery = 'CVS', form.user.fee.shipping = 60,
                  form.user.recipient.transport = '門市取貨', form.user.fee.payment = '門市取貨付款'"
                  >
                    超商取貨
                  </button>
                  <button type="button" class="button bg-black text-white"
                    @click.prevent="delivery = 'COD', form.user.fee.shipping = 80,
                    form.user.recipient.transport = '宅配到府', form.user.fee.payment = '宅配貨到付款'">
                    宅配到府
                  </button>
                </div>
              </div>
              <ValidationObserver tag="form"
                ref="observer" v-slot="{ valid }" @submit.prevent="creatOrder">
                <div>
                  <div class="form-row hide justify-content-center">
                    <div class="col-6">
                      <ValidationProvider id="name" class="form"
                        rules="required" v-slot="{ valid, errors }">
                        <label for="userName" class="label"
                        :class="{'label-border-error' : !valid && form.user.recipient.name !== '',
                        'label-border-success' : valid}">
                          取件人姓名
                        <input
                          type="text"
                          class="input"
                          id="userName"
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
                        <label for="userTel" class="label"
                        :class="{'label-border-error' : !valid && form.user.recipient.tel !== '',
                          'label-border-success' : valid}">
                          取件人電話
                        <input id="userTel" class="input"
                          v-model="form.user.recipient.tel" type="tel"
                          placeholder="Tel" />
                        <span class="text-danger" style="font-size:12px; font-weight: 400;">
                          {{ errors[0] }}
                        </span>
                        </label>
                      </ValidationProvider>
                    </div>
                    <div class="col-6 my-5" v-if="delivery == 'CVS'">
                      <button type="button"
                      class="button bg-black w-100 text-white"
                      data-toggle="modal" data-target="#testModal">
                          選擇超商門市
                      </button>
                    </div>
                  </div>
                  <div class="form-row hide mb-5" v-if="delivery === 'COD'">
                    <div class="col-6">
                      <ValidationProvider class="form" rules="required" v-slot="{ valid, errors }">
                        <label for="userCountry" class="label"
                        :class="{'label-border-error' : !valid &&
                        form.user.recipient.country !== '',
                          'label-border-success' : valid}"
                        >選取國家
                          <select id="userCountry" class="form-control"
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
                        <label for="userCity" class="label"
                        :class="{'label-border-error' : !valid && form.user.recipient.city !== '',
                          'label-border-success' : valid}"
                        >選取縣市
                          <select id="userCity" class="form-control"
                          v-model="form.user.recipient.city"
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
                        <label for="userDistrict" class="label"
                        :class="{'label-border-error' : !valid &&
                        form.user.recipient.district !== '',
                          'label-border-success' : valid}"
                        >選取鄉鎮市區
                          <select id="userDistrict" class="form-control"
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
                        <label for="userZip" class="label"
                        :class="{'label-border-error' : !valid && form.user.recipient.zip !== '',
                          'label-border-success' : valid}"
                        >郵遞區號
                        <input id="userZip" class="input"
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
                        <label for="userAddress" class="label"
                        :class="{'label-border-error' : !valid &&
                        form.user.recipient.address !== '',
                          'label-border-success' : valid}"
                        >取件人地址
                        <input id="userAddress" class="input"
                          v-model="form.user.recipient.address" type="text" placeholder="Address" />
                          <span class="text-danger" style="font-size:12px; font-weight: 400;">
                            {{ errors[0] }}
                          </span>
                        </label>
                      </ValidationProvider>
                    </div>
                    <div class="form-check ml-2">
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
                <a href="#" class="button button-slide p-2 text-center"
                @click.prevent="$bus.$emit('categorie', 'all')">
                  繼續選購
                </a>
                <button type="submit" class="button button-slide">
                  送出訂單
                </button>
              </ValidationObserver>
            </div>
          </div>
        <!-- 購物車內容 -->
        <div class="col-md-6">
          <div class="cart">
            <p class="h3 text-center mb-3">購物車</p>
            <div class="overflow mb-3">
              <div class="row m-0 py-3 align-items-center flex-row"
              v-for="item in cart.carts" :key="item.id">
                <div class="col-6">
                  <div class="d-flex align-items-center">
                    <button
                      type="button"
                      class="btn btn-outline-danger rounded btn-sm"
                      data-toggle="modal"
                      data-target="#removeCart"
                      @click.prevent="removeItem = item.id">
                      <i class="far fa-trash-alt"></i>
                    </button>
                    <img class="w-50 m-auto border p-1" :src="item.product.imageUrl" />
                  </div>
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
            <p class="mb-3 pr-4 text-right text-tohoh">
              折扣後金額
              <span class="text-danger">
                {{ cart.final_total | currency }}
              </span>
            </p>
            <p class="mb-3 text-right pr-4">
              運費
              <span class="text-secondary" v-if="form.user.fee.shipping === 0">待選擇</span>
              <span class="text-danger" v-else>{{ form.user.fee.shipping | currency }}</span>
            </p>
            <p class="mb-3 text-right pr-4">
              總金額
              <span class="text-danger">
                {{ (cart.final_total + form.user.fee.shipping) | currency }}
              </span>
            </p>
            <form @submit.prevent="addCouponCode">
              <input class="form-control"
                type="text"
                v-model="coupon_code"
                required
                placeholder="請輸入優惠碼"
                />
              <button type="submit" class="btn"
                :disabled="isDisable || addCoupon"
                :class="{ 'text-success': coupon_code != '' }">
                發送
              </button>
              <i
                class="far fa-question-circle text-warning ml-2 cart-animate"
                data-toggle="tooltip"
                data-placement="bottom"
                data-html="true"
                title="<div>季節優惠：<p>- 凡購買商品立即享9折 -</p></div>
                  <div>特價優惠：<div>總金額大於(滿)3000元 <div>輸入GentSkin</div>
                  </div><div>- 即可享7折 -</div></div>">
              </i>
            </form>
          </div>
        </div>
      </div>

      <!-- 無商品時內容 -->
      <div class="col empty" v-if="cart.total === 0">
        <p class="h5 py-5">
          購物車目前無任何商品
        </p>
        <a href="#" class="button button-slide bg-biwacha p-2"
        @click.prevent="$bus.$emit('categorie', 'all')">
          繼續選購商品
        </a>
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
          class="modal-content flex-column  text-center bg-dark border border-secondary"
        >
          <p class="w-100 py-4 border-bottom border-secondary h5 m-0">
            你確定要移除這項商品嗎
          </p>
          <div class="d-flex justify-content-between">
            <button type="button"
            data-dismiss="modal"
            class="py-3 w-50 btn btn-outline-danger border-0 rounded-0"
            style="border-right: 1px solid #6c757d !important">
              取消
            </button>
            <button type="button" class="py-3 w-50 btn btn-outline-danger border-0"
            @click.prevent="removeCartItem()">
              確定
            </button>
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
    <!-- 送出訂單讀取Modal -->
    <div
      class="modal animated fadeIn"
      id="payModal"
      tabindex="-1"
      role="dialog"
      data-backdrop="static"
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'; // 驗證功能
import twzipcode from 'twzipcode-data';


export default {
  data() {
    return {
      isLoading: false,
      isDisable: false,
      addCoupon: false,
      coupon_code: '',
      removeItem: '',
      cart: [],
      delivery: 'COD',
      cities: '',
      zipCode: '',
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
            transport: '宅配到府',
          },
          fee: {
            shipping: 80,
            payment: '宅配貨到付款',
          },
        },
      },
    };
  },

  methods: {
    autoCoupon() {
      // 自動折購
      const coupon = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const code = {
        code: 'discount',
      };
      this.$http.post(coupon, { data: code }).then(() => {});
    },
    getZipCode() {
      // 取得台灣縣市郵遞區號
      const vm = this;
      vm.zipCode = twzipcode().zipcodes;
      vm.cities = twzipcode().counties;
    },
    creatOrder() {
      // 建立訂單
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.$refs.observer.validate().then((result) => {
        vm.isLoading = true;
        if (result) {
          vm.isLoading = false;
          $('#payModal').modal('show');
          this.$http.post(api, { data: order }).then((response) => {
            if (response.data.success) {
              const Api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${response.data.orderId}`;
              this.$http.post(Api).then(() => {});
              setTimeout(() => {
                $('#payModal').modal('hide');
                this.$bus.$emit('getAmount');
                this.$bus.$emit('orderId', response.data.orderId);
                vm.$router.push({ name: 'Check', params: { orderId: response.data.orderId } });
              }, 2000);
            }
          });
        } else {
          this.$bus.$emit('alert', '欄位輸入錯誤或不完整');
          vm.isLoading = false;
        }
      });
    },
    removeCartItem() {
      // 移除商品
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${vm.removeItem}`;
      $('#removeCart').modal('hide');
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('getAmount');
          vm.$bus.$emit('alert', '商品已被刪除');
          vm.isLoading = false;
        }
      });
    },
    addCouponCode() {
      // 使用優惠碼
      const vm = this;
      vm.isDisable = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      if (vm.form.user.fee.shipping !== 0 && vm.cart.total - vm.form.user.fee.shipping >= 3000) {
        vm.isLoading = true;
        this.$http.post(api, { data: coupon }).then((response) => {
          if (response.data.success) {
            this.$bus.$emit('getAmount');
            vm.coupon_code = '';
            vm.addCoupon = true;
            this.$bus.$emit('alert', '已使用優惠碼');
          } else {
            this.$bus.$emit('alert', '錯誤的優惠碼');
          }
          vm.isLoading = false;
          vm.isDisable = false;
        });
      } else {
        this.$bus.$emit('alert', '未符合優惠條件');
        setTimeout(() => {
          vm.isDisable = false;
        }, 1000);
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
      }
      return city;
    },
  },
  mounted() {
    // 優惠碼提醒
    $('[data-toggle="tooltip"]').tooltip();
  },
  created() {
    $('html, body').animate({ scrollTop: 0 }, 1);
    this.isLoading = true;
    this.$bus.$emit('getAmount');
    this.$bus.$on('getCart', (item) => {
      this.cart = item;
      this.isLoading = false;
      // 取得購物車資料
    });
    this.autoCoupon();
    this.getZipCode();
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
};
</script>
