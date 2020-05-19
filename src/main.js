import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import App from './App.vue';
import './registerServiceWorker';
import './firebase';
import router from './router';
import store from './store';
import './Filters';
import vuetify from './plugins/vuetify';

Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
