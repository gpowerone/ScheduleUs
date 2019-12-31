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

         <modal name="cancelSubscriptionModal" width=300 height=200>
            <div class='paddedField'>
                <div>
                    Are you ABSOLUTELY SURE you want to cancel your subscription? 
                </div>
                <div class='mt-2'>
                    <button class='mr-2' @click="closeCancelSubscription()">No</button>
                    <button class='redButton' @click="proceedCancelSubscription()">Yes, Do It</button>
                </div>
            </div>
        </modal>

        <modal name="cancelSubscriptionComplete" width=300 height=150>
            <div class='paddedField'>
                <div>
                    Your subscription has been cancelled. You will retain upgraded access until {{nextsubdate}}
                </div>
                <div class="mt-2">
                    <button @click="closeSubscriptionComplete()">Close</button>
                </div>
            </div>
        </modal>

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
                    <div class="mt-2 layout row" tabindex="0" @click="doCalendarGoogle()" style="cursor:pointer;border:1px solid #777;border-radius:5px;width:150px;padding-top:2px;">
                        <div class="flex xs5 textcenter">
                             <img src="@/assets/Google.png" alt="Google" />
                        </div>
                        <div class="flex xs7 fieldwell boldchoice mt-1">
                             Google<br />
                             Calendar
                        </div>
                    </div>
                </div>
            </v-collapse-wrapper>

            <v-collapse-wrapper @onStatusChange="acc10s"  ref="acc3">
                <div class="accheader" v-collapse-toggle>
                    <v-icon>{{ acc10i }}</v-icon> <span>Manage Groups</span>
                </div>
                <div class="acccontent" v-collapse-content>
                    <groupmanager v-bind:passheaders="false" ref="gM"></groupmanager>
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
                    <div v-show="nextsubdate!==null">
                         Next Billing Date: {{nextsubdate}}
                    </div>
                    <div v-show="nextsubdate!==null" class="mt-2">
                        <button @click="updateSubscription()">Update Subscription</button>
                    </div>
                    <div class="mt-2"  v-show="ispro===true&&nextsubdate!==null">
                        <div>
                            You are currently a Pro subscriber
                        </div>
                        <div class="mt-2">
                            <button class="redButton" @click="cancelSubscription()">Cancel</button>
                        </div>
                    </div>
                    <div class="mt-2"  v-show="ispremium===true&&nextsubdate!==null">
                          <div>
                            You are currently a Premium subscriber
                        </div>
                        <div class="mt-2 layout row">
                            <div class="flex xs6 textleft">
                                <button class="redButton" @click="cancelSubscription()">Cancel</button>
                            </div>
                            <div class="flex xs6 textright">
                                <button class="schdusButton" @click="goToPrePro()">Upgrade to Pro</button>
                            </div>
                        </div>
                    </div>
                    <div class="mt-2" v-show="(ispremium===true||ispro===true)&&nextsubdate===null">
                        Could not get next billing date, this subscription may have already been cancelled
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
                    <v-list v-show="orderhistory.length>0" class="p2" >
                        <template v-for="(item, i) in orderhistory">
                            <v-list-item :key="i">
                                <div class='layout row mt-2'>
                                    <div class="flex xs3"  v-html="renderDate(item.OrderDate)"> </div>
                                    <div class="flex xs2">
                                        ${{item.Amount}}
                                    </div>
                                    <div class="flex xs7">
                                        {{item.Description}}
                                    </div>
                                </div>
                            </v-list-item>
                        </template>
                    </v-list>
                    <div v-show="orderhistory.length===0">
                        You have no order history
                    </div>
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
      <notifications group="mya" position="bottom center" >
  </div>
</template>

<script>
import {utilities} from '../mixins/utilities'
import groupmanager from '@/components/GroupManager'
import { copyFileSync } from 'fs';

