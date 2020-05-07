import axios from 'axios';

export default {
  strict: true,
  namespaced: true,
  state: {
    newOrderId: [],
    orderList: [],
  },
  actions: { // 操作行為
    getOrderList(context, id) {
      context.commit('NEWORDERID', id);
      const newOrder = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`;
      axios.get(newOrder).then((response) => {
        if (response.data.success) {
          context.commit('ORDERLIST', response.data.order);
        }
      });
    },
    createOrder(context, form) {
      const order = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      return new Promise((resolve) => {
        axios.post(order, { data: form }).then((response) => {
          if (response.data.success) {
            const testPayment = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${response.data.orderId}`;
            axios.post(testPayment).then(() => { });
            setTimeout(() => {
              context.dispatch('cartModules/getCart', null, { root: true });
              context.dispatch('getOrderList', response.data.orderId);
              resolve();
            }, 2000);
          }
        });
      });
    },
  },
  mutations: { // 操作狀態
    NEWORDERID(state, payload) {
      state.newOrderId = payload;
    },
    ORDERLIST(state, payload) {
      state.orderList.push(payload);
    },
  },
  getters: {
    newOrderId: state => state.newOrderId,
    orderList: state => state.orderList,
  },
};
