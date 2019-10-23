<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  methods: {
    home() {
      const vm = this
      vm.$router.push('/home/shop')
    }
  },
  created() {
    this.home()
  }
}
</script>

<style lang="scss">
//將style改為使用scss
@import './assets/all'; //載入all.scss，裡面包含其他樣式
</style>
