import axios from 'axios';
import $ from 'jquery';
import router from '../router';


export default {
  strict: true,
  namespaced: true,
  state: {
    cart: [],
    cartAmout: 0,
    isDisable: false,
    isAdding: '',
  },
  actions: { // 操作行為
    getCart(context) {
      // 取得購物車資料
      const storage = sessionStorage.getItem('discount');
      const cart = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(cart).then((response) => {
        if (response.data.success) {
          const cartLength = response.data.data.carts.length;
          if (storage != null || cartLength === 0) { // 如果不是第一次開啟網頁則直接取得購物車資料
            context.commit('CART', response.data.data);
            context.commit('CARTAMOUT', cartLength);
            context.commit('DISABLE', false);
            context.commit('ADDING', '');
            context.commit('LOADING', false, { root: true });
          } else {
            response.data.data.carts.forEach((item, i) => {
              const removeCart = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
              axios.delete(removeCart).then((responses) => {
                if (responses.data.success && cartLength - 1 === i) {
                  context.dispatch('getCart');
                }
              });
            });
          }
        }
      });
    },
    removeCartItem(context, id) {
      // 移除商品
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      $('#removeCart').modal('hide');
      axios.delete(api).then((response) => {
        if (response.data.success) {
          context.dispatch('getCart');
          context.dispatch('activeAlert', '商品已被刪除', { root: true });
        }
      });
    },
    addtoCart(context, { id, amount }) {
      // 加入購物車
      context.commit('DISABLE', true);
      context.commit('ADDING', id);
      const cartData = this.state.cartModules.cart.carts.filter(item => item.product_id === id);
      const cart = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const product = {
        product_id: id,
        qty: amount,
      };
      if (cartData.length === 1) {
        const productId = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cartData[0].id}`;
        product.qty = amount + cartData[0].qty;
        axios.delete(productId).then((response) => {
          if (response.data.success) {
            axios.post(cart, { data: product }).then((responses) => {
              if (responses.data.success) {
                context.dispatch('getCart');
                context.dispatch('activeAlert', '商品已加入購物車', { root: true });
              }
            });
          }
        });
      } else {
        axios.post(cart, { data: product }).then((response) => {
          if (response.data.success) {
            context.dispatch('getCart');
            context.dispatch('activeAlert', '商品已加入購物車', { root: true });
          }
        });
      }
    },
    buyNow(context, { id, amount }) {
      // 立即加入購物車並結帳
      const storage = sessionStorage.getItem('sign');
      if (storage != null) {
        // 執行結帳前必須先登入
        context.commit('LOADING', true, { root: true });
        const cartData = this.state.cartModules.cart.carts.filter(item => item.product_id === id);
        const cart = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        const product = {
          product_id: id,
          qty: amount,
        };
        if (cartData.length === 1) {
          const productId = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cartData[0].id}`;
          product.qty = amount + cartData[0].qty;
          axios.delete(productId).then((response) => {
            if (response.data.success) {
              axios.post(cart, { data: product }).then((responses) => {
                if (responses.data.success) {
                  context.dispatch('getCart');
                  context.commit('ARROWICON', false, { root: true });
                  context.dispatch('activeAlert', '商品已加入購物車', { root: true });
                  router.push('/order');
                }
              });
            }
          });
        } else {
          axios.post(cart, { data: product }).then((response) => {
            if (response.data.success) {
              context.dispatch('getCart');
              context.commit('ARROWICON', false, { root: true });
              context.dispatch('activeAlert', '商品已加入購物車', { root: true });
              router.push('/order');
            }
          });
        }
      } else {
        $('#loginModal').modal('show');
        context.dispatch('activeAlert', '請先登入會員', { root: true });
      }
    },
  },
  mutations: { // 操作狀態
    DISABLE(state, payload) {
      state.isDisable = payload;
    },
    ADDING(state, payload) {
      state.isAdding = payload;
    },
    CART(state, payload) {
      state.cart = payload;
    },
    CARTAMOUT(state, payload) {
      state.cartAmout = payload;
    },
  },
  getters: {
    cart: state => state.cart,
    cartAmout: state => state.cartAmout,
    isDisable: state => state.isDisable,
    isAdding: state => state.isAdding,
  },
};
