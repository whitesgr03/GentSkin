<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Navbar :navCart="cart" :navCartItem="cartitem" />
    <header
      class="py-2 
      bg-eerie sticky-top border-bottom border-white"
    >
      <div class="d-flex justify-content-center ">
        <ul class="nav">
          <li class="nav-item  active d-none d-sm-block fadein">
            <a
              class="nav-link text-white position-relative nav-text"
              href="#"
              @click=";(categories = ''), (search = '')"
            >
              商品<i
                class="fas fa-angle-down animated fadeInLeft position-absolute"
                style="top: 15px; right:-7px;"
              ></i>
            </a>
            <div
              class="w-100 rounded-0 bg-dark d-block fadeout py-4"
              style="top:56px; left:0;"
            >
              <div class="container">
                <div class="row  justify-content-around text-center">
                  <ul class="nav flex-column ">
                    <li class="nav-item ">
                      <a
                        class="nav-link h5 text-white  rounded-pill"
                        href="#"
                        :class="{ 'categorie-color': categories == '' }"
                        @click=";(categories = ''), (search = '')"
                      >
                        <strong>ALL</strong>
                      </a>
                    </li>
                  </ul>
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <a
                        class="nav-link h5 text-white rounded-pill"
                        href="#"
                        :class="{ 'categorie-color': categories == 'Tops' }"
                        @click=";(categories = 'Tops'), (search = '')"
                      >
                        <strong>上衣</strong>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled" href="#">短 TEE</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled" href="#">襯衫</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled" href="#">外套</a>
                    </li>
                  </ul>
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <a
                        class="nav-link h5 text-white rounded-pill"
                        href="#"
                        :class="{ 'categorie-color': categories == 'Bottoms' }"
                        @click=";(categories = 'Bottoms'), (search = '')"
                      >
                        <strong>褲子</strong>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled" href="#">短褲</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled" href="#">長褲</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled" href="#">牛仔褲</a>
                    </li>
                  </ul>
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <a
                        class="nav-link h5 text-white rounded-pill"
                        href="#"
                        :class="{
                          'categorie-color': categories == 'Accessories'
                        }"
                        @click=";(categories = 'Accessories'), (search = '')"
                      >
                        <strong>配件</strong>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled" href="#">帽子</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled" href="#">包包</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled" href="#">鞋類</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item">
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
        <div class="position-absolute" style="left: 15px; top: 5px;">
          <a class="text-white logoHide logo" href="#" @click.prevent="home"
            >GentSkin</a
          >
        </div>
        <div class="position-absolute" style="right: 80px;">
          <form class="form-input input-border">
            <!-- input-display -->
            <span class="span-border ">
              <!-- span-display -->
              <input
                type="text"
                class="form-control border-0 px-2 bg-eerie text-white"
                placeholder="Search..."
                style="width:195px; box-shadow: none;"
                v-model="search"
                @click.prevent="formBorder"
              />
              <button
                type="button"
                class="text-white bg-transparent border-0 position-absolute"
                style="right: 5px; top: -3px; outline: none;"
              >
                <i class="fas fa-search"></i>
              </button>
            </span>
          </form>
        </div>
        <div class="position-absolute" style="top: 15px; right:15px;">
          <button
            class="text-white bg-transparent border-0 animated logoHide"
            type="button"
            id="MenuButton"
            data-toggle="modal"
            data-target="#cartModal"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-cart-plus fa-2x mr-2 btn-cart position-relative">
              <span
                class="badge badge-pill badge-danger position-absolute"
                style=" top:-5px; right:-15px; font-size: 0.8rem;"
                v-if="cartitem != 0"
                >{{ cartitem }}</span
              >
            </i>
          </button>
        </div>
      </div>
    </header>

    <div class="container py-5">
      <div class="row">
        <div
          class="col-md-4 my-2"
          v-for="item in filterData[pages]"
          :key="item.id"
        >
          <!--透過pagination[pages]使類別在All時頁面會顯示頁碼-->
          <div class="card border-0 bg-transparent" v-if="item.is_enabled">
            <img
              :src="item.imageUrl"
              class="card-img-top"
              alt="product photo"
              style="cursor: pointer;"
              @click.prevent="getContent(item.id)"
            />
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-end m-0">
                <h5
                  @click.prevent="getContent(item.id)"
                  class="text-white"
                  style="cursor: pointer;"
                >
                  {{ item.title }}
                </h5>

                <del class="h6 text-muted" v-if="item.origin_price > 0">
                  原價 {{ item.origin_price | currency }} 元
                </del>
              </div>

              <div class="text-right mt-2">
                <div class="h6" v-if="!item.price">
                  <span class="h5">{{ item.origin_price | currency }}</span>
                  元
                </div>
                <div class="h6" v-if="item.price">
                  <span class="h5">{{ item.price | currency }}</span>
                  元
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <nav aria-label="Page navigation exampl">
          <ul class="pagination m-0 pt-3">
            <li class="mx-1" v-for="page in filterData.length">
              <a
                class="page-link text-white rounded-circle"
                :class="{ pageColor: pages === page - 1 }"
                v-if="filterData.length != 1"
                href="#"
                @click="pages = page - 1"
              >
                {{ page }}</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Navbar from '@/components/forestage/Navbar.vue'

