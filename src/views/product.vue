<template>
  <div>
    <Alert />
    <GoTop />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/forestage/Footer.vue'
import GoTop from '@/components/forestage/GoTop.vue'
import Alert from '@/components/backstage/AlertMassage.vue'

export default {
  components: {
    Footer,
    GoTop,
    Alert
  }
}
</script>
