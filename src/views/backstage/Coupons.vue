<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-outline-tohoh" @click="openModal(true)">
        建立新的優惠卷
      </button>
    </div>
    <table class="table mt-4  text-white">
      <thead>
        <tr>
          <th>名稱</th>
          <th width="200">折扣百分比</th>
          <th width="200">到期日</th>
          <th width="150">是否啟用</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="deleteModal(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :paginations="pagination" @getPage="getCoupons" />

    <!-- 新增模板 -->
    <div
      class="modal fade"
      id="couponsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0 bg-dark">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增及修改優惠卷</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control input-color"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>
                <div class="form-group">
                  <label for="title">優惠碼</label>
                  <input
                    type="text"
                    class="form-control input-color"
                    id="title"
                    v-model="tempProduct.code"
                    placeholder="請輸入優惠碼"
                  />
                </div>
                <div class="form-group">
                  <label for="title">到期日</label>
                  <input
                    type="date"
                    class="form-control input-color"
                    id="title"
                    v-model="tempProduct.due_date"
                    placeholder="請輸入到期日"
                  />
                </div>
                <div class="form-group">
                  <label for="title">折扣百分比</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="10"
                    class="form-control input-color"
                    id="title"
                    v-model="tempProduct.percent"
                    placeholder="請輸入折扣百分比"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled"
                      >是否啟用</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-light"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateCoupons"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--刪除的模板-->

    <div
      class="modal fade"
      id="delcouponsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="removeCartLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content bg-dark   border border-secondary">
          <div class="modal-body text-center p-4 h4">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            優惠卷？
            <div>(刪除後將無法恢復)</div>
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
              <div class="p-2" @click="deleteCoupon">
                確定
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      coupons: [],
      tempProduct: {},
      isNew: false
    }
  },
  methods: {
    getCoupons(page) {
      //取得api資料  //page = 1 預設參數 即可套用全部使用到getProducts的地方
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      const vm = this
      vm.isLoading = true //啟用讀取動畫
      this.$http.get(api).then(response => {
        // console.log(response.data)
        vm.isLoading = false //資料讀取完成後再停用動畫
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination //存取API提供的頁數
      })
    },
    openModal(isNew, item) {
      //新增資料
      if (isNew) {
        ;(this.tempProduct = {}), (this.isNew = true)
      } else {
        this.tempProduct = Object.assign({}, item) //Object.assign()為 ES6寫法 將item寫入前方的{}空物件中 避免 tempProduct = item 的傳參考特性
        this.isNew = false
      }
      $('#couponsModal').modal('show') //使用methods透過決定何時開啟功能
    },
    updateCoupons() {
      //編輯資料
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let httpMethod = 'post'
      const vm = this
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempProduct.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        console.log(response.data)
        if (response.data.success) {
          $('#couponsModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#couponsModal').modal('hide')
          vm.getCoupons()
          // console.log('新增失敗')
        }
      })
    },
    deleteModal(item) {
      $('#delcouponsModal').modal('show')
      const vm = this
      vm.tempProduct = Object.assign({}, item)
    },
    deleteCoupon() {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempProduct.id}`
      this.$http.delete(api).then(response => {
        // console.log(response, vm.tempProduct)
        $('#delcouponsModal').modal('hide')
        this.getCoupons()
        this.$bus.$emit('message:push', '優惠卷已被刪除', 'tohoh')
      })
    }
  },
  created() {
    this.getCoupons()
  },
  components: {
    Pagination
  }
}
</script>
