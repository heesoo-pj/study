<template>
  <div class="container">
    메인
    <button
      @click="
        openPop({
          popName: 'example'
        })
      "
    >
      팝업띄우기
    </button>
    <PopExample :isShow="currentPop === 'example'"></PopExample>
  </div>
</template>

<script>
import PopExample from '@/components/shared/template/PopExample'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Index',
  components: { PopExample },

  computed: {
    ...mapState({
      imageUrl(state) {
        return `${state.example.imageUrlRoot}/${this.deviceKind}`
      },
      currentPop: (state) => state.popup.currentPop,
      forceUpdate: (state) => state.popup.forceUpdate
    })
  },
  methods: {
    ...mapActions('popup', ['openPop', 'setLoading'])
  }
}
</script>

<style></style>
