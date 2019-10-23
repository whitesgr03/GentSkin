import Vue from 'vue';

Vue.prototype.$bus = new Vue();   //將套件掛載在原型下 可以直接呼叫


// Massage
// vm.$bus.$emit('message:push', massage, status);
// message(String): 訊息顯示的內容
// status(String): Alert的樣式，預設值為 warning
