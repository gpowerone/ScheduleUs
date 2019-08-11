<template>
    <div class="moduleWrapper">

        <div class='errorBox' v-show='isError===1'>
            {{ errorMessage }}
        </div>

        <div id='loginFlow' v-show="formStep===0">
            <h1>Login</h1>

            <p><button @click="goToCreateAccount()" class="linkbtn">Register here</button> for an account</p>
            <div class="layout row mt-3">
                <div class="fieldwell flex xs12">
                    Phone Number or Email Address:<br />
                    <input type='text' id='user' v-model="Phone" class='textfield' />
                </div>
            </div>
            <div class="layout row mt-2">
                <div class="fieldwell flex xs12">
                    Password:<br />
                    <input type='password' id='pass' v-model="Passwd" class='textfield' />
                </div>
            </div>
            <div class="layout row mt-2">
                <div class="fieldwell flex xs12">
                    <button class="fullWidth" @click="doLogin()" :disabled="status==='submitting'" >Login</button>
                </div>
            </div>
              <div class="layout row mt-2">
                <div class="fieldwell flex xs12">
                    <button @click="goToAccountRecovery()" class="fullWidth textcenter linkbtn">Forgot your password?</button>
                </div>
            </div>
        </div>    
        <div id='accountRecoveryFlow' v-show="formStep===1">
             <h1>Recover Your Account</h1>
              <p><button @click="goToLogin()" class="linkbtn">Return to Login</button></p>
               <div class="layout row mt-3">
                <div class="fieldwell flex xs12">
                    Enter the Phone Number associated this account:<br />
                    <input type='text' id='arph' v-model="ARPhone" class='textfield' />
                </div>
            </div>
        </div>
        <div id='accountVerificationFlow' v-show="formStep===2">
             <h1>Verification Required</h1>
             <p>Your account has not been verified. Click on the link in the text message we sent to your phone number in order to verify your account</p>
             <p v-show="textResent===0"><button @click="resendTextMessage()" :disabled="status==='submitting'">Resend Text Message</button></p>
             <div v-show="textResent===1">
                 <p>
                 The text message has been resent
                 </p>
                 <p><button @click="goToLogin()" class="linkbtn">Return to Login</button></p>               
             </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../bus';

export default {
    name: "Auth",
    data() {
        return {
            ARPhone: "",
            Phone:"",
            Passwd:"",
            formStep: 0,
            errorMessage: '',
            isError: 0,
            status:"",
            clientID: null,
            textResent: 0
        }
    },
    methods: {
        doError: function(msg) {   
            this.errorMessage=msg;
            this.isError=1;  
            this.$forceUpdate();         
        },
        doLogin: function() {
            if (this.Phone.length===0 || this.Passwd.length===0) {
                this.doError("Invalid username or password");                
                return;
            }

            this.status="submitting";

            this.$http({
                method:'post',
                url:this.$hostname+'/login',
                data: {
                    Phone:this.Phone,
                    Passwd:this.Passwd
                }
            }).then(r=> {            
                if (r.status===200) {
                    if (r.data.status===200) {
                        localStorage.setItem("_c",r.data.message.ClientID);
                        localStorage.setItem("_s",r.data.message.SessionID);
                        localStorage.setItem("_r", r.data.message.SessionLong);
                        localStorage.setItem("_n",r.data.message.UserName);
                        EventBus.$emit("MenuUpdateEvent");
                        EventBus.$emit("AvatarUpdateEvent");
                        this.$router.push('myaccount');
                    }
                    else {
                        if (r.data.message.length===36) {
                            this.clientID=r.data.message;
                            this.undoError();
                            this.formStep=2;
                        }
                        else {
                            this.doError(r.data.message);
                         
                        }
                    }
                }
                else {
                    this.doError("Error connecting to Schedule Us service, please try again")
                }

                this.status="";
            });
        },
        goToAccountRecovery: function() {
            this.formStep=1;
            this.undoError();
        },
        goToCreateAccount: function() {
            this.$router.push('signup');
        },
        goToLogin: function() {
            this.formStep=0;
            this.undoError();
        },
        mounted() {
            console.log("kled jumps on his fucking horse");
        },
        resendTextMessage: function() {

            this.status='submitting';

            this.$http({
                method:'post',
                url:this.$hostname+'/resendtext',
                data: {
                    ClientID: this.clientID
                }
            }).then(r=> {                
                this.status='';
                if (r.data.message==="OK") {
                    this.textResent=1;
                    this.undoError();
                }
                else {
                    this.doError(r.data.message);
                }
            })
        },
        undoError: function() {
            this.isError=0;
            this.errorMessage="";
            this.$forceUpdate();
        },
    }
}
</script>