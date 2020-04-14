<template>
  <div id="app">
    <Loading :active.sync="isLoading" loader="dots"></Loading>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>


<style lang="scss">
//將style改為使用scss
@import './assets/all'; //載入all.scss，裡面包含其他樣式
</style>
