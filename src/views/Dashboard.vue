<template>
  <div>
    <Navbar />
    <Alert />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <main role="main" class=" ml-sm-auto col-lg-10">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

//
<script>
import Sidebar from '@/components/backstage/Sidebar.vue'
import Navbar from '@/components/backstage/Navbar.vue'
import Alert from '@/components/backstage/AlertMassage.vue'

export default {
  components: {
    Sidebar,
    Navbar,
    Alert
  }
}
</script>
