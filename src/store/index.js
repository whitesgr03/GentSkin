import Vue from 'vue';
import Vuex from 'vuex';

import productsModules from './products';
import cartModules from './cart';
import orderModules from './order';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    login: false,
    mobileMenu: false,
    menuIcon: '',
    arrowIcon: false,
    alert: [],
    message: '',

  },
  actions: { // 操作行為
    loading(context, status) {
      // 讀取效果
      context.commit('LOADING', status);
    },
    login(context, status) {
      // 登入 icon
      context.commit('LOGINSTATE', status);
    },
    mobileMenuClose(context, status) {
      context.commit('MOBILEMENUCLOSE', status);
    },
    activeIcon(context, { status, category }) {
      // 啟動選單箭頭和類別
      context.commit('ARROWICON', status);
      context.commit('MENUICON', category);
    },
    activeAlert(context, message) {
      // 執行 alert
      const alert = (commit, time, text) => new Promise((resolve) => {
        setTimeout(() => {
          context.commit(commit, text);
          resolve();
        }, time);
      });
      alert('SETALERT', 0, message)
        .then(() => alert('MESSAGE', 100, message)
          .then(() => alert('MESSAGE', 4000, 'delete'))
          .then(() => alert('DELETEALERT', 1000)));
    },
  },
  mutations: { // 操作狀態
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    LOGINSTATE(state, payload) {
      state.login = payload;
    },
    MOBILEMENUCLOSE(state, payload) {
      state.mobileMenu = payload;
    },
    MENUICON(state, payload) {
      state.menuIcon = payload;
    },
    ARROWICON(state, payload) {
      state.arrowIcon = payload;
    },
    SETALERT(state, payload) {
      state.alert.push({ message: payload });
    },
    MESSAGE(state, payload) {
      state.message = payload;
    },
    DELETEALERT(state) {
      state.alert.splice(0, 1);
    },
  },
  getters: {
    isLoading: state => state.isLoading,
    menuIcon: state => state.menuIcon,
    arrowIcon: state => state.arrowIcon,
    alert: state => state.alert,
    message: state => state.message,
    login: state => state.login,
    mobileMenu: state => state.mobileMenu,
  },
  modules: {
    productsModules,
    cartModules,
    orderModules,
  },
});
