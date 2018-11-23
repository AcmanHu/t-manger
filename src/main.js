// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css';
import {Message} from 'iview';
import {Modal} from 'iview';
import {Spin} from 'iview';
import {Notice} from 'iview';
import { Button, Table } from 'iview';
import store from './components/public/store'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.component('Button', Button);
Vue.component('Table', Table);
Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Spin = Spin;
Vue.prototype.$Notice = Notice;
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
