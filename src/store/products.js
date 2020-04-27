import axios from 'axios';

export default {
  strict: true,
  namespaced: true,
  state: {
    products: [],
    suitCategory: [],
    sameProducts: [],
    pageNum: 0,
  },
  actions: { // 操作行為
    getProducts(context, product) {
      // 取得所有商品
      const products = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(products).then((response) => {
        if (response.data.success) {
          context.commit('PRODUCTS', response.data.products);
          context.commit('SUITCATEGORY', response.data.products);
          if (product) {
            context.commit('SAMERPODUCTS', [response.data.products, product]);
          }
        }
      });
    },
    productCarousel(context) {
      // 變更商品顯示的數量
      const w = window.innerWidth;
      if (w <= 767) {
        context.commit('PAGENUM', 2);
      } else if (w <= 1023) {
        context.commit('PAGENUM', 3);
      } else {
        context.commit('PAGENUM', 4);
      }
    },
  },
  mutations: { // 操作狀態
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    SUITCATEGORY(state, payload) {
      state.suitCategory = payload.filter(item => item.Item === 'suit');
    },
    SAMERPODUCTS(state, payload) {
      state.sameProducts = payload[0].filter(item => item.category === payload[1].category
        && item.title !== payload[1].title);
    },
    PAGENUM(state, payload) {
      state.pageNum = payload;
    },
  },
  getters: {
    products: state => state.products,
    suitCategory: state => state.suitCategory,
    sameProducts: state => state.sameProducts,
    pageNum: state => state.pageNum,
  },
};
