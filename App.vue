<template>
  <v-app>
    <myToolbar />
    <v-content style="padding:0px!important;">
      <v-slide-y-transition mode="out-in">
        <v-container class="dmContainer" pa-0 fluid align-content-center align-center>
          <div class="layout row dmRowContainer">
            <div class="desktopOnly toolbarMenu">
                <myContentDrawer />
                <div class="mt-5" v-show="blogentries.length>0" style="margin-left:5%;margin-right:5%;">
                    <h1 class="textcenter">Blog</h1>
                    <template v-for="(item, i) in blogentries">
                        <div :key="i" class="mt-3">
                           <div class="boldchoice">
                           {{item.title}}
                           </div>
                           <div class="textright">
                              <a :href="item.link" target="_blank" >Read -></a>
                           </div>
                         </div>
                     </template>
                </div>
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
        <div @click="closeThis(props)" class="okBox">
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
   @import 'assets/tabletStyles.css';
</style>

<script>
import myToolbar from "@/components/Toolbar"
import myFooter from "@/components/Footer"
import myContentDrawer from "@/components/Drawer"

import {utilities} from '@/mixins/utilities'

export default {
  name: 'app',
  components: {myToolbar, myFooter, myContentDrawer },
  mixins: [utilities],
  data() {
    return {
      blogentries:[]
    }
  },
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

       if (!(typeof window.cordova !== "undefined")) {
          this.$http({
                method:'post',
                url:this.$hostname+'/getfeed'
          }).then(fr=>{
               if (fr.status===200 && fr.data.status===200) {
                   var feed = JSON.parse(fr.data.message);
                   this.blogentries=feed.items;
               }
          })
       }
       else {
          var self=this;

          try  {
            universalLinks.subscribe(null, function(eventData) {
                self.$router.push({ path: eventData.path.replace("/",""), query: eventData.params});
            }); 
          }
          catch(e) {
            console.log(e);
          }
           
          const push = PushNotification.init({
              android: {},
              browser: {},
              ios: {
                  alert: 'true',
                  badge: 'false',
                  sound: 'false'
              },
              windows: {}
          });    

            
          push.on('registration', (data)=> {
              
              this.haspushed=true;
              window.deviceRegistrationId=data.registrationId;

              this.$http({
                  method:'post',
                  url:self.$hostname+'/addcm',
                  data: {
                      Token: window.deviceRegistrationId,
                      IOSorAndroid: (window.cordova.platformId==="ios"?0:1)                 
                  }
              });
              
              
          })

          push.on('notification', (data)=>{
                this.$notify({
                    id: "pushNotify",
                    group: 'main',
                    duration: -1,
                    title: 'Notification',
                    text: data.message
                });           
          })

          push.on('error', (data)=>{
              console.log("push error");
          })


          var c = localStorage.getItem("_c"); 
          if (typeof(c)!=="undefined" && c!==null && c!=="null") {  
              this.$router.push("dashboard");
          }
          
       }

      
  }
}
</script>
