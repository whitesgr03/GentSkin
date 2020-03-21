<template>
  <div>
    <Alert />
    <loading :active.sync="isLoading"></loading>
    <div class="login">
      <form class="form" @submit.prevent="signin">
        <h1 class="h3 text-center mb-4">管理員登入</h1>
        <label for="account" class="label">帳號
        <input
          type="email"
          class="input"
          id="account"
          v-model="user.username"
          placeholder="Email@example.com"
        />
        </label>
        <label for="password" class="label">密碼
        <input
          type="password"
          class="input"
          id="password"
          v-model="user.password"
          placeholder="Password"
        />
        </label>
        <a href="#" class="d-block button button-slide p-2 my-3 w-100 text-center"
        @click.prevent="signin">
          登入
        </a>
        <router-link to="/" class="d-block button button-slide p-2 w-100 text-center">
          回首頁
        </router-link>
      </form>
    </div>
        <!-- 登入提示Modal -->
    <div
      class="modal animated fadeIn"
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
import $ from 'jquery';
import Alert from '@/components/backstage/AlertMassage.vue';


export default {
  name: 'Login',
  data() {
    return {
      isLoading: false,
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      if (vm.user.username !== '' && vm.user.password !== '') {
        vm.isLoading = true;
        this.$http.post(api, vm.user).then((response) => {
          if (response.data.success) {
            vm.isLoading = false;
            $('#SigninModal').modal('show');
            setTimeout(() => {
              $('#SigninModal').modal('hide');
            }, 1000);
            $('#SigninModal').on('hidden.bs.modal', () => {
              vm.$router.push('/admin/products');
            });
          } else if (!response.data.success) {
            this.$bus.$emit('alert', '帳號或密碼輸入錯誤');
            vm.isLoading = false;
          }
        });
      } else {
        this.$bus.$emit('alert', '欄位不能留空');
      }
    },
  },
  components: {
    Alert,
  },
};
</script>
