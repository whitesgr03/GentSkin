<template>
  <div>
    <header class="py-2 bg-eerie border-bottom border-white">
      <div class="row align-items-end m-0">
        <div class="col-4">
          <a
            class="text-white logoHide logo animated"
            style="line-height: 1rem;"
            href="#"
            @click.prevent="home"
          >
            GentSkin
          </a>
        </div>
        <div class="col-4">
          <ul class="nav justify-content-center">
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
              <a
                class="nav-link text-white nav-text"
                href="#"
                @click.prevent="map"
              >
                位置
                <span class="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-4">
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <button
                class="text-white bg-transparent border-0 logoHide pt-1 animated"
                type="button"
                id="MenuButton"
                data-toggle="modal"
                data-target="#cartModal"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i
                  class="fas fa-cart-plus fa-2x mr-2 btn-cart position-relative"
                >
                  <span
                    class="badge badge-pill badge-danger position-absolute"
                    style=" top:-5px; right:-15px; font-size: 0.8rem;"
                    v-if="navCartItem != 0"
                    >{{ navCartItem }}</span
                  >
                </i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <!-- cartModal -->
    <div
      class="modal animated fadeInRight faster "
      id="cartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog-scrollable position-absolute w-25"
        role="document"
        style="right:0;   z-index:999;"
      >
        <div
          class="modal-content bg-kogecha text-white vh-100 mh-100 rounded-0"
          style="border-left: 1px solid black"
        >
          <div
            class="modal-title text-center p-4"
            style="border-bottom: 1px solid black"
            v-if="navCart.carts != ''"
          >
            <div class="h5 m-0">
              已選擇的商品
            </div>
          </div>

          <button
            type="button"
            class="close position-absolute"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="modal-body py-0 d-flex justify-content-center">
            <table class="table text-white" v-if="navCart.carts != ''">
              <thead>
                <th width="100"></th>
                <th>商品</th>
                <th width="75">價格</th>
              </thead>
              <tbody>
                <tr v-for="item in navCart.carts" :key="item.id">
                  <td>
                    <img
                      :src="item.product.imageUrl"
                      class="w-100 p-1 border"
                    />
                  </td>
                  <td class="align-middle pl-0" colspan="2">
                    <thead>
                      <th class=" border-0">{{ item.product.title }}</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          class="border-0 d-flex justify-content-between"
                          width="235"
                        >
                          <div>{{ item.qty }}/{{ item.product.unit }}</div>
                          <div>{{ item.final_total | currency }}</div>
                        </td>
                      </tr>
                    </tbody>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="text-center h4 align-self-center"
              v-if="navCart.carts == ''"
            >
              您還沒有選購任何商品
            </div>
          </div>
          <div
            class="d-flex justify-content-around align-items-center p-4"
            style="border-top: 1px solid black"
            v-if="navCart.carts != ''"
          >
            <div class="h5 mb-0">
              <span class="mr-3">總金額</span> {{ navCart.total | currency }}
            </div>
            <div>
              <a
                href="#"
                class="text-decoration-none "
                @click.prevent="payment"
              >
                <button
                  class="btn-type btn-type3"
                  style="background-color:#B17844;  color:black;"
                >
                  結帳
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  props: [`navCart`, `navCartItem`],
  data() {
    return {}
  },
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
    },
    payment() {
      $('#cartModal').modal('hide')
      const vm = this
      vm.$router.push('/order')
      $('html, body').animate({ scrollTop: 0 }, 1)
    }
  },
  created() {
    $(function() {
      $(window).scroll(() => {
        if ($(this).scrollTop() >= 50) {
          $('.logoHide').addClass('logoShow')
          $('#MenuButton').addClass('swing')
          $('.logo').addClass('pulse')
        } else {
          $('.logoHide').removeClass('logoShow')
          $('#MenuButton').removeClass('swing')
          $('.logo').removeClass('pulse')
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
