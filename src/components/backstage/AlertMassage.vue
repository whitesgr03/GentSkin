<template>
  <div>
      <div
        class="message bg-black p-0 mx-2 border border-secondary"
        v-for="(item, i) in alert"
        :key="i"
        :class="{'message-animate' : item.message === message}"
      >
        <div class="d-flex align-items-center">
          <div class="px-3 text-success">
            <i class="fas fa-exclamation-circle fa-2x"></i>
          </div>
          <div class="border-left border-secondary p-3">
            <span>{{ item.message }}</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'alert',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['alert', 'message']),
  },
};
</script>
