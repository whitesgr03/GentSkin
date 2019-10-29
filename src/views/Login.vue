<template>
  <div>
    <Alert />
    <Navbar />
    <div class="d-flex vh-100 login-bgc">
      <form class="form-signin" @submit.prevent="signin">
        <!--使用signin方法觸發登入-->
        <h1 class="h3 font-weight-normal text-center">管理者登入</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control mb-3 input-color"
          placeholder="請輸入Email"
          v-model="user.username"
          required
          autofocus
        />
        <!--使用v-mode連結API參數-->
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control mb-3 input-color"
          placeholder="請輸入密碼"
          v-model="user.password"
          required
        />
        <!--使用v-mode連結API參數-->
        <div class="mb-3">
          <button class="btn-type btn-type2 w-100" type="submit">
            登入
          </button>
        </div>
        <div>
          <button
            class="btn-type btn-type2 w-100"
            type="button"
            @click.prevent="home"
          >
            回首頁
          </button>
        </div>
      </form>
    </div>

    <!-- 登入提示Modal -->
    <div
      class="modal fade"
      id="SigninModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content bg-dark">
          <div class="modal-body text-center p-4 h4">
            管理員已成功登入
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Navbar from '@/components/forestage/Navbar'
import Alert from '@/components/backstage/AlertMassage.vue'

export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '', //API使用的參數
        password: '' //API使用的參數
      }
    }
  },
  methods: {
    signin() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin` //api路徑
      this.$http.post(api, vm.user).then(response => {
        //將變數傳入後端伺服器
        console.log(response.data)
        if (response.data.success) {
          // 如果成功的話 將頁面從Login轉移到products
          $('#SigninModal').modal('show')
          setTimeout(function() {
            $('#SigninModal').modal('hide')
          }, 1000)
          $('#SigninModal').on('hidden.bs.modal', function(e) {
            vm.$router.push(`/admin/products`)
          })
        } else if (response.data.success == false) {
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    home() {
      const vm = this
      vm.$router.push('/')
    }
  },
  components: {
    Navbar,
    Alert
  }
}
</script>

<style scoped>
.tohoh {
  background-color: #b97d05;
}
.tohoh:hover {
  background-color: #eea20a;
}
</style>