export default {
  data() {
    return {
      products: [],
      cart: [],
      cartitem: [],
      allItem: [],
      item: [],
      status: {
        loadingItem: ''
      },
      isLoading: false,
      pages: 0,
      categories: '',
      search: ''
    }
  },
  methods: {
    getProducts() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isLoading = true
      $('.drop-hover').mouseover(function() {
        $('.drop-hover').dropdown('show')
      })
      $('.drop-hover').mouseleave(function() {
        $('.drop-hover').dropdown('hide')
      })
      this.$http.get(api).then(response => {
        vm.products = response.data.products
        vm.isLoading = false
        // vm.pagination = response.data.pagination
        // console.log('販賣的物品', response.data.products)
      })
    },
    getContent(id) {
      const vm = this
      vm.$router.push(`content/${id}`)
    },

    getCart() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      this.$http.get(api).then(response => {
        vm.cart = response.data.data
        vm.cartitem = response.data.data.carts.length
        // console.log('購物車資料', response.data.data.carts)
      })
    },
    formBorder() {
      $('.form-input').click(() => {
        $('.input-border').addClass('input-display')
        $('.span-border').addClass('span-display')
      }),
        $('.form-input').focusout(() => {
          $('.input-border').removeClass('input-display')
          $('.span-border').removeClass('span-display')
        })
    },
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
  computed: {
    filterData() {
      const vm = this
      let product = []
      if (vm.categories !== '' && vm.search == '') {
        product = vm.products.filter((item, i) => {
          vm.pages = 0
          return item.category == vm.categories
        })
        // console.log('categories', product)
      } else if (vm.search !== '') {
        product = vm.products.filter((item, i) => {
          vm.pages = 0
          return item.title.indexOf(vm.search) > -1
        })
        // console.log('search', product)
      } else {
        product = vm.products
      }
      const pagination = []
      product.forEach((item, i) => {
        if (i % 6 === 0) {
          pagination.push([])
        } //  取出想要幾頁分頁
        const page = parseInt(i / 6)
        pagination[page].push(item) // 每頁分頁要放幾筆資料
      })
      // console.log(pagination)
      return pagination
    }
  },
  created() {
    this.getProducts()
    this.getCart()
  },
  components: {
    Navbar
  }
}
</script>

<style scoped>
@media (min-width: 576px) {
  .modal-dialog {
    max-width: 768px;
    margin: 1.75rem auto;
  }
}
.page-link {
  box-shadow: none;
}

.nav-link {
  margin: 0 0.5rem;
  padding: 0.5rem 0.5rem;
}

.form-input {
  width: 220px;
  height: 40px;
  /* 控制寬度和高度 */
  line-height: 42px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

/* 右線 */
.input-border:before {
  position: absolute;
  content: '';
  height: 0%;
  width: 2.5px;
  background: #6c757d;
  right: 0;
  top: 0;
  transition: all 0.5s ease;
}

.input-display:before {
  transition: all 0.5s 1.5s ease;
  height: 100%;
}

/* 左線 */
.input-border:after {
  position: absolute;
  content: '';
  height: 0%;
  width: 2.5px;
  background: #6c757d;
  left: 0;
  bottom: 0;
  transition: all 0.5s 1.5s ease;
}

.input-display:after {
  transition: all 0.5s ease;
  height: 100%;
}

/* 底線 */
.span-border:after {
  position: absolute;
  content: '';
  background: #6c757d;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2.5px;
}

/* top縣 */
.span-border:before {
  position: absolute;
  content: '';
  background: #6c757d;
  left: 0;
  top: 0;
  width: 0%;
  height: 2.5px;
  transition: all 1s 0.5s ease;
}

.span-display:before {
  width: 100%;
}
</style>
