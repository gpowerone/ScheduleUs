<template>
    <div class="moduleWrapper">

        <div class='errorBox' v-show='errorMessage!==null'>
            {{ errorMessage }}
        </div>

        <div id='eventStepOne' v-show='formStep === 0'>
            
            <h1>Schedule It!</h1>

            <div>

                <div class='fieldwell xs-12 topEvent'>
                    <label>Name of Event or Activity</label><br />
                    <input type='text' v-model="evname" class='textfield' />
                </div>

                <div class='fieldwell xs-12 mtp-10'>
                    <label>Your Name</label><br />
                    <input type='text' v-model="cliname" class='textfield' />
                </div>

                <div class='fieldwell xs-12 mtp-10' >
                    <label>Your Phone Number</label><br />
                    <input type='text' v-model="cliphone" class='textfield' />
                </div>
                
                <div class='fieldwell xs-12 mtp-10'>
                    <label>Location</label>
                    <div class="layout row">
                        <div class="flex xs6 spfield textleft">
                            <v-icon>location_on</v-icon>&nbsp;<span>Find a Location</span>
                        </div>
                        <div class="flex xs6 spfield textright" v-show="loggedin===true">                           
                            <v-icon>home</v-icon> <span>Use Saved Address</span>
                        </div>
                    </div>
                    <div class='mt-1'> 
                        <input type='text' class='textfield' v-model="evstreet" />
                    </div>
                </div>
                <div class="layout row mt-2">
                    <div class='fieldwell flex xs6'>
                        <label>City:</label><br />
                        <input type='text' class='textfield' v-model="evcity"  />
                    </div>
                    <div class='fieldwell flex xs3 ml-2'>
                        <label>State:</label><br />
                        <select class="textfield" v-model="evstate">
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
                        <div class='flex xs3 textleft spfield'>
                            <button class='transButton' @click='turnOnManualAddGuest'><v-icon>person_add</v-icon>&nbsp;<span>Add</span></button> 
                        </div>
                        <div class='flex xs9 textright spfield'>
                            Add From:<button v-show="isCordova === true" @click='loadContacts' class='transButton'><v-icon>contacts</v-icon></button>&nbsp;<button v-show="loggedin === true" @click='loadPastEvents' class='transButton'><v-icon>event_note</v-icon></button>
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
               <label>How Long is this Event:</label><br />
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
                    <option value="1440">1 day</option>
                    <option value="2880">2 days</option>
                    <option value="4320">3 days</option>
                    <option value="5760">4 days</option>
                    <option value="7200">5 days</option>
                    <option value="8640">6 days</option>
                    <option value="10080">7 days</option>
                </select>
           </div>

            <div class="fieldwell mt-3">
                Pick a date and time or use Pick for Us to let Schedule Us choose the best date and time based upon who you've invited
           </div>
            <div class="fieldwell mt-1 textright">
               <button class='schdusButton' @click='pickForUs'>Pick for Us!</button>
           </div>

           <div class="fieldwell mt-3">
               <label>Date:</label>
               <datetime format="MM-DD-YYYY" v-model="evday" ></datetime>
           </div>
           <div class="fieldwell mt-3">
               <label>Time:</label>
               <datetime format="h:i:s" v-model="evtime" ></datetime>
           </div>
                  

            <div class="fieldwell mt-3">
               <label>Remind Attendees:</label><br />
                <select class="textfield" v-model="remindertime">
                    <option value="24">1 day before</option>
                    <option value="">No reminder</option>
                    <option value="Custom">Custom reminder time</option>
                </select>
           </div>

           <div class="fieldwell mt-3">
               <label>How Long Do Attendees Have to Reply?</label><br />
                <select class="textfield" v-model="schedulecutofftime">
                    <option value="72">3 days to reply</option>
                    <option value="24">1 day to reply</option>
                    <option value="8">8 hours to reply</option>
                    <option value="3">3 hours to reply</option>
                    <option value="1">1 hour to reply</option>
                    <option value="Custom">Custom reply time</option>
                    <option value="">Attendees do not have to reply</option>
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
                   <label>Send a message to attendees:</label><br />
                   <textarea rows="1" cols="1" v-model="evdescription"></textarea>
               </div>
               <div class="mt-3">
                   <label>Event Options:</label>
               </div>
               <div class="mt-2">
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
                        <toggle-button width="35" height="16" v-model="guestsseervsp"/> Attendees Can See Who is Coming
                   </div>
               </div>
               <div class='mt-2'>
                   <toggle-button width="35" height="16" v-model="guestsbringothers"/> Attendees Can Bring Others
               </div>
                <div v-show="guestsbringothers===true" class="indented1">
                   <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="guestsmustregister"/> New Attendees Must Register
                   </div>
                   <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="guestslimitperperson"/> Limit New Attendees Per Person
                   </div>
                   <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="guestsbringchildren"/> Attendees May Bring Children
                   </div>
                   <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="guestsbringpets"/> Attendees May Bring Pets
                   </div>
                     <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="guestsprovidesharing"/> Provide Social Share Options
                   </div>
                   <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="guestslimittotal"/> Set Max Attendee Limit
                   </div>

               </div>
               <div class='mt-2'>
                   <toggle-button width="35" height="16" v-model="guestsreschedule"/> Attendees Can Suggest a Different Time
               </div>
               <div v-show="guestsreschedule===true" class="indented1">
                   <div class="mt-2">
                      <toggle-button width="35" height="16" v-model="guestsrescheduleperm"/> I Must Approve Different Time
                    </div>
               </div>
               <div class='mt-2'>
                   <toggle-button width="35" height="16" v-model="guestschangelocation"/> Attendees Can Suggest a Different Location
               </div>
               <div v-show="guestschangelocation===true" class="indented1">
                   <div class="mt-2">
                       <toggle-button width="35" height="16" v-model="guestschangelocationperm"/> I Must Approve Different Location
                    </div>
               </div>
               <div class='mt-2' v-show="isPremium===true" >
                   <toggle-button width="35" height="16" v-model="eventrecurring"/> Event/Activity Will Occur Again
               </div>
               <div v-show="eventrecurring===true">

               </div>
               <div class='mt-2'>
                   <toggle-button width="35" height="16" v-model="notificationoptions"/> Change Notification Options
               </div>
               <div v-show="notificationoptions===true" class="indented1">
                    <div class="mt-1">
                        <toggle-button width="35" height="16" v-model="notifyschedulecomplete"/> When Scheduling is Complete
                   </div>
                   <div class="mt-1">
                        <toggle-button width="35" height="16" v-model="notifynewmessages"/> When There Are New Messages
                   </div>
                   <div class="mt-1">
                        <toggle-button width="35" height="16" v-model="notifyguestaccept"/> When Guests RSVP
                   </div>
                    <div class="mt-1">
                        <toggle-button width="35" height="16" v-model="notifyeventrescheduled"/> When Event is Rescheduled
                   </div>
                     <div class="mt-1">
                        <toggle-button width="35" height="16" v-model="notifyeventlocationchanges"/> When Event Location Changes
                   </div>
               </div>

                <div class='layout row mt-4'>
                    <div class='flex xs6 textleft'>
                        <button @click='goStepThree'><v-icon color="#FFF">arrow_back</v-icon><span>Back</span></button>
                    </div>

                    <div class='flex xs6 textright'>
                        <button @click='scheduleIt' class='schdusButton'><span>Schedule It! </span><v-icon color="#FFF">event</v-icon></button>
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
            <div class='fieldwell mt-2'>
                    <toggle-button width="35" height="16" v-model="guestisrequired"/> Is Required
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
        

        <div class='pickforus' v-show="formStep === 6">
            <h1>Pick for Us</h1>
            <div class="mt-2">
                If attendees have integrated their calendars with Schedule Us then 
                Pick for Us will use that information in addition to these settings and our AI to find the best time.  
            </div>
            <div class="mt-2">
                <toggle-button width="35" height="16" v-model="pfusrequiretoday"/> Schedule Today
            </div>
            <div class="mt-2 btop boldchoice">
                Allow Days of the Week
            </div>
            <div class="mt-2 layout row">
                <div class="flex xs6">
                    <div>
                        <toggle-button width="35" height="16" v-model="pfussunday"/> Sunday
                    </div>
                    <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="pfusmonday"/> Monday
                    </div>
                    <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="pfustuesday"/> Tuesday
                    </div>
                    <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="pfuswednesday"/> Wednesday
                    </div>
                </div>
                <div class="flex xs6">
                    <div>
                        <toggle-button width="35" height="16" v-model="pfusthursday"/> Thursday
                    </div>
                    <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="pfusfriday"/> Friday
                    </div>
                    <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="pfussaturday"/> Saturday
                    </div>
                </div>
            </div>
            <div class="mt-2 btop boldchoice">
                Allow Times of Day
            </div>
            <div class="mt-2 layout row">
                <div class="flex xs6">
                    <div >
                        <toggle-button width="35" height="16" v-model="pfusmorning"/> Morning
                    </div>
                    <div class="mt-2">
                        <toggle-button width="35" height="16" v-model="pfusafternoon"/> Afternoon
                    </div>
                </div>
                <div class="flex xs6">
                    <div>
                        <toggle-button width="35" height="16" v-model="pfusevening"/> Evening
                    </div>
                </div>
            </div>
             <div class="mt-2 btop">
                  <toggle-button width="35" height="16" v-model="pfusmeal" class="mt-2" /> This Event/Activity Includes a Meal
             </div>
             <div class="mt-2 btop boldchoice">
                 Consider Dates
            </div>
            <div class="mt-2">
                  <toggle-button width="35" height="16" v-model="pfussoon"/> Soon (1-3 days)
             </div>
             <div class="mt-2">
                  <toggle-button width="35" height="16" v-model="pfusweek"/> Within a Week (3-7 days)
             </div>
              <div class="mt-2">
                  <toggle-button width="35" height="16" v-model="pfusmonth"/> Within a Month (1-4 weeks)
             </div>
              <div class="mt-2">
                  <toggle-button width="35" height="16" v-model="pfusmonthmore"/> More Than a Month (1 month+)
             </div>
              <div class="mt-3 layout row">
                  <div class="flex xs6 textleft">
                      <button @click="pickForUsClose">Cancel</button>
                  </div>
                  <div class="flex xs6 textright">
                      <button class="schdusButton" @click="pickForUsDo">Pick for Us!</button>
                  </div>
             </div>
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

