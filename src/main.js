import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'leaflet/dist/leaflet.css';
import $ from 'jquery';
// import 'bootstrap';
Vue.config.productionTip = false

Vue.directive('focus', {
  inserted: (el, binding, vnode, oldVnode) => {
    // this => ? 0.window 1.vue
    // console.log(el, binding, vnode, oldVnode)
    el.focus()
  }
})
window.$ = $;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
