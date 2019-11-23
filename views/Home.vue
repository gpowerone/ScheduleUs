<template>
    <div class="moduleWrapper">
        <div class='loadingImg'  v-show="loading===null">
                <img src="@/assets/loading.gif" />
        </div>
        <div v-show="loading!==null">
            <div class="videowindow">Video Goes Here</div>
            <h1 class="textcenter mt-2">What is Schedule Us?</h1>
            <div class="mt-2 textcenter">
                Schedule Us is an app for scheduling events with your friends, family, co-workers, and others.
            </div>
            <div class="mt-2 layout row">
                <div class="flex xs6 textcenter">
                    <button class="schdusButton" @click="goToRegister()" style="width:100px;">Get Started</button>
                </div>
                <div class="flex xs6 textcenter">
                    <button class="schdusButton" @click="goToAuth()" style="width:100px;">Sign-In</button>
                </div>
            </div>
            <h4 class="mt-4 textcenter">Key Features</h4>
             <div class="mt-2 layout row">
                <div class="flex xs2 textcenter mt-2">
                    <v-icon color="#a80cba">star</v-icon>
                </div>
                <div class="flex xs9">
                    Event coordination is done via text message (email optional), with easy options to reply for those attending
                </div>
             </div>
             <div class="mt-3 layout row">
                <div class="flex xs2 textcenter mt-2">
                    <v-icon color="#a80cba">star</v-icon>
                </div>
                <div class="flex xs9">
                    Invite others using your phone contacts, no need to remember email addresses or phone numbers (app version)
                </div>
             </div>
             <div class="mt-3 layout row">
                <div class="flex xs2 textcenter mt-2">
                    <v-icon color="#a80cba">star</v-icon>
                </div>
                <div class="flex xs9">
                    If you do not have an agreed-upon time, Schedule Us can automatically suggest the best time using your calendar, your friends' calendars, and our AI
                </div>
             </div>
             <div class="mt-3 layout row"> 
                <div class="flex xs2 textcenter mt-2">
                    <v-icon color="#a80cba">star</v-icon>
                </div>
                <div class="flex xs9">
                     Our location finder lets you find and populate the best location for your event right within the app, without the need to search elsewhere
                </div>
             </div>
             <div class="mt-3 layout row">
                <div class="flex xs2 textcenter mt-2">
                    <v-icon color="#a80cba">star</v-icon>
                </div>
                <div class="flex xs9">
                    You do not need to choose a picture invitation, set up a poll, or be pre-existing friends with anyone on social media to use the app
                </div>
             </div>
            <div class="mt-3 layout row">
                <div class="flex xs2 textcenter mt-2">
                    <v-icon color="#a80cba">star</v-icon>
                </div>
                <div class="flex xs9">        
                    Your friends can ask to reschedule the event at a different time or place and the system will handle that automatically (premium only)   
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            loading: false
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