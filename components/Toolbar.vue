<template>
  <div>
    <div>
    <v-navigation-drawer v-model="drawer" app>
      <myContentDrawer />
    </v-navigation-drawer>

    <v-toolbar clipped-left flat app>
      <v-toolbar-side-icon  @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-avatar size="36px" v-show="loggedIn===true"><img @click="pictureUploader()" v-bind:src="this.imgsrc" width="36" height="36" alt="User Avatar" /></v-avatar>
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
import myContentDrawer from "@/components/Drawer"
import { EventBus } from '../bus';

export default {
  name: "Toolbar",
  components: {myContentDrawer},
  data: function() {
    return {
      loggedIn: false,
      drawer: false,
      imgsrc: "http://schedus-images.s3-website.us-east-2.amazonaws.com/avatar_generic.png"
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
          this.imgsrc="http://schedus-avatars.s3-website.us-east-2.amazonaws.com/"+c+".png";
          this.loggedIn=true;
        }
    }
  }
}
</script>
