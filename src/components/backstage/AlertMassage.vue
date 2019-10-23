<template>
  <div class="message-alert" style="z-index:9999">
    <div
      class="alert alert-dismissible animated jackInTheBox position-relative p-0"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      <div
        class="d-flex align-items-center"
        style="cursor: pointer;"
        @click.prevent="removeMessage(i)"
      >
        <div class="px-3 text-success">
          <i class="fas fa-exclamation-circle fa-2x"></i>
        </div>
        <div class="border-left border-dark p-3 ">
          <span>{{ item.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'alert',
  data() {
    return {
      messages: []
    }
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message, //訊息的內容
        status, //訊息顯示的樣式
        timestamp //訊息多久會消失
      })
      //觸發清除訊息的函式(removeMessageWithTiming)
      this.removeMessageWithTiming(timestamp)
    },
    removeMessage(num) {
      $('.alert').one('click', () => {
        $('.alert').removeClass('jackInTheBox')
        $('.alert')
          .addClass('lightSpeedOut')
          .addClass('faster')
        setTimeout(() => {
          this.messages.splice(num, 1)
        }, 500)
      })
      // this.messages.splice(num, 1) //訊息右上角的主動清除按鈕
    },
    removeMessageWithTiming(timestamp) {
      // 執行函式後 4秒後清除訊息
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            $('.alert').removeClass('jackInTheBox')
            $('.alert')
              .addClass('lightSpeedOut')
              .addClass('faster')
            setTimeout(() => {
              vm.messages.splice(i, 1)
            }, 500)
          }
        })
      }, 4000)
    }
  },
  created() {
    const vm = this

    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      //使用on 註冊 'message:push'的方法, (訊息內容, Alert樣式)
      vm.updateMessage(message, status)
    })
    // vm.$bus.$emit('message:push');    //觸發外層使用$on  觸發內層使用$emit
  }
}
</script>
