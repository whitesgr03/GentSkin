<template>
  <div>
    <Alert />
    <Modal />
    <scrollBtn />
    <div class="container-fluid">
      <div class="row">
        <Sidebar class="col-lg-2 spacer"/>
          <main class="col-lg-10 p-0">
            <transition name="fade" mode="out-in">
              <router-view/>
            </transition>
            <Footer />
          </main>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/backstage/AlertMassage.vue';
import Modal from '@/components/forestage/Modal.vue';
import scrollBtn from '@/components/forestage/scrollBtn.vue';
import Footer from '@/components/forestage/Footer.vue';
import Sidebar from '@/components/forestage/Sidebar.vue';


export default {
  components: {
    Alert,
    Modal,
    scrollBtn,
    Footer,
    Sidebar,
  },
};
</script>

<style lang="scss" scoped>
@media (max-width:1025px) {
    .spacer{
        margin-top: 64px;
    }
  }
</style>
