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


Vue.prototype.$hostname="http://localhost:80";
Vue.use(VueAxios, axios)
Vue.use(VModal)
Vue.use(VueCollapse)
Vue.use(ToggleButton)
Vue.use(UUID);
Vue.use(ImageUploader)

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

// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = (typeof window.cordova !== "undefined");
if (!isCordovaApp){
  document.dispatchEvent(new CustomEvent("deviceready", {}));
}
else {
  //navigator.camera.sourceType=Camera.PictureSourceType.PHOTOLIBRARY;
  if (window.cordova.platformId==="android") {
    Vue.prototype.$hostname="http://10.0.2.2:80";
  }
}