<template>
    <div class="moduleWrapper">

        <div class='errorBox' v-show='errorMessage!==null'>
            {{ errorMessage }}
        </div>
        <div v-show="okMessage!==null" class="okBox">
            {{okMessage}}
        </div>

        <div id='loading' class='loadingImg' v-show='formStep === -2'>
            <img src="@/assets/loading.gif" />
        </div>
        
        <div id='cannotcreate' v-show='formStep === -1'>
            <h1>Schedule Event</h1>
            <p>You must log in to create events</p>
            <p>
                <button @click="goToLogin()">Log In</button>&nbsp;&nbsp;
                <button @click="goToCreateAccount()" class="schdusButton" >Register</button>
            </p>
        </div>

        <div id='limitreached' v-show='formStep === -9'>
             <h1>Schedule Event</h1>
             <p>You have reached the limit of events that you may schedule or re-schedule this month (3 for free accounts, 30 for premium accounts).</p>
             <p>To schedule more events, please purchase Premium or Pro access</p>
             <p><button @click="goToPremium()">Purchase</button></p>
        </div>

        <modal name="groupModal" width="300" height="400">
            <div class="p2">
                <div>
                    Do you wish to save these attendees as a new group? This will make inviting them again in the future easier :)
                </div>
                <div class="mt-2 fieldwell">
                    <label>Group Name:</label><br />
                    <input type="text" class="textfield" v-model="newgroupname" />
                </div>
                <div class="layout row mt-2">
                    <div class="flex xs6">
                        <button @click="proceedStepThree()">No, Continue</button>
                    </div>
                    <div class="flex xs6 textright">
                        <button @click="doSaveGroup()">Save Group</button>                       
                    </div>
                </div>
            </div>
        </modal>

        <modal name="doneModal" width="300" height="400">
            <div class="p2">
                <h1>All Done</h1>
                <div class="mt-2 textcenter">Now you can kick back and relax!</div>
                <div class='mt-3 textcenter'>
                    <img src="@/assets/EventCompleted.png" width="100">
                </div>
                <ul class='mt-3'>
                    <li>We are texting or emailing your attendees. No need to send them any additional messages.</li>
                    <li>You will get a message from us when everyone has responded</li>
                    <li>You can check the status of the event on the dashboard</li>
                </ul>
                <div class='mt-2 textcenter'>
                     <button class='schdusButton' @click="goToDashboard()">Go to Dashboard</button>
                </div>
            </div>
        </modal>

        <div id='eventStepOne' v-show='formStep === 0'>
            
            <h1>Schedule Event</h1>
            <div class="mt-2">
                *-required field
            </div>
            <div>

                <div class='fieldwell xs-12 mt-4'>
                    <label>Your Name*</label><br />
                    <input type='text' v-model="cliname" class='textfield' :class='clinamefe' />
                </div>

                <div class='fieldwell xs-12 mt-4'>
                    <label>What Will You Be Doing*</label><br />
                    <input type='text' v-model="evname" class='textfield' :class='evnamefe' />
                </div>

                  
                <div class='fieldwell xs-12 mt-4'>
                   
                    <div>
                        <label>Where Will It Happen*</label><br />
                        <input type='text' class='textfield' v-model="evlocation" :class='evlocationfe' />
                    </div>
                    <div class="spfield textcenter p2 schdusborder mt-2" v-show="loggedin===true" @click="goLocationFinder()">
                        <v-icon>location_on</v-icon>&nbsp;<span>Find a Location</span>
                    </div>
                    <div class="spfield textcenter p2 schdusborder mt-2" v-show="loggedin===true" @click="useHomeAddress()">                           
                        <v-icon>home</v-icon> <span>Use Home Address</span>
                    </div>

                    <div class='mt-2 fieldwell'>
                        <label>Address</label><br /> 
                        <input type='text' class='textfield' v-model="evstreet" :class='evstreetfe' />
                    </div>
                </div>
                <div class="layout row mt-2">
                    <div class='fieldwell flex xs6'>
                        <label>City:</label><br />
                        <input type='text' class='textfield' v-model="evcity" :class='evcityfe' />
                    </div>
                    <div class='fieldwell flex xs3 ml-2'>
                        <label>State:</label><br />
                        <select class="textfield" v-model="evstate">
                            <option value="--" selected>-Choose-</option>
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
                    <div class='fieldwell flex xs3 ml-2'>
                        <label>Zip:</label><br />
                        <input type='text' class='textfield' id='eventZip' v-model='evzip' />
                    </div>
                </div>

            
            </div>

            <div class="mt-3">
                <div class='layout row'>
                    <div class="flex xs12 textright">
                        <button @click='goStepTwo'><span>Tell Us Who&rsquo;s Going</span> <v-icon color="#FFF">arrow_forward</v-icon></button>
                    </div>
                </div>
            </div>
     
        </div>

        <div id='eventStepTwo' v-show='formStep === 1'>
      
                <h1>Who&rsquo;s Going?</h1>   
            
                <div class='guestlist mt-2'>
                    <div class='layout row p2'>
                        <div class='flex xs12 textleft spfield'>
                            <button class='transButton' @click='turnOnManualAddGuest'><v-icon>person_add</v-icon>&nbsp;<span>Add</span></button> 
                            &nbsp;&nbsp;
                            <button class='transButton' @click='turnOnGroupAddGuest'><v-icon>group_add</v-icon>&nbsp;<span>Add Group</span></button> 
                        </div>
                        <div class='flex xs6 textright spfield'>
                            <div v-show="isCordova === true" >
                                Add From:<button @click='loadContacts' class='transButton'><v-icon>contacts</v-icon></button>
                            </div>
                        </div>
                    </div>
                    <div class='guestlistcontents textcenter'>
                        <div v-show="guests.length===0" class="p4">
                            Invite others by clicking the buttons above!
                        </div>
                        <v-list v-show="guests.length>0">
                            <template v-for="(item, i) in guests">
                               <v-list-item :key="i">
                                   <div class='layout row btop p4'>
                                        <div class='flex xs2 pl2 relative'  @click="editGuest(item)">
                                             <div v-if="item.cphoto!==null">
                                                <div class="vertical-center">
                                                    <img :src="item.cphoto" class="imgcircle" alt="photo" width="30" height="30" />
                                                </div>
                                            </div>
                                            <div v-if="item.cphoto===null">
                                                <avatar class="vertical-center" size="50" :username="item.gname" v-show="imageloaded[i]===false"></avatar>
                                                <img v-bind:src="imageurl[i]" v-show="imageurl[i]!==null&&imageloaded[i]===true" @load="loadedImage(i)" width=50 height=50 />  
                                            </div>
                                        </div>
                                        <div class='flex xs9 textleft fieldwell indented1 spfield mt-2' @click="editGuest(item)">
                                            {{item.gname}}
                                        </div>
                                        <div class='flex xs1 mt-2'>
                                            <v-icon @click="removeGuest(item)">remove_circle_outline</v-icon>
                                        </div>
                                    </div>
                                </v-list-item>
                            </template>
                        </v-list>
                    </div>
                </div>
                <div class="mt-2 fieldwell" v-show="loggedin===true">
                   <toggle-button width="35" height="16" v-model="willattend"/> I Will Attend
                </div>

                <div class="mt-3">
                    <div class='layout row'>
                        <div class='flex xs6 textleft'>
                            <button @click='goStepOne'><v-icon color="#FFF">arrow_back</v-icon><span>Back</span></button>
                        </div>

                        <div class='flex xs6 textright'>
                            <button @click='goStepThree'><span>Pick a Time</span><v-icon color="#FFF">arrow_forward</v-icon></button>
                        </div>
                    </div>
                </div>
      
        </div>

        <div id='eventStepThree' v-show='formStep === 2'>
           <h1>Pick a Date and Time</h1>
           
            <picktime ref="pt" class="mt-2"></picktime>

  
            <div class="mt-3" v-show="buttonsenabled===true">
                <div class='layout row'>
                    <div class='flex xs6 textleft'>
                        <button @click='goStepTwo'><v-icon color="#FFF">arrow_back</v-icon><span>Back</span></button>
                    </div>

                    <div class='flex xs6 textright'>
                        <button @click='goStepFour' v-show="datepicked===true"><span>Finalize It!</span><v-icon color="#FFF">arrow_forward</v-icon></button>
                    </div>
                </div>
            </div>
        </div>

        <div class='eventStepFour' v-show="formStep === 5">
           <h1>Additional Options</h1>
           <div class='fieldwell'>
               <div class="fieldwell mt-2">
                   <label>Description of your event:</label><br />
                   <textarea rows="1" cols="1" v-model="evdescription"></textarea>
               </div>
               <div class="mt-3">
                   <label>Event Options:</label>
               </div>
               
                <div class='mt-2' v-show="isPremium===true||isPro===true">
                   <toggle-button width="35" height="16" v-model="eventrecurring"/> Automatically Schedule Again
               </div>
               <div v-show="eventrecurring===true" class="fieldwell">
                    <label>How often should it occur?</label>
                    <select v-model="recurringamt">
                        <option value="1">Every Week</option>
                        <option value="2">Every 2 Weeks</option>
                        <option value="3">Every 3 Weeks</option>
                        <option value="4">Every Month</option>
                        <option value="12">Every 3 Months</option>
                        <option value="24">Every 6 Months</option>
                        <option value="">Every Year</option>
                    </select>
               </div>

              
               <div class="mt-2">
                   <toggle-button width="35" height="16" v-model="guestlistvisible"/> Attendees List is Visible to All
               </div>
               <div v-show="guestlistvisible===true" class="indented1">
                   <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="guestscandiscuss"/> Attendees Can Discuss Event
                   </div>
                    <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="guestsseersvps"/> Attendees Can See Who is Coming
                   </div>
               </div>
               <div class='mt-2'>
                   <toggle-button width="35" height="16" v-model="guestsbringothers"/> Attendees Can Bring Others
               </div>
                <div v-show="guestsbringothers===true" class="indented1">
                   <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="guestsmustregister"/> New Attendees Must RSVP
                   </div>
                   <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="guestsbringchildren"/> Attendees May Bring Children
                   </div>
                    <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="guestsprovidesharing"/> Provide Social Share Options
                   </div>
                   <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="guestslimittotalhas"/> Set Max Attendee Limit
                   </div>
                   <div class="mt-2 indented1" v-show="guestslimittotalhas===true">
                       Limit: <input class="textfield" type="text" v-model="guestslimittotal" />
                   </div>

               </div>
               <div class='mt-2' v-show="evlength!=='i'&&(isPremium===true||isPro===true)">
                   <toggle-button width="35" height="16" v-model="guestsreschedule"/> Attendees Can Suggest a Different Time
               </div>
               <div v-show="guestsreschedule===true" class="indented1">
                   <div class="mt-2">
                      <toggle-button width="35" height="16" v-model="guestsrescheduleperm"/> I Must Approve Different Time
                    </div>
               </div>
               <div class='mt-2' v-show="isPremium===true||isPro===true">
                   <toggle-button width="35" height="16" v-model="guestschangelocation"/> Attendees Can Suggest a Different Location
               </div>
               <div v-show="guestschangelocation===true" class="indented1">
                   <div class="mt-2">
                       <toggle-button width="35" height="16" v-model="guestschangelocationperm"/> I Must Approve Different Location
                    </div>
               </div>
               <div class='mt-3'>
                     By creating an event, you agree to our <a href='/termsofservice'>Terms of Service</a> and <a href='/privacypolicy'>Privacy Policy</a>
                </div>
             
              
                <div class="mt-3">
                    <div class='layout row'>
                        <div class='flex xs6 textleft'>
                            <button @click='goStepThree'><v-icon color="#FFF">arrow_back</v-icon><span>Back</span></button>
                        </div>

                        <div class='flex xs6 textright'>
                            <button @click='scheduleIt' :disabled="sschit" class='schdusButton'><span>Schedule It! </span><v-icon color="#FFF">event</v-icon></button>
                        </div>
                    </div>
                </div>
 
            </div>
         </div>

        <div class='manualaddguest mt-2 p2' v-show="formStep === 3">

            <div v-show="guesterror!==''" class="errorBox">
                {{guesterror}}
            </div>

            <h1>Add/Edit Attendee</h1>

            <div class='fieldwell mt-2'>
                    <label>Name</label><br />
                    <input type='text' class='textfield' v-model='guestname' />
            </div>
            <div class='fieldwell mt-2'>
                    <label>Phone</label><br />
                    <input type='text' class='textfield' v-model='guestphone' />
            </div>
            <div class='fieldwell mt-2'>
                    <label>Email</label><br />
                    <input type='text' class='textfield' v-model='guestemail' />
            </div>
            <div class='layout row mt-2'>
                <div class='flex xs6 textleft'>
                    <button @click="closeManualAddGuest" class="tanButton">Cancel</button>
                </div>    
                <div class='flex xs6 textright'>
                    <button @click="addGuest" class="tanButton">Save</button>
                </div>
            </div>
        </div>
       

        <div class='loadcontacts' v-show="formStep === 4">

            <div class="manualaddguest">
                <div class="layout row p2">
                    <div class="flex xs6 textleft">
                        <button class="tanButton" @click="closeContacts">Close</button>
                    </div>
                    <div class="flex xs6 textright">
                        <button class="modifiedNormal" @click="saveContacts">Done</button>
                    </div>
                </div>
                <div v-show="contacts.length===0">
                    You don't have any contacts
                </div>
                <v-list class="nopadding" v-show="contacts.length>0">
                    <div class="fieldwell p2">
                        Search:&nbsp;&nbsp;<input class="textfield" v-model="csearch">
                    </div>
                    <template v-for="(item, i) in contacts">
                        <v-list-item :key="i" >
                            <div v-bind:class="{ selectedTile: item.isselected }" @click="selectContact(item)">
                                <div class='layout row btop p4'>
                                    <div class='flex xs2 pl2 relative'>
                                        <div v-if="item.hasimage!==null">
                                            <div class="vertical-center">
                                                <img :src="item.hasimage" class="imgcircle" alt="photo" width="50" height="50" />
                                            </div>
                                        </div>
                                        <div v-if="item.hasimage===null">
                                                <avatar class="vertical-center" :username="item.cname" size="50"></avatar>
                                        </div>
                                    </div>
                                    <div class='flex xs10 textleft fieldwell indented1 spfield mt-2'>
                                        {{item.cname}}                                      
                                    </div>
                                </div>
                            </div>
                        </v-list-item>
                    </template>
                </v-list>
            </div>
        </div>

        <div id='addFromGroup' v-show='formStep === 9'>
            <groupmanager ref="gmanager"></groupmanager> 
        </div>
         

        <div v-show="formStep === 7">
             <locationfinder ref="lf"></locationfinder>
        </div>

        <div v-show="formStep === 8">
              <button @click="goToDashboard()" class="schdusButton">Go to Dashboard</button>
        </div>

    </div>
