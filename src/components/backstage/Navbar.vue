<template>
  <div>
    <nav class="navbar navbar-dark bg-dark fixed-top flex-md-nowrap p-0 shadow">
      <div class="col-sm-3 col-md-2 mr-0">
        <a href="#" @click="home" class="navbar-brand shadow-none">
          <i class="fas fa-store-alt text-info mr-2"> </i>
          GentSkin
        </a>
      </div>

      <ul class="navbar-nav px-3">
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="signout">登出</a>
        </li>
      </ul>
    </nav>

    <!-- 登出提示Modal -->
    <div
      class="modal fade"
      id="signoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content bg-dark">
          <div class="modal-body text-center p-4 h4">
            管理員已成功登出
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Navbar',
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout` //api路徑
      const vm = this
      this.$http.post(api).then(response => {
        //將變數傳入後端伺服器
        // console.log(response.data)
        if (response.data.success) {
          $('#signoutModal').modal('show')
          setTimeout(function() {
            $('#signoutModal').modal('hide')
          }, 1000)
          $('#signoutModal').on('hidden.bs.modal', function(e) {
            vm.$router.push(`/`)
            //如果成功的話 將頁面轉移到首頁
          })
        }
      })
    },
    home() {
      const vm = this
      vm.$router.push('/')
    }
  }
}
</script>
