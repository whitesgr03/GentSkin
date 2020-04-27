import axios from 'axios';
import $ from 'jquery';
import router from '../router';

export default {
  strict: true,
  namespaced: true,
  state: {
    orderList: [],
  },
  actions: { // 操作行為
    getOrderList(context, id) {
      const newOrder = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`;
      axios.get(newOrder).then((response) => {
        if (response.data.success) {
          context.commit('ORDERLIST', response.data.order);
        }
      });
    },
    createOrder(context, form) {
      $('#payModal').modal('show');
      const order = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      axios.post(order, { data: form }).then((response) => {
        if (response.data.success) {
          const testPayment = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${response.data.orderId}`;
          axios.post(testPayment).then(() => { });
          setTimeout(() => {
            context.dispatch('cartModules/getCart', null, { root: true });
            context.dispatch('getOrderList', response.data.orderId);
            $('#payModal').modal('hide');
            router.push({ name: 'Check', params: { orderId: response.data.orderId } });
          }, 2000);
        }
      });
    },
  },
  mutations: { // 操作狀態
    ORDERLIST(state, payload) {
      state.orderList.push(payload);
    },
  },
  getters: {
    orderList: state => state.orderList,
  },
};
