<template>
  <v-app>
    <myToolbar />
    <v-content style="padding:0px!important;">
      <v-slide-y-transition mode="out-in">
        <v-container class="dmContainer" pa-0 fluid align-content-center align-center>
          <div class="layout row dmRowContainer">
            <div class="desktopOnly lg2 toolbarMenu">
                <myContentDrawer />
            </div>
            <div class="dmRouter">
              <router-view></router-view>
            </div>
          </div>
        </v-container>
      </v-slide-y-transition>
    </v-content>
    <myFooter />
    <notifications group="main" position="bottom center" >
      <template slot="body" slot-scope="props">
        <div @click="closeThis(props)" class="errorBox">
            <a style="color:#FFF;font-size:1.2em;">
              {{props.item.title}}
            </a>
            <div v-html="props.item.text">
            </div>
        </div>
      </template>
    </notifications>
  </v-app>
</template>

<style>
   @import 'assets/coreStyles.css';
   @import 'assets/desktopStyles.css';
</style>

<script>
import myToolbar from "@/components/Toolbar"
import myFooter from "@/components/Footer"
import myContentDrawer from "@/components/Drawer"
export default {
  name: 'app',
  components: {myToolbar, myFooter, myContentDrawer},
  methods: {
      closeThis: function(prps) {
         
          var c = localStorage.getItem("_c");
          if (typeof(c)!=="undefined" && c!==null && c!=="null") {  
              this.$http({
                  method:'post',
                  url:this.$hostname+'/dismissclientqueue',
                  data: {
                      ClientID: c,
                      SessionID: localStorage.getItem("_s"),
                      SessionLong: localStorage.getItem("_r"),             
                      ClientQueueID: prps.item.id      
                  }
              });
          }

          prps.close();
      },
      pollNotifications:function() {
          var c = localStorage.getItem("_c");
          if (typeof(c)!=="undefined" && c!==null && c!=="null") {  
              this.$http({
                  method:'post',
                  url:this.$hostname+'/getclientqueue',
                  data: {
                      ClientID: c,
                      SessionID: localStorage.getItem("_s"),
                      SessionLong: localStorage.getItem("_r"),                    
                  }
              }).then(r=> {
                  if (r.status===200 && r.data.status===200) {
                      for(var x=0; x<r.data.message.length; x++) {
                          this.$notify({
                              id: r.data.message[x].ClientQueueID,
                              group: 'main',
                              duration: -1,
                              title: 'Notification',
                              text: r.data.message[x].Message
                          });
                      }
                  }
              });
          }
      }
  },
  mounted() {
       this.pollNotifications();
       var self=this;
       window.setTimeout(function() {
          self.pollNotifications();
       },300000);
  }
}
</script>
