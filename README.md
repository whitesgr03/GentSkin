<h1 align="center">
  <a href="https://whitebf.github.io/GentSkin/#/">
    <img src="https://img.icons8.com/color/500/000000/jeans-jacket.png"
         alt="GentSkin"
         width="200">
  </a>
  <br>
  GentSkin
  <br>
</h1>

<h4 align="center">
  電商網站設計：打造純粹風格的響應式網頁
</h4>

<p align="center">
  <a  href="https://whitebf.github.io/GentSkin/#/">
    <img src="https://img.shields.io/badge/Demo-Gentskin-green">
  </a>
</p>

<p align="center">
  <a href="#作品介紹">作品介紹</a> •
  <a href="#架設環境">架設環境</a> •
  <a href="#檔案結構">檔案結構</a> •
  <a href="#packages">使用插件</a>
</p>

<img src="https://i.imgur.com/t4VrmH9.jpg">
<h4>
  <a href="https://whitebf.github.io/GentSkin/#/">Demo</a>
</h4>


## 作品介紹

* 主要概念
  - Less is More —「少即是多，多即是少」，以簡單純粹為設計原點
  - 用更快速的讀取時間和更彈性的響應式技術來增加使用者瀏覽網站時的最佳體驗


* 設計架構
  - 使用現代網站進行 UI 設置，讓網站使用者在操作上可以更直覺更方便
  - 選用深色背景給予沉著、優雅的氛圍，讓使用者更加聚焦內容本身
  - 側邊欄設計給予連結更簡潔的方式呈現並且也讓右側產品圖像展現更多的視覺體驗


* 使用技術
  - Vue.js / Vue Router 建構 SPA
  - Vuex  進行組件狀態管理
  - Vue axios 進行後端 API 串接
  - Sass/SCSS 設計整合 Bootstrap 自定義變數
  - Bootstrap 設計 RWD 網頁
  

## 操作流程

* 註冊及登入選單中已自動設定預設帳號及密碼，只要手動選擇帳號即可完成註冊及登入流程

![Member login imgur](https://i.imgur.com/icVkLzr.gif)

* 從前台登入帳號後 透過左上方的齒輪圖案點擊可進入後台管理進行查看

![CMS login imgur](https://imgur.com/dFSrrhh.gif)

測試帳號：  GentSkinTest01@gmail.com
<br>
測試密碼：  GentSkin

## 架設環境

使用 Github Pages 搭配後端 API 建置靜態網站。

## 檔案結構

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
 
    
## packages

- [vue-router](https://github.com/vuejs/vue-router)
- [vee-validate](https://github.com/logaretm/vee-validate)                      # 表單驗證
- [animate.css](https://github.com/daneden/animate.css)                         # CSS動畫
- [vue-carousel](https://github.com/SSENSE/vue-carousel)                        # 輪播套件
- [vue-infinite-loading](https://github.com/PeachScript/vue-infinite-loading)   # 無線滾動套件
- [axios](https://github.com/axios/axios)
- [vue-axios](https://github.com/imcvampire/vue-axios)
- [Vuex](https://github.com/vuejs/vuex)
