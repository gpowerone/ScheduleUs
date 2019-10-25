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
            <h1>Schedule It!</h1>
            <p>You must log in to create events</p>
            <p>
                <button @click="goToLogin()">Log In</button>&nbsp;&nbsp;
                <button @click="goToCreateAccount()" class="schdusButton" >Register</button>
            </p>
        </div>

        <div id='limitreached' v-show='formStep === -9'>
             <h1>Schedule It!</h1>
             <p>You have reached the limit of events that you may schedule or re-schedule this month (3 for free accounts, 30 for premium accounts).</p>
             <p>To schedule more events, please purchase Premium or Pro access</p>
             <p><button @click="goToPremium()">Purchase</button></p>
        </div>

        <modal name="groupModal" width="300" height="200">
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
                        <button @click="doSaveGroup()">Save Group</button>
                    </div>
                    <div class="flex xs6 textright">
                        <button @click="proceedStepThree()">No, Continue</button>
                    </div>
                </div>
            </div>
        </modal>

        <div id='eventStepOne' v-show='formStep === 0'>
            
            <h1>Schedule It!</h1>

            <div>

                <div class='fieldwell xs-12 topEvent'>
                    <label>Name of Event or Activity</label><br />
                    <input type='text' v-model="evname" class='textfield' :class='evnamefe' />
                </div>

                <div class='fieldwell xs-12 mtp-10'>
                    <label>Your Name</label><br />
                    <input type='text' v-model="cliname" class='textfield' :class='clinamefe' />
                </div>
                
                <div class='fieldwell xs-12 mtp-10'>
                    <label>Location</label>
                    <div class="layout row">
                        <div class="flex xs6 spfield textleft" @click="goLocationFinder()">
                            <v-icon>location_on</v-icon>&nbsp;<span>Find a Location</span>
                        </div>
                        <div class="flex xs6 spfield textright" v-show="loggedin===true" @click="useHomeAddress()">                           
                            <v-icon>home</v-icon> <span>Use Home Address</span>
                        </div>
                    </div>
                    <div class='mt-1'>
                        <label>Name of Location (e.g., Jenn's Home)</label><br />
                        <input type='text' class='textfield' v-model="evlocation" :class='evlocationfe' />
                    </div>
                    <div class='mt-1 fieldwell'>
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
            
    
            <div class='buttonwell mt-4 textright'>
                <button @click='goStepTwo'><span>Tell Us Who&rsquo;s Going</span> <v-icon color="#FFF">arrow_forward</v-icon></button>
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
                                   <div class='layout row btop p4' @click="editGuest(item)">
                                        <div class='flex xs2 pl2 relative'>
                                            <div v-if="item.photo!==null">
                                                <div class="vertical-center">
                                                    <img :src="item.photo" class="imgcircle" alt="photo" width="30" height="30" />
                                                </div>
                                            </div>
                                            <div v-if="item.photo===null">
                                                 <avatar class="vertical-center" size="30" :username="item.gname"></avatar>
                                            </div>
                                        </div>
                                        <div class='flex xs10 textleft fieldwell indented1 spfield'>
                                            {{item.gname}}
                                        </div>
                                    </div>
                                </v-list-item>
                            </template>
                        </v-list>
                    </div>
                </div>

                <div class='layout row mt-3'>
                    <div class='flex xs6 textleft'>
                        <button @click='goStepOne'><v-icon color="#FFF">arrow_back</v-icon><span>Back</span></button>
                    </div>

                    <div class='flex xs6 textright'>
                        <button @click='goStepThree'><span>Pick a Time</span><v-icon color="#FFF">arrow_forward</v-icon></button>
                    </div>
                </div>
      
        </div>

        <div id='eventStepThree' v-show='formStep === 2'>
           <h1>Pick a Date and Time</h1>
           
          
            <div class="fieldwell mt-3">
               <label>How long is this event:</label><br />
                <select class="textfield" v-model="evlength">
                    <option value="">---Pick a Length---</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1 hour and a half</option>
                    <option value="120">2 hours</option>
                    <option value="150">2 and a half hours</option>
                    <option value="180">3 hours</option>
                    <option value="240">4 hours</option>
                    <option value="300">5 hours</option>
                    <option value="360">6 hours</option>
                    <option value="420">7 hours</option>
                    <option value="480">8 hours</option>
                    <option value="i">More than one day</option>
                </select>
           </div>

           <div v-show="evlength!=='i'">
                <div class="fieldwell mt-3">
                    Pick a date and time or use Pick for Us to let Schedule Us choose the best date and time based upon who you've invited
                </div>
                    <div class="fieldwell mt-1 textright">
                    <button class='schdusButton' @click='pickForUs'>Pick for Us!</button>
                </div>
           </div>

           <div v-show="evlength==='i'" class="fieldwell mt-3">
                Pick a date and time for the event to start
           </div>

           <div class="fieldwell mt-3">
               <label>Date:</label>
               <datetime format="MM-DD-YYYY" v-model="evday"></datetime>
           </div>
           <div class="fieldwell mt-3">
               <label>Time:</label>
               <datetime format="h:i" v-model="evtime" ></datetime>
           </div>

           <div v-show="evlength==='i'">
               <div class="fieldwell mt-3">
                    Pick a date and time for the event to end  
               </div>
               <div class="fieldwell mt-3">
                    <label>End Date:</label>
                    <datetime format="MM-DD-YYYY" v-model="endevday"></datetime>
                </div>
                <div class="fieldwell mt-3">
                    <label>End Time:</label>
                    <datetime format="h:i" v-model="endevtime" ></datetime>
                </div>
           </div>
                  

            <div class="fieldwell mt-3">
               <label>Remind Attendees:</label><br />
                <select class="textfield" v-model="remindertime">
                    <option value="yes">1 day before</option>
                    <option value="no">No reminder</option>
                </select>
           </div>

        
            <div class='layout row mt-4'>
                <div class='flex xs6 textleft'>
                    <button @click='goStepTwo'><v-icon color="#FFF">arrow_back</v-icon><span>Back</span></button>
                </div>

                 <div class='flex xs6 textright'>
                     <button @click='goStepFour'><span>Finalize It!</span><v-icon color="#FFF">arrow_forward</v-icon></button>
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
               <div class="mt-2" v-show="loggedin===true">
                   <toggle-button width="35" height="16" v-model="willattend"/> I Will Attend
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
               <div class='mt-2' v-show="isPremium===true||isPro===true">
                   <toggle-button width="35" height="16" v-model="eventrecurring"/> Schedule Event Multiple Times
               </div>
               <div v-show="eventrecurring===true">

               </div>
              
                <div class='layout row mt-4'>
                    <div class='flex xs6 textleft'>
                        <button @click='goStepThree'><v-icon color="#FFF">arrow_back</v-icon><span>Back</span></button>
                    </div>

                    <div class='flex xs6 textright'>
                        <button @click='scheduleIt' :disabled="sschit" class='schdusButton'><span>Schedule It! </span><v-icon color="#FFF">event</v-icon></button>
                    </div>
                </div>
 
            </div>
         </div>

        <div class='manualaddguest mt-2 p2' v-show="formStep === 3">

            <div v-show="guesterror!==''" class="errorBox">
                {{guesterror}}
            </div>

            <h1>Add Attendee</h1>

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
                <div class='flex xs4 textleft'>
                    <button @click="closeManualAddGuest" class="tanButton">Cancel</button>
                </div>
                <div class='flex xs4'>
                    <div class='textcenter' v-show="guesteditmode!==null">
                        <button @click="removeGuest" class="redButton">Remove</button>
                    </div>
                </div>
                <div class='flex xs4 textright'>
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
                                                <img :src="item.hasimage" class="imgcircle" alt="photo" width="30" height="30" />
                                            </div>
                                        </div>
                                        <div v-if="item.hasimage===null">
                                                <avatar class="vertical-center" :username="item.cname" size="30"></avatar>
                                        </div>
                                    </div>
                                    <div class='flex xs10 textleft fieldwell indented1 spfield'>
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
        

        <div class='pickforus' v-show="formStep === 6">
             <pickforus></pickforus>
        </div>

        <div v-show="formStep === 7">
             <locationfinder ref="lf"></locationfinder>
        </div>

        <div v-show="formStep === 8">
              Your event has been created You should receive a confirmation text shortly. 
        </div>

    </div>
</template>

<style scoped>
.guestlist, .manualaddguest {
    border:1px solid #777;
    border-radius:6px;
    color:#777;
}
</style>


<script>
import Avatar from 'vue-avatar'
import datetime from 'vuejs-datetimepicker'
import pickforus from "@/components/PickForUs"
import locationfinder from "@/components/LocationFinder"
import groupmanager from "@/components/GroupManager"
import {utilities} from '../mixins/utilities'
import { EventBus } from '../bus';

export default {
    components: {datetime,Avatar,pickforus,locationfinder,groupmanager},
    mixins: [utilities],
    data: function() {
        return {
            formStep: -2,
            fromGroup: false,
            cliname: "",
            clinamefe: "",
            clidetails: null,
            contacts: [],
            evdescription:"",
            evname: "",
            evnamefe: "",        
            csearch: "",
            errorMessage: null,
            endevday:null,
            endevtime:null,
            evstreet: "",
            evcity: "",
            evcityfe: "",
            evlength:"",
            evlocation:"",
            evlocationfe:"",
            evstate: "",
            evzip: "",   
            evday:null,
            evtime:null,
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
            isCordova: (typeof window.cordova !== "undefined"),
            isPremium: false,
            isPro: false,
            newgroupname:null,
            okMessage: null,
            loggedin: false,
            sschit:false,
            remindertime: "yes",
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

            if (this.guesteditmode===null) {
                this.guests.push({
                    gid: this.$uuid.v1(),     
                    gname: this.guestname,
                    gphone: this.guestphone,
                    gemail: this.guestemail,
                    greq: false,
                    photo: null
                });
            }
            else {
                this.guesteditmode.gname=this.guestname;
                this.guesteditmode.gphone=this.guestphone;
                this.guesteditmode.gemail=this.guestemail;
                this.guesteditmode.gid=this.gid;
            }

            this.guesterror=""; 
            this.guestname=""; 
            this.guestphone="";
            this.guestemail=""; 
            this.formStep=1;
            this.$forceUpdate();
        },
        closeContacts: function() {
            this.formStep=1;
            this.$forceUpdate();
        },
        closeLocationFinder: function() {
            this.formStep=0;
            this.$forceUpdate();
        },
        closeManualAddGuest: function() {
            this.formStep=1;
            this.$forceUpdate();
        },
        closePickForUs: function() {
            this.formStep=2;
            this.$forceUpdate();
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
        },
        dateChanged: function() {
            var dao = new Date(this.makeDate(this.evday,this.evtime));
            var diff = dao.getTime()-new Date().getTime();
            var hours = Math.round(diff/(1000*60*60))

            if (hours>=25) {
                this.remindertime="yes";
            }
            else {
                this.remindertime="no"; 
            }


            this.$forceUpdate();
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
            this.guestname=item.gname;
            this.guestphone=item.gphone==="Not Specified"?"":item.gphone;
            this.guestemail=item.gemail==="Not Specified"?"":item.gemail;
            this.formStep=3;
            this.$forceUpdate();
        },   
        fillFromGroup: function(items) {
           
            for(var x=0; x<items.Clients.length; x++) {
                this.guests.push({    
                    gid: this.$uuid.v1(),               
                    gname: items.Clients[x].Name,
                    gphone: items.Clients[x].PhoneNumber,
                    gemail: items.Clients[x].EmailAddress,
                    photo: null,
                    greq: false
                });
            }
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
                    this.formStep=2;
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
            }
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
        pickForUs: function() {
            if (this.evlength==="") {
                this.errorMessage="Please choose a length for your event before using Pick for Us";
            }
            else {
                this.errorMessage=null;
                this.formStep=6;
            }
        },
        removeGuest: function() {
            for(var x=0; x<this.guests.length; x++) {
                if (this.guests[x].gid===this.guesteditmode.gid) {
                    this.guests.splice(x,1);
                }
            }
            this.formStep=1;
            this.$forceUpdate();
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
                            photo: this.contacts[x].hasimage,
                            greq: false
                        });
                    }
                }
            }
            
            this.contacts=[];
            this.visiblehidecontacts=[];
            this.formStep=1;
            this.$forceUpdate();
        },
        scheduleIt: function() {

             this.errorMessage=null; 

             if (this.evdescription.length>1024) {
                 this.errorMessage="The event description cannot be longer than 1024 characters"
                 return;
             }

             this.sschit=true;

             this.$http({
                method:'post',
                url:this.$hostname+'/createevent',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    EventName: this.evname,
                    ClientName: this.cliname,
                    EndDate: this.evlength==="i"?(this.makeDate(this.endevday,this.endevtime)):null,
                    EventDate: this.makeDate(this.evday,this.evtime),
                    EventLength: this.evlength,
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
                    ReminderTime: this.remindertime,
                    MustApproveDiffTime: this.guestsrescheduleperm,
                    MustApproveDiffLocation: this.guestschangelocationperm,
                    UTCOffset: new Date().getTimezoneOffset(),
                    WillAttend: this.willattend,
                    YourName: this.cliname
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.errorMessage=null;
                        if (this.loggedin===true) {
                            if (r.data.message==="OK") {
                                this.$router.push("/dashboard");
                            }
                            else {
                                this.$router.push("/events"+r.data.message);
                            }
                        }
                        else {
                            this.sschit=false;
                            this.formStep=8;
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
        },
        selectContact: function(item) {
            item.isselected=!item.isselected;
            this.$forceUpdate();
        },
        setPickForUs: function(t) {
             this.evday=t.date;
             this.evtime=this.parseTime(t.time);
             this.formStep=2;
             this.$forceUpdate();
        },
        turnOnManualAddGuest: function() {
             this.formStep=3;
        },
        turnOnGroupAddGuest: function() {
             this.$refs.gmanager.addFromGroup();
             this.formStep=9; 
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

            if (this.evstreet.length<1 || this.evlocation.length>255) {
                this.errorMessage="Street address is invalid";
                this.evstreetfe="errorHighlight";
                return false;
            }

            if (this.evcity.length<1 || this.evcity.length>64) {
                this.errorMessage="City is invalid";
                this.evcityfe="errorHighlight";
                return false;
            }
          

            return true;
        },
        verifyStepThree: function() {
            if (this.evlength==="") {
                this.errorMessage="Event length is required";
                return false;
            }

            if (this.evday===null || this.evday==="") {
                this.errorMessage="Event date is required";
                return false;
            }

            if (this.evtime===null || this.evtime==="") {
                this.errorMessage="Event time is required";
                return false;
            }

            // Correct users who do dumb stuff with dates
            var dao = new Date(this.makeDate(this.evday,this.evtime)); 
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

            if (this.evlength==='i') {

                if (this.endevday===null || this.endevday==="") {
                    this.errorMessage="End event date is required";
                    return false;
                }

                if (this.endevtime===null || this.endevtime==="") {
                    this.errorMessage="End event time is required";
                    return false;
                }

                var edao = new Date(this.makeDate(this.endevday,this.endevtime));
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

                    if (this.isPremium===false && this.isPro===false) {
                         if (this.clidetails.EventCount>=3) {
                             this.formStep=-9;
                         }
                    }
                    else if (this.isPro===false && this.isPremium===true) {
                         if (this.clidetails.EventCount>=30) {
                             this.formStep=-9;
                         }
                    }
                }
                else {
                    this.formStep=-1;
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
        evday(value) {
            if (value!==null && value!=="") {
                this.dateChanged();
            }
        },
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