<template>
  <div>
    <div
      class="d-flex justify-content-center  position-relative py-2 bg-eerie border-bottom border-white"
    >
      <ul class="nav">
        <li class="nav-item">
          <router-link class="nav-link text-white nav-text" to="/shop">
            商品
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item ">
          <a
            href="#"
            class="nav-link text-white nav-text"
            @click.prevent="about"
          >
            關於
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-white nav-text"
            href="#"
            @click.prevent="journal"
          >
            消息
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item ">
          <a class="nav-link text-white nav-text" href="#" @click.prevent="map">
            位置
            <span class="sr-only">(current)</span>
          </a>
        </li>
      </ul>

      <div
        class="position-absolute "
        style=" left:15px; top:2px; font-size: 2rem;"
      >
        <a class="text-white logoHide logo" href="#" @click.prevent="home"
          >GentSkin</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  methods: {
    home() {
      const vm = this
      vm.$router.push('/')
      $('html, body').animate({ scrollTop: 0 }, 1)
    },
    about() {
      const vm = this
      vm.$router.push('/about')
      $('html, body').animate({ scrollTop: 0 }, 1)
    },
    journal() {
      const vm = this
      vm.$router.push('/journal')
      $('html, body').animate({ scrollTop: 0 }, 1)
    },
    map() {
      const vm = this
      vm.$router.push('/')
      $('html, body').animate({ scrollTop: 3390 }, 500)
    }
  },
  created() {
    $(function() {
      $(window).scroll(() => {
        if ($(this).scrollTop() >= 50) {
          $('.logoHide').addClass('logoShow')
        } else {
          $('.logoHide').removeClass('logoShow')
        }
      })
    })
  }
}
</script>

<style scoped>
.nav-link {
  margin: 0 0.5rem;
  padding: 0.5rem 0.5rem;
}
</style>
