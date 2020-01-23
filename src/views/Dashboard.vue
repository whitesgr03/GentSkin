<template>
  <div>
    <Navbar class="sticky-top"/>
    <Alert />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <main class="ml-sm-auto col-lg-10 pt-5">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>


<script>
import Sidebar from '@/components/backstage/Sidebar.vue';
import Navbar from '@/components/backstage/Navbar.vue';
import Alert from '@/components/backstage/AlertMassage.vue';

export default {
  components: {
    Sidebar,
    Navbar,
    Alert,
  },
};
</script>
