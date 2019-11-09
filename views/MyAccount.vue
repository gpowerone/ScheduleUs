<template>
  <div class="moduleWrapper">

     <div  class='loadingImg'  v-show="loading===true">
                <img src="@/assets/loading.gif" />
        </div>
    <div v-show="loading===false">

        <div class='errorBox' v-show='errorMessage!==null'>
            {{ errorMessage }}
        </div>

        <div class='okBox' v-show='isOK!==null'>
            {{isOK}}
        </div>

        <modal name="deleteModal" width=300 height=200>
            <div class='paddedField'>
                <div>
                    Are you ABSOLUTELY SURE you want to delete your account? 
                </div>
                <div class='mt-2'>
                    <button class='mr-2' @click="closeDeleteModal()">No</button>
                    <button class='redButton' :disabled="btndelete" @click="proceedDeleteAccount()">Delete Account</button>
                </div>
            </div>
        </modal>

        <modal name="verifyPassword" width="300" height="200">
            <div class='paddedField'>
                <div class="layout row mt-2">
                    <div class="flex xs12 mt-1">
                        Enter your password to verify this change
                    </div>            
                    
                </div>
                <div class="layout row mt-2">
                    <div class="flex xs8">
                        <input type="password" v-model="vpass" class="textfield" />
                    </div>
                </div>
                <div class="layout row mt-3">
                    <div class="flex xs12">
                        <button :disabled="btnverifypass" @click="doPasswordCallback()">Continue</button>
                    </div>
                </div>
            </div>
        </modal>

        <h1>My Account</h1>
        <v-collapse-group :onlyOneActive="true">
            <v-collapse-wrapper @onStatusChange="acc1s" ref="acc1" v-show="accounttype===0">
                <div class="accheader" v-collapse-toggle>
                    <v-icon>{{ acc1i }}</v-icon> <span>Your Name</span>
                </div>
                <div class="acccontent" v-collapse-content>
                    <div>
                        If you enter your name here then you will not need to enter it when creating a new event
                    </div>
                    <div class="layout row mt-2">
                        <div class="flex xs4 mt-1">
                            First
                        </div>          
                        <div class="flex xs8 fieldwell">
                            <input type="text" v-model="firstName" class="textfield" />
                        </div>
                    </div>
                
                    <div class="layout row mt-2">
                        <div class="flex xs4 mt-1">
                            Last
                        </div>            
                        <div class="flex xs8 fieldwell">
                            <input type="text" v-model="lastName" class="textfield" />
                        </div>
                    </div>
                    <div class="layout row mt-3">
                        <div class="flex xs12">
                            <button @click="doSaveName()" :disabled="btnsavename">Save</button>
                        </div>
                    </div>
                </div>
            </v-collapse-wrapper>
            <v-collapse-wrapper @onStatusChange="acc2s" ref="acc2">
                <div class="accheader" v-collapse-toggle>
                    <v-icon>{{ acc2i }}</v-icon> <span>Address</span>
                </div>
                <div class="acccontent" v-collapse-content>
                    <div>
                        Populate event address fields with your home address easily
                    </div>
                    <div class="layout row mt-2">
                        <div class="flex xs4 mt-1">
                            Street
                        </div>          
                        <div class="flex xs8 fieldwell">
                            <input type="text" v-model="address" class="textfield" />
                        </div>
                    </div>              
                    <div class="layout row mt-2">
                        <div class="flex xs4 mt-1">
                            City
                        </div>            
                        <div class="flex xs8 fieldwell">
                            <input type="text" v-model="city" class="textfield" />
                        </div>
                    </div>
                    <div class="layout row mt-2">
                        <div class="flex xs4 mt-1">
                            State
                        </div>            
                        <div class="flex xs8 fieldwell">
                            <select v-model="state" class="textfield">
                                    <option value="--">-Choose-</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </select>				
                        </div>
                    </div>
                    <div class="layout row mt-2">
                        <div class="flex xs4 mt-1">
                            Postal Code
                        </div>            
                        <div class="flex xs8 fieldwell">
                            <input type="text" v-model="postalcode" class="textfield" />
                        </div>
                    </div>
                    <div class="layout row mt-3">
                        <div class="flex xs12">
                            <button @click="doSaveAddress()" :disabled="btnsaveaddress">Save</button>
                        </div>
                    </div>
                </div>
            </v-collapse-wrapper>
            <v-collapse-wrapper @onStatusChange="acc6s"  ref="acc6" v-show="accounttype===0">
                <div class="accheader" v-collapse-toggle>
                    <v-icon>{{ acc6i }}</v-icon> <span>Email Address</span>
                </div>
                <div class="acccontent" v-collapse-content>
                    <div>
                        Add an email address to login and optionally receive event notices via email
                    </div>
                    <div class="layout row mt-3">
                        <div class="flex xs12 fieldwell">
                            <input type="text" v-model="email" class="textfield" />
                        </div>
                    </div>
                    <div class="layout row mt-3">
                        <div class="flex xs12">
                            <button @click="doSaveEmail()" :disabled="btnemail">Save</button>
                        </div>
                    </div>
                </div>
            </v-collapse-wrapper>
            <v-collapse-wrapper @onStatusChange="acc3s"  ref="acc3">
                <div class="accheader" v-collapse-toggle>
                    <v-icon>{{ acc3i }}</v-icon> <span>Integrate Calendars</span>
                </div>
                <div class="acccontent" v-collapse-content>
                    <div>
                        Integrate your calendars to help Schedule Us avoid conflicts when scheduling you
                    </div>
                    <div class="mt-2 layout row" @click="doCalendarGoogle()" style="cursor:pointer;">
                        <div class="flex xs3 textcenter">
                             <img src="@/assets/Google.png" alt="Google" />
                        </div>
                        <div class="flex xs9 fieldwell boldchoice mt-1">
                             Google<br />
                             Calendar
                        </div>
                    </div>
                </div>
            </v-collapse-wrapper>
            <v-collapse-wrapper @onStatusChange="acc4s"  ref="acc4" v-show="accounttype===0">
                <div class="accheader" v-collapse-toggle>
                    <v-icon>{{ acc4i }}</v-icon> <span>Change Password</span>
                </div>
                <div class="acccontent" v-collapse-content>
                    <div class="layout row mt-2">
                        <div class="flex xs4 mt-1">
                            Old Password
                        </div>          
                        <div class="flex xs8 fieldwell">
                            <input type="password" v-model="cpassold" class="textfield" />
                        </div>
                    </div>
                    <div class="layout row mt-2">
                        <div class="flex xs4 mt-1">
                            New Password
                        </div>           
                        <div class="flex xs8 fieldwell">
                            <input type="password" v-model="cpassnew" class="textfield" />
                        </div>
                    </div>
                    <div class="layout row mt-2">
                        <div class="flex xs4 mt-1">
                            Retype
                        </div>            
                        <div class="flex xs8 fieldwell">
                            <input type="password" v-model="cpassrnew" class="textfield" />
                        </div>
                    </div>
                    <div class="layout row mt-3">
                        <div class="flex xs12">
                            <button @click="doChangePassword()" :disabled="btnchangepassword">Save</button>
                        </div>
                    </div>
                </div>
            </v-collapse-wrapper>
            <v-collapse-wrapper @onStatusChange="acc7s"  ref="acc7">
                <div class="accheader" v-collapse-toggle>
                    <v-icon>{{ acc7i }}</v-icon> <span>Change Phone Number</span>
                </div>
                <div class="acccontent" v-collapse-content>
                    <div>
                        Change the phone number on your account (you will need to verify the new number)
                    </div>
                    <div class="layout row mt-3">
                        <div class="flex xs12 fieldwell">
                            <input type="text" v-model="phone" class="textfield" />
                        </div>
                    </div>
                    <div class="layout row mt-3">
                        <div class="flex xs12">
                            <button @click="doSavePhone()" :disabled="btnchangephone">Save</button>
                        </div>
                    </div>
                </div>
            </v-collapse-wrapper>

            <v-collapse-wrapper @onStatusChange="acc8s"  ref="acc8">
                <div class="accheader" v-collapse-toggle>
                    <v-icon>{{ acc8i }}</v-icon> <span>Subscription Status</span>
                </div>
                <div class="acccontent" v-collapse-content>
                    <div v-show="ispro===true">
                        <div>
                            You are currently a Pro subscriber
                        </div>
                        <div class="mt-2">
                            <button class="redButton">Cancel</button>
                        </div>
                    </div>
                    <div v-show="ispremium===true">
                          <div>
                            You are currently a Premium subscriber
                        </div>
                        <div class="mt-2 layout row">
                            <div class="flex xs6 textleft">
                                <button class="redButton">Cancel</button>
                            </div>
                            <div class="flex xs6 textright">
                                <button class="schdusButton">Upgrade to Pro</button>
                            </div>
                        </div>
                    </div>
                    <div v-show="ispremium===false&&ispro===false">
                        <div>
                            You are not currently subscribed
                        </div>
                        <div class='mt-2'>
                            <button class="schdusButton" @click="doPremium()">Get a Premium Subscription!</button>
                        </div>
                    </div>
                </div>
            </v-collapse-wrapper>

             <v-collapse-wrapper @onStatusChange="acc9s"  ref="acc9">
                <div class="accheader" v-collapse-toggle>
                    <v-icon>{{ acc9i }}</v-icon> <span>Order History</span>
                </div>
                <div class="acccontent" v-collapse-content>

                </div>
            </v-collapse-wrapper>

            <v-collapse-wrapper  @onStatusChange="acc5s" ref="acc5">
                <div class="accheader" v-collapse-toggle>
                    <v-icon>{{ acc5i }}</v-icon> <span>Delete Account</span>
                </div>
                <div class="acccontent" v-collapse-content>
                    <div>
                        Are you sure you wish to delete your account?
                    </div>
                    <div class='mt-2'> 
                        WARNING: this will automatically cancel any scheduled events that were created with this account. Attendees will be notified
                        of the cancellation. You will not be removed from other events which you are currently participating in. 
                    </div>
                    <div class="layout row mt-3">
                        <div class="flex xs12">
                            <button class="redButton" @click="doDeleteAccount()">Delete My Account</button>
                        </div>
                    </div>
                </div>
            </v-collapse-wrapper>
        </v-collapse-group>
     </div>
  </div>
