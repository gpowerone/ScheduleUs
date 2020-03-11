<template>
    <div class="moduleWrapper">
        <div class='loadingImg'  v-show="loading===null">
                <img src="@/assets/loading.gif" />
        </div>
        <div v-show="loading!==null">
            <div class="videowindow">
                <video width="100%" src="@/assets/DemoVideo.mp4" poster="@/assets/DemoPoster.png" controls>
          
                </video>
            </div>

            <div class="layout row">
                <div class="flex xs12 lg6">
                     <div class="mt-2 textcenter" v-show="isCordova===false">
                        <a href="https://apps.apple.com/app/id1496235856"><img src="@/assets/AppStore.png" width="120"></a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="https://play.google.com/store/apps/details?id=schedule.us"><img src="@/assets/GooglePlay.png" width="120"></a>
                    </div>
                    <h1 class="textcenter mt-3">What is Schedule Us?</h1>
                    
                    <div class="mt-2 textcenter">
                        Schedule Us is an app that makes it easier to schedule dinner with friends, a group study date, a birthday party, or anything in-between
                    </div>
                    <div class="mt-2 layout row mobileOnly">
                        <div class="flex xs1 lg4">
                            &nbsp;
                        </div>
                        <div class="flex xs5 lg2 textcenter">
                            <button class="schdusButton" @click="goToRegister()" style="width:100px;">Get Started</button>
                        </div>
                        <div class="flex xs5 lg2 textcenter">
                            <button class="schdusButton" @click="goToAuth()" style="width:100px;">Sign-In</button>
                        </div>
                        <div class="flex xs1 lg4">
                            &nbsp;
                        </div>
                    </div>
                   
                    <h4 class="mt-4 textcenter">Key Features</h4>
                    <div class="mt-3 layout row">
                    
                        
                        <div class="flex xs2 lg1 textright">
                            <v-icon color="#a80cba">star</v-icon>&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div class="flex xs10 lg11">
                            Schedule Us will automatically pick a day and time that is available for all attendees
                        </div>
                    </div>
                    <div class="mt-3 layout row">
                    
                        
                        <div class="flex xs2 lg1 textright">
                            <v-icon color="#a80cba">star</v-icon>&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div class="flex xs10 lg11">
                            No need for polls, social media connections, or endlessly iterating dates further and further out via tiresome email or text threads
                        </div>
                    </div>
                    <div class="mt-3 layout row">
                    
                    
                        <div class="flex xs2 lg1 textright">
                            <v-icon color="#a80cba">star</v-icon>&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div class="flex xs10 lg11">
                            Invitations and replies are done primarily via text with email optional
                        </div>
                    </div>
                    <div class="mt-3 layout row"> 
                        
                        
                        <div class="flex xs2 lg1 textright">
                            <v-icon color="#a80cba">star</v-icon>&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div class="flex xs10 lg11">
                            Fully integrated contact syncing (phone application version only)
                        </div>
                    </div>
                    <div class="mt-3 layout row">
                    
                    
                        <div class="flex xs2 lg1 textright">
                            <v-icon color="#a80cba">star</v-icon>&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div class="flex xs10 lg11">
                            The built-in location finder will help you choose a new place to meet up
                        </div>
                    </div>
                </div>
                <div class="desktopOnly lg6" style="padding-top:2%;padding-left:2%;">
                    <div class="curvedBorder p2" v-show="IsLoggedIn===false">
                        <div class="layout row">
                            <div class="lg6 flex textleft boldchoice fieldwell">
                                Signup Below 
                            </div>
                            <div class="lg6 flex textright">
                                <button @click="goToAuth()">Log In</button>
                            </div>
                        </div>
                        <signupmodule ref="sM"></signupmodule>

                    </div>

                    <div class="curvedBorder p2" v-show="IsLoggedIn===true"> 
                        <contactmodule ref="cM"></contactmodule> 
                    </div>
                </div>
            </div>
            
        </div>
       
    </div>
</template>

<style>
.videowindow {
    width:100%;
    margin:0 auto;
    text-align:center;
}
</style>

<script>
import signupmodule from '@/components/SignupModule'
import contactmodule from '@/components/ContactModule'

export default {
    name: "Home",
    components: { signupmodule, contactmodule },
    data() {
        return {
            loading: false,
            IsLoggedIn: false,
            isCordova: (typeof window.cordova !== "undefined")
        }
    },
    mounted() {
        window.scrollTo(0,0);
         var c = localStorage.getItem("_c");
         if (typeof(c)!=="undefined" && c!==null && c!=="null") { 
             this.IsLoggedIn=true;
         }
    
    },
    methods:  {
        goToAuth: function() {
           var c = localStorage.getItem("_c");
           if (typeof(c)!=="undefined" && c!==null && c!=="null") {   
               this.$router.push("/dashboard");
           }
           else {
               this.$router.push("/auth");
           }
            
        },
        goToRegister: function() {
           var c = localStorage.getItem("_c");
           if (typeof(c)!=="undefined" && c!==null && c!=="null") {   
               this.$router.push("/dashboard");
           }
           else {
               this.$router.push("/signup")
           }
        }
    }
}
</script>