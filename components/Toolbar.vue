<template>
  <div>
    <div>
    <v-navigation-drawer v-model="drawer" app>
      <myContentDrawer />
    </v-navigation-drawer>

    <v-toolbar clipped-left flat app>
      <v-toolbar-side-icon  @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <avatar :size="36" :username="uname" v-show="loggedIn===true"></avatar>
      <v-spacer></v-spacer>
      <v-toolbar-title class="mt-2" @click="goHome"><img src="@/assets/ScheduleUsWeb.png" width="150" alt="Schedule Us Logo" /></v-toolbar-title>
    </v-toolbar>
   
    <modal name="picture-uploader" width=300 height=400>
        test
    </modal>
   
    </div>
   
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
import myContentDrawer from "@/components/Drawer"
import { EventBus } from '../bus';

export default {
  name: "Toolbar",
  components: {myContentDrawer, Avatar},
  data: function() {
    return {
      loggedIn: false,
      drawer: false,
      uname: ""
    }
  },
  mounted: function () {
    document.addEventListener("toggleDrawer", this.toggleDrawer);
    this.updateAvatar();

    EventBus.$on("AvatarUpdateEvent", () => {
         this.updateAvatar();
    })
  },
  beforeDestroy: function () {
    document.removeEventListener("toggleDrawer", this.toggleDrawer);
  },
  methods: {
    toggleDrawer (){
      this.drawer = !this.drawer;
    },
    goHome (){
      window.location.hash = "/";
    },
    pictureUploader() {
       this.$modal.show('picture-uploader');
    },
    updateAvatar() {

        var c = localStorage.getItem("_c");
        if (typeof(c)==="undefined" || c===null || c==="null") {          
            this.loggedIn=false;
        }
        else {
          this.uname=localStorage.getItem("_n");
          this.loggedIn=true;
        }
    }
  }
}
</script>
