<template>
  <div>
    <div class="coupons">
      <div class="text-right mb-4">
        <button class="button bg-biwacha" @click.prevent="openModal(true)">
          新增優惠碼
        </button>
      </div>
      <table class="table mt-4 text-white">
        <thead>
          <tr>
            <th>名稱</th>
            <th width="200" @click.prevent="reverse = !reverse, sortData = 'percent'"
              style="cursor: pointer;">
              折扣百分比
              <i class="fas fa-sort" v-if="sortData == '' || sortData !== 'percent'"></i>
              <i v-if="sortData == 'percent'" class="fas fa-sort-up ml-1"
              :class="{'reverse': reverse}"></i>
            </th>
            <th width="200" @click.prevent="reverse = !reverse, sortData = 'date'"
              style="cursor: pointer;">
              到期日
              <i class="fas fa-sort" v-if="sortData == '' || sortData !== 'date'"></i>
              <i v-if="sortData == 'date'" class="fas fa-sort-up ml-1"
              :class="{'reverse': reverse}"></i>
            </th>
            <th width="150" @click.prevent="reverse = !reverse, sortData = 'enables'"
              style="cursor: pointer;">
              是否啟用
              <i class="fas fa-sort" v-if="sortData == '' || sortData !== 'enables'"></i>
              <i v-if="sortData == 'enables'" class="fas fa-sort-up ml-1"
              :class="{'reverse': reverse}"></i>
            </th>
            <th width="150">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortProducts" :key="item.id">
            <td>{{ item.title }}</td>
            <td class="text-center">{{ item.percent }}%</td>
            <td>{{ item.due_date }}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success"  style="cursor: pointer;">
                已啟用
                <i class="fas fa-spinner fa-spin" v-if="newData === item.id"></i>
              </span>
              <!-- <span v-else class="text-warning"  style="cursor: pointer;"
              @click.prevent="updataEnabled(true, item)">
                未啟用
                <i class="fas fa-spinner fa-spin" v-if="newData === item.id"></i>
              </span> -->
            </td>
            <td>
              <button
                class="button" style="background-color: #1f468c;"
                @click.prevent="openModal(false, item)"
              >
                編輯
              </button>
              <button
                class="button" style="background-color: #724938;"
                @click.prevent="deleteModal(item)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 新增模板 -->
      <div
        class="modal animated fadeIn"
        id="couponsModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content border-0 bg-dark">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" v-if="isNew">新增優惠碼</h5>
              <h5 class="modal-title" v-else>編輯優惠碼</h5>
              <button
                type="button"
                class="button-close position-absolute"
                data-dismiss="modal"
                aria-label="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="form form-row">
                <div class="form-group col-6">
                  <label for="name" class="label">
                    名稱
                    <input
                      type="text"
                      class="input"
                      id="name"
                      v-model="tempProduct.title"
                      placeholder="請輸入名稱"
                    />
                  </label>
                </div>
                <div class="form-group col-6">
                  <label for="code" class="label">
                    代碼
                    <input
                      type="text"
                      class="input"
                      id="code"
                      v-model="tempProduct.code"
                      placeholder="請輸入代碼"
                    />
                  </label>
                </div>
                <div class="form-group col-6">
                  <label for="date" class="label">
                    到期日
                    <input
                      type="date"
                      class="input"
                      id="date"
                      v-model="tempProduct.due_date"
                      placeholder="請輸入到期日"
                    />
                  </label>
                </div>
                <div class="form-group col-6">
                  <label for="percent" class="label">
                    折扣百分比
                    <input
                      type="text"
                      class="input"
                      id="percent"
                      v-model="tempProduct.percent"
                      placeholder="請輸入折扣百分比"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="button bg-secondary"
                data-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                class="button bg-biwacha"
                @click.prevent="updataCoupons"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--刪除的模板-->
      <div
        class="modal animated bounceInDown"
        id="delcouponsModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="removeCartLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content bg-dark   border border-secondary">
            <div class="modal-body text-center p-4 h4">
              你確定要移除這項優惠卷嗎？
              <br>
              <strong class="text-danger">{{ tempProduct.title }}</strong>
              <br>
              (刪除後將無法恢復)
            </div>

            <div class="row text-center  border-top border-secondary m-0">
              <div
                data-dismiss="modal"
                class="col-6 p-0 btn btn-outline-danger border-0"
              >
                <div class="p-2 border-right border-secondary">
                  取消
                </div>
              </div>

              <div class="col-6 p-0 btn btn-outline-danger border-0">
                <div class="p-2" @click.prevent="deleteCoupon">
                  確定
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      pagination: {},
      sortData: '',
      reverse: false,
      newData: '',
      coupons: [],
      tempProduct: {},
      isNew: false,
    };
  },
  methods: {
    getCoupons(Loading) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${1}`;
      const vm = this;
      if (Loading) {
        vm.$store.dispatch('loading', true);
      }
      this.$http.get(api).then((response) => {
        vm.coupons = response.data.coupons;
        vm.newData = '';
        vm.$store.dispatch('loading', false);
      });
    },
    // updataEnabled(isEnabled, item) {
    // 為了展示後台畫面將是否啟動功能移除
    //   const vm = this;
    //   vm.tempProduct = Object.assign({}, item);
    //   vm.newData = vm.tempProduct.id;
    //   if (isEnabled) {
    //     vm.tempProduct.is_enabled = 1;
    //   } else if (!isEnabled) {
    //     vm.tempProduct.is_enabled = 0;
    //   }
    //   this.$http.put(api, { data: vm.tempProduct }).then(() => {
    //     vm.getCoupons(false);
    //   });
    // },
    openModal(isNew, item) {
      // 新增資料
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $('#couponsModal').modal({
        backdrop: 'static',
      });
      $('#couponsModal').modal('show');
    },
    updataCoupons() {
      // 為了展示後台畫面將新增及修改功能移除，改成只顯示 Alert
      this.$store.dispatch('loading', true);
      setTimeout(() => {
        this.$store.dispatch('loading', false);
        $('#couponsModal').modal('hide');
        this.$store.dispatch('activeAlert', '測試網站，無法執行新增或編輯');
      }, 1000);
      // const vm = this;
      // this.$store.dispatch('loading', true);
      // let httpMethod = 'post';
      // if (!vm.isNew) {
      //   httpMethod = 'put';
      // }
      // this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
      //   this.$store.dispatch('loading', false);
      //   $('#couponsModal').modal('hide');
      //   vm.getCoupons();
      //   if (response.data.success && httpMethod === 'post') {
      //     this.$store.dispatch('activeAlert', '已新增優惠碼');
      //   } else {
      //     this.$store.dispatch('activeAlert', '已更新優惠碼');
      //   }
      // });
    },
    deleteModal(item) {
      $('#delcouponsModal').modal('show');
      const vm = this;
      vm.tempProduct = Object.assign({}, item);
    },
    deleteCoupon() {
      // 為了展示後台畫面將刪除功能移除，改成只顯示 Alert
      // 刪除優惠卷
      setTimeout(() => {
        this.$store.dispatch('activeAlert', '測試網站，無法執行刪除');
        $('#delcouponsModal').modal('hide');
      }, 1000);
      // const vm = this;
      // this.$http.delete(api).then(() => {
      //   vm.$store.dispatch('activeAlert', '已刪除優惠碼');
      //   $('#delcouponsModal').modal('hide');
      //   vm.getCoupons();
      // });
    },
  },
  computed: {
    sortProducts() {
      const vm = this;
      if (vm.sortData === 'enables') {
        vm.coupons.sort((a, b) => {
          const aIsEnabled = a.is_enabled;
          const bIsEnabled = b.is_enabled;
          return (aIsEnabled > bIsEnabled ? 1 : -1) * (vm.reverse === true ? 1 : -1);
        });
      } else if (vm.sortData === 'percent') {
        vm.coupons.sort((a, b) => {
          const aPercent = Number(a.percent);
          const bPercent = Number(b.percent);
          return (aPercent > bPercent ? 1 : -1) * (vm.reverse === true ? 1 : -1);
        });
      } else if (vm.sortData === 'date') {
        vm.coupons.sort((a, b) => {
          const aDate = a.due_date;
          const bDate = b.due_date;
          return (aDate > bDate ? 1 : -1) * (vm.reverse === true ? 1 : -1);
        });
      }
      return vm.coupons;
    },
  },
  created() {
    this.getCoupons(true);
  },
};
</script>
