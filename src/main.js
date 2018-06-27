// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueJsonp from 'vue-jsonp'
import App from './App.vue'
import routes from './router/router'
import {store} from './vuex/index'

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueJsonp)

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