export default {
    components: {datetime,Avatar},
    data: function() {
        return {
            formStep: 0,
            cliname: "",
            contacts: [],
            evdescription:"",
            evname: "",
            cliphone: "",
            csearch: "",
            errorMessage: null,
            evdate:null,
            evstreet: "",
            evcity: "",
            evlength:"",
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
            guestsprovidesharing:true,
            guestslimitperperson:false,
            guestsbringchildren:false,
            guestsbringpets:false,
            guestslimittotal:false,
            guestlistvisible: true,
            guestisrequired:false,
            guestsbringothers: false,
            guestsseersvp: true,
            guestsreschedule:false,
            guestschangelocation:false,
            eventrecurring:false,
            guests:[],            
            isCordova: (typeof window.cordova !== "undefined"),
            isPremium: false,
            isPro: false,
            loggedin: false,
            notificationoptions:false,
            notifyschedulecomplete:true,
            notifynewmessages:false,
            notifyguestaccept:false,
            notifyeventrescheduled:true,
            notifyeventlocationchanges:true,
            pfusrequiretoday:false,
            pfussunday:true,
            pfusmonday:true,
            pfustuesday:true,
            pfuswednesday:true,
            pfusthursday:true,
            pfusfriday:true,
            pfussaturday:true,
            pfusmorning:true,
            pfusafternoon:true,
            pfusevening:true,
            pfuslatenight:false,
            pfusmeal:false,
            pfussoon:true,
            pfusweek:true,
            pfusmonth:false,
            pfusmonthmore:false,
            remindertime: "24",
            schedulecutofftime: "72",
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
            if (this.guestphone.length>1 && this.verifyPhone(this.guestphone)!=="OK") {
                this.guesterror="Please enter valid phone number with area code in format NNN-NNN-NNNN";
                return;
            } 
            if (this.guestemail.length>1 && this.verifyEmail(this.guestemail)!=="OK") {
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
                    greq: this.guestisrequired,
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
        closeManualAddGuest: function() {
            this.formStep=1;
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
        editGuest: function(item) {
            this.guesteditmode=item;
            this.guestname=item.gname;
            this.guestphone=item.gphone==="Not Specified"?"":item.gphone;
            this.guestemail=item.gemail==="Not Specified"?"":item.gemail;
            this.formStep=3;
            this.$forceUpdate();
        },
        formatPhone: function(ed) {
            ed=ed.splice(7, 0, "-");
            ed=ed.splice(4, 0, "-");
            return ed.splice(1, 0, "-");
        },
        goStepOne: function() {
            this.formStep=0;
        },
        goStepTwo: function() {
            this.formStep=1;
        },
        goStepThree: function() {
            this.formStep=2;
        },
        goStepFour: function() {
            this.formStep=5;
        },
        goToLogIn: function() {
            this.$router.push('auth');
        },
        goToAbout: function() {
            this.$router.push('about');
        },
        goToCreateAccount: function() {
            this.$router.push('signup');
        },
        loadContacts: function() {
            var options      = {};
            options.filter   = "";
            options.multiple = true;
            options.desiredFields = [navigator.contacts.fieldType.id, navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name, navigator.contacts.fieldType.phoneNumbers, navigator.contacts.fieldType.emails, navigator.contacts.fieldType.photos];
            var fields  = [navigator.contacts.fieldType.displayName];
            navigator.contacts.find(fields, this.contactSuccess, this.contactFailure, options);
        },
        loadPastEvents: function() {

        },
        pickForUs: function() {
            this.formStep=6;
        },
        pickForUsClose: function() {
            this.formStep=2;  
        },
        pickForUsDo: function() {

            this.$http({
                method:'post',
                url:this.$hostname+'/pickforus',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),   
                    Users: this.guests,   
                    Offset:  new Date().getTimezoneOffset(),
                    Mondays: this.pfusmonday,
                    Tuesdays: this.pfustuesday,
                    Wednesdays: this.pfuswednesday,
                    Thursdays: this.pfusthursday,
                    Fridays: this.pfusfriday,
                    Saturdays: this.pfussaturday,
                    Sundays: this.pfussunday,   
                    RequireToday: this.pfusrequiretoday,
                    Mornings: this.pfusmorning,
                    Afternoons: this.pfusafternoon,
                    Evenings: this.pfusevening,
                    LateNight: this.pfuslatenight,
                    Meal: this.pfusmeal,
                    LSoon: this.pfussoon,
                    LWeek: this.pfusweek,
                    LMonth: this.pfusmonth,
                    LMonthPlus: this.pfusmonthmore,
                    Length: this.evlength 
                }
            }).then(r=> {
                if (r.status===200 && r.data.status===200) {
                }
            })
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
             this.$http({
                method:'post',
                url:this.$hostname+'/createevent',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    EventName: this.evname,
                    ClientName: this.cliname,
                    ClientPhone: this.cliphone,
                    EventDate: this.evdate,
                    EventDescription: this.evdescription,
                    EventStreet: this.evstreet,
                    EventCity: this.evcity,
                    EventState: this.evstate,
                    EventZip: this.evzip,
                    GuestsCanDiscuss: this.guestscandiscuss,
                    GuestsMustRegister: this.guestsmustregister,
                    GuestLimitPerPerson: 0,
                    GuestLimitTotal: 0,
                    GuestsProvideSharing: this.guestsprovidesharing,
                    GuestListVisible: this.guestlistvisible,
                    GuestsBringChildren: this.guestsbringchildren,
                    GuestsBringPets: this.guestsbringpets,
                    GuestsSeeRSVPs: this.guestsseersvps,
                    GuestsReschedule: this.guestsreschedule,
                    GuestsChangeLocation: this.guestschangelocation,
                    EventIsRecurring: this.eventrecurring,
                    Guests: this.guests,
                    NotifyScheduleComplete: this.notifyschedulecomplete,
                    NotifyNewMessages: this.notifynewmessages,
                    NotifyGuestAccept: this.notifyguestaccept,
                    NotifyEventRescheduled: this.notifyeventrescheduled,
                    NotifyEventLocationChanges: this.notifyeventlocationchanges,
                    ReminderTime: this.remindertime,
                    ScheduleCutoffTime: this.schedulecutofftime,
                    MustApproveDiffTime: this.guestsrescheduleperm,
                    MustApproveDiffLocation: this.guestschangelocationperm,
                    UTCOffset: new Date().getTimezoneOffset(),
                    WillAttend: this.willattend,
                    YourName: this.cliname
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.$router.push({path: 'dashboard', params: { newEvent:"Y"}});
                    }
                }
            });
        },
        selectContact: function(item) {
            item.isselected=!item.isselected;
            this.$forceUpdate();
        },
        turnOnManualAddGuest: function() {
            this.formStep=3;
        },
        verifyEmail: function(email) {
            var emailVerification = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
            if (!emailVerification.test(email)) {
                return "Email address is invalid";
            }
            return "OK";
        },
        verifyPhone: function(phone) {
            var phoneVerification = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
            if (!phoneVerification.test(phone)) {
                return "Phone number is invalid";
            }
            return "OK";
        }
    },
    beforeRouteLeave(to, from, next) {
        this.formStep=0;
        next();
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
                if (r.status===200 && r.data.status===200) {
                    var clidetails = JSON.parse(r.data.message);
                    this.cliname=clidetails.FirstName+" "+clidetails.LastName;
                    this.cliphone=this.formatPhone(clidetails.PhoneNumber);
                    this.loggedin=true;
                    this.isPremium=clidetails.isPremium;
                }
            })
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