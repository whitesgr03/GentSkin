<template>
  <div>
    <button type="button" class="btn gotop" @click.prevent="backtop">
      <i class="fas fa-arrow-up text-white"></i>
    </button>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data() {
    return {}
  },
  methods: {
    backtop() {
      $('html, body').animate({ scrollTop: 0 }, 600)
    }
  },
  created() {
    $(function() {
      $(window).scroll(function() {
        if ($(this).scrollTop() >= $(window).height()) {
          $('.gotop').addClass('scrolltop')
        } else {
          $('.gotop').removeClass('scrolltop')
        }
      })
    })
  }
}
</script>
<style></style>
