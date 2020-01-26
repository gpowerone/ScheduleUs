<template>
    <div class="moduleWrapper">

        <div class='errorBox' v-show='errorMessage!==null'>
            {{ errorMessage }}
        </div>

        <h1 class="valign">Schedule Us Free</h1>
        <div class="mt-2 fieldwell">
        <ul>
            <li>Create up to 3 events per month</li>
            <li>Events may not have more than 15 attendees</li>
            <li>Past events are not saved</li>
        </ul>
        </div>

        <h1 class="valign mt-4">Schedule Us Premium&nbsp;&nbsp;<img src="@/assets/SilverCrown.png" width="36" /></h1>
        <div class='mt-2 fieldwell'>
            <span class='boldchoice'>Benefits</span>
            <ul>
                <li>Create up to 30 events per month</li>
                <li>Raise attendee limit to 50 people per event</li>
                <li>Optionally allow attendees to suggest different times or locations for your event</li>         
                <li>Past events are saved for up to 3 months</li>
                <li>Premium user flair on event pages</li>
            </ul>
        </div>
        <div class='mt-2 schdusPurple' v-show="ispro===false&&ispremium===false">Cost: $3.99 per month, first 90 days paid upfront.</div>
        <div class='mt-2' v-show="ispro===false&&ispremium===false"><button @click="doPremiumPlan()" class="schdusButton">Subscribe!</button></div>
        <div class='mt-2 schdusPurple' v-show="ispremium===true">You are currently a Premium member. To manage your account please click on the Subscriptions tab on the My Account page. Charges will appear as SCHEDULE US on your Credit Card Statement.</div>


        <h1 class="mt-4 valign">Schedule Us Pro&nbsp;&nbsp;<img src="@/assets/GoldCrown.png" width="36" /></h1>
        <div class='mt-2 fieldwell'>
            <span class='boldchoice'>Benefits</span>
            <ul>              
                <li>Create unlimited events</li>
                <li>Unlimited attendees allowed per event</li>   
                <li>Past events are saved permanently</li>
                <li>Pro user flair on event pages</li>
                <li>All other features of Premium</li>
            </ul>
        </div>
        <div class='mt-2 schdusPurple' v-show="ispro===false">Cost: $9.99 per month, first 90 days paid upfront.</div>
        <div class='mt-2' v-show="ispro===false"><button @click="doProPlan()" class="schdusButton">Subscribe!</button></div>
         <div class='mt-2 schdusPurple' v-show="ispro===true">You are currently a Pro member. To manage your account please click on the Subscriptions tab on the My Account page. Charges will appear as SCHEDULE US on your Credit Card Statement.</div>

    </div>
</template>

<script>
import {utilities} from '../mixins/utilities'

export default {
    name: "Premium",
    mixins: [utilities],
    data() {
        return {
            errorMessage:null,
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
                var stripe = Stripe("pk_live_Bm8pOGfNNY45N1qPF6Quavnt005lhlnLUS");
           
                stripe.redirectToCheckout({
                    sessionId: r.data.sessionId
                }).then(function(result) {
                    console.log(result);
                });
            });
        },
        doPremiumPlan: function() {
            this.doPlan("plan_GSkdU2M4uopeO2");
        },
        doProPlan: function() {
            this.doPlan("plan_GSkenZwDUSheRL");
        }
    },
    mounted() {
        window.scrollTo(0,0);
       
        var cli = JSON.parse(localStorage.getItem("clidetails"));

        this.ispro=cli.IsPro;
        this.ispremium=cli.IsPremium;
       
        localStorage.setItem("clidetails",null);

        if (typeof(window.StripeLoaded)==="undefined") {
            window.StripeLoaded=true;
            let stripeJS = document.createElement('script')
            stripeJS.setAttribute('src', 'https://js.stripe.com/v3/')
            document.head.appendChild(stripeJS)
        }
    }
}
</script>