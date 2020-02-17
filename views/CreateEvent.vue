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

        <modal name="addSchdusModal" width="300" height="250">
            <div class="p2">
                <p class="textcenter">
                This feature will add phone numbers used by Schedule Us to your contacts so that messages appear from 'Schedule Us'. 
                Please note that if you already have these numbers in your contacts this feature will duplicate them. 
                </p>
                <p class="textcenter">
                    <button class='redButton' @click="cancelSchdusNumber()">Cancel</button>&nbsp;&nbsp;<button @click="addSchdusNumber()">Confirm</button>
                </p>
            </div>
        </modal>

        <modal name="addGroupModal" width="300" height="90%">
            <div class="p2" style="overflow:auto;height:100%;">
                <div class="layout row">
                    <div class="xs12 flex textright">
                        <button @click="turnOnGroupAddGuest" class="tanButton">Add/Edit Groups</button>
                    </div>
                </div>
                <div v-show="groups.length===0" class="mt-2">
                    <div>
                        You have no groups
                    </div>
                    <div class="mt-2 layout row">
                        <div class="flex xs12">
                            <button @click="closeGroupManager()">Close</button>
                        </div>                        
                    </div>
                </div>

                <div v-show="groups.length>0">
                    <v-list>
                        <template v-for="(item, i) in groups">
                            <v-list-item :key="i">
                                <div class='layout row btop p4'>   
                                    <div class='flex xs12 textleft fieldwell spfield' @click="doAddFromGroup(item)" style="pointer:cursor;">
                                        <v-icon>group</v-icon>&nbsp;&nbsp;<span>{{item.GroupName}}</span>
                                    </div>
                                    
                                </div>
                            </v-list-item>
                        </template>
                    </v-list>
                    <div class="mt-2 layout row">
                        <div class="flex xs12">
                            <button @click="closeGroupManager()">Close</button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </modal>

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
                        <button @click="proceedStepThree()" class="redButton">No, Continue</button>
                    </div>
                    <div class="flex xs6 textright">
                        <button @click="doSaveGroup()">Save Group</button>                       
                    </div>
                </div>
            </div>
        </modal>

        <modal name="doneModal" width="300" height="435">
            <div class="p2">
                <h1>All Done</h1>
                <ul style='margin-top:25px;'>
                    <li>We are texting or emailing your attendees. No need to send them any additional messages.</li>
                    <li>You will get a message from us when everyone has responded.</li>
                    <li>You can check the status of the event on the dashboard.</li>
                </ul>
                <div class='mt-2 textcenter'>
                     <button class='schdusButton' @click="goToDashboard()">Go to Dashboard</button>
                </div>
                <div class='mt-2 textcenter'>
                    <button v-show="isCordova===true"  @click='doAddSchdusModal'>Add Schedule Us # to Contacts</button>
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
                    <label>What Would You Like to Plan*</label><br />
                    <input type='text' v-model="evname" class='textfield' :class='evnamefe' />
                </div>

                  
                <div class='fieldwell xs-12 mt-4'>
                   
                    <div>
                        <label>Where Should It Happen?</label>
                    </div>
                    <div class="mt-2 layout row" v-show="loggedin===true">
                        <button class="textcenter flex xs5 lg2 blueButton"  @click="goLocationFinder()">
                            <v-icon color="#FFF">location_on</v-icon>&nbsp;<span>Find Location</span>
                        </button>
                        <div class="flex xs2 lg8">
                            &nbsp;
                        </div>
                        <button class="blueButton textcenter flex xs5 lg2"  @click="useHomeAddress()">                           
                            <v-icon color="#FFF">home</v-icon> <span>Use Home</span>
                        </button>
                    </div>

                    <div class="mt-2">
                        <label>Place Name*</label>
                        <input type='text' class='textfield' v-model="evlocation" :class='evlocationfe' />
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
                            <option value="">-Choose-</option>
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
                        <div class='flex xs8 textleft spfield'>
                            <button class='transButton' @click='turnOnManualAddGuest'><v-icon>person_add</v-icon>&nbsp;<span>Add</span></button> 
                            &nbsp;
                            <button class='transButton' @click='doAddGroupModal'><v-icon>group_add</v-icon>&nbsp;<span>Add Group</span></button> 
                        </div>
                        <div class='flex xs4 textright spfield'>
                            <div v-show="isCordova === true" >
                                <button @click='loadContacts' class='transButton'><v-icon>contacts</v-icon> <span>Contacts</span></button>
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
                                                    <img :src="item.cphoto" class="imgcircle" alt="photo" width="50" height="50" />
                                                </div>
                                            </div>
                                            <div v-if="item.cphoto===null" class="textleft">
                                                <avatar class="vertical-center" size="50" :username="item.gname" v-show="imageloaded[i]===false"></avatar>
                                                <img v-bind:src="imageurl[i]" v-show="imageurl[i]!==null&&imageloaded[i]===true" @load="loadedImage(i)" style="border-radius:50%;" width=50 height=50 />  
                                            </div>
                                        </div>
                                        <div class='flex xs9 textleft fieldwell indented1 spfield mt-2' @click="editGuest(item)">
                                            {{item.gname}}
                                        </div>
                                        <div class='flex xs1 mt-2'>
                                            <v-icon @click="removeGuest(i)">remove_circle_outline</v-icon>
                                        </div>
                                    </div>
                                </v-list-item>
                            </template>
                        </v-list>
                    </div>
                </div>
               
                <div class="mt-3 layout row" v-show="loggedin===true">
                    <div class="flex xs12 fieldwell">
                        <toggle-button width="52" height="24" v-model="willattend" /> I Will Attend
                    </div>
                  
                </div>

                <div class="mt-3">
                    <div class='layout row'>
                        <div class='flex xs6 textleft'>
                            <button @click='goStepOne' class="redButton"><v-icon color="#FFF">arrow_back</v-icon><span>Back</span></button>
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

  
            <div class="mt-5" v-show="buttonsenabled===true">
                <div class='layout row'>
                    <div class='flex xs6 textleft'>
                        <button @click='goStepTwo' class="redButton"><v-icon color="#FFF">arrow_back</v-icon><span>Back</span></button>
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
               <div class="mt-2">
                   <label>Event Options:</label>
               </div>
               
                <div class='mt-2' v-show="isPremium===true||isPro===true">
                   <toggle-button width="52" height="24" v-model="eventrecurring"/> Event Will Happen Again
               </div>
               <div v-show="eventrecurring===true" class="mt-1 fieldwell p2" style="border:1px solid #999">
                   
                    <div class="mt-2 fieldwell">
                       
                        <div class="boldchoice">
                            Will it happen:
                        </div>
                        <select v-model="freqtype" class="textfield">
                            <option value=0>--- Select ---</option>
                            <option value=1>Weekly</option>
                            <option value=2>Monthly</option> 
                        </select>

                    </div>
                    <div class="mt-2 fieldwell" v-show="freqtype>0">
                         <div class="boldchoice">
                            Happens every:
                         </div>
                         <div v-show="freqtype==1">
                            <select v-model="week_frequency" class="textfield">
                                    <option value=0>--- Select ---</option>
                                    <option value=1>1</option>
                                    <option value=2>2</option> 
                                    <option value=3>3</option> 
                            </select>   
                            <div class="boldchoice"> 
                            Week(s)
                            </div>
                         </div> 

                          <div v-show="freqtype==2">
                            <select v-model="mth_frequency" class="textfield">
                                    <option value=0>--- Select ---</option>
                                    <option value=1>1</option>
                                    <option value=2>2</option> 
                                    <option value=3>3</option> 
                                    <option value=6>6</option> 
                                    <option value=12>12</option> 
                            </select>   
                            <div class="boldchoice">
                            Month(s)
                            </div>
                         </div> 
                    </div>
                    <!--
                    <div class="mt-2" v-show="mth_frequency>0||week_frequency>0">
                          <input type="radio" v-model="exacttime" value=0 /> I know exactly when my event should happen<br />
                          <input type="radio" v-model="exacttime" value=1 /> Schedule Us should suggest the date/time for my event (a new date/time will be suggested each time the event occurs)
                    </div>
                    //-->
                    <div v-show="exacttime==0&&(mth_frequency>0||week_frequency>0)">
                        <div class="mt-2 fieldwell" v-show="mth_frequency>0">
                            <div class="boldchoice">Week of the Month:</div> 
                            <select v-model="week_month" class="textfield">
                                <option value=0>--- Select --- </option>
                                <option value=1>1</option>
                                <option value=2>2</option> 
                                <option value=3>3</option> 
                                <option value=4>4</option> 
                            </select>
                        </div>
                        <div class="mt-2 fieldwell">
                            <div class="boldchoice">Day of the Week:</div> 
                            <select v-model="day_week" class="textfield">
                                <option value=0>--- Select --- </option>
                                <option value=1>Monday</option>
                                <option value=2>Tuesday</option> 
                                <option value=3>Wednesday</option> 
                                <option value=4>Thursday</option> 
                                <option value=5>Friday</option> 
                                <option value=6>Saturday</option> 
                                <option value=7>Sunday</option>
                            </select>
                        </div>
                        <div class="mt-2 fieldwell textfield">
                            <div class="boldchoice">Time of Day:</div>
                            <datetime format="h:i" v-model="recur_time" ></datetime>
                        </div>
                    </div>
               </div>

              
               <div class="mt-2">
                   <toggle-button width="52" height="24" v-model="guestlistvisible"/> Attendees List is Visible to All
               </div>
               <div v-show="guestlistvisible===true" class="indented1">
                   <div class="mt-2">
                        <toggle-button width="52" height="24" v-model="guestscandiscuss"/> Attendees Can Discuss Event
                   </div>
                    <div class="mt-2">
                        <toggle-button width="52" height="24" v-model="guestsseersvps"/> Attendees Can See Who is Coming
                   </div>
               </div>
               <div class='mt-2'>
                   <toggle-button width="52" height="24" v-model="guestsbringothers"/> Attendees Can Bring Others
               </div>
                <div v-show="guestsbringothers===true" class="indented1">
                   <div class="mt-2">
                        <toggle-button width="52" height="24" v-model="guestsmustregister"/> New Attendees Must RSVP
                   </div>
                   <div class="mt-2">
                        <toggle-button width="52" height="24" v-model="guestsbringchildren"/> Attendees May Bring Children
                   </div>
                    <div class="mt-2">
                        <toggle-button width="52" height="24" v-model="guestsprovidesharing"/> Provide Social Share Options
                   </div>
                   <div class="mt-2">
                        <toggle-button width="52" height="24" v-model="guestslimittotalhas"/> Set Max Attendee Limit
                   </div>
                   <div class="mt-2 indented1" v-show="guestslimittotalhas===true">
                       Limit: <input class="textfield" type="text" v-model="guestslimittotal" />
                   </div>

               </div>
               <div class='mt-2' v-show="evlength!=='i'&&(isPremium===true||isPro===true)">
                   <toggle-button width="52" height="24" v-model="guestsreschedule"/> Attendees Can Suggest a Different Time
               </div>
               <div v-show="guestsreschedule===true" class="indented1">
                   <div class="mt-2">
                      <toggle-button width="52" height="24" v-model="guestsrescheduleperm"/> I Must Approve Different Time
                    </div>
               </div>
               <div class='mt-2' v-show="isPremium===true||isPro===true">
                   <toggle-button width="52" height="24" v-model="guestschangelocation"/> Attendees Can Suggest a Different Location
               </div>
               <div v-show="guestschangelocation===true" class="indented1">
                   <div class="mt-2">
                       <toggle-button width="52" height="24" v-model="guestschangelocationperm"/> I Must Approve Different Location
                    </div>
               </div>
              
             
              
                <div class="mt-3">
                    <div class='layout row'>
                        <div class='flex xs6 textleft'>
                            <button @click='goStepThree' class="redButton"><v-icon color="#FFF">arrow_back</v-icon><span>Back</span></button>
                        </div>

                        <div class='flex xs6 textright'>
                            <button @click='scheduleIt' :disabled="sschit" class='schdusButton'><span>Schedule It! </span><v-icon color="#FFF">event</v-icon></button>
                        </div>
                    </div>
                </div>
 
            </div>
         </div>

        <div class='manualaddguest mt-2 p2' v-show="formStep === 3">
            <addeditattendee ref="aeAttendee"></addeditattendee>
        </div>
       

        <div class='loadcontacts' v-show="formStep === 4">
            <contactmodule ref="contactModule"></contactmodule>
          
        </div>

        <div id='addFromGroup' v-show='formStep === 9'>
            <groupmanager v-bind:passheaders="true" ref="gmanager"></groupmanager> 
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
import addeditattendee from "@/components/Attendee"
import datetime from "vuejs-datetimepicker"
import contactmodule from '@/components/Contacts'
import {utilities} from '../mixins/utilities'
import { EventBus } from '../bus';

