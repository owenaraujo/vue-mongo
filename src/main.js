import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
Vue.config.productionTip = false
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from "./store";
import router from "./router";
import Popper from 'vue-popperjs';
import clipboar from 'vue-clipboard2'
Vue.use(clipboar)
Vue.use(Popper)
  import 'vue-popperjs/dist/vue-popper.css';
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


