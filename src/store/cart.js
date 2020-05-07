import axios from 'axios';

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
    disable(context, status) {
      // 讀取效果
      context.commit('DISABLE', status);
    },
    adding(context, status) {
      // 讀取效果
      context.commit('ADDING', status);
    },
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
      axios.delete(api).then((response) => {
        if (response.data.success) {
          context.dispatch('getCart');
          context.commit('LOADING', false, { root: true });
          context.dispatch('activeAlert', '商品已被刪除', { root: true });
        }
      });
    },
    addtoCart(context, { id, amount, buyNow }) {
      // 加入購物車
      const cart = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const product = {
        product_id: id,
        qty: amount,
      };
      return new Promise((resolve) => {
        axios.post(cart, { data: product }).then((response) => {
          if (response.data.success) {
            context.dispatch('getCart');
            context.dispatch('activeAlert', '商品已加入購物車', { root: true });
            if (buyNow) {
              context.commit('ARROWICON', false, { root: true });
              context.commit('LOADING', false, { root: true });
            } else {
              context.commit('DISABLE', false);
              context.commit('ADDING', '');
            }
            resolve();
          }
        });
      });
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
