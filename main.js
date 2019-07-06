import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import './plugins/vuetify'
import './plugins/vuetify-extra'
import router from './router/'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

//axios.defaults.baseURL = 'http://localhost:4000';

const init = () => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
};

// Wait for the deviceready event to start the render
document.addEventListener("deviceready", () => {
  init();
});

// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = (typeof window.cordova !== "undefined");
if (!isCordovaApp){
  document.dispatchEvent(new CustomEvent("deviceready", {}));
}