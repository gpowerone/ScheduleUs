<template>
    <div class="moduleWrapper">
        <h1>Google Calendar</h1>
        <div v-show="formStep===0" class="mt-2">Loading...</div>
        <div v-show="formStep===1" class="mt-2">Thank you for integrating Google Calendar!</div>
        <div v-show="formStep===2" class="mt-2">An error occurred, please try integrating again</div>
        <div  class="mt-2"><button @click="goToMyAccount()">Return to My Account</button></div>
    </div>
</template>

<script>
export default {
    name: "GoogleCalendar",
    methods: {
        goToMyAccount: function() {
            this.$router.push("myaccount");
        }
    },
    data() {
        return {
            formStep: 0
        }
    },
    mounted() {

        var c=null;  
        try {
             c=this.$route.query.code;
         }
         catch(e) {
         }

         if (c!==null) {
            this.$http({
                method:'post',
                url:this.$hostname+'/addcalendar',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),    
                    CalendarType:0,
                    Code: c                         
                }
            }).then(r=>{
                if (r.status===200 && r.data.status===200) {
                    this.formStep=1;
                }
                else {
                    this.formStep=2;
                }
            })
        }
    }
}
</script>