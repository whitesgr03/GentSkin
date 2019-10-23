<template>
  <div class="d-flex justify-content-center">
    <nav aria-label="Page navigation exampl ">
      <!--頁碼-->
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !paginations.has_pre }">
          <!-- 如果has_pre為false 就帶入disabled不能點擊按鈕 -->
          <a
            class="page-link text-white bg-dark border-light"
            href="#"
            aria-label="Previous"
            @click="getPage(paginations.current_page - 1)"
          >
            <!-- -1為上一頁 -->
            <i class="fas fa-chevron-left"></i>
          </a>
        </li>

        <li
          class="page-item"
          v-for="page in paginations.total_pages"
          :class="{ active: paginations.current_page === page }"
          :key="page"
        >
          <!--當前頁面光亮顯示-->
          <a
            class="page-link text-white bg-dark border-light"
            href="#"
            @click="getPage(page)"
            >{{ page }}</a
          >
        </li>

        <li class="page-item" :class="{ disabled: !paginations.has_next }">
          <!-- 如果has_next為false 就帶入disabled不能點擊按鈕 -->
          <a
            class="page-link text-white bg-dark border-light"
            href="#"
            aria-label="Next"
            @click="getPage(paginations.current_page + 1)"
          >  
            <!-- +1為下一頁 -->
            <i class="fas fa-chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  //   props: ['paginations']
  props: {
    // pagination的資料要是物件才能傳遞到內層
    paginations: {
      type: Object
    }
  },
  methods: {
    // 使用$emit將資料傳到外層
    getPage(page) {
      // console.log('分頁元件',page);
      this.$emit('getPage', page)
    }
  }
}
</script>
