<template>
  <transition name="popup__animation--fade">
    <div
      :style="customDuration"
      :class="['popup', `popup__${className}`]"
      @keyup.esc="onEsc"
      tabindex="-1"
    >
      <div
        v-if="mask"
        @click.self="onClickMask"
        :style="customMaskStyles"
        class="popup__mask"
      ></div>

      <transition :name="`popup__animation--${animation}`">
        <div v-show="show" :style="dialogStyle" class="popup__dialog">
          <div v-if="type === 'dialog'">
            <header class="popup__header">
              <slot name="header">
                <!-- <h1>기본 타이틀</h1> -->
              </slot>
            </header>
            <div class="popup__content">
              <div class="popup__inner">
                <slot name="content">
                  <!-- <p>기본 컨텐츠</p> -->
                </slot>
              </div>
              <slot name="footer"></slot>
            </div>
          </div>
          <div v-else class="popup__content">
            <slot></slot>
          </div>
          <slot name="closeButton">
            <button
              v-if="closeButton"
              @click="closePop()"
              class="popupBtn__close"
            >
              닫기
            </button>
          </slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Popup',
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    // imageUrl: {
    //   type: String,
    //   default: ''
    // },
    type: {
      type: String,
      default: 'dialog'
    },
    top: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 640
    },
    // height: {
    //   type: Number,
    //   default: '240'
    // },
    duration: {
      type: Number,
      default: 300
    },
    measure: {
      type: String,
      default: 'px'
    },
    animation: {
      type: String,
      default: 'fade'
    },
    mask: {
      type: Boolean,
      default: true
    },
    closeButton: {
      type: Boolean,
      default: true
    },
    closeOnEsc: {
      type: Boolean,
      default: false
    },
    closeOnClickMask: {
      type: Boolean,
      default: false
    },
    customStyles: {
      type: Object,
      default: () => ({})
    },
    customMaskStyles: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    customDuration() {
      return {
        animationDuration: `${this.duration}ms`
      }
    },
    dialogStyle() {
      return {
        width: this.width + this.measure,
        // top: this.top + this.measure,
        // height: this.height + this.measure,
        animationDuration: `${this.duration}ms`,
        ...this.customStyles
      }
    }
  },
  watch: {
    show(isShow) {
      // (확인) : focus스크롤 이동으로 주석처리
      // isShow &&
      //   this.$nextTick(() => {
      //     this.$el.focus()
      //   })
    }
  },
  methods: {
    ...mapActions('popup', ['closePop']),
    onEsc() {
      if (this.show && this.closeOnEsc) {
        // this.$emit('hide');
        this.closePop()
      }
    },
    onClickMask() {
      // this.$emit('clickMask')
      if (this.closeOnClickMask) {
        // this.$emit('hide');
        this.closePop()
      }
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/scss/popup/style.scss';
</style>
