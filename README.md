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
  電商網站設計：打造可供各平台瀏覽的響應式網頁
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
  <a href="#packages">packages</a> •
</p>

<img src="https://i.imgur.com/wz1WkPn.jpg?1">

## 作品介紹

* 這個作品是應用線上課程中所學的能力獨立製作而成。
  - 使用 Vue.js 做為前端框架建構一頁式網站
  - 使用 Bootstrap 作為框架建構內容
  - 使用 
  - 桌上型和行動版都能擁有良好的使用體驗
* 網站使用者在操作上可以更直覺更方便。
* 以各大電商網站為藍本參考網站配置後，自行設計屬於現代電商須具備的各大要素
  - 完整的瀏覽規劃
  - 美觀的介面排板
  - 快速的讀取速度
  - 桌上型和行動版都能擁有良好的使用體驗

## 架設環境

使用 Github Pages 架設靜態網站。

## 檔案結構

    src
    ├── assets
    │   ├── images                        # 所有圖片素材
    │   ├── layout
    │   │     ├── header.scss             # 頁首
    │   │     ├── footer.scss             # 頁尾
    │   │     └── sidebar.scss            # Dashboard 的側邊欄
        │
    │   ├── mixin
    │   │     └── grid.scss               # Grid system
        │
    │   ├── module
    │   │     ├── alertMassage.scss       # 訊息提示
    │   │     ├── button.scss
    │   │     ├── form.scss
    │   │     ├── modal.scss              # 修改 Bootstrap modal
    │   │     ├── pagination.scss         # 分頁
    │   │     └── scrollBtn.scss          # 回頂端按鈕
        │
    │   ├── page
    │   │     ├── forestage
    │   │     ├── backstage
    │   │     ├── forestage.scss          # 前台頁面SCSS
    │   │     └── backstage.scss          # 後台頁面SCSS
        │
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
    ├── views
    │   ├── forestage                     # 前台主要頁面
    │   ├── backstage                     # 後台主要頁面
    │   ├── Index.vue                     # 
    │   ├── Dashboard.vue                 # 
    │   └── Login.vue                     # 登入頁面
    │
    ├── App.vue                           # 
    ├── bus.js                            # 
    ├── main.js                           # 
    └── router.js                         # 
    
## packages

使用到的技術和原因

- [vue-router](http://electron.atom.io/)    #
- [vee-validate](http://electron.atom.io/)  # 驗證
- [animate.css](http://electron.atom.io/)   # 動畫
- [swiper](http://electron.atom.io/)        # 輪播
- [axios](http://electron.atom.io/)         # 
