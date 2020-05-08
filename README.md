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
  <a href="#packages">使用插件</a> •
</p>

<img src="https://i.imgur.com/t4VrmH9.jpg">
<h4>
  <a href="https://whitebf.github.io/GentSkin/#/">Demo</a>
</h4>


## 作品介紹

* 設計概念
  - Less is More—「少即是多，多即是少」，以簡單純粹為設計原點
  - 用更快的讀取時間和更好的響應式網站增加使用者的良好用戶體驗


* 主要架構
  - 依照現代網站進行 UI 設置，讓網站使用者在操作上可以更直覺更方便
  - 選用深色背景給予沉著、優雅的氛圍，讓使用者更加聚焦內容本身
  - 側邊欄設計給予連結更簡潔的方式呈現並且也讓右側產品圖像展現更多的視覺體驗


* 使用技術
  - Vue.js 作為 JavaScript Framework 建構 SPA
  - Bootstrap 作為 Framework 建構內容
  - jQuery 建構動畫效果
  - SCSS 整合 Bootstrap 進行結構化和建構 RWD 網頁
  - axios 進行 API 串接
  - Vuex  管理組件應用
  - Vue Router 管理路由

## 操作流程

* 註冊及登入選單中已自動設定預設帳號及密碼，只要手動選擇帳號即可完成註冊及登入流程
* web 可點選頁面最底部的 'GentSkin' 按鈕進入後台進行查看(需帳號密碼)

## 架設環境

使用 Github Pages 搭配後端 API 建置靜態網站。

## 檔案結構

    src
    ├── assets
    │   ├── images                        # 所有圖片素材
    │   ├── layout
    │   │     ├── header.scss             # 頁首
    │   │     ├── footer.scss             # 頁尾
    │   │     └── sidebar.scss            # Dashboard 的側邊欄
    │   │
    │   ├── mixin
    │   │     └── grid.scss               # Grid system
    │   │
    │   ├── module
    │   │     ├── alertMassage.scss       # 訊息提示
    │   │     ├── button.scss
    │   │     ├── form.scss
    │   │     ├── modal.scss              # 修改 Bootstrap modal
    │   │     ├── pagination.scss         # 分頁
    │   │     └── scrollBtn.scss          # 回頂端按鈕
    │   │
    │   ├── page
    │   │     ├── forestage
    │   │     ├── backstage
    │   │     ├── forestage.scss          # 前台頁面SCSS
    │   │     └── backstage.scss          # 後台頁面SCSS
    │   │
    │   ├── variable                      # Bootstrap 變數
    │   └── all.scss
    │
    ├── components
    │   ├── forestage                     # 前台主要頁面
    │   └── backstage                     # 後台主要頁面
    │
    ├── filters
    │   ├── currency.js                   # 前台主要組件
    │   └── date.js                       # 後台主要組件
    │
    ├── store
    │   ├── index.js                      # Vuex 全域組件
    │   ├── products.js                   # 商品組件
    │   ├── cart.js                       # 購物車組件
    │   ├── order.js                      # 訂單組件
    │   
    ├── views
    │   ├── forestage                     # 前台主要頁面
    │   ├── backstage                     # 後台主要頁面
    │   ├── Index.vue                     # 前台版型
    │   ├── Dashboard.vue                 # 後台版型
    │   └── Login.vue                     # 登入頁面
    │
    └── bus.js                            # Event Bus
    
## packages

- [vue-router](https://github.com/vuejs/vue-router)
- [vee-validate](https://github.com/logaretm/vee-validate)                      # 表單驗證
- [animate.css](https://github.com/daneden/animate.css)                         # CSS動畫
- [vue-carousel](https://github.com/SSENSE/vue-carousel)                        # 輪播套件
- [vue-infinite-loading](https://github.com/PeachScript/vue-infinite-loading)   # 無線滾動套件
- [axios](https://github.com/axios/axios)
- [vue-axios](https://github.com/imcvampire/vue-axios)
- [Vuex](https://github.com/vuejs/vuex)
