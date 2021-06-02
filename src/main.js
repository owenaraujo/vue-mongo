import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
Vue.config.productionTip = false
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from "./store";
import router from "./router";

import App from './App.vue'
window.toastr = require('toastr')

Vue.use(VueToastr2)

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')