</template>

<script>
import Avatar from 'vue-avatar'
import locationfinder from "@/components/LocationFinder"
import groupmanager from "@/components/GroupManager"
import picktime from "@/components/PickTime"
import {utilities} from '../mixins/utilities'
import { EventBus } from '../bus';

export default {
    components: {Avatar,locationfinder,groupmanager,picktime},
    mixins: [utilities],
    data: function() {
        return {
            formStep: -2,
            fromGroup: false,
            buttonsenabled: true,
            cliname: "",
            clinamefe: "",
            clidetails: null,
            contacts: [],
            evdescription:"",
            evname: "",
            evnamefe: "",        
            csearch: "",
            datepicked: false,
            errorMessage: null,
            evstreet: "",
            evcity: "",
            evcityfe: "",
            evlength:"",
            evlocation:"",
            evlocationfe:"",
            evstate: "",
            evzip: "",             
            guesteditmode:null,
            guestname: "",
            guestphone: "",
            guestemail: "",
            guesterror: "",
            guestsrescheduleperm:false,
            guestschangelocationperm:false,
            guestscandiscuss:true,
            guestsmustregister:true,
            guestsprovidesharing:false,
            guestsbringchildren:false,
            guestslimittotalhas:false,
            guestslimittotal: 8,
            guestlistvisible: true,
            guestsbringothers: false,
            guestsseersvps: true,
            guestsreschedule:false,
            guestschangelocation:false,
            eventrecurring:false,
            guests:[],          
            imageloaded:[],
            imageurl:[],  
            isCordova: (typeof window.cordova !== "undefined"),
            isPremium: false,
            isPro: false,
            newgroupname:null,
            okMessage: null,
            recurringamt: "1",
            loggedin: false,
            sschit:false,
            visiblehidecontacts:[],
            willattend:true
        }
    },

    methods: {
        addGuest: function() {
            if (this.guestname.length<1 || this.guestname.length>128) {
                this.guesterror="Guest name is required and should not be longer than 128 characters";
                return;
            }
            if (this.guestphone.length<1 && this.guestemail.length<1) {
                this.guesterror="Either guest phone number or email address are required";
                return;
            }
            if (this.guestphone.length>0 && this.verifyPhone(this.guestphone)!=="OK") {
                this.guesterror="Please enter valid phone number with area code in format NNN-NNN-NNNN";
                return;
            } 
            if (this.guestemail.length>0 && this.verifyEmail(this.guestemail)!=="OK") {
                this.guesterror="Please enter valid email address";
                return;
            }

            if (this.guestphone.length<1) {
                this.guestphone="Not Specified";
            }
            if (this.guestemail.length<1) {
                this.guestemail="Not Specified";
            }

        
            var self=this;
            this.$http({
                method:'post',                  
                url:this.$hostname+'/getbyphoneoremail',
                data: {
                    PhoneNumber: this.guestphone,
                    EmailAddress: this.guestemail 
                }
            }).then(r=> {

                var clid=this.$uuid.v1();
                var hasc = false;

                if (r.status===200 && r.data.status===200) {      
                    clid = r.data.message;
                    hasc = true;                      
                }

                if (self.guesteditmode===null) {
                    self.guests.push({
                            gid: clid,    
                            gname: self.guestname,
                            gphone: self.guestphone,
                            gemail: self.guestemail,
                            greq: false,
                            photo: hasc,
                            cphoto: null
                    });

                    self.imageloaded.push(false);

                    if (hasc) {
                        self.imageurl.push("https://avatars.schd.us/"+clid);
                    }
                    else {
                        self.imageurl.push(null);
                    }
                }
                else {
                    
                    self.guesteditmode.gname=self.guestname;
                    self.guesteditmode.gphone=self.guestphone;
                    self.guesteditmode.gemail=self.guestemail;
                    self.guesteditmode.gid=self.gid;
                    self.guesteditmode.photo=hasc;

                    self.imageurl=[];
                    self.imageloaded=[];

                    for (var x=0; x<self.guests.length; x++) {
                
                        self.imageloaded.push(false);
                        if (self.guests[x].photo) {
                            self.imageurl[x]="https://avatars.schd.us/"+self.guests[x].gid;
                        }
                        else {
                            self.imageurl[x]=null;
                        }        
                    }

                }

                self.guesterror=""; 
                self.guestname=""; 
                self.guestphone="";
                self.guestemail=""; 
                self.formStep=1;
                self.$forceUpdate();
            })
         
        },
        closeContacts: function() {
            this.formStep=1;
            this.$forceUpdate();
            window.scrollTo(0,0);
        },
        closeLocationFinder: function() {
            this.formStep=0;
            this.$forceUpdate();
            window.scrollTo(0,0);
        },
        closeManualAddGuest: function() {
            this.formStep=1;
            this.$forceUpdate();
            window.scrollTo(0,0);
        },
        compareContacts: function( a, b ) {
            if ( a.cname < b.cname ){
                return -1;
            }
            if ( a.cname > b.cname ){
                return 1;
            }
            return 0;
        },
        compareGuests: function( a, b ) {
            if ( a.guestname < b.guestname ){
                return -1;
            }
            if ( a.guestname > b.guestname ){
                return 1;
            }
            return 0;
        },
        contactFailure: function() {
            window.alert("Could not load contacts. Please check app contact permissions");
        },
        contactSuccess: function(ctcs) {
            this.contacts=[];

            for (var i=0; i<ctcs.length; i++) {

                var ctcname="Not Specified";
                var ctcemail="Not Specified";
                var ctcphone="Not Specified";
        
                ctcname = ctcs[i].name.formatted;
                 
                if (typeof(ctcs[i].emails)!=="undefined" && ctcs[i].emails.length>0) {
                    ctcemail = ctcs[i].emails[0].value;
                }
        
                if (typeof(ctcs[i].phoneNumbers)!=="undefined" && ctcs[i].phoneNumbers.length>0) {
                    for (var x=0; x<ctcs[i].phoneNumbers.length; x++) {
                        if (ctcs[i].phoneNumbers[x].type==="mobile") {
                            ctcphone = ctcs[i].phoneNumbers[0].value;
                            break;
                        }
                    }
                }
         
                var hasimage=null;
          
                if (typeof(ctcs[i].photos)!=="undefined" && ctcs[i].photos.length>0) {                    
                    hasimage=window.Ionic.WebView.convertFileSrc(ctcs[i].photos[0].value);                           
                }
            

                if (ctcname!=="Not Specified" && (ctcemail!=="Not Specified" || ctcphone!=="Not Specified"))
                {
                    this.contacts.push({
                        cname: ctcname,
                        cemail: ctcemail,
                        cphone: ctcphone,
                        hasimage: hasimage,
                        isselected: false
                    })
                }      
            } 

            this.contacts.sort(this.compareContacts);
            this.visiblehidecontacts=[];
            for(var y=0; y<this.contacts.length; y++) {
                this.visiblehidecontacts.push(this.contacts[y]);
            }

            this.formStep=4;
            this.$forceUpdate();
            window.scrollTo(0,0);
        },
       
        doSaveGroup: function() {
             if (this.newgroupname.length===0 || this.newgroupname.length>128) {
                 this.errorMessage="Group name is either too long or too short";
                 return;
             }

             var clients=[]; 
             for(var x=0; x<this.guests.length; x++) {
                 clients.push({
                     PhoneNumber: this.guests[x].gphone,
                     EmailAddress: this.guests[x].gemail,
                     Name: this.guests[x].gname
                 })
             }

             this.$http({
                method:'post',
                url:this.$hostname+'/addgroup',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    GroupName: this.newgroupname,
                    Clients: clients
                }
             }).then(r=>{
                 if (r.status===200) {
                    if (r.data.status===200) {
                        this.okMessage="Successfully saved group";
                        var self=this;
                        window.setTimeout(function() {
                            self.okMessage=null;
                        },3000)
                        this.proceedStepThree();
                    }
                    else {
                        this.errorMessage=r.data.message;
                    }
                 }
                 else {
                     this.errorMesssage="Could not connect to backend service, check your internet connection";
                 }
             })
        },
        editGuest: function(item) {
            this.guesteditmode=item;
            this.gid = item.gid;
            this.guestname=item.gname;
            this.guestphone=item.gphone==="Not Specified"?"":item.gphone;
            this.guestemail=item.gemail==="Not Specified"?"":item.gemail;
            this.formStep=3;
            this.$forceUpdate();
            window.scrollTo(0,0);
        },   
        fillFromGroup: function(items) {

            for(var x=0; x<items.Clients.length; x++) {

                var nogood=false;
                for(var q=0; q<this.guests.length; q++) {
                    if (this.guests[q].gphone!==null && this.guests[q].gphone!=="Not Specified" && this.guests[q].gphone===items.Clients[x].PhoneNumber) {
                        nogood=true;
                    }
                    if (this.guests[q].gemail!==null && this.guests[q].gemail!=="Not Specified" && this.guests[q].gemail===items.Clients[x].EmailAddress) {
                        nogood=true;
                    }
                }

                if (!nogood) {
                    this.guests.push({    
                        gid: items.Clients[x].ClientID,               
                        gname: items.Clients[x].Name,
                        gphone: items.Clients[x].PhoneNumber,
                        gemail: items.Clients[x].EmailAddress,
                        photo: null,
                        cphoto: null,
                        greq: false
                    });

                    this.imageloaded.push(false);
                    if (items.Clients[x].ClientID!==null) {
                        this.imageurl.push("https://avatars.schd.us/"+items.Clients[x].ClientID);
                    }
                    else {
                        this.imageurl.push(null);
                    }
                }
            }
            this.fromGroup=true;
            this.formStep=1;
            this.$forceUpdate();

        },
        fillLocation: function(location, address, city) {
            this.evlocation=location;
            this.evstreet=address;
            this.evcity=city;
            this.formStep=0;
            this.$forceUpdate();
        },
        formatPhone: function(ed) {
            ed=ed.splice(7, 0, "-");
            ed=ed.splice(4, 0, "-");
            return ed.splice(1, 0, "-");
        },
        goLocationFinder: function() {
            this.$refs.lf.doRender();
            this.formStep=7;
        },
        goStepOne: function() {
            this.formStep=0;
        },
        goStepTwo: function() {
            if (this.verifyStepOne()) {
                this.errorMessage=null;
                this.formStep=1;
                window.scrollTo(0,0);
            }
        },
        goStepThree: function() {
            this.errorMessage=null; 

            if (this.guests.length>0) {

                if (this.isPremium!==true && this.isPro!==true && this.guests.length>15) {
                    this.errorMessage="There is a maximum of 15 attendees";
                    return;
                }
             
                if (this.isPremium===true && this.isPro!==true && this.guests.length>50) {
                    this.errorMessage="There is a maximum of 50 attendees";
                    return;
                }

                if (this.fromGroup===false) {
                    this.$modal.show("groupModal");
                }
                else {
                    this.$refs.pt.formStep=1;
                    this.$refs.pt.showreminder=false;
                    var _guests=[];
                    for (var y=0; y<this.guests.length; y++) {
                        _guests.push(this.guests[y]);
                    }

                    if (this.willattend) {
                        var c = localStorage.getItem("_c");
                        _guests.push({
                            cid: c  
                        });
                    }

                    this.$refs.pt.setGuests(_guests);
                    this.formStep=2;
                    window.scrollTo(0,0);
                }
            }
            else {
                this.errorMessage="You must invite at least one person";
            }
        },
        goStepFour: function() {
            if (this.verifyStepThree()) {
                this.errorMessage=null;
                this.formStep=5;
                window.scrollTo(0,0);
            }
        },
        goToDashboard: function() {
            this.$router.push('dashboard');
        },
        goToLogin: function() {
            this.$router.push('auth');
        },
        goToAbout: function() {
            this.$router.push('about');
        },
        goToCreateAccount: function() {
            this.$router.push('signup');
        },
        goToPremium: function() {
            this.$router.push('premium');
        },
        loadContacts: function() {
            var options      = {};
            options.filter   = "";
            options.multiple = true;
            options.desiredFields = [navigator.contacts.fieldType.id, navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name, navigator.contacts.fieldType.phoneNumbers, navigator.contacts.fieldType.emails, navigator.contacts.fieldType.photos];
            var fields  = [navigator.contacts.fieldType.displayName];
            navigator.contacts.find(fields, this.contactSuccess, this.contactFailure, options);
        },
        loadedImage: function(i) {
            this.imageloaded[i]=true;
            this.$forceUpdate();
        },
        removeGuest: function(item) {
            for(var x=0; x<this.guests.length; x++) {
                if (this.guests[x].gid===item.gid) {
                    this.guests.splice(x,1);
                }
            }
        },
        saveContacts: function() {   
            for(var x=0; x<this.contacts.length; x++) {
                if (this.contacts[x].isselected) {

                    var pass=true;
                    for(var y=0; y<this.guests.length; y++) {
                        if (this.guests[y].gphone===this.contacts[x].cphone || this.guests[y].gemail===this.contacts[x].cemail) {
                            pass=false;
                        }
                    }

                    if (pass) {
                        this.guests.push({    
                            gid: this.$uuid.v1(),               
                            gname: this.contacts[x].cname,
                            gphone: this.contacts[x].cphone,
                            gemail: this.contacts[x].cemail,
                            cphoto: this.contacts[x].hasimage,
                            photo: false,
                            greq: false
                        });
                    }
                }
            }
            
            this.contacts=[];
            this.visiblehidecontacts=[];
            this.formStep=1;
            window.scrollTo(0,0);
            this.$forceUpdate();
        },
        scheduleIt: function() {

             this.errorMessage=null; 

             if (this.evdescription.length>1024) {
                 this.errorMessage="The event description cannot be longer than 1024 characters"
                 return;
             }

             this.sschit=true;

             var dt = this.makeDate(this.$refs.pt.evday,this.$refs.pt.evtime);

             this.$http({
                method:'post',
                url:this.$hostname+'/createevent',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    EventName: this.evname,
                    ClientName: this.cliname,
                    EndDate: this.evlength==="i"?(this.makeDate(this.$refs.pt.endevday,this.$refs.pt.endevtime)):null,
                    EventDate: dt,
                    EventLength: this.$refs.pt.evlength,
                    EventDescription: this.evdescription,
                    EventStreet: this.evstreet,
                    EventCity: this.evcity,
                    EventState: this.evstate,
                    EventZip: this.evzip,
                    GuestsCanDiscuss: this.guestscandiscuss,
                    GuestsMustRegister: this.guestsmustregister,
                    GuestLimitTotal: this.guestslimittotal,
                    GuestsProvideSharing: this.guestsprovidesharing,
                    GuestListVisible: this.guestlistvisible,
                    GuestsBringOthers: this.guestsbringothers,
                    GuestsBringChildren: this.guestsbringchildren,
                    GuestsBringPets: this.guestsbringpets,
                    GuestsSeeRSVPs: this.guestsseersvps,
                    GuestsReschedule: this.guestsreschedule,
                    GuestsChangeLocation: this.guestschangelocation,
                    EventIsRecurring: this.eventrecurring,
                    Guests: this.guests,
                    Location: this.evlocation,
                    ReminderTime: this.$refs.pt.remindertime,
                    MustApproveDiffTime: this.guestsrescheduleperm,
                    MustApproveDiffLocation: this.guestschangelocationperm,
                    UTCOffset: new Date(dt).getTimezoneOffset(),
                    WillAttend: this.willattend,
                    YourName: this.cliname
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.errorMessage=null;
                        if (this.loggedin===true) {
                            if (r.data.message==="OK") {
                                this.$modal.show("doneModal");
                                this.formStep=8;
                                window.scrollTo(0,0);
                            }
                            else {
                                this.errorMessage=r.data.message;
                            }
                        }
                        else {
                            this.sschit=false;
                            this.formStep=8;
                            window.scrollTo(0,0);
                        }
                    }
                    else {
                        this.errorMessage=r.data.message;
                        this.sschit=false;
                    }
                }
                else {
                    this.errorMessage="A network error occurred. Please check your internet connection";
                    this.sschit=false;
                }
            });
        },
        proceedStepThree: function() {
            this.$modal.hide("groupModal");
            this.formGroup=true;
            this.formStep=2;
            window.scrollTo(0,0);
        },
        selectContact: function(item) {
            item.isselected=!item.isselected;
            this.$forceUpdate();
        },
       
        turnOnManualAddGuest: function() {
             this.formStep=3;
             window.scrollTo(0,0);
        },
        turnOnGroupAddGuest: function() {
             this.$refs.gmanager.addFromGroup();
             this.formStep=9; 
             window.scrollTo(0,0);
        },
        useHomeAddress: function() {
            if (this.clidetails!==null) {
                try {
                    var firstName=this.cliname.split(' ')[0];
                    this.evlocation=firstName+"'s Home";
                }
                catch(e) {
                    this.evlocation="Home";
                }

                this.evstreet=this.clidetails.Address;
                this.evcity=this.clidetails.City;
                this.evstate=this.clidetails.State;
                this.evzip=this.clidetails.PostalCode;
                this.$forceUpdate();
            }
        },
        verifyStepOne: function() {
            this.errorMessage=null;
       
            this.evnamefe=""; 
            this.clinamefe="";
            this.evlocationfe="";
            this.evstreetfe="";
            this.evcityfe="";
      

            if (this.evname.length<1 || this.evname.length>128) {
                this.errorMessage="Event name is invalid";
                this.evnamefe="errorHighlight";
                return false;
            }

            if (this.cliname.length<1 || this.cliname.length>128) {
                this.errorMessage="Your name is invalid";
                this.clinamefe="errorHighlight";
                return false;
            }

            if (this.evlocation.length<1 || this.evlocation.length>128) {
                this.errorMessage="Location is invalid";
                this.evlocationfe="errorHighlight";
                return false;
            }

            if (this.evlocation.length>255) {
                this.errorMessage="Street address is invalid";
                this.evstreetfe="errorHighlight";
                return false;
            }

            if (this.evcity.length>64) {
                this.errorMessage="City is invalid";
                this.evcityfe="errorHighlight";
                return false;
            }
          

            return true;
        },
        verifyStepThree: function() {
  
  
            if (this.$refs.pt.evday===null || this.$refs.pt.evday==="") {
                this.errorMessage="Event date is required";
                return false;
            }

            if (this.$refs.pt.evtime===null || this.$refs.pt.evtime==="") {
                this.errorMessage="Event time is required";
                return false;
            }

            if (this.$refs.pt.evlength==="") {
                this.errorMessage="Event length is required";
                return false;
            }

            // Correct users who do dumb stuff with dates
            var dao = new Date(this.makeDate(this.$refs.pt.evday,this.$refs.pt.evtime)); 
            var diff = dao.getTime()-new Date().getTime();
            var hours = Math.round(diff/(1000*60*60))

            if (diff<0) {
                this.errorMessage="Cannot schedule dates in the past";
                return false;
            }

            if (this.remindertime==='yes' && hours<25) {
                this.errorMessage="Cannot set a reminder time for events less than 25 hours away"
                return false;
            }

            if (this.$refs.pt.evlength==='i') {

                if (this.$refs.pt.endevday===null || this.$refs.pt.endevday==="") {
                    this.errorMessage="End event date is required";
                    return false;
                }

                if (this.$refs.pt.endevtime===null || this.$refs.pt.endevtime==="") {
                    this.errorMessage="End event time is required";
                    return false;
                }

                var edao = new Date(this.makeDate(this.$refs.pt.endevday,this.$refs.pt.endevtime));
                var diff=edao.getTime()-dao.getTime();

                if (diff<0) {
                    this.errorMessage="Cannot set an end date prior to the start date";
                    return false;
                }
            }

            return true;
        }
    },
    beforeRouteLeave(to, from, next) {
        this.formStep=0;
        next();
    },
    mounted() {
        var c = localStorage.getItem("_c");
        if (!(typeof(c)==="undefined" || c===null || c==="null")) {    

            this.guestslimittotal=15;

            EventBus.$on("DoAddFromGroupEvent", (items) => {
                this.fillFromGroup(items);
            });
            EventBus.$on("CloseGroupManagerEvent", () => {
                this.formStep=1;
                window.scrollTo(0,0);
            });

            this.$http({
                method:'post',
                url:this.$hostname+'/getclient',
                data: {
                    ClientID: c,
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),                    
                }
            }).then(r=> {
                if (r.status===200 && r.data.status===200) {
                    this.clidetails = JSON.parse(r.data.message);
                    this.cliname=this.clidetails.FirstName+" "+this.clidetails.LastName;
                    this.loggedin=true;
                    this.isPremium=this.clidetails.IsPremium;
                    this.isPro=this.clidetails.IsPro;
                    this.formStep=0;
                    window.scrollTo(0,0);

                    if (this.isPremium===false && this.isPro===false) {
                         if (this.clidetails.EventCount>=3) {
                             this.formStep=-9;
                             window.scrollTo(0,0);
                         }
                    }
                    else if (this.isPro===false && this.isPremium===true) {
                         if (this.clidetails.EventCount>=30) {
                             this.formStep=-9;
                             window.scrollTo(0,0);
                         }
                    }
                }
                else {
                    this.formStep=-1;
                    window.scrollTo(0,0);
                    this.doLogoutRoutine();
                }
            }).catch(e=> {
                this.doLogoutRoutine();
            })
        }
        else {
            this.formStep=-1;
            this.doLogoutRoutine();
        }
    },
    watch: {
        csearch: function(val) {
            this.contacts=[]; 
            if (val===null || val.length===0) {     
                for(var x=0; x<this.visiblehidecontacts.length; x++) {
                     this.contacts.push(this.visiblehidecontacts[x]);                   
                }
                return;
            }
   
            for(var y=0; y<this.visiblehidecontacts.length; y++) {
                if (this.visiblehidecontacts[y].cname.toLowerCase().indexOf(val.toLowerCase())>-1 ||
                    this.visiblehidecontacts[y].cemail.toLowerCase().indexOf(val.toLowerCase())>-1 ||
                    this.visiblehidecontacts[y].cphone.toLowerCase().indexOf(val.toLowerCase())>-1) {
                    this.contacts.push(this.visiblehidecontacts[y]);
                }
            }

            this.$forceUpdate();
        }
    }
}
</script>