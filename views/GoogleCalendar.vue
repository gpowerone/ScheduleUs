<template>
    <div class="moduleWrapper">
        <h1>Google Calendar</h1>
        <p>Thank you for integrating Google Calendar!</p>
        <p><button @click="goToMyAccount()">Return to My Account</button>
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
            })
        }
    }
}
</script>