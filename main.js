import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import './plugins/vuetify'
import './plugins/vuetify-extra'
import router from './router/'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VModal from 'vue-js-modal'
import VueCollapse from 'vue2-collapse'
import ToggleButton from 'vue-js-toggle-button'
import ImageUploader from 'vue-image-upload-resize'
import UUID from 'vue-uuid';
import Notifications from 'vue-notification'
import VueGtag from 'vue-gtag'
import '../node_modules/nprogress/nprogress.css'

// Determine if we are in a phone app, that changes how we do things a lot
const isCordovaApp = (typeof window.cordova !== "undefined");

if (isCordovaApp) {
  Vue.prototype.$hostname="https://api.schd.us";
}
else if (window.location.origin.indexOf("localhost")>-1) {
  Vue.prototype.$hostname="http://localhost:80";
}
else if (window.location.origin.indexOf("stage.schd.us")>-1)
{
  Vue.prototype.$hostname="https://api.schd.us";
}
else {
  Vue.prototype.$hostname="https://api.schd.us";
}


Vue.use(VueAxios, axios)
Vue.use(VModal)
Vue.use(VueCollapse)
Vue.use(ToggleButton)
Vue.use(UUID)
Vue.use(ImageUploader)
Vue.use(Notifications)

if (!isCordovaApp) {
  Vue.use(VueGtag, {
     config: {
         id: "G-W1PTB65QMZ" 
     }
  })
}

const init = () => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
};

// Give us a string splice method
if (!String.prototype.splice) {
  String.prototype.splice = function(start, delCount, newSubStr) {
      return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
  };
}

// Wait for the deviceready event to start the render
document.addEventListener("deviceready", () => {
  init();
  document.addEventListener("offline", function(){
    alert("NO_NETWORK");
  });
});


if (!isCordovaApp){
  document.dispatchEvent(new CustomEvent("deviceready", {}));
}
else {
  if (window.cordova.platformId==="android") {
    Vue.prototype.$hostname="http://10.0.2.2:80";
  }
}