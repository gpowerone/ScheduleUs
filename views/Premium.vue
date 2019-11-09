<template>
    <div class="moduleWrapper">
        <h1 class="valign">Schedule Us Premium&nbsp;&nbsp;<img src="@/assets/SilverCrown.png" height=20 /></h1>
        <div class='mt-3 fieldwell'>
            <span class='boldchoice'>Benefits</span>
            <ul>
                <li>Create up to 30 events per month</li>
                <li>Raise attendee limit to 50 people per event</li>
                <li>Optionally allow attendees to suggest different times or locations for your event</li>         
                <li>Past events are saved for up to 3 months</li>
                <li>Premium user flair on event pages</li>
            </ul>
        </div>
        <div class='mt-2 schdusPurple' v-show="ispro===false&&ispremium===false">Cost: $3.99 per month, first 3 months paid upfront.</div>
        <div class='mt-2' v-show="ispro===false&&ispremium===false"><button @click="doPremiumPlan()" class="schdusButton">Subscribe!</button></div>
        <div class='mt-2 schdusPurple' v-show="ispremium===true">You are currently a Premium member. To manage your account please click on the Subscriptions tab on the My Account page</div>


        <h1 class="mt-5 valign">Schedule Us Pro&nbsp;&nbsp;<img src="@/assets/GoldCrown.png" height=20 /></h1>
        <div class='mt-3 fieldwell'>
            <span class='boldchoice'>Benefits</span>
            <ul>              
                <li>Create unlimited events</li>
                <li>Unlimited attendees allowed per event</li>   
                <li>Past events are saved permanently</li>
                <li>Pro user flair on event pages</li>
                <li>All other features of Premium</li>
            </ul>
        </div>
        <div class='mt-2 schdusPurple' v-show="ispro===false">Cost: $19.99 per month, first 3 months paid upfront.</div>
        <div class='mt-2' v-show="ispro===false"><button @click="doProPlan()" class="schdusButton">Subscribe!</button></div>
         <div class='mt-2 schdusPurple' v-show="ispro===true">You are currently a Pro member. To manage your account please click on the Subscriptions tab on the My Account page</div>

    </div>
</template>

<script>
import {utilities} from '../mixins/utilities'

export default {
    name: "Premium",
    mixins: [utilities],
    data() {
        return {
            ispro:false,
            ispremium:false
        }
    },
    methods: {
        doPlan: function(planID) {
            this.$http({
                method:'post',
                url:this.$hostname+'/createcheckout',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),     
                    planId: planID               
                }
            }).then(r=> {
                var stripe = Stripe("pk_test_iwwy5i2P24b4VzmePCkvvv4h00zjnLQL6k");
                 stripe.redirectToCheckout({
                    sessionId: r.data.sessionId
                }).then(handleResult);
            });
        },
        doPremiumPlan: function() {
            this.doPlan("plan_G9Hls9FqgtFjT7");
        },
        doProPlan: function() {
            this.doPlan("plan_G9HmWLmLGbPe6m");
        }
    },
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
                else {
                    var cli = JSON.parse(r.data.message);
        
                    this.ispro=cli.IsPro;
                    this.ispremium=cli.IsPremium;
                }
            }).catch(e=> {
                this.doLogoutRoutine();
            }) 
        }
        else {
            this.doLogoutRoutine();
        }

        let stripeJS = document.createElement('script')
        stripeJS.setAttribute('src', 'https://js.stripe.com/v3/')
        document.head.appendChild(stripeJS)
    }
}
</script>