export default {
    components: {Avatar,locationfinder,groupmanager,picktime,addeditattendee,datetime,contactmodule},
    mixins: [utilities],
    data: function() {
        return {
            formStep: 0,
            fromGroup: false,
            buttonsenabled: true,
            cliname: "",
            clinamefe: "",
            clidetails: null,  
            evname: "",
            evnamefe: "",        
            datepicked: false,
            day_week: 0,
            errorMessage: null,
            exacttime: 0,
            evstreet: "",
            evcity: "",
            evcityfe: "",
            evdescription:"",
            evlength:"",
            evlocation:"",
            evlocationfe:"",
            evstate: "",
            evzip: "",     
            freqtype: 0,
            groups:[],        
            guesteditmode:null,       
            guestsrescheduleperm:false,
            guestschangelocationperm:false,
            guestscandiscuss:true,
            guestsmustregister:true,
            guestsprovidesharing:false,
            guestsbringchildren:false,
            guestslimittotalhas:false,
            guestslimittotal: 50,
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
            recurringpackage: [],
            recur_time:"",
            loggedin: false,
            mth_frequency:0,
            sschit:false,
            week_frequency: 0,
            week_month: 0,
            willattend:true
        }
    },

    methods: {
        addEditGuest: function() {
            
        
            var self=this;
            this.$http({
                method:'post',                  
                url:this.$hostname+'/getbyphoneoremail',
                data: {
                    PhoneNumber: this.$refs.aeAttendee.guestphone,
                    EmailAddress: this.$refs.aeAttendee.guestemail 
                }
            }).then(r=> {

                var clid=this.$uuid.v1();
                var hasc = false;

                if (r.status===200 && r.data.status===200) {      
                    clid = r.data.message;
                    hasc = true;                      
                }

                if (self.guesteditmode===null) {

                    var nogood=false;
                    for (var x=0; x<self.guests.length; x++) {
                        if (self.guests[x].gid===clid) {
                            nogood=true;
                        }
                    }

                    if (!nogood) {
                        self.guests.push({
                                gid: clid,    
                                gname: self.$refs.aeAttendee.guestname,
                                gphone: self.$refs.aeAttendee.guestphone,
                                gemail: self.$refs.aeAttendee.guestemail,
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
                         this.errorMessage="You cannot add the same user twice";
                    }
                }
                else {
                    
                    self.guesteditmode.gname=self.$refs.aeAttendee.guestname;
                    self.guesteditmode.gphone=self.$refs.aeAttendee.guestphone;
                    self.guesteditmode.gemail=self.$refs.aeAttendee.guestemail;
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

                self.formStep=1;
                self.$forceUpdate();
            })
         
        },
        addSchdusNumber: function() {
            var sC = navigator.contacts.create({"displayName": "Schedule Us"});
            sC.phoneNumbers=[];
            sC.phoneNumbers.push(new ContactField('home','203-635-4194',true))

            var sC1 = navigator.contacts.create({"displayName": "Schedule Us-1"});
            sC1.phoneNumbers=[];
            sC1.phoneNumbers.push(new ContactField('home','928-238-5545',false))


            var sC2 = navigator.contacts.create({"displayName": "Schedule Us-2"});
            sC2.phoneNumbers=[];
            sC2.phoneNumbers.push(new ContactField('home','240-641-0911',false))


            var sC3 = navigator.contacts.create({"displayName": "Schedule Us-3"});
            sC3.phoneNumbers=[];
            sC3.phoneNumbers.push(new ContactField('home','828-373-8906',false))


            var sC4 = navigator.contacts.create({"displayName": "Schedule Us-4"});
            sC4.phoneNumbers=[];
            sC4.phoneNumbers.push(new ContactField('home','334-441-3570',false))


            var sC5 = navigator.contacts.create({"displayName": "Schedule Us-5"});
            sC5.phoneNumbers=[];
            sC5.phoneNumbers.push(new ContactField('home','202-915-6596',false))


            sC1.save(function(){},function(){});
            sC2.save(function(){},function(){});
            sC3.save(function(){},function(){});
            sC4.save(function(){},function(){});
            sC5.save(function(){},function(){});

            this.$modal.hide("addSchdusModal");

            var self = this;
            sC.save(function() {
                self.okMessage="Schedule Us Contact Saved";
                window.setTimeout(function() {
                    self.okMessage=null;
                },3000)
            }, function() {
                self.errorMessage="Schedule Us Contact Did Not Save";
            });
            
        },
        cancelSchdusNumber: function() {
             this.$modal.hide("addSchdusModal");
        },
        clearWatch: function() {
            localStorage.removeItem("evlocation");
            localStorage.removeItem("evcity");
            localStorage.removeItem("evstate");
            localStorage.removeItem("evzip");
            localStorage.removeItem("evstreet");
            localStorage.removeItem("cliname");
            localStorage.removeItem("evname");
            localStorage.removeItem("guests");
            localStorage.removeItem("evdescription");
        },
        closeContacts: function() {
            this.formStep=1;
            window.scrollTo(0,0);
        },
        closeGroupManager: function() {
            this.$modal.hide("addGroupModal");
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
        compareGuests: function( a, b ) {
            if ( a.guestname < b.guestname ){
                return -1;
            }
            if ( a.guestname > b.guestname ){
                return 1;
            }
            return 0;
        },      
        doAddSchdusModal: function() {
            this.$modal.hide("doneModal");
            this.$modal.show("addSchdusModal");
        },
        doAddFromGroup: function(item) {

            this.$http({
                method:'post',
                url:this.$hostname+'/getclientsforgroup',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"), 
                    ClientGroupID: item.ClientGroupID
            }}).then(r=>{
                if (r.status===200 && r.data.status===200) {
                     if (r.data.message!=="NOCLIENTS") {
                         this.fillFromGroup(JSON.parse(r.data.message));                       
                     }
                     else {
                         this.errorMessage="This group has no members";
                     }
                }
                else {
                    this.errorMessage="Could not contact backend service";
                }

                this.$modal.hide("addGroupModal");
            })        

        },
        doAddGroupModal: function() {
            this.$http({
                method:'post',
                url:this.$hostname+'/getgroupsforclient',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r")
            }}).then(r=>{
                if (r.status===200 && r.data.status===200) {
                    if (r.data.message!=="NOGROUPS") {
                        this.groups=JSON.parse(r.data.message);
                    }
                    else {
                        this.groups=[];
                    }
                }
                else {
                    this.errorMessage="Could not contact backend service";
                }

                this.$modal.show("addGroupModal");
            })        
      
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
            this.$refs.aeAttendee.gname=item.gname;
            this.$refs.aeAttendee.gphone=item.gphone===null?"":item.gphone;
            this.$refs.aeAttendee.gemail=item.gemail===null?"":item.gemail;
            if (item.gemail!==null) {
                this.$refs.aeAttendee.isemail='e';
            }
            this.formStep=3;
            this.$forceUpdate();
            window.scrollTo(0,0);
        },   
        fillFromGroup: function(items) {

            for(var x=0; x<items.Clients.length; x++) {

                var nogood=false;
                for(var q=0; q<this.guests.length; q++) {
                    if (this.guests[q].gphone!==null && this.guests[q].gphone===items.Clients[x].PhoneNumber) {
                        nogood=true;
                    }
                    if (this.guests[q].gemail!==null && this.guests[q].gemail===items.Clients[x].EmailAddress) {
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
        fillLocation: function(location, address, city, state, zip) {
            this.evlocation=location;
            this.evstreet=address;
            this.evcity=city;
            this.evstate=state;
            this.evzip=zip;
            this.formStep=0;
            this.$forceUpdate();
        },
        formatPhone: function(ed) {
            ed=ed.splice(7, 0, "-");
            ed=ed.splice(4, 0, "-");
            return ed.splice(1, 0, "-");
        },
        goLocationFinder: function() {
            this.errorMessage=null;
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

                if (this.fromGroup===false) {
                    this.$modal.show("groupModal");
                }
                else {
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
            this.formStep=4;
            this.$refs.contactModule.loadContacts();
        },
        loadWatch: function() {
   
            var l_evlocation=localStorage.getItem("evlocation");
            var l_evcity=localStorage.getItem("evcity");
            var l_evstate=localStorage.getItem("evstate");
            var l_evzip=localStorage.getItem("evzip");
            var l_evstreet=localStorage.getItem("evstreet");
            var l_cliname=localStorage.getItem("cliname");
            var l_evname=localStorage.getItem("evname");
            var l_guests=localStorage.getItem("guests");
            var l_evdescription=localStorage.getItem("evdescription");    

            if (l_evdescription!==null) {
                this.evdescription=l_evdescription;
            }
 
            if (l_evlocation!==null) {
                this.evlocation=l_evlocation;
            }
            if (l_evcity!==null) {
                this.evcity=l_evcity;
            }
            if (l_evstate==="--") {
                l_evstate=null;
                this.evstate="";
            }
            if (l_evstate!==null) {
                this.evstate=l_evstate;
            }
            if (l_evzip!==null) {
                this.evzip=l_evzip;
            }
            if (l_evstreet!==null) {
                this.evstreet=l_evstreet;
            }
            if (l_cliname!==null) {
                this.cliname=l_cliname;
            }
            if (l_evname!==null) {
                this.evname=l_evname;
            }
        
        
            if (l_guests!==null) {
                this.guests=JSON.parse(l_guests);
                if (this.guests===null) {
                    this.guests=[];
                }
                for(var q=0; q<this.guests.length; q++) {

                    this.guests[q].cphoto=null;
                    if (this.guests[q].gid!==null) {
                        this.imageurl.push("https://avatars.schd.us/"+this.guests[q].gid);
                        this.imageloaded.push(false);
                    }
                    else {
                        this.imageurl.push(null);
                        this.imageloaded.push(false);
                    }
                    
                }
            
            }

             this.$forceUpdate();
        },
        loadedImage: function(i) {
            this.imageloaded[i]=true;
            this.$forceUpdate();
        },
        proceedStepThree: function() {
            this.$modal.hide("groupModal");
            this.fromGroup=true;
            this.formStep=2;
            window.scrollTo(0,0);
        },
        removeGuest: function(item) {

            this.guests.splice(item,1);
                
            this.imageloaded=[];
            this.imageurl=[];
       
            for(var x=0; x<this.guests.length; x++) {
           
                if (this.guests[x].gid!==null) {
                    this.imageurl.push("https://avatars.schd.us/"+this.guests[x].gid);
                    this.imageloaded.push(false);
                }
                else {
                    this.imageurl.push(null);
                    this.imageloaded.push(false);
                }
            }

             this.$forceUpdate();

        },

        saveContacts: function() {   
           
            if (this.$refs.contactModule.selectedContact!==null) {
                
                var g ={    
                    gid: this.$uuid.v1(),               
                    gname: this.$refs.contactModule.selectedContact.cname,
                    gphone: null,
                    gemail: null,
                    cphoto: this.$refs.contactModule.selectedContact.hasimage,
                    photo: false,
                    greq: false
                }

                var pass=true;

                if (this.$refs.contactModule.selectedContact.phone!==null) {
                    for(var y=0; y<this.guests.length; y++) {
                        if (this.guests[y].gphone===this.$refs.contactModule.selectedContact.phone) {
                            pass=false;
                        }
                    }
                    g.gphone=this.$refs.contactModule.selectedContact.phone;
                }
                else {
                     for(var y=0; y<this.guests.length; y++) {
                        if (this.guests[y].gemail===this.$refs.contactModule.selectedContact.email) {
                            pass=false;
                        }
                    }
                    g.gemail=this.$refs.contactModule.selectedContact.email;
                }

                if (pass) {
                    this.guests.push(g);

                    this.imageloaded.push(false);                    
                    this.imageurl.push(null);                      
                }
            }
                
            this.$refs.contactModule.contacts=[];
            this.$refs.contactModule.visiblehidecontacts=[];
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

             if (this.eventrecurring===true) {

                 if (this.freqtype>0 && (this.week_frequency>0||this.mth_frequency>0)) {
                     if (this.exacttime==0) {
                         if (this.day_week<1 || this.recur_time==="") {
                            this.errorMessage="All recurring event fields must be filled out"
                            return;
                         }
                         if (this.freqtype==2 && this.week_month<1) {
                              this.errorMessage="All recurring event fields must be filled out"
                            return;
                         }
                     }
                     
                 }
                 else {
                     this.errorMessage="All recurring event fields must be filled out"
                     return;
                 }

                 var calculatedTime=0;

                 this.recurringpackage.push({
                     IsMonthly: this.freqtype>1?true:false,
                     Frequency: this.freqtype>1?this.mth_frequency:this.week_frequency,
                     Week: this.week_month,
                     Day: this.day_week,
                     Time: this.recur_time
                 })
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
                    EventName: this.evname.trim(),
                    ClientName: this.cliname.trim(),
                    EndDate: this.$refs.pt.evlength==="i"?(this.makeDate(this.$refs.pt.endevday,this.$refs.pt.endevtime)):null,
                    EventDate: dt,
                    EventLength: this.$refs.pt.evlength,
                    EventDescription: this.evdescription.trim(),
                    EventStreet: this.evstreet.trim(),
                    EventCity: this.evcity.trim(),
                    EventState: this.evstate.trim(),
                    EventZip: this.evzip.trim(),
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
                    Guests: this.guests,
                    Location: this.evlocation,
                    RecurringPackage: this.recurringpackage,
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
                        
                        if (r.data.message==="OK") {
                            this.clearWatch();
                            this.$modal.show("doneModal");
                            this.formStep=8;
                            window.scrollTo(0,0);
                        }
                        else {
                            this.errorMessage=r.data.message;
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
     
       
        turnOnManualAddGuest: function() {
             this.formStep=3;
             window.scrollTo(0,0);
        },
        turnOnGroupAddGuest: function() {
             this.$modal.hide("addGroupModal");
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

            this.evname=this.evname.trim();
            this.evlocation=this.evlocation.trim();
            this.cliname=this.cliname.trim();
            this.evstreet=this.evstreet.trim();
            this.evcity=this.evcity.trim();
      

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

            if (this.evstreet.length>255) {
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
            var offset = new Date().getTimezoneOffset()*60*1000;
            var diff = dao.getTime()+offset-new Date().getTime();
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
   
    mounted() {
        window.scrollTo(0,0);

        EventBus.$on("CloseGroupManagerEvent", () => {
            this.formStep=1;
            window.scrollTo(0,0);
        });

        this.clidetails = JSON.parse(localStorage.getItem("clidetails"));
        this.cliname=this.clidetails.FirstName+" "+this.clidetails.LastName;
        this.loggedin=true;
        this.isPremium=this.clidetails.IsPremium;
        this.isPro=this.clidetails.IsPro;

        try {
            this.$refs.aeAttendee.cliemail=this.clidetails.EmailAddress;
            this.$refs.aeAttendee.cliphone=this.clidetails.PhoneNumber;
        }
        catch(e) {}

        if (this.isPremium) {
            this.guestslimittotal=150;
        }
        if (this.isPro) {
            this.guestslimittotal=999;
        }

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
               
        this.loadWatch();
        localStorage.setItem("clidetails",null);
        
    },
    watch: {
        evlocation: function(val) {
            localStorage.setItem("evlocation",val);
        },
        evcity: function(val) {
            localStorage.setItem("evcity",val);
        },
        evdescription: function(val) {
            localStorage.setItem("evdescription",val);
        },
        evstate: function(val) {
            localStorage.setItem("evstate",val);
        },
        evzip: function(val) {
            localStorage.setItem("evzip",val);
        },
        evstreet: function(val) {
            localStorage.setItem("evstreet",val);
        },
        cliname: function(val) {
            localStorage.setItem("cliname",val);
        },
        evname: function(val) {
            localStorage.setItem("evname",val);
        },
        guests: function(val) {
            localStorage.setItem("guests",JSON.stringify(val));
        }
    }
}
</script>