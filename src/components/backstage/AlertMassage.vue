<template>
  <div class="message" style="z-index:9999">
    <div
      class="bg-black position-relative p-0 border border-secondary"
      v-for="(item, i) in messages"
      :key="i"
    >
      <div class="d-flex align-items-center">
        <div class="px-3 text-success">
          <i class="fas fa-exclamation-circle fa-2x"></i>
        </div>
        <div class="border-left border-secondary p-3">
          <span>{{ item.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'alert',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const vm = this;
      const timestamp = Math.floor(new Date() / 1000);
      $('.message').addClass('message-animate');
      vm.messages.push({
        message, // 訊息的內容
        status, // 訊息div的背景顏色
        timestamp, // 訊息多久會消失
      });
      // console.log(vm.messages);
      if (vm.messages.length > 1) {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      } else if (vm.messages.length >= 1) {
        setTimeout(() => {
          $('.message').removeClass('message-animate');
        }, 3000);
        setTimeout(() => {
          vm.messages.forEach((item, i) => {
            if (item.timestamp === timestamp) {
              vm.messages.splice(i, 1);
            }
          });
        }, 3500);
      }
    },
    // removeMessage(num) {
    //   this.messages.splice(num, 1); // 點擊div後刪除
    // },
    // removeMessageWithTiming(timestamp) {
    //   // 執行函式後 4秒後清除訊息
    //   const vm = this;
    //   // setTimeout(() => {
    //   vm.messages.forEach((item, i) => {
    //     // console.log(item.timestamp);
    //     if (item.timestamp === timestamp) {
    //       vm.messages.splice(i, 1);
    //     }
    //   });
    //   // }, 4000);
    // },
  },
  created() {
    const vm = this;
    vm.$bus.$on('alert', (message, status = 'danger') => {
      vm.updateMessage(message, status);
    });
  },
};
</script>
