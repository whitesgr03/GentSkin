<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!--全螢幕讀取動畫-->
    <div class="text-right mt-4">
      <button class="btn btn-outline-tohoh" @click="openModal(true)">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4 text-white">
      <thead>
        <tr>
          <th width="150">分類</th>
          <th>產品名稱</th>
          <th width="150">原價</th>
          <th width="150">售價</th>
          <th width="150">是否啟用</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-center" v-if="item.origin_price != 0">
            {{ item.origin_price | currency }}
          </td>
          <td class="text-center" v-if="item.origin_price == 0">----</td>
          <td class="text-center">{{ item.price | currency }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-warning">未啟用</span>
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

    <!--分頁props-->
    <Pagination :paginations="pagination" @getPage="getProducts" />

    <!--新增及編輯的模板-->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0 bg-dark">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增及修改產品</span>
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
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control input-color"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>

                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control input-color"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>

                <img class="img-fluid" :src="tempProduct.imageUrl" alt />
              </div>

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

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control input-color"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>

                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control input-color"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control input-color"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control input-color"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>

                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control input-color"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control input-color"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
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
              @click.prevent="updateProduct"
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
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="removeCartLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content bg-dark   border border-secondary">
          <div class="modal-body text-center p-4 h4">
            你確定要移除<strong class="text-danger">{{
              tempProduct.title
            }}</strong>
            這項商品嗎
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
              <div class="p-2" @click="deleteProduct">
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
      products: [], //抓取後端產品資料
      pagination: {}, //抓取後端頁數資料
      tempProduct: {}, //建立新增或修改資料
      isNew: false, //新增與修改時的變數
      isLoading: false, //一般動畫讀取的變數 false不啟動
      status: {
        fileUploading: false //上傳圖片的動畫讀取的變數 在index.html中使用CDN方式載入動畫
      }
    }
  },
  methods: {
    getProducts(page = 1) {
      //取得api資料  //page = 1 預設參數 即可套用全部使用到getProducts的地方
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      vm.isLoading = true //啟用讀取動畫
      this.$http.get(api).then(response => {
        console.log(response.data.success)
        if (response.data.success) {
          vm.isLoading = false //資料讀取完成後再停用動畫
          vm.products = response.data.products
          vm.pagination = response.data.pagination //存取API提供的頁數
        } else {
          vm.$router.push(`/login`)
        }
      })
    },
    openModal(isNew, item) {
      //新增資料
      if (isNew) {
        //傳入new參數 就開啟post模板 建立新的資料
        ;(this.tempProduct = {}), (this.isNew = true)
      } else {
        //否則就開啟put模板 並且格子內載入原本的資料可做修改
        this.tempProduct = Object.assign({}, item) //Object.assign()為 ES6寫法 將item寫入前方的{}空物件中 避免 tempProduct = item 的傳參考特性
        this.isNew = false
      }
      $('#productModal').modal('show') //使用methods透過決定何時開啟功能
    },
    updateProduct() {
      //編輯資料
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let httpMethod = 'post' //新增
      if (!vm.isNew) {
        //isNew等於false時就開啟put模板
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put' //修改
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        //參數data是物件 所以要在用括號包起來
        // console.log(response.data.success)
        if (response.data.success) {
          $('#productModal').modal('hide')
          vm.getProducts()
        } else {
          $('#productModal').modal('hide')
          vm.getProducts()
          // console.log('新增失敗')
        }
      })
    },
    deleteModal(item) {
      const vm = this
      $('#delProductModal').modal('show')
      vm.tempProduct = Object.assign({}, item) //打開刪除模板並抓出資料到vm.tempProduct
    },
    deleteProduct() {
      const vm = this
      //刪除選擇的vm.tempProduct資料
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      this.$http.delete(api).then(response => {
        // console.log(response, vm.tempProduct)
        $('#delProductModal').modal('hide')
        this.getProducts() //刪除資料後重新抓一次新的資料
        this.$bus.$emit('message:push', '商品已被刪除', 'tohoh')
      })
    },
    uploadFile() {
      //上傳圖片
      const vm = this
      const uploadedFile = this.$refs.files.files[0] //已經上傳的檔案位置 陣列第0個
      const formData = new FormData() //webAPI 模擬傳統表單送出的形式
      formData.append('file-to-upload', uploadedFile) //使用append將檔案新增到變數中 括號內參數 (前)要新增的欄位  (後)要上傳的變數
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload` //路徑
      vm.status.fileUploading = true //啟用讀取動畫
      this.$http
        .post(api, formData, {
          //上傳路徑  傳送的內容  大括號的內容為一個要修改的物件
          headers: {
            //調整headers
            'Content-Type': 'multipart/form-data' //將Content-Type改成form-data格式
          }
        })
        .then(response => {
          // console.log(response.data.success)
          vm.status.fileUploading = false //資料讀取完成後再停用動畫
          if (response.data.success) {
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl) //將imageIUrl雙向綁定  使用$set將後端response.data.imageUrl裡的資料強制,寫入變數vm.tempProduct裡的'imageUrl'
          } else {
            this.$bus.$emit('message:push', response.data.message, 'danger') //使用emit將products中response.data.message的內容傳送給$bus 在外層alert中顯示出錯誤訊息
          }
        })
    }
  },

  created() {
    this.getProducts()
  },
  components: {
    Pagination
  }
}
</script>

<style scoped></style>
