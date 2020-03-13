<template>
  <div>
    <loading :active.sync="isLoading" style="z-index:9999;"></loading>
    <div class="products">
      <div class="text-right mb-4">
        <button type="button" class="button bg-biwacha" @click.prevent="openModal(true)">
          新增商品
        </button>
      </div>
      <table class="table mb-5">
        <thead>
          <tr>
            <th width="200">
              <form>
                <label for="sort" class="mr-2 mb-0">分類</label>
                <select v-model="category" id="sort" class="custom-select align-baseline">
                  <option value="" selected>All</option>
                  <option v-for="item in categorys" :value="item" :key="item">{{item}}</option>
                </select>
              </form>
            </th>
            <th>產品名稱</th>
            <th width="150">原價</th>
            <th width="150" @click.prevent="reverse = !reverse, sortData = 'price'"
              style="cursor: pointer;">
              售價
              <i class="fas fa-sort text-tohoh" v-if="sortData == '' || sortData !== 'price'"></i>
              <i v-if="sortData == 'price'" class="fas fa-sort-up ml-1 text-tohoh"
              :class="{'reverse': reverse}"></i>
            </th>
            <th width="150" @click.prevent="reverse = !reverse, sortData = 'release'"
              style="cursor: pointer;">
              是否上架
              <i class="fas fa-sort text-tohoh" v-if="sortData == '' || sortData !== 'release'"></i>
              <i v-if="sortData == 'release'" class="fas fa-sort-up text-tohoh"
              :class="{'reverse': reverse}"></i>
            </th>
            <th width="150">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortProducts" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-center" v-if="item.origin_price !== '0'">
              {{ item.origin_price | currency }}
            </td>
            <td class="text-center" v-if="item.origin_price === '0'">----</td>
            <td class="text-center">{{ item.price | currency }}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success"  style="cursor: pointer;"
                @click.prevent="updataEnabled(false, item)" :class="{'gg':newData !== item.id}">已上架
                <i class="fas fa-spinner fa-spin" v-if="newData === item.id"></i>
              </span>
              <span v-else class="text-warning"  style="cursor: pointer;"
              :class="{'gg':newData !== item.id}"
              @click.prevent="updataEnabled(true, item)">
                未上架
                <i class="fas fa-spinner fa-spin" v-if="newData === item.id"></i>
              </span>
            </td>
            <td>
              <button
                class="button bg-konjyo"
                @click.prevent="openModal(false, item)"
              >
                編輯
              </button>
              <button
                class="button bg-momoshiocha"
                @click.prevent="deleteModal(item)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!--新增及編輯的Modal-->
      <div class="modal animated fadeIn" id="productModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0 bg-dark">
            <div class="modal-header bg-dark">
              <h5 class="modal-title" v-if="isNew">新增商品</h5>
              <h5 class="modal-title" v-else>編輯商品</h5>
              <button
              type="button"
              class="button-close position-absolute"
              data-dismiss="modal"
              aria-label="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form form-group">
                    <label for="image" class="label">
                        商品圖片
                      <input
                        type="text"
                        class="input"
                        id="image"
                        v-model="tempProduct.imageUrl"
                        placeholder="請上傳圖片或輸入網址"
                      />
                    </label>
                    <label class="uploadImage">
                      <input type="file" style="display: none;"
                      ref="files" @change="uploadFile"/>
                      <i class="fas fa-spinner fa-spin mr-1" v-if="status.fileUploading"></i>
                      <i v-else class="far fa-image mr-1"></i>上傳
                  </label>
                  </div>
                  <img class="img-fluid" :src="tempProduct.imageUrl" alt />
                </div>
                <div class="col-sm-8">
                  <div class="form form-row">
                    <div class="form-group col-md-6">
                      <label for="title" class="label">
                        商品名稱
                      <input
                        type="text"
                        class="input"
                        id="title"
                        v-model="tempProduct.title"
                        placeholder="請輸入名稱"
                      />
                      </label>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="category" class="label">
                        商品分類
                      <input
                        type="text"
                        class="input"
                        id="category"
                        v-model="tempProduct.category"
                        placeholder="請輸入分類"
                      />
                      </label>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="Item" class="label">
                        商品項目
                      <input
                        type="text"
                        class="input"
                        id="Item"
                        v-model="tempProduct.Item"
                        placeholder="請輸入項目"
                      />
                      </label>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="unit" class="label">
                        商品單位
                      <input
                        type="text"
                        class="input"
                        id="unit"
                        v-model="tempProduct.unit"
                        placeholder="請輸入單位(件..個..雙..等)"
                      />
                      </label>
                    </div>

                    <div class="form-group col-md-6">
                      <label for="origin_price" class="label">
                        原始售價
                      <input
                        type="text"
                        class="input"
                        id="origin_price"
                        v-model="tempProduct.origin_price"
                        placeholder="請輸入原價"
                      />
                      </label>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price" class="label">
                        特別售價
                      <input
                        type="text"
                        class="input"
                        id="price"
                        v-model="tempProduct.price"
                        placeholder="請輸入特價"
                      />
                      </label>
                    </div>

                    <div class="form-group col-md-12">
                      <label for="description" class="label">
                          商品描述
                        <textarea
                          type="text"
                          class="textarea"
                          id="description"
                          v-model="tempProduct.description"
                          placeholder="請輸入商品描述"
                        />
                        </label>
                    </div>
                    <div class="form-group col-md-12">
                      <label for="content" class="label">
                          其他內容
                        <textarea
                          type="text"
                          class="textarea"
                          id="content"
                          v-model="tempProduct.content"
                          placeholder="請輸入商品其他內容"
                        />
                        </label>
                    </div>
                  </div>
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
                @click.prevent="updataProduct"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--刪除Modal-->
      <div
        class="modal animated bounceInDown"
        id="delProductModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="removeCartLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content bg-dark  border border-secondary">
            <div class="modal-body text-center p-4 h4">
              你確定要移除這項商品嗎
              <br>
              <strong class="text-danger">{{tempProduct.title}}</strong>
              <br>
              (刪除後將無法恢復)
            </div>

            <div class="row text-center border-top border-secondary m-0">
              <div class="col-6 p-0 btn btn-outline-danger border-0"
                data-dismiss="modal">
                <div class="p-2 border-right border-secondary">
                  取消
                </div>
              </div>
              <div class="col-6 p-0 btn btn-outline-danger border-0">
                <div class="p-2" @click.prevent="deleteProduct">
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
      products: [],
      tempProduct: {},
      reverse: false,
      sortData: '',
      categorys: [],
      category: '',
      newData: '',
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products/all`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          const newArray = [];
          Object.keys(response.data.products)
            .map(item => [response.data.products[item]]).forEach(item => newArray.push(item[0]));
          vm.products = newArray;
          const sort = [];
          vm.products.forEach((item) => {
            sort.push(item.category);
          });
          vm.categorys = Array.from(new Set(sort));
          vm.newData = '';
          vm.isLoading = false;
        } else {
          vm.$router.push('/login');
        }
      });
    },
    updataEnabled(isEnabled, item) {
      const vm = this;
      vm.tempProduct = Object.assign({}, item);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      vm.newData = vm.tempProduct.id;
      if (isEnabled) {
        vm.tempProduct.is_enabled = 1;
      } else if (!isEnabled) {
        vm.tempProduct.is_enabled = 0;
      }
      this.$http.put(api, { data: vm.tempProduct }).then(() => {
        vm.getProducts(false);
      });
    },
    openModal(isNew, item) {
      const vm = this;
      //  新增資料
      if (isNew) {
        // 傳入true參數 就開啟空模板 建立新的資料
        vm.tempProduct = {};
        vm.isNew = true;
      } else {
        // 否則就帶入item載入資料模板
        vm.tempProduct = Object.assign({}, item);
        // Object.assign()為 ES6寫法 將item寫入前方的{}空物件中 避免 tempProduct = item 的傳參考特性
        vm.isNew = false;
      }
      $('#productModal').modal({
        backdrop: 'static',
      });
      $('#productModal').modal('show');
    },
    updataProduct() {
      //  更新資料
      const vm = this;
      vm.isLoading = true;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      if (!vm.isNew) {
        //  isNew等於false時就開啟put模板
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        vm.isLoading = false;
        $('#productModal').modal('hide');
        vm.getProducts();
        if (response.data.success && httpMethod === 'post') {
          this.$bus.$emit('alert', '已新增商品');
        } else {
          this.$bus.$emit('alert', '已更新商品');
        }
      });
    },
    deleteModal(item) {
      const vm = this;
      $('#delProductModal').modal('show');
      vm.tempProduct = Object.assign({}, item); // 打開刪除模板並抓出資料到vm.tempProduct
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api).then(() => {
        $('#delProductModal').modal('hide');
        vm.getProducts();
        this.$bus.$emit('alert', '已刪除商品');
      });
    },
    uploadFile() {
      //  上傳圖片
      const vm = this;
      const uploadedFile = this.$refs.files.files[0]; //  已經上傳的檔案位置 陣列第0個
      const formData = new FormData(); //  webAPI 模擬傳統表單送出的形式
      formData.append('file-to-upload', uploadedFile); //  使用append將檔案新增到變數中 括號內參數 (前)要新增的欄位  (後)要上傳的變數
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`; //  路徑
      vm.status.fileUploading = true; // 啟用讀取動畫
      this.$http.post(api, formData, {//  上傳路徑 傳送的內容 大括號的內容為一個要修改的物件
        headers: {
          'Content-Type': 'multipart/form-data', //  將Content-Type改成form-data格式
        },
      }).then((response) => {
        vm.status.fileUploading = false;
        if (response.data.success) {
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl); //  將imageIUrl雙向綁定  使用$set將後端response.data.imageUrl裡的資料強制,寫入變數vm.tempProduct裡的'imageUrl'
        } else {
          this.$bus.$emit('alert', response.data.message);
        }
      });
    },
  },
  computed: {
    sortProducts() {
      const vm = this;
      let newSort = [];
      if (vm.category !== '') {
        newSort = vm.products.filter(item => item.category === vm.category);
      } else {
        newSort = vm.products;
      }
      if (vm.sortData === 'release') {
        newSort.sort((a, b) => {
          const aIsEnabled = a.is_enabled;
          const bIsEnabled = b.is_enabled;
          return (aIsEnabled > bIsEnabled ? 1 : -1) * (vm.reverse === true ? 1 : -1);
        });
      } else if (vm.sortData === 'price') {
        newSort.sort((a, b) => {
          const aPrice = Number(a.price);
          const bPrice = Number(b.price);
          return (aPrice > bPrice ? 1 : -1) * (vm.reverse === true ? 1 : -1);
        });
      }
      return newSort;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
