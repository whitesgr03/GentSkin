<template>
  <div>
    <div class="my-5 row justify-content-center">
      <form class="col-md-6 border p-5" @submit.prevent="parOrder">
        <div class="h3 text-center pb-4">訂單明細</div>
        <!--送出資料後觸發parOrder讓後端資料的order.is_paid更新-->
        <table class="table text-white">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <!--將vm.order獲取的資料帶入-->
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">
                {{ item.qty }}/{{ item.product.unit }}
              </td>
              <td class="align-middle text-right">
                {{ item.final_total | currency }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">{{ order.total | currency }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table text-white">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <!--觸發parOrder更新資料後order.is_paid將變更為ture-->
                <span v-else class="text-success">付款完成</span>
                <!--最後畫面上將從尚未付款變更為顯示付款完成-->
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="order.is_paid === false">
          <!--尚未觸發parOrder更新order.is_paid時為false畫面會顯示 確認付款去 付款後就會消失-->
          <button class="btn btn-danger">確認付款去</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: '',
      order: {
        user: {}
      }
    }
  },
  methods: {
    getOrder() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}` //從後端取的orderId
      vm.isLoading = true
      this.$http.get(api).then(response => {
        vm.order = response.data.order
        // console.log('結帳資料', response)
        vm.isLoading = false
      })
    },
    parOrder() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.isLoading = true
      this.$http.post(api).then(response => {
        if (response.data.success) {
          // console.log('付款完成', response)
        } else {
          // console.log('付款失敗', response)
        }
        this.getOrder() //重新取得訂單資料 以更新order.is_paid為ture後的畫面
        vm.isLoading = false
      })
    }
  },

  created() {
    this.orderId = this.$route.params.orderId //對應route中的orderId
    // console.log(this.orderId)
    this.getOrder()
  }
}
</script>