export default {
    name: "myaccount",
    components: {groupmanager},
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
            acc10i: "expand_less",
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
            nextsubdate:null,
            phone: "",
            email: "",
            pcallback: null,
            orderhistory:[],
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
                this.doGetNextSub();
            }
        },
        acc9s: function() {

            if (this.acc9i==="expand_more") {
                this.acc9i="expand_less";
            }
            else {
                this.acc9i="expand_more";
                this.doOrderHistory();
            }
        },
        acc10s: function() {

            if (this.acc10i==="expand_more") {
                this.acc10i="expand_less";
            }
            else {
                this.acc10i="expand_more";
                this.$refs.gM.addFromGroup();
            }
        },
        cancelSubscription: function() {
            this.$modal.show("cancelSubscriptionModal");
        },
        closeCancelSubscription: function() {
            this.$modal.hide("cancelSubscriptionModal");
        },
        closeDeleteModal: function() {
            this.$modal.hide("deleteModal");
        },
        closeSubscriptionComplete: function() {
            this.$modal.hide("cancelSubscriptionComplete")
        },
        doDeleteAccount: function() {
            this.$modal.show("deleteModal");
        },
        doError: function(msg) {   
            this.errorMessage=msg; 
            this.$forceUpdate();         
        },
        doCalendarGoogle: function() { 
            window.open("https://accounts.google.com/o/oauth2/auth?access_type=offline&prompt=consent&client_id=801199894294-iei4roo6p67hitq9sc2tat5ft24qfakt.apps.googleusercontent.com&scope=https://www.googleapis.com/auth/calendar.readonly%20https://www.googleapis.com/auth/calendar.events&response_type=code&redirect_uri=https://stage.schd.us/googcalendar");
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
        doGetNextSub: function() {

            this.nextsubdate=null;
            this.$http({
                method:'post',
                url:this.$hostname+'/getnextpaymentdate',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r")
                }
             }).then(r=>{
                 if (r.status===200) {
                     if (r.data.status===200) {
                         var d = new Date(parseInt(r.data.message)*1000);
                         this.nextsubdate=d.getMonth()+1+"/"+d.getDate()+"/"+d.getFullYear();
                     } 
                 }
                
             })
        },
        doOrderHistory: function() {
             this.$http({
                method:'post',
                url:this.$hostname+'/getclientorderhistory',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r")
                }
             }).then(r=>{
                 if (r.status===200) {
                     if (r.data.status===200) {
                         this.orderhistory=r.data.message;
                     }
                     else {
                         this.errorMessage=r.data.message;
                     }
                 }
                 else {
                     this.errorMessage="There was an error contacting the backend service";
                 }
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

            if (this.accounttype===0) {
                this.$modal.show("verifyPassword");
            }
            else {
                self.vpass="";
                this.pcallback();
            }
        },
        goToPrePro: function() {
            this.$router.push("/premium");
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
        proceedCancelSubscription: function() {
             this.$modal.hide("cancelSubscriptionModal");
             this.$http({
                method:'post',
                url:this.$hostname+'/cancelsubscription',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r")                   
                }
            }).then(r=> {
                this.$modal.show("cancelSubscriptionComplete");
            })
        },
        proceedDeleteAccount: function() {
           
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
                 if (r.status===200) {
                    if (r.data.status === 200) {
                        this.btndelete=false;
                        this.$router.push("logout")
                    }
                    else {
                        this.errorMessage=r.data.message;
                        this.$modal.hide("deleteModal");
                    }
                 }
                 else {
                     this.errorMessage="Error contacting backend service";
                 }
            })
        },
        renderDate: function(dt) {
            var d = new Date(parseInt(dt));
            return d.getMonth()+1+"/"+d.getDate()+"/"+d.getFullYear();
        },
        undoError: function() {
            this.errorMessage=null;
            this.$forceUpdate();
        },
        updateSubscription: function() {
            
            this.errorMessage=null;
            this.$http({
                method:'post',
                url:this.$hostname+'/updatesubscription',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),                    
                }
            }).then(r=> {
                 if (r.status===200) {
                    var stripe = Stripe("pk_test_iwwy5i2P24b4VzmePCkvvv4h00zjnLQL6k");
                    stripe.redirectToCheckout({
                        sessionId: r.data.sessionId
                    }).then(handleResult);
                 }
                 else {
                     this.errMessage="An error occurred, please try again";
                 }
            });
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
       
        window.scrollTo(0,0);

        var upd=null;
        try {
            upd=this.$route.query.upd;
        }
        catch(e) {}

        if (upd=="1") {
            this.$notify({
                group: 'mya',
                duration: -1,
                title: 'Subscription',
                text: "Your subscription was updated successfully"
            })
        }
         if (upd=="2") {
            this.$notify({
                group: 'mya',
                duration: -1,
                title: 'Subscription',
                text: "Your subscription was not updated"
            })
        }     
        
        var clidetails = JSON.parse(localStorage.getItem("clidetails"));

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

        localStorage.setItem("clidetails",null);
        this.loading=false;
        
        if (typeof(window.StripeLoaded)==="undefined") {
            window.StripeLoaded=true;
            let stripeJS = document.createElement('script')
            stripeJS.setAttribute('src', 'https://js.stripe.com/v3/')
            document.head.appendChild(stripeJS)
        }
    }
}
</script>
