@@ -1,48 +0,0 @@
<template lang="html">
  <div v-if="isLoading" class="loading-page">
    <LoadingIcon></LoadingIcon>
  </div>
</template>

<script>
import LoadingIcon from '@/components/shared/LoadingIcon'

import { mapState, mapActions } from 'vuex'

export default {
  components: { LoadingIcon },
  data: () => ({}),
  computed: {
    ...mapState({
      isLoading: (state) => state.popup.isLoading
    })
  },
  methods: {
    ...mapActions('popup', ['setLoading']),
    start() {
      this.setLoading(true)
    },
    finish() {
      this.setLoading(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-page {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  img {
    width: 120px;
  }
}
</style>
