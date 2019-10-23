<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4  text-white">
      <thead>
        <tr>
          <th width="200">購買時間</th>
          <th width="300">Email</th>
          <th>購買款項</th>
          <th width="100">應付金額</th>
          <th width="150">是否付款</th>
          <th width="100">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in sortOrder"
          :key="item.id"
          :class="{ 'text-secondary': !item.is_paid }"
        >
          <td>{{ item.create_at | date }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else>尚未付款</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :paginations="pagination" @getPage="getOrders" />
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/backstage/Pagination'

export default {
  data() {
    return {
      isLoading: false,
      pagination: {},
      orders: []
    }
  },
  methods: {
    getOrders(page) {
      //取得api資料  //page = 1 預設參數 即可套用全部使用到getProducts的地方
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.isLoading = true //啟用讀取動畫
      this.$http.get(api).then(response => {
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
        console.log(response)
        vm.isLoading = false //資料讀取完成後再停用動畫
        //存取API提供的頁數
      })
    }
  },
  computed: {
    // 按照以付款以及未付款來排順序
    sortOrder() {
      const vm = this
      let newOrder = []
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0
          const bIsPaid = b.is_paid ? 1 : 0
          return bIsPaid - aIsPaid
        })
      }
      return newOrder
    }
  },
  created() {
    this.getOrders()
  },
  components: {
    Pagination
  }
}
</script>
