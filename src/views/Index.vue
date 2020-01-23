<template>
  <div>
    <Alert />
    <scrollBtn />
    <main>
      <router-view/>
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/forestage/Footer.vue';
import scrollBtn from '@/components/forestage/scrollBtn.vue';
import Alert from '@/components/backstage/AlertMassage.vue';

export default {
  components: {
    Footer,
    scrollBtn,
    Alert,
  },
};
</script>
