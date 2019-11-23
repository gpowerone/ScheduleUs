<template>
    <div class="moduleWrapper">

        <div class='errorBox' v-show='errorMessage!==null'>
            {{ errorMessage }}
        </div>

        <modal name="getPhone" width="300" height="200" clickToClose="false">
            <div class="p2">
                <h1>Phone Number Required</h1>
                <div class="mt-2">
                    Enter your phone number to complete sign-up:
                </div>
                <div class="mt-2 fieldwell">
                    <input type="text" class="textfield" v-model="ssoPhone" />
                </div>
                <div class="mt-2 textright">
                    <button @click="doFinishSignup()">Complete Sign-Up</button>
                </div>
            </div>
        </modal>

        <div id='loginFlow' v-show="formStep===0">
            <h1>Login</h1>

            <div class="textcenter">
                <GoogleLogin class="mt-2 ib" :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure">Login with Google</GoogleLogin>
            </div>
           
    
            <div class="layout row mt-5">
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
                <div class="fieldwell flex xs12 p2">
                    <button class="fullWidth" @click="doLogin()" :disabled="status==='submitting'" >Login</button>
                </div>
            </div>
            <div class="layout row mt-2">
                 <div class="fieldwell flex xs6 p2">
                    <button @click="goToCreateAccount()" class="fullWidth blueButton" >Register</button>
                </div>
    
                <div class="fieldwell flex xs6 p2">
                    <button @click="goToAccountRecovery()" class="fullWidth blueButton">Forgot Password?</button>
                </div>
            </div>
           
           
        </div>    
        <div id='accountRecoveryFlow' v-show="formStep===1">
             <h1>Recover Your Account</h1>
          
            <div class="fieldwell mt-2">
            Enter the Phone Number associated this account:<br />
            <input type='text' id='arph' v-model="ARPhone" class='textfield' />
            </div>
            <div class="layout row mt-2">
                <div class="flex xs6 textleft">
                    <button @click="goToLogin()" class="tanButton">Return to Login</button>
                </div>
                <div class="flex xs6 textright">
                    <button @click="doAR()">Submit</button>
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
        <div id='accountRecoveryStep2' v-show="formStep===3">
             <h1>Account Recovery</h1>
             <div class="mt-2">
                 A text message with information to recover your account has been sent.
             </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../bus';
import GoogleLogin from 'vue-google-login';

export default {
    name: "Auth",
    components: {GoogleLogin},
    data() {
        return {
            ARPhone: "",
            Phone:"",
            Passwd:"",
            formStep: 0,
            errorMessage: null,
            status:"",
            clientID: null,
            ssoPhone: null,
            textResent: 0,
            gU: null,
            params: {
                    client_id: "801199894294-ph8llsbfnu6lovla7ed46mq0rvk9rbnm.apps.googleusercontent.com"
            },
            renderParams: {
                    width: 210,
                    height: 40,
                    longtitle: true
            }
        }
    },
    methods: {
        doAR: function() {

            this.errorMessage=null;

            if (this.ARPhone.length===0) {
                this.errorMessage="Phone number is required";
                return;
            }

            this.$http({
                method:'post',
                url:this.$hostname+'/accountrecovery',
                data: {
                    PhoneNumber: this.ARPhone             
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.formStep=3;
                        this.$forceUpdate();
                    }
                    else {
                         this.errorMessage=r.data.message;
                    }
                }
                else {
                    this.errorMessage="An internet connection error occurred. Please check your connection";
                }
            })
        },
        doFinishSignup: function() {
            var phoneVerification = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
            if (!phoneVerification.test(this.ssoPhone)) {
                 this.errorMessage="Invalid phone number";
                 return;
            }

            if (this.gU!==null) {
                this.$http({
                    method:'post',
                    url:this.$hostname+'/verifygooglogin',
                    data: {
                        Token: this.gU.Zi.id_token,
                        Phone: this.ssoPhone,
                        EmailAddress: this.gU.w3.U3
                    }
                }).then(r=> {       
                    this.$modal.hide("getPhone");
                    if (r.status===200) {
                        if (r.data.status===200 && r.data.message==="OK") {                          
                            this.formStep=2;                                        
                        }
                        else {
                            this.errorMessage=r.data.message;
                        }
                    }
                    else {
                        this.errorMessage="Error contacting backend service";
                    }
                });
            }
        },
        doLogin: function() {
            if (this.Phone.length===0 || this.Passwd.length===0) {
                this.errorMessage="Invalid username or password";                
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
                        this.$router.push('dashboard');
                    }
                    else {
                        if (r.data.message.length===36) {
                            this.clientID=r.data.message;
                            this.errorMessage=null;
                            this.formStep=2;
                        }
                        else {
                            this.errorMessage=r.data.message;
                         
                        }
                    }
                }
                else {
                    this.errorMessage="Error connecting to Schedule Us service, please try again";
                }

                this.status="";
            });
        },
        fbLogin: function(r) {
            console.log(r);
        },
        goToAccountRecovery: function() {
            this.formStep=1;
             this.errorMessage=null;
        },
        goToCreateAccount: function() {
            this.$router.push('signup');
        },
        goToLogin: function() {
            this.formStep=0;
            this.errorMessage=null;
        },
        onFailure: function() {
            this.errorMessage="Error contacting backend service";
        },
        onSuccess: function(googleUser) {

            this.errorMessage=null; 
            this.gU=googleUser;
    
            this.$http({
                method:'post',
                url:this.$hostname+'/verifygooglogin',
                data: {
                    Token: googleUser.Zi.id_token,
                    Phone: null,
                    EmailAddress: googleUser.w3.U3
                }
            }).then(r=> {       
                if (r.status===200) {
                    if (r.data.status===200) {
                        if (r.data.message==="NEEDPHONE") {
                            this.$modal.show("getPhone");
                        }
                        else if (r.data.message.length===36) {
                            // Do verification
                            this.formStep=2;
                            this.clientID=r.data.message;
                        }
                        else {
                           
                            var s = JSON.parse(r.data.message);
                            localStorage.setItem("_c",s.ClientID);
                            localStorage.setItem("_s",s.SessionID);
                            localStorage.setItem("_r",s.SessionLong);
                            localStorage.setItem("_n",s.UserName);
                            EventBus.$emit("MenuUpdateEvent");
                            EventBus.$emit("AvatarUpdateEvent");
                            this.$router.push('dashboard');
                            
                        }
                    }
                    else {
                        this.errorMessage=r.data.message;
                    }
                }
                else {
                    this.errorMessage="Error contacting backend service";
                }
            });
           
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
                    this.errorMessage=null;
                }
                else {
                    this.errorMessage=r.data.message;
                }
            })
        }
    }
}
</script>