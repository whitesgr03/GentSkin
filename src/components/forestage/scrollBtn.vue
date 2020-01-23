<template>
  <div>
    <button type="button" class="btn goTop" @click.prevent="backToTop">
      <i class="fas fa-arrow-up"></i>
    </button>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {};
  },
  methods: {
    goTopButton() {
      const scrollPos = $(window).scrollTop();
      const height = $(window).height();
      if (scrollPos >= height) {
        $('.goTop').addClass('goTop-display');
      } else {
        $('.goTop').removeClass('goTop-display');
      }
    },
    backToTop() {
      $('html, body').animate({ scrollTop: 0 }, 600);
    },
  },
  created() {
    window.addEventListener('scroll', this.goTopButton);
  },
};
</script>

<style></style>
