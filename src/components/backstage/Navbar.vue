<template>
  <div>
    <nav class="navbar bg-dark title sticky-top">
      <router-link to="/" class="logo">
        GentSkin
        <i class="fas fa-user-tie fa-lg"></i>
      </router-link>
      <a class="nav-link" href="#" @click.prevent="signout">管理員登出</a>
    </nav>
            <!-- 登出提示Modal -->
    <div
      class="modal animated fadeIn"
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
import $ from 'jquery';

export default {
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          $('#signoutModal').modal('show');
          setTimeout(() => {
            $('#signoutModal').modal('hide');
          }, 1000);
        }
        $('#signoutModal').on('hidden.bs.modal', () => {
          vm.$router.push('/');
        });
      });
    },
  },
};
</script>
