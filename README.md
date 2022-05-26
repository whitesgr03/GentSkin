<h1 align="center">
  <a href="https://whitesgr03.github.io/GentSkin/">
    <img src="https://img.icons8.com/color/500/000000/jeans-jacket.png"
         alt="GentSkin"
         width="200">
  </a>
  <br>
  GentSkin
  <br>
</h1>

<h4 align="center">
  英倫風格服飾網站設計：由 Vue.js 建構
</h4>

<p align="center">
  <a  href="https://whitesgr03.github.io/GentSkin/">
    <img src="https://img.shields.io/badge/Demo-Gentskin-green">
  </a>
</p>

<img src="https://i.imgur.com/t4VrmH9.jpg">


## 作品介紹

### UI/UX 設計
- 網站使用深色背景，讓使用者容易聚焦內容本身
- 使用左側欄設計更易於點擊連結，也提升主要內容的視覺體驗

### 使用技術
- Vue.js
  - Vue Router
  - Vuex
  - axios
  - vee-validate
- CSS
  - Bootstrap
  - Sass/SCSS
- HTML

### 架設環境
- 網站為靜態網頁使用 Github Pages 架設


## 操作展示

* 註冊及登入選單中已自動設定預設帳號及密碼，只要手動選擇帳號即可完成註冊及登入流程

![Member login imgur](https://i.imgur.com/icVkLzr.gif)

* 從前台登入帳號後 透過左上方的齒輪圖案點擊可進入後台管理進行查看
  - 後台測試帳號：  GentSkinTest01@gmail.com
  - 後台測試密碼：  GentSkin

![CMS login imgur](https://imgur.com/dFSrrhh.gif)



## 檔案結構
```
    src
    ├── assets
    │   ├── images                        # 所有圖片素材
    │   ├── layout
    │   │     ├── _b-sidebar.scss         # 後台側邊欄
    │   │     ├── _f-sidebar.scss         # 前台側邊欄
    │   │     └── _footer.scss
    │   │
    │   ├── module
    │   │     ├── _alertMassage.scss       # 訊息提示
    │   │     ├── _button.scss
    │   │     ├── _form.scss
    │   │     ├── _modal.scss              # 自定義 Bootstrap modal
    │   │     └── _scrollBtn.scss          # 回頂端按鈕
    │   │
    │   ├── page
    │   │     ├── backstage                # 後台頁面SCSS
    │   │     ├── forestage                # 前台頁面SCSS
    │   │     ├── _forestage.scss          
    │   │     └── _backstage.scss
    │   │
    │   ├── variable                      # 自定義 Bootstrap 變數
    │   └── all.scss
    │
    ├── components
    │   ├── backstage                     # 後台主要組件
    │   └── forestage                     # 前台主要組件
    │
    ├── filters
    │   ├── currency.js
    │   └── date.js
    │
    ├── store                             # Vuex
    │   ├── cart.js                       # 購物車組件
    │   ├── index.js                      # 全域組件
    │   ├── order.js                      # 訂單組件
    │   ├── products.js                   # 商品組件
    │   
    └── views
        ├── backstage                     # 後台主要頁面
        ├── forestage                     # 前台主要頁面
        ├── Dashboard.vue                 # 後台版型
        ├── Index.vue                     # 前台版型
        └── Login.vue                     # 登入頁面
 ```
    
## 使用套件

- [vue-router](https://github.com/vuejs/vue-router)
- [Vuex](https://github.com/vuejs/vuex)
- [vee-validate](https://github.com/logaretm/vee-validate)
- [axios](https://github.com/axios/axios)
- [vue-axios](https://github.com/imcvampire/vue-axios)
- [vue-carousel](https://github.com/SSENSE/vue-carousel)
- [vue-infinite-loading](https://github.com/PeachScript/vue-infinite-loading)
- [animate.css](https://github.com/daneden/animate.css)
