<template>
    <div class="moduleWrapper">
        <div class='loadingImg'  v-show="loading===null">
                <img src="@/assets/loading.gif" />
        </div>
        <div v-show="loading!==null">
            <h1>What is Schedule Us?</h1>
            <div class="mt-2">
                Schedule Us schedules events with your friends, family, co-workers, and others.
            </div>
            <h4 class="mt-4">What makes it different?</h4>
             <div class="mt-2">
                <ul>
                    <li>If you do not have a good time for your event, Schedule Us can pick the best time using your calendar, your friend's calendars, and our AI</li>
                    <li>Schedule Us can be set to schedule events automatically on a recurring basis (for example: once a month)</li>
                    <li>Our location finder lets you find the best location for your event right within the app</li>  
                    <li>Event coordination is done primarily by text message, with easy options to accept and reply for those attending</li>
                    <li>You do not need to choose a picture invitation or set up a poll</li>
                    <li>Your friends can suggest different times and locations for your event and the system will re-schedule the event if there is a majority vote (this is a premium feature)</li>
                </ul>
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
   
}
</script>