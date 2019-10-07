<template>
    <div class="moduleWrapper">
        <h1>Schedule Us Premium</h1>
        <div class='mt-3 fieldwell'>
            <span class='boldchoice'>Benefits</span>
            <ul>
                <li>Create up to 30 events per month</li>
                <li>Raise attendee limit to 50 people</li>
                <li>Schedule recurring events</li>
                <li>Optionally allow attendees to suggest different times or locations for your event</li>            
                <li>Past events are saved for up to 3 months</li>
                <li>Premium user flair on event pages</li>
            </ul>
        </div>
        <div class='mt-2 schdusPurple'>Cost: $3.99 per month, first 3 months paid upfront.</div>

        <h1 class="mt-5">Schedule Us Pro</h1>
        <div class='mt-3 fieldwell'>
            <span class='boldchoice'>Benefits</span>
            <ul>              
                <li>Create unlimited events</li>
                <li>Unlimited attendees for your events</li>   
                <li>Past events are saved permanently</li>
                <li>Create new events using past events as a template</li>
                <li>Pro user flair on event pages</li>
                <li>All other features of Premium</li>
            </ul>
        </div>
        <div class='mt-2 schdusPurple'>Cost: $19.99 per month, first year paid upfront.</div>

    </div>
</template>

<script>
import {utilities} from '../mixins/utilities'

export default {
    name: "Premium",
    mixins: [utilities],
    mounted() {
         var c = localStorage.getItem("_c");
        if (!(typeof(c)==="undefined" || c===null || c==="null")) {    

            this.$http({
                method:'post',
                url:this.$hostname+'/getclient',
                data: {
                    ClientID: c,
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),                    
                }
            }).then(r=> {
                if (r.status!==200 || r.data.status!==200) {
                    this.doLogoutRoutine();
                }
            }).catch(e=> {
                this.doLogoutRoutine();
            })
        }
        else {
            this.doLogoutRoutine();
        }
    }
}
</script>