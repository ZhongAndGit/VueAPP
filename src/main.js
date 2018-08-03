// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueJsonp from 'vue-jsonp'//jsonp跨域處理
import App from './App.vue'
import routes from './router/router'
import {store} from './store/index'
import Mui from 'vue-awesome-mui'//手機返還鍵問題

// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)
// Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueJsonp)
Vue.use(Mui)

const router = new VueRouter({
  mode:'hash',
  routes
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: {
    App
  },
  template: '<App/>'
})