</template>

<script>
import {utilities} from '../mixins/utilities'
import { copyFileSync } from 'fs';

export default {
    name: "myaccount",
    mixins: [utilities],
    data() {
        return {
            acc1i: "expand_less",
            acc2i: "expand_less",
            acc3i: "expand_less",
            acc4i: "expand_less",
            acc5i: "expand_less",
            acc6i: "expand_less",
            acc7i: "expand_less",
            acc8i: "expand_less",
            acc9i: "expand_less",
            accounttype: 0,
            btnchangepassword:false,
            btnchangephone:false,
            btndelete:false,
            btnemail:false,
            btnsaveaddress:false,
            btnsavename:false,
            btnverifypass:false,
            address: "",
            city: "",
            state: "",
            postalcode:"",
            errorMessage: null,
            firstName: "",
            ispro: false,
            ispremium: false,
            isOK: null,
            lastName: "",
            loading: true,
            phone: "",
            email: "",
            pcallback: null,
            vpass: "",
            cpassnew: "",
            cpassrnew: "",
            cpassold: "",
            items: undefined,
            api: undefined,
            authorized: false
        }
    },
    methods: {
        acc1s: function() {

            if (this.acc1i==="expand_more") {
                this.acc1i="expand_less";
            }
            else {
                this.acc1i="expand_more";
            }
        },
        acc2s: function() {

            if (this.acc2i==="expand_more") {
                this.acc2i="expand_less";
            }
            else {
                this.acc2i="expand_more";
            }
        },
        acc3s: function() {

            if (this.acc3i==="expand_more") {
                this.acc3i="expand_less";
            }
            else {
                this.acc3i="expand_more";
            }
        },
        acc4s: function() {

            if (this.acc4i==="expand_more") {
                this.acc4i="expand_less";
            }
            else {
                this.acc4i="expand_more";
            }
        },
        acc5s: function() {

            if (this.acc5i==="expand_more") {
                this.acc5i="expand_less";
            }
            else {
                this.acc5i="expand_more";
            }
        }, 
        acc6s: function() {

            if (this.acc6i==="expand_more") {
                this.acc6i="expand_less";
            }
            else {
                this.acc6i="expand_more";
            }
        },
        acc7s: function() {

            if (this.acc7i==="expand_more") {
                this.acc7i="expand_less";
            }
            else {
                this.acc7i="expand_more";
            }
        },
        acc8s: function() {

            if (this.acc8i==="expand_more") {
                this.acc8i="expand_less";
            }
            else {
                this.acc8i="expand_more";
            }
        },
        acc9s: function() {

            if (this.acc9i==="expand_more") {
                this.acc9i="expand_less";
            }
            else {
                this.acc9i="expand_more";
            }
        },
        closeDeleteModal: function() {
            this.$modal.hide("deleteModal");
        },
        doDeleteAccount: function() {
            this.$modal.show("deleteModal");
        },
        doError: function(msg) {   
            this.errorMessage=msg; 
            this.$forceUpdate();         
        },
        doCalendarGoogle: function() { 
            window.open("https://accounts.google.com/o/oauth2/auth?access_type=offline&prompt=consent&client_id=801199894294-iei4roo6p67hitq9sc2tat5ft24qfakt.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/calendar.readonly%20https://www.googleapis.com/auth/calendar.events&response_type=code&redirect_uri=https://localhost:8000/googcalendar");
        },
        doChangePassword: function() {

            if (this.cpassnew!==this.cpassrnew) {
                return "The typed and re-typed passwords do not match"
            }

            if (this.cpassnew.length<8 || !/[a-z]/.test(this.cpassnew) || !/[0-9]/.test(this.cpassnew) || !/[A-Z]/.test(this.cpassnew)) {
                 return "Password must be at least 8 characters and contain an uppercase character, a lowercase character, and a number";
            }

            this.btnchangepassword=true;

            this.$http({
                method:'post',
                url:this.$hostname+'/changepassword',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    passwd: this.cpassold,
                    npasswd: this.cpassnew
                }
            }).then(r=> {
                this.btnchangepassword=false;
                this.cpassold="";
                this.cpassnew="";
                this.cpassrnew="";
                this.handleHTTPResult(r, "Password changed successfully");                
            })   
        },
        doPasswordCallback: function() {
            this.$modal.hide("verifyPassword")
            this.pcallback();
        },
        doPremium: function() {
            this.$router.push("premium")
        },
        doSaveAddress: function() {

            this.btnsaveaddress=true;
            this.$http({
                method:'post',
                url:this.$hostname+'/filladdress',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    Street: this.address,
                    City: this.city,
                    State: this.state,
                    PostalCode: this.postalcode
                }
            }).then(r=> {
                this.btnsaveaddress=false;
                this.handleHTTPResult(r, "Address information saved");                
            })
        },
        doSaveEmail: function() {
            this.btnemail=true;
            this.$http({
                method:'post',
                url:this.$hostname+'/setemail',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    EmailAddress: this.email
                }
            }).then(r=> {
                this.btnemail=false;
                this.handleHTTPResult(r, "Email address saved, you will need to verify the new email address by clicking the link in the email we sent");  
            })
        },
        doSaveName: function() {
            this.btnsavename=true;
            this.$http({
                method:'post',
                url:this.$hostname+'/fillname',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    FirstName: this.firstName,
                    LastName: this.lastName
                }
            }).then(r=> {
                this.btnsavename=false;
                this.handleHTTPResult(r, "Name information changed successfully");  
                if (r.data.status===200) {
                    localStorage.setItem("_n",this.firstName+" "+this.lastName);
                }
            })
        },
        doSavePhone: function() {

            var self=this;
            this.btnchangephone=true;

            this.pcallback=function() {

                self.$http({
                    method:'post',
                    url:self.$hostname+'/changenumber',
                    data: {
                        ClientID: localStorage.getItem("_c"),
                        SessionID: localStorage.getItem("_s"),
                        SessionLong: localStorage.getItem("_r"),
                        Passwd: self.vpass,
                        PhoneNumber: self.phone
                    }
                }).then(r=> {
                    this.btnchangephone=false;
                    this.vpass="";                   
                    if (r.data.message==="OK") {
                        self.handleHTTPResult(r,"Phone number changed. You will need to verify the new number by clicking the link in the text message we sent");
                        this.$router.push("logout");
                    }
                })
            }

            this.$modal.show("verifyPassword");
        },
        formatPhone: function(ed) {
            ed=ed.splice(7, 0, "-");
            ed=ed.splice(4, 0, "-");
            return ed.splice(1, 0, "-");
        },
        handleHTTPResult: function(r,okmsg) {
            if (r.status===200) {
                if (r.data.status===200) {
                    this.isOK=okmsg;
                    this.undoError();
                    this.$forceUpdate();
                    var that=this;
                    setTimeout(function() {
                        that.isOK = null;
                    }, 3000);
                }
                else {
                    this.isOK=null;
                    this.doError(r.data.message);
                }
            }
            else {
                this.isOK=null;
                this.doError("Error contacting the backend service, check your Internet connection");
            }
        },
        proceedDeleteModal: function() {
            this.btndelete=true;
            this.$http({
                method:'post',
                url:this.$hostname+'/deleteaccount',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),                    
                }
            }).then(r=> {
                 this.btndelete=false;
                 this.$router.push("logout")
            })
        },
        undoError: function() {
            this.errorMessage=null;
            this.$forceUpdate();
        }
    },
    beforeRouteEnter (to, from, next) {

        var c = localStorage.getItem("_c");
        if (typeof(c)==="undefined" || c===null || c==="null") {         
            from();
        }
        else {
            next()
        }
    },
    mounted() {
       

        this.$http({
                method:'post',
                url:this.$hostname+'/getclient',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),                    
                }
            }).then(r=> {
                if (r.status===200 && r.data.status===200) {
                    var clidetails = JSON.parse(r.data.message);
                    this.firstName=clidetails.FirstName;
                    this.lastName=clidetails.LastName;
                    this.address=clidetails.Address;
                    this.state=clidetails.State;
                    this.city=clidetails.City;
                    this.postalcode=clidetails.PostalCode;
                    this.phone=this.formatPhone(clidetails.PhoneNumber);
                    this.email=clidetails.EmailAddress; 
                    this.accounttype=clidetails.AccountType;
                    this.ispro = clidetails.IsPro;
                    this.ispremium = clidetails.IsPremium;

                    if (this.accounttype===0) {
                         this.$refs.acc1.open();
                    }
                    else {
                         this.$refs.acc2.open();
                    }
                }
                else {
                    this.doLogoutRoutine();
                }
                this.loading=false;
            }).catch(e=> {
                this.doLogoutRoutine();
            })
    }
}
</script>
