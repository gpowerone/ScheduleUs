<template>
    <div class="moduleWrapper">

        <div id='eventStepOne' v-show='formStep === 0'>
            
            <h1>Schedule It!</h1>

            <div>

                <div class='fieldwell xs-12 mt-4'>
                    <label>Name of Event (what would you like to do?)</label><br />
                    <input type='text' v-model="evname" class='textfield' />
                </div>

                <div class='fieldwell xs-12 mt-5'>
                    <label>Your Name (will appear on message to guests)</label><br />
                    <input type='text' v-model="cliname" class='textfield' />
                </div>

                <div class='fieldwell xs-12 mt-5' >
                    <label>Your Phone Number</label><br />
                    <input type='text' v-model="cliphone" class='textfield' />
                </div>
                
                <div class='fieldwell xs-12 mt-5'>
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
                <div class="layout row mt-3">
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
            
    
            <div class='buttonwell mt-5 textright'>
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
                            <v-icon>group_add</v-icon>&nbsp;Add From:<button v-show="isCordova === true" @click='loadContacts' class='transButton'><span>Contacts</span></button>&nbsp;<button v-show="loggedin === true" @click='loadPastEvents' class='transButton'><span>Past Events</span></button>
                        </div>
                    </div>
                    <div class='guestlistcontents textcenter'>
                        <div v-show="guests.length===0">
                            Invite guests by clicking the buttons above!
                        </div>
                        <v-list v-show="guests.length>0">
                            <template v-for="(item, i) in guests">
                               <v-list-item :key="i">
                                   <div class='layout row btop p2'>
                                        <div class='flex xs2 pl2 relative'>
                                            <div v-if="item.hasimage===true">

                                            </div>
                                            <div v-if="item.hasimage===false">
                                                 <avatar class="vertical-center" :username="item.gname"></avatar>
                                            </div>
                                        </div>
                                        <div class='flex xs10 textleft fieldwell indented1 spfield'>
                                            {{item.gname}}<br />
                                            <v-icon>phone</v-icon> {{item.gphone}}<br />
                                            <v-icon>email</v-icon> {{item.gemail}}
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
               <datetime format="MM-DD-YYYY h:i:s" v-model="evdate" ></datetime>
           </div>
           <div class="fieldwell mt-1 textright">
               <button class='tanButton' @click='pickForUs'>Pick for Us</button>
           </div>
           <div class="fieldwell mt-3">
                Use Pick for Us to let Schedule Us choose the best date and time based upon who you've invited
           </div>
           <div class='fieldwell mt-3 boldchoice biggerisbadder'>
                Additional Options
           </div>
           <div class='fieldwell mt-3'>
               <div>
                   <toggle-button color="#cc3300" v-model="guestlistvisible"/> Guest List is Visible to Guests
               </div>
               <div v-show="guestlistvisible===true" class="indented1">
                   <div class="mt-1">
                        <toggle-button color="#cc3300" v-model="guestscandiscuss"/> Guests Can Discuss Event
                   </div>
               </div>
               <div class='mt-3'>
                   <toggle-button color="#cc3300" v-model="guestsbringothers"/> Guests Can Bring Others
               </div>
                <div v-show="guestsbringothers===true" class="indented1">
                   <div class="mt-1">
                        <toggle-button color="#cc3300" v-model="guestsmustregister"/> New Guests Must Register
                   </div>
                   <div class="mt-1">
                        <toggle-button color="#cc3300" v-model="guestslimitperperson"/> Limit New Guests Per Person
                   </div>
                   <div class="mt-1">
                        <toggle-button color="#cc3300" v-model="guestsbringchildren"/> Guests May Bring Children
                   </div>
                   <div class="mt-1">
                        <toggle-button color="#cc3300" v-model="guestsbringpets"/> Guests May Bring Pets
                   </div>
                   <div class="mt-1">
                        <toggle-button color="#cc3300" v-model="guestslimittotal"/> Set Max Attendee Limit
                   </div>

               </div>
               <div class='mt-3'>
                   <toggle-button color="#cc3300" v-model="guestsreschedule"/> Guests Can Reschedule Event
               </div>
               <div class='mt-3'>
                   <toggle-button color="#cc3300" v-model="guestschangelocation"/> Guests Can Change Location
               </div>
               <div class='mt-3'>
                   <toggle-button color="#cc3300" v-model="eventrecurring"/> Event Will Occur Again
               </div>
               <div class='mt-3'>
                   <toggle-button color="#cc3300" v-model="notificationoptions"/> Change Notification Options
               </div>
               <div v-show="notificationoptions===true" class="indented1">
                    <div class="mt-1">
                        <toggle-button color="#cc3300" v-model="notifyschedulecomplete"/> When Scheduling is Complete
                   </div>
                   <div class="mt-1">
                        <toggle-button color="#cc3300" v-model="notifynewmessages"/> When There Are New Messages
                   </div>
                   <div class="mt-1">
                        <toggle-button color="#cc3300" v-model="notifyguestaccept"/> When Guests RSVP
                   </div>
                    <div class="mt-1">
                        <toggle-button color="#cc3300" v-model="notifyeventrescheduled"/> When Event is Rescheduled
                   </div>
                     <div class="mt-1">
                        <toggle-button color="#cc3300" v-model="notifyeventlocationchanges"/> When Event Location Changes
                   </div>
               </div>
           </div>

            <div class='layout row mt-4'>
                <div class='flex xs6 textleft'>
                    <button @click='goStepTwo'><v-icon color="#FFF">arrow_back</v-icon><span>Back</span></button>
                </div>

                <div class='flex xs6 textright'>
                    <button @click='scheduleIt' class='schdusButton'><span>Schedule It!</span></button>
                </div>
            </div>
        </div>


        <div class='manualaddguest mt-2 p2' v-show="formStep === 3">

            <div v-show="guesterror!==''" class="errorBox">
                {{guesterror}}
            </div>

            <h1>Add Guest</h1>

            <div class='fieldwell mt-2'>
                    <label>Guest Name</label><br />
                    <input type='text' class='textfield' v-model='guestname' />
            </div>
            <div class='fieldwell mt-2'>
                    <label>Guest Phone</label><br />
                    <input type='text' class='textfield' v-model='guestphone' />
            </div>
            <div class='fieldwell mt-2'>
                    <label>Guest Email</label><br />
                    <input type='text' class='textfield' v-model='guestemail' />
            </div>
            <div class='layout row mt-2'>
                <div class='flex xs6 textleft'>
                    <button @click="closeManualAddGuest">Cancel</button>
                </div>
                <div class='flex xs6 textright'>
                    <button @click="addGuest">Add Guest</button>
                </div>
            </div>
        </div>

        <div class='loadcontacts' v-show="formStep === 4">

             <div v-show="contacts.length===0">
                You don't have any contacts
            </div>
            <v-list v-show="contacts.length>0">
                <template v-for="(item, i) in contacts">
                    <v-list-item :key="i">
                        <div class='layout row btop p2'>
                            <div class='flex xs2 pl2 relative'>
                                <div v-if="item.hasimage!==null">
                                    <div class="vertical-center">
                                        <img :src="item.hasimage" alt="photo" width="50" height="50" />
                                    </div>
                                </div>
                                <div v-if="item.hasimage===null">
                                        <avatar class="vertical-center" :username="item.cname"></avatar>
                                </div>
                            </div>
                            <div class='flex xs10 textleft fieldwell indented1 spfield'>
                                {{item.cname}}<br />
                                <v-icon>phone</v-icon> {{item.cphone}}<br />
                                <v-icon>email</v-icon> {{item.cemail}}
                            </div>
                        </div>
                    </v-list-item>
                </template>
            </v-list>
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
            evname: "",
            cliphone: "",
            evstreet: "",
            evcity: "",
            evstate: "",
            evzip: "",   
            evdate: null,
            guestname: "",
            guestphone: "",
            guestemail: "",
            guesterror: "",
            guestscandiscuss:true,
            guestsmustregister:true,
            guestslimitperperson:false,
            guestsbringchildren:false,
            guestsbringpets:false,
            guestslimittotal:false,
            guestlistvisible: true,
            guestsbringothers: false,
            guestsreschedule:false,
            guestschangelocation:false,
            eventrecurring:false,
            notificationoptions:false,
            guests:[],
            isCordova: (typeof window.cordova !== "undefined"),
            loggedin: false,
            notificationoptions:false,
            notifyschedulecomplete:true,
            notifynewmessages:false,
            notifyguestaccept:false,
            notifyeventrescheduled:true,
            notifyeventlocationchanges:true
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

            this.guests.push({
                gname: this.guestname,
                gphone: this.guestphone,
                gemail: this.guestemail,
                photo: null,
                clientid: null,
                hasimage: false
            });
            this.guesterror=""; 
            this.guestname=""; 
            this.guestphone="";
            this.guestemail=""; 
            this.formStep=1;
            this.$forceUpdate();
        },
        closeManualAddGuest: function() {
            this.formStep=1;
        },
        contactFailure: function() {
         
        },
        contactSuccess: function(ctcs) {
            this.contacts=[];

            for (var i=0; i<ctcs.length; i++) {

                var ctcname="Not Specified";
                var ctcemail="Not Specified";
                var ctcphone="Not Specified";
        
                try {
                    ctcname = ctcs[i].name.formatted;
                }
                catch(e) {}

                try {
                    if (ctcs[i].emails.length>0) {
                        ctcemail = ctcs[i].emails[0].value;
                    }
                }
                catch(e) {}

                try {
                    if (ctcs[i].phoneNumbers.length>0) {
                        for (var x=0; x<ctcs[i].phoneNumbers.length; x++) {
                            if (ctcs[i].phoneNumbers[x].type==="mobile") {
                                ctcphone = ctcs[i].phoneNumbers[0].value;
                                break;
                            }
                        }
                    }
                }
                catch(e) {}


                var hasimage=null;
                try {
                    if (ctcs[i].photos.length>0) {                    
                        hasimage=window.Ionic.WebView.convertFileSrc(ctcs[i].photos[0].value);                           
                    }
                }
                catch(e) {}

                this.contacts.push({
                      cname: ctcname,
                      cemail: ctcemail,
                      cphone: ctcphone,
                      hasimage: hasimage
                })      
            } 
            
            this.formStep=4;
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

        },
        scheduleIt: function() {

        },
        turnOnManualAddGuest: function() {
            this.formStep=3;
        },
        verifyEmail: function(email) {
            var emailVerification = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!emailVerification.test(email)) {
                return "";
            }
            return "OK";
        },
        verifyPhone: function(phone) {
            var phoneVerification = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            if (!phoneVerification.test(phone)) {
                return "";
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
                }
            })
        }
    }
}
</script>