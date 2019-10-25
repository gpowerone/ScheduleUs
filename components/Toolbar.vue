<template>
  <div>
    <div class="mobileOnly">
        <v-navigation-drawer v-model="drawer" app>
          <myContentDrawer />
        </v-navigation-drawer>

        <v-toolbar clipped-left flat app>
          <v-toolbar-side-icon  @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <div @click="doImageUpload()">
            <avatar :size="36" :username="uname" v-show="loggedIn===true&&imageloaded===false"></avatar>
            <img v-bind:src="imageurl" v-show="imageloaded===true" @load="loaded" width=36 height=36 />
          </div>
          <v-spacer></v-spacer>
          <v-toolbar-title class="mt-2" @click="goHome"><img src="@/assets/ScheduleUsWeb.png" width="150" alt="Schedule Us Logo" /></v-toolbar-title>
        </v-toolbar>
   
    </div>
   
    <div class="desktopOnly">
        <div class="layout row toolbarDesktop">
            <div class="lg6 textleft">
                <img src="@/assets/ScheduleUs.png" width="200" alt="Schedule Us Logo" />
            </div>
            <div class="lg6 divright">
                <avatar :size="50" :username="uname" v-show="loggedIn===true"></avatar>               
            </div>
        </div>
    </div>

    <modal name="htmlUploader" width=90% height=80%>
        <div class="modalWrapper">
          <h1>Image Upload</h1>
        
          <div v-show="imageuploaded===false">
            <div class="imageUploader">
              <div v-show="image!==null">
                <img v-bind:src="image" />
              </div>
              <image-uploader
                :preview="false"
                :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                capture="environment"
                :maxHeight=100
                :maxWidth=100
                :autoRotate="true"
                outputFormat="verbose"
                @input="setImage"
              >
              <label for="fileInput" slot="upload-label">
                <figure>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <path
                      class="path1"
                      d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
                    ></path>
                  </svg>
                </figure>
                <span class="upload-caption">{{
                  hasImage ? "Replace" : "Click to upload"
                }}</span>
              </label>
              </image-uploader>
            </div>

            <div class="imageUploaderBottom textright" v-show="image!==null">
                <button @click="uploadImage()">Accept</button>
            </div>
          </div>
          <div v-show="imageuploaded===true">
              <div class="mt-2">The image was uploaded successfully</div>
              <div class="mt-2"><button @click="endUpload()">Close</button></div>
          </div>
        </div>
    </modal>

  </div>
</template>

<style scoped>
#fileInput {
  display: none;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.my-8 {
  margin-top: 4rem;
  margin-bottom: 4rem;
}
</style>


<script>
import Avatar from 'vue-avatar'
import myContentDrawer from "@/components/Drawer"
import { EventBus } from '../bus';

export default {
  name: "Toolbar",
  components: {myContentDrawer, Avatar},
  data: function() {
    return {
      image: null,
      imageloaded: false,
      imageuploaded: false,
      imageurl:null,
      hasImage: false,
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
    doImageUpload() {
        if (typeof window.cordova !== "undefined") {

        }
        else {
           this.$modal.show("htmlUploader");
        }
    },
    endUpload() {
        this.image=null;
        this.imageuploaded=false;
        this.$modal.hide("htmlUploader");
    },
    toggleDrawer (){
      this.drawer = !this.drawer;
    },
    goHome (){
      window.location.hash = "/";
    },
    loaded (){
       this.imageloaded=true;
    },
    setImage (file) {
        this.hasImage = true
        this.image = file.dataUrl;
    },
    updateAvatar() {
        var c = localStorage.getItem("_c");
        if (typeof(c)==="undefined" || c===null || c==="null") {          
            this.loggedIn=false;
            this.imageurl=null;
            this.imageloaded=false;
        }
        else {
          this.uname=localStorage.getItem("_n");
          this.loggedIn=true;
          this.imageurl="https://avatars.schd.us/"+c;
        }
    },
    uploadImage() {
        var self=this;

        this.$http({
            method:'post',
            url:this.$hostname+'/addavatar',
            data: {
               ClientID: localStorage.getItem("_c"),
               SessionID: localStorage.getItem("_s"),
               SessionLong: localStorage.getItem("_r"),
               Image: this.image.replace("data:image/png;base64,","").replace("data:image/jpeg;base64,","").replace("data:image/gif;base64,","").replace("data:image/jpg;base64,","")
            }
        }).then(r=>{
            self.imageuploaded=true;
            this.updateAvatar();
        })
    }
  }
}
</script>
