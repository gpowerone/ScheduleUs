<template>
    <div class="moduleWrapper">

        <div v-show="errorMessage!==null" class="errorBox">
            {{errorMessage}}
        </div>
        <div v-show="okMessage!==null" class="okBox">
            {{okMessage}}
        </div>

        <modal name="changeLocationModal" width="300" height="200">
            <div class="p2">
                <h3 class="fieldwell">Warning!</h3>
                <div class="fieldwell">
                    Changing the location of the event will cause all attendees to be notified via text or email. All attendees will need to reaccept the invitation. 
                </div>
                <div class="layout row mt-2">
                    <div class="flex xs6 textleft">
                        <button @click="closeLocationModal()">Close</button>
                    </div>
                    <div class="flex xs6 textright">
                        <button @click="doChangeLocation()">Continue</button>
                    </div>
                </div>
            </div>
            
        </modal>

         <modal name="changeTimeModal" width="300" height="200">
            <div class="p2">
                <h3 class="fieldwell">Warning!</h3>
                <div class="fieldwell">
                    Changing the time of the event will cause all attendees to be notified via text or email. All attendees will need to reaccept the invitation. 
                </div>
                <div class="layout row mt-2">
                    <div class="flex xs6 textleft">
                        <button @click="closeTimeModal()">Close</button>
                    </div>
                    <div class="flex xs6 textright">
                        <button @click="doChangeTime()">Continue</button>
                    </div>
                </div>
            </div>
            
        </modal>

         <modal name="removeAttendeeModal" width="300" height="200">
            <div class="p2">
                <h3 class="fieldwell">Warning!</h3>
                <div class="fieldwell">
                    Removing this attendee will cause them to receive notice that they've been uninvited. 
                </div>
                <div class="layout row mt-2">
                    <div class="flex xs6 textleft">
                        <button @click="closeAttendeeModal()">Close</button>
                    </div>
                    <div class="flex xs6 textright">
                        <button @click="doRemoveAttendee()">Continue</button>
                    </div>
                </div>
            </div>
            
        </modal>

        <div v-show="formStep===0">
            <div class="layout row">
                <div class="flex xs6">
                    <h1>Edit Event</h1>
                </div>
                <div class="flex xs6 textright spfield fieldwell" @click="returnToEvent()">
                    <v-icon>keyboard_backspace</v-icon> <span>Return to Event</span>
                </div>
            </div>

            <v-collapse-wrapper @onStatusChange="acc1s" ref="acc1">
                <div class="accheader" v-collapse-toggle>
                    <div class="layout row">
                        <div class="flex xs12">
                            <v-icon>{{ acc1i }}</v-icon> <span>Edit Name</span>
                        </div>
                    </div>
                </div>
                <div class="acccontent" v-collapse-content>
                    <div class="mt-2 fieldwell">
                        <input type="text" class="textfield" v-model="evname" />
                    </div>
                    <div class="mt-2">
                        <button @click="doChangeName()">Change</button>
                    </div>
                </div>
            </v-collapse-wrapper>

            <v-collapse-wrapper @onStatusChange="acc2s" ref="acc2">
                <div class="accheader" v-collapse-toggle>
                    <div class="layout row">
                        <div class="flex xs12">
                            <v-icon>{{ acc2i }}</v-icon> <span>Edit Time</span>
                        </div>
                    </div>
                </div>
                <div class="acccontent" v-collapse-content>
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

                    <div class="textright mt-2">
                        <button @click="changeTime()">Submit</button>
                    </div>
                </div>
            </v-collapse-wrapper>

            <v-collapse-wrapper @onStatusChange="acc3s" ref="acc3">
                <div class="accheader" v-collapse-toggle>
                    <div class="layout row">
                        <div class="flex xs12">
                            <v-icon>{{ acc3i }}</v-icon> <span>Edit Location</span>
                        </div>
                    </div>
                </div>
                <div class="acccontent" v-collapse-content>
                    <div class='fieldwell xs-12 mt-2'>
                        <label>Location</label>
                        <div class="layout row">
                            <div class="flex xs6 spfield textleft" @click="goLocationFinder()">
                                <v-icon>location_on</v-icon>&nbsp;<span>Find a Location</span>
                            </div>                            
                        </div>
                        <div class='mt-1'>
                            <input type='text' class='textfield' v-model="evlocation" :class='evlocationfe'  />
                        </div>
                        <div class='mt-1 fieldwell'>
                            <label>Address</label><br /> 
                            <input type='text' class='textfield' v-model="evstreet" :class='evstreetfe'  />
                        </div>
                    </div>
                    <div class="layout row mt-2">
                        <div class='fieldwell flex xs6'>
                            <label>City:</label><br />
                            <input type='text' class='textfield' v-model="evcity" :class='evcityfe'   />
                        </div>
                        <div class='fieldwell flex xs3 ml-2'>
                            <label>State:</label><br />
                            <select class="textfield" v-model="evstate"  >
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
                            <input type='text' class='textfield' id='eventZip'   v-model='evzip' />
                        </div>
                    </div>
                    <div class="mt-2 fieldwell textright">
                            <button @click="changeLocation()">Submit</button> 
                    </div>
                </div>
            </v-collapse-wrapper>

            <v-collapse-wrapper @onStatusChange="acc4s" ref="acc4">
                <div class="accheader" v-collapse-toggle>
                    <div class="layout row">
                        <div class="flex xs12">
                            <v-icon>{{ acc4i }}</v-icon> <span>Edit Attendees</span>
                        </div>
                    </div>
                </div>
                <div class="acccontent" v-collapse-content>
                     <div class="textright">
                        <a @click="addAttendee()" class="spfield"><img src="@/assets/greenPlus.png" height="20" width="20" />&nbsp;&nbsp;<span>Add Attendee</span></a>
                     </div>
                     <v-list v-show="guests.length>0" >
                            <template v-for="(item, i) in guests">
                                <v-list-item :key="i">
                                    <div class='layout row p4'>
                                        <div class='flex xs2 pl2 relative'>                              
                                            <avatar class="vertical-center" size="30" :username="item.GuestName"></avatar>                           
                                        </div>
                                        <div class='flex xs8 textleft fieldwell indented1 spfield'>
                                            {{item.GuestName}}
                                        </div>
                                        <div class='flex xs2'>
                                            <v-icon @click="removeAttendee(item)">remove_circle_outline</v-icon>
                                        </div>
                                    </div>
                            
                                </v-list-item>
                            </template>
                     </v-list>
                </div>
            </v-collapse-wrapper>
        </div>

        <div v-show="formStep===1">
            <locationfinder ref="lf"></locationfinder>
        </div>
        <div v-show="formStep===2">
            <pickforus></pickforus>
        </div>

         <div class='manualaddguest mt-2 p2' v-show="formStep === 3">

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
                <div class='flex xs6 textleft'>
                    <button @click="closeAddGuest">Cancel</button>
                </div>
              
                <div class='flex xs6 textright'>
                    <button @click="doAddGuest">Save</button>
                </div>
            </div>
        </div>

