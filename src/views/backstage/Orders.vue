<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="orders">
      <table class="table mt-4  text-white">
        <thead>
          <tr>
            <th width="120" @click.prevent="reverse = !reverse, sortData = 'buyData'"
              style="cursor: pointer;">
              下單日期
              <i class="fas fa-sort" v-if="sortData == '' || sortData !== 'buyData'"></i>
              <i v-if="sortData == 'buyData'" class="fas fa-sort-up ml-1"
              :class="{'reverse': reverse}"></i>
            </th>
            <th width="200">購買人</th>
            <th>購買項目</th>
            <th width="150">訂單金額</th>
            <th width="120" @click.prevent="reverse = !reverse, sortData = 'payment'"
              style="cursor: pointer;">
              付款狀態
              <i class="fas fa-sort" v-if="sortData == '' || sortData !== 'payment'"></i>
              <i v-if="sortData == 'payment'" class="fas fa-sort-up ml-1"
              :class="{'reverse': reverse}"></i>
            </th>
            <th width="100">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in sortOrder"
            :key="item.id"
            :class="{ 'text-secondary': !item.is_paid }"
          >
            <td>{{ item.create_at | date}}</td>
            <td>{{ item.user.recipient.name }}</td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-center">{{ item.total | currency }}</td>
            <td>
              <span v-if="item.is_paid" class="text-success">已付款</span>
              <span v-else class="text-warning">未付款</span>
            </td>
            <td>
              <button class="button" style="background-color: #1f468c;">編輯</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      isLoading: false,
      pagination: {},
      orders: [],
      totalItem: 0,
      count: 0,
      sortData: '',
      reverse: false,
    };
  },
  methods: {
    getitem(page) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}}`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          response.data.orders.forEach((item) => {
            vm.orders.push(item);
          });
        }
      });
      vm.count += 1;
      if (vm.count === vm.totalItem) {
        vm.isLoading = false;
      }
    },
    getOrders() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${1}`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.totalItem = response.data.pagination.total_pages;
          for (let i = 0; i < vm.totalItem; i += 1) {
            vm.getitem(i + 1);
          }
        }
      });
    },
  },
  computed: {
    sortOrder() {
      const vm = this;
      if (vm.sortData === 'payment') {
        vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid;
          const bIsPaid = b.is_paid;
          return (aIsPaid > bIsPaid ? 1 : -1) * (vm.reverse === true ? 1 : -1);
        });
      } else if (vm.sortData === 'buyData' && !vm.isLoading) {
        vm.orders.sort((a, b) => {
          const aData = a.create_at;
          const bData = b.create_at;
          return (aData > bData ? 1 : -1) * (vm.reverse === true ? 1 : -1);
        });
      }
      return vm.orders;
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
