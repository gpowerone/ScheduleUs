<template>
    <div class="moduleWrapper">
        <div v-show="errorMessage!==null" class="errorBox">
            {{errorMessage}}
        </div>

        <div v-show="optoutcomplete===false">
            <h1>Opt Out</h1>
            <div>
                Schedule Us is not a marketing service and will not send you promotional materials. By opting out you will no longer receive any invitations sent through
                Schedule Us. Are you sure?
            </div>
            <div class="mt-2 fieldwell">
                <label>Email Address</label><br />
                <input type='text' v-model="emailaddress" class="textfield" />
            </div>
            <div class="mt-2">
                <button @click="doOptOut()">Opt Out</button>
            </div>
        </div>
         <div v-show="optoutcomplete===true">
             You have now opted out of email communications with Schedule Us. To opt-in, create an account and associate this email address with that account
         </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            optoutcomplete: false,
            emailaddress: null,
            errorMessage: null
        }
    },
    methods: {
        doOptOut: function() {
            this.$http({
                method:'post',                  
                url:this.$hostname+'/doemailoptout',
                data: {
                    EmailAddress: this.emailaddress
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.errorMessage=null;
                        this.optoutcomplete=true;
                    }
                    else {
                        this.errorMessage="This email address cannot be opted out because it is associated with an account."
                    }
                }
                else {
                    this.errorMessage="Could not contact the backend service. Please check your connection and try again."
                }
            })
        }
    }
}
</script>