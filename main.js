import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import './plugins/vuetify'
import './plugins/vuetify-extra'
import router from './router/'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import config from 'vue-config'

const configs = require('../schus_config')

Vue.use(config, configs)
Vue.use(VueAxios, axios)

const init = () => {
  new Vue({
    router,
    config,
    render: h => h(App)
  }).$mount('#app')
};

// Wait for the deviceready event to start the render
document.addEventListener("deviceready", () => {
  init();

  document.addEventListener("offline", function(){
    alert("NO_NETWORK");
  });
});

// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = (typeof window.cordova !== "undefined");
if (!isCordovaApp){
  document.dispatchEvent(new CustomEvent("deviceready", {}));
}