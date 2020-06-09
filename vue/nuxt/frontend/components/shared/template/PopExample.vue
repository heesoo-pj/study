<!-- 기본팝업. 복사 후 변경해서 사용하세요
     -->
<template>
  <div>
    <!-- type종류 empty:빈팝업 -->
    <PopBase v-show="isShow" :show="isShow" :className="'example'">
      <!-- 기본틀가지고 있는 팝업 사용 예시 -->
      <template #header>
        변경할 내용
      </template>
      <template #content>
        변경할 내용
        <PersonalForm
          ref="childPersonal"
          :id="'personal'"
          :key="forceUpdate"
          :eventName="$store.state.example.eventName"
          :phoneCorpAuth="true"
          :agreement="{
            list: [
              {
                txt: '개인 정보 수집 및 이용에 대한 동의',
                name: 'agree0'
              },
              {
                txt: '개인정보 처리 위탁에 대한 동의',
                name: 'agree1'
              }
            ],
            agreeAll: true,
            checkboxSize: [30, 30, 10]
          }"
          @openAbovePop="(agreePopName) => (currentAgree = agreePopName)"
        >
        </PersonalForm>
      </template>
      <template #footer>
        변경할 내용
      </template>

      <!-- 닫기버튼 custom 사용 예시 -->
      <template #closeButton>
        <button @click="openPop('example')" type="button" class="popup__close">
          닫기
        </button>
      </template>
    </PopBase>
    <AbovePopExample v-model="currentAgree"></AbovePopExample>
  </div>
</template>

<script>
import PopBase from '@/components/shared/PopBase'
import PersonalForm from '@/components/shared/PersonalForm'
import AbovePopExample from '@/components/shared/template/AbovePopExample'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'PopExample',
  components: { PopBase, PersonalForm, AbovePopExample },
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      currentAgree: null
    }
  },
  computed: {
    ...mapState({
      imageUrl: (state) => `${state.example.imageUrlRoot}/popup`,
      forceUpdate: (state) => state.popup.forceUpdate
    })
  },
  methods: {
    ...mapActions('popup', ['openPop', 'closePop'])
  }
}
</script>
