import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import './plugins/vuetify'
import './plugins/vuetify-extra'
import router from './router/'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import awsmobile from "@/auth/aws_exports";
import apolloProvider from "@/auth/apollo";

Amplify.configure(awsmobile);
Vue.use(AmplifyPlugin, AmplifyModules);

Vue.config.productionTip = false

const init = () => {
  new Vue({
    router,
    apolloProvider,
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