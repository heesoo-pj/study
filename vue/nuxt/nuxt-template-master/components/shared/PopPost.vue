<template>
  <PopBase v-show="isShow" :show="isShow" :className="popName">
    <template #header>
      <slot name="header">
        <h1>우편번호 찾기 기본 타이틀</h1>
      </slot>
    </template>
    <template #content>
      <DaumPostcode :on-complete="postComplete" :animation="true" />
    </template>
    <template #footer>
      <slot name="footer"> </slot>
    </template>
    <template #closeButton>
      <slot name="closeButton">
        <button @click="openPop({ popName: 'personalAddress' })" class="popupBtn__close">
          닫기
        </button>
      </slot>
    </template>
  </PopBase>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
import DaumPostcode from 'vuejs-daum-postcode'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PopPost',
  components: { PopBase, DaumPostcode },
  props: {
    eventName: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      popName: 'post',
      userModel: {
        zipcode: '',
        address: ''
      }
    }
  },
  computed: {
    ...mapState({ currentPop: (state) => state.popup.currentPop }),
    isShow() {
      return this.currentPop === this.popName
    }
  },
  methods: {
    ...mapActions('popup', ['openPop']),
    postComplete(data) {
      let fullAddress = data.address
      let extraAddress = ''
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname
        }
        if (data.buildingName !== '') {
          extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
      }
      this.userModel.zipcode = data.zonecode
      this.userModel.address = fullAddress
      // EventBus.$emit('updateUserAddress', this.userModel)
      // this.updateUserAddress(this.userModel)
      this.$store.commit(`${this.eventName}/SET_USER_MODEL`, this.userModel)
      this.$emit('complete')
      // ie에서 우편번호 팝업 관련 버그 처리
      // $('#personalAddressDetail')
      //   .first()
      //   .focus()
    }
  }
}
</script>

<style lang="scss">
.popup__post .popup__content .popup__inner {
  // ios에서 위치 값을 못찾는 오류가 있어 relative 지정
  position: relative;
  // .vue-daum-postcode {
  //   height: 500px;
  // }
  // .vue-daum-postcode-container {
  //   height: 100% !important;
  // }
}
</style>
