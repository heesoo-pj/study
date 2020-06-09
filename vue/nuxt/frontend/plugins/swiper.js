import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
import Vue from 'vue'

// require styles
import 'swiper/dist/css/swiper.css'

if (process.browser) {
  Vue.use(VueAwesomeSwiper /* { default global options } */)
}
