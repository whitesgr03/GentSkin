<template>
  <div>
    <Alert />
    <!-- <loading :active.sync="isLoading"></loading> -->
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
        <button type="submit" class="button button-slide my-3 w-100">
          登入
        </button>
        <router-link to="/" class="d-block button button-slide text-center w-100 h-auto p-2">
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
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      // 登入
      const vm = this;
      if (vm.user.username !== '' && vm.user.password !== '') {
        this.$store.dispatch('loading', true);
        const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
        this.$http.post(api, vm.user).then((response) => {
          if (response.data.success) {
            $('#SigninModal').modal('show');
            vm.$store.dispatch('loading', false);
            setTimeout(() => {
              $('#SigninModal').modal('hide');
            }, 1000);
            $('#SigninModal').on('hidden.bs.modal', () => {
              vm.$router.push('/admin/products').catch(err => err);
            });
          } else if (!response.data.success) {
            this.$store.dispatch('activeAlert', '帳號或密碼輸入錯誤');
            vm.$store.dispatch('loading', false);
          }
        });
      } else {
        this.$store.dispatch('activeAlert', '欄位不能留空');
      }
    },
  },
  components: {
    Alert,
  },
  created() {
    this.$store.dispatch('loading', false);
  },
};
</script>