</template>

<script>
import Avatar from 'vue-avatar'
import locationfinder from "@/components/LocationFinder"
import pickforus from "@/components/PickForUs"
import datetime from 'vuejs-datetimepicker'
import {utilities} from '../mixins/utilities'

export default {
    name: "EventUpdate",
    mixins: [utilities],
    components: {Avatar,locationfinder,pickforus,datetime},
    data() {
        return {
            acc1i: "expand_less",
            acc2i: "expand_less",
            acc3i: "expand_less",
            acc4i: "expand_less",
            attendee:null,
            errorMessage: null,
            eventid:null,
            evday:null,
            evlength:null,
            evtime:null,
            endevday:null,
            endevtime:null,
            evlocation:null,
            evstreet:null,
            evcity:null,
            evstate:null,
            evzip:null,
            evlocationfe: "",
            evstreetfe: "",
            evcityfe: "",
            formStep:0,
            guests:[],
            guestname:"",
            guestphone:"",
            guestemail:"",
            okMessage:null  
        }
    },
    mounted() {
         this.refresh();
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
        addAttendee: function() {
            this.formStep=3;
        },
        changeLocation: function() {
            this.$modal.show("changeLocationModal")
        },
        changeTime: function() {
            this.$modal.show("changeTimeModal")
        },
        closeAddGuest: function() {
            this.formStep=0;
        },
        closeAttendeeModal: function() {
            this.$modal.hide("removeAttendeeModal")
        },
        closeLocationFinder: function() {
            this.formStep=0;
        },
        closeLocationModal: function() {
            this.$modal.hide("changeLocationModal")     
        },
        closePickForUs: function() {
            this.formStep=0;
        },
        closeTimeModal: function() {
            this.$modal.hide("changeTimeModal")    
        },
        doAddGuest: function() {
             if (this.guestname.length<1 || this.guestname.length>128) {
                this.errorMessage="Guest name is required and should not be longer than 128 characters";
                return;
            }
            if (this.guestphone.length<1 && this.guestemail.length<1) {
                this.errorMessage="Either guest phone number or email address are required";
                return;
            }
            if (this.guestphone.length>0 && this.verifyPhone(this.guestphone)!=="OK") {
                this.errorMessage="Please enter valid phone number with area code in format NNN-NNN-NNNN";
                return;
            } 

            if (this.guestemail.length>0 && this.verifyEmail(this.guestemail)!=="OK") {
                this.errorMessage="Please enter valid email address";
                return;
            }

            this.$http({
                method:'post',                  
                url:this.$hostname+'/addguest',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    EventID: this.eventid,
                    gname: this.guestname,
                    gphone: this.guestphone,
                    gemail: this.guestemail
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                         this.formStep=0;
                         this.okMessage="Attendee successfully added";
                            var self=this;
                            window.setTimeout(function() {
                                self.okMessage=null;
                            },3000) 
                            this.refresh();
                    }  
                    else {
                        this.errorMessage=r.data.message;
                    }  
                }
                else {
                    this.errorMessage="Could not connect to backend service";
                }
            });
        },
        doChangeLocation: function() {
            this.$modal.hide("changeLocationModal")   

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

            this.$http({
                method:'post',                  
                url:this.$hostname+'/updatelocation',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    EventID: this.eventid,
                    Location: this.evlocation,
                    EventStreet: this.evstreet,
                    EventCity: this.evcity,
                    EventState: this.evstate,
                    EventZip: this.evzip
                }
            }).then(r=> {
                 if (r.status===200) {
                    if (r.data.status===200) {
                         this.okMessage="Location changed successfully";
                            var self=this;
                            window.setTimeout(function() {
                                self.okMessage=null;
                            },3000) 
                    }  
                    else {
                        this.errorMessage=r.data.message;
                    }  
                }
                else {
                    this.errorMessage="Could not connect to backend service";
                }
            });
          
        },
        doChangeName: function() {
            if (this.evname.length>0 && this.evname.length<=128) {
                this.$http({
                    method:'post',                  
                    url:this.$hostname+'/updatetitle',
                    data: {
                       ClientID: localStorage.getItem("_c"),
                       SessionID: localStorage.getItem("_s"),
                       SessionLong: localStorage.getItem("_r"),
                       EventID: this.eventid,
                       Title: this.evname               
                    }
                }).then(r=> {
                    if (r.status===200) {
                        if (r.data.status===200) {
            
                            this.okMessage="Event name changed successfully";
                            var self=this;
                            window.setTimeout(function() {
                                self.okMessage=null;
                            },3000) 
                        }  
                        else {
                            this.errorMessage=r.data.message;
                        }  
                    }
                    else {
                        this.errorMessage="Could not connect to backend service";
                    }
                })
            }
            else {
                this.errorMessage="Event name is invalid";
            }
        },
        doChangeTime: function() {

            this.$modal.hide("changeTimeModal");  

            var edate=null;
            if (this.evlength==='i') {
                edate=this.makeDate(this.endevday,this.endevtime)
            }

            this.$http({
                method:'post',                  
                url:this.$hostname+'/updatetime',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    EventID: this.eventid,
                    EventDate: this.makeDate(this.evday,this.evtime),
                    EventLength: this.evlength,
                    EndDate: edate
                }
            }).then(r=> {
                 if (r.status===200) {
                    if (r.data.status===200) {
                         this.okMessage="Time changed successfully";
                            var self=this;
                            window.setTimeout(function() {
                                self.okMessage=null;
                            },3000) 
                    }  
                    else {
                        this.errorMessage=r.data.message;
                    }  
                }
                else {
                    this.errorMessage="Could not connect to backend service";
                }
            });

        },
        doRemoveAttendee: function() {
            this.$modal.hide("removeAttendeeModal")

            this.$http({
                method:'post',                  
                url:this.$hostname+'/removeattendee',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    EventID: this.eventid,
                    PhoneNumber: this.attendee.PhoneNumber,
                    EmailAddress: this.attendee.EmailAddress
                }
            }).then(r=>{
                    if (r.status===200) {
                    if (r.data.status===200) {
                         this.okMessage="Attendee removed successfully";
                            var self=this;
                            window.setTimeout(function() {
                                self.okMessage=null;
                            },3000) 
                            this.refresh();
                    }  
                    else {
                        this.errorMessage=r.data.message;
                    }  
                }
                else {
                    this.errorMessage="Could not connect to backend service";
                }
            })

        },
        goLocationFinder: function() {
            this.$refs.lf.doRender();
            this.formStep=1;
        },
        pickForUs: function() {
            this.formStep=2;
        },
        refresh: function() {
            var ev=null;
            var gu=null;

            try {
                ev=this.$route.query.e;
            }
            catch(e) {
            
            }

            var c = localStorage.getItem("_c");
            if (typeof(c)!=="undefined" && c!==null && c!=="null") {      
                gu = c;
                this.imic=true;
            }

            if (typeof(ev)!=="undefined" && ev!==null) {
                this.$http({
                        method:'post',                  
                        url:this.$hostname+'/geteventbyhash',
                        data: {
                            hsh: ev,
                            me: gu,
                            mic: true                 
                        }
                    }).then(r=> {
                        this.loading=false;

                        if (r.status===200) {
                            if (r.data.status===200) {                         
                                this.tev = JSON.parse(r.data.message);
                                this.evname=this.tev.EventName;
                                this.eventid=this.tev.EventID;
                                this.evlocation=this.tev.Schedules[0].Location;
                                this.evstreet=this.tev.Schedules[0].Address;
                                this.evcity=this.tev.Schedules[0].City;
                                this.evstate=this.tev.Schedules[0].State;
                                this.evzip=this.tev.Schedules[0].PostalCode;
                                this.evlength=this.tev.Schedules[0].EventLength;
                                this.guests=this.tev.Guests;
                            
                                var d = new Date(parseInt(this.tev.Schedules[0].StartDate));
                                var mth=d.getMonth()+1;
                                var dy=d.getDate();
                                if (mth.length===1) {
                                    mth="0"+mth;
                                }
                                if (dy.length===1) {
                                    dy="0"+dy;
                                }
                                this.evday=mth+"-"+dy+"-"+d.getFullYear();
                                this.evtime=this.parseTime(d.getHours()+":"+d.getMinutes());

                                if (this.tev.Schedules[0].EndDate!==null) {

                                    var da = new Date(parseInt(this.tev.Schedules[0].StartDate));
                                    var dmth=da.getMonth()+1;
                                    var ddy=da.getDate();
                                    if (dmth.length===1) {
                                        dmth="0"+dmth;
                                    }
                                    if (ddy.length===1) {
                                        ddy="0"+ddy;
                                    }
                                    this.endevday=dmth+"-"+ddy+"-"+da.getFullYear();
                                    this.endevtime=this.parseTime(da.getHours()+":"+da.getMinutes());

                                }

                                this.$refs.acc1.open();
                            

                            }
                            else {
                                this.errorMessage="There was a problem getting the event";
                            }
                        }
                        else {
                            this.errorMessage="There was a problem getting the event";
                        }
                    })
            }
        },
        removeAttendee: function(item) {
            this.attendee=item;
            this.$modal.show("removeAttendeeModal")
        },
        returnToEvent: function() {
              this.$router.push("/event?e="+this.tev.Hash)
        },
        setPickForUs: function(t) {
             this.evday=t.date;
             this.evtime=this.parseTime(t.time);
             this.formStep=0;
             this.$forceUpdate();
        }
    }
}
</script>