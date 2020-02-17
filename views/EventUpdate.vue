<template>
    <div class="moduleWrapper">

        <div v-show="errorMessage!==null" class="errorBox">
            {{errorMessage}}
        </div>
        <div v-show="okMessage!==null" class="okBox">
            {{okMessage}}
        </div>

        <modal name="addGroupModal" width="300" height="90%">
            <div class="p2" style="overflow:auto;height:100%;">
                <h1>Groups</h1>
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
                                <div class='layout row p4' style="border-bottom:1px solid #555;">   
                                    <div class='flex xs12 textleft fieldwell spfield' @click="doAddFromGroup(item)">
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

        <modal name="changeLocationModal" width="300" height="200">
            <div class="p2">
                <h3 class="fieldwell">Warning!</h3>
                <div class="fieldwell">
                    Changing the location of the event will cause all attendees to be notified via text or email. All attendees will need to reaccept the invitation. 
                </div>
                <div class="layout row mt-2">
                    <div class="flex xs6 textleft">
                        <button class="redButton" @click="closeLocationModal()">Close</button>
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
                        <button class="redButton" @click="closeTimeModal()">Close</button>
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
                        <button class="redButton" @click="closeAttendeeModal()">Close</button>
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
                <div class="flex xs6 textright spfield fieldwell" v-show="returnAllowed===true" @click="returnToEvent()">
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
                            <v-icon>{{ acc2i }}</v-icon> <span>Edit Date/Time</span>
                        </div>
                    </div>
                </div>
                <div class="acccontent" v-collapse-content>
                     <div class="fieldwell mt-2">
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

                    <div v-show="evlength==='i'" class="fieldwell mt-2">
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

                    <div class="layout row mt-3">
                
                        <div class="xs12 flex textright">
                            <button @click="changeTime()">Submit</button>
                        </div>
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
                               
                        <div class="layout row">
                            <div class="flex xs12 textright">
                                <button class="schdusButton textcenter" @click="goLocationFinder()">
                                    <v-icon color="#FFF">location_on</v-icon>&nbsp;<span>Find Location</span>
                                </button>               
                            </div>
                        </div>        
                     
                        <div class='mt-2 fieldwell'>
                            <label>Place Name</label>
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
                    <div class="layout row">
                        <div class='flex xs7 textleft spfield'>
                                <button class='transButton' @click='addAttendee()'><v-icon>person_add</v-icon>&nbsp;<span>Add</span></button> 
                                &nbsp;&nbsp;
                                <button class='transButton' @click='doAddGroupModal()'><v-icon>group_add</v-icon>&nbsp;<span>Add Group</span></button> 
                        </div>
                        <div class='flex xs5 textright spfield'>
                            <div v-show="isCordova === true" >
                                <button @click='loadContacts' class='transButton'><v-icon>contacts</v-icon> <span>Add Contacts</span></button>
                            </div>
                        </div>
                    </div>
                   
                     <v-list v-show="guests.length>0" >
                            <template v-for="(item, i) in guests">
                                <v-list-item :key="i">
                                    <div class='layout row p4'>
                                        <div class='flex xs2 pl2 relative'>                              
                                            <avatar class="vertical-center" size="50" :username="item.GuestName" v-show="imageloaded[i]===false"></avatar>   
                                            <img v-bind:src="imageurl[i]" v-show="imageurl[i]!==null&&imageloaded[i]===true" @load="loadedImage(i)" style="border-radius:50%;" width=50 height=50 />                          
                                        </div>
                                        <div class='flex xs8 textleft fieldwell indented1 spfield mt-2'>
                                            {{item.GuestName}}
                                        </div>
                                        <div class='flex xs2 mt-2'>
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
            <pickforus ref="pt"></pickforus>
        </div>

         <div class='manualaddguest mt-2 p2' v-show="formStep===3">
            <addeditattendee ref="aeAttendee"></addeditattendee>
        </div>

        <div v-show="formStep===4">
            <contactmodule ref="contactModule"></contactmodule>
        </div>

</template>

<script>
import Avatar from 'vue-avatar'
import locationfinder from "@/components/LocationFinder"
import pickforus from "@/components/PickForUs"
import addeditattendee from "@/components/Attendee"
import contactmodule from '@/components/Contacts'
import datetime from 'vuejs-datetimepicker'
import {utilities} from '../mixins/utilities'

export default {
    name: "EventUpdate",
    mixins: [utilities],
    components: {Avatar,locationfinder,pickforus,datetime,addeditattendee,contactmodule},
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
            groups:[],
            guests:[],
            imageloaded:[],
            imageurl:[],
            isCordova: (typeof window.cordova !== "undefined"),
            okMessage:null,
            returnAllowed:true 
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
        addEditGuest: function(isOverride, gname, gphone, gemail) {
           
            if (isOverride!==true) {
                gname= this.$refs.aeAttendee.guestname;
                gphone= this.$refs.aeAttendee.guestphone;
                gemail= this.$refs.aeAttendee.guestemail;
            }

            this.$http({
                method:'post',                  
                url:this.$hostname+'/addguest',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    EventID: this.eventid,
                    gname: gname,
                    gphone: gphone,
                    gemail: gemail
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
        closeContacts: function() {
            this.formStep=0;
            window.scrollTo(0,0);
        },
        closeGroupManager: function() {
            this.$modal.hide("addGroupModal");
        },
        closeLocationFinder: function() {
            this.formStep=0;
        },
        closeLocationModal: function() {
            this.$modal.hide("changeLocationModal")     
        },
        closeManualAddGuest: function() {
            this.formStep=0;
        },
        closePickForUs: function() {
            this.formStep=0;
        },
        closeTimeModal: function() {
            this.$modal.hide("changeTimeModal")    
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
                    EventZip: this.evzip,
                    EGID: this.tev.EGID
                }
            }).then(r=> {
                 if (r.status===200) {
                    if (r.data.status===200) {
                         this.returnAllowed=false;
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
            this.errorMessage=null;
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

            this.errorMessage=null;
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
                    EndDate: edate,
                    EGID: this.tev.EGID
                }
            }).then(r=> {
                 if (r.status===200) {
                    if (r.data.status===200) {
                         this.returnAllowed=false;
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
            this.errorMessage=null;
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
        failPickForUs: function() {
            this.errorMessage="We failed to find a good time";
            this.formStep=0;
            this.$forceUpdate();
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

                    this.$http({
                        method:'post',                  
                        url:this.$hostname+'/addguest',
                        data: {
                            ClientID: localStorage.getItem("_c"),
                            SessionID: localStorage.getItem("_s"),
                            SessionLong: localStorage.getItem("_r"),
                            EventID: this.eventid,
                            gname: items.Clients[x].Name,
                            gphone: items.Clients[x].PhoneNumber,
                            gemail: items.Clients[x].EmailAddress
                        }
                    });

                   
                }
            }

            this.okMessage="Successfully added, page will refresh";
            var self=this;
            window.setTimeout(function() {
                self.refresh();
            }, 1000);


        },
        goLocationFinder: function() {
            this.$refs.lf.doRender();
            this.formStep=1;
        },
        loadContacts: function() {
            this.formStep=4;
            this.$refs.contactModule.selectOneMode=true;
            this.$refs.contactModule.loadContacts();
        },
        loadedImage: function(i) {
            this.imageloaded[i]=true;
            this.$forceUpdate();
        },
        pickForUs: function() {
            var _guests=[];
            for (var x=0; x<this.guests.length; x++) {
                _guests.push({cid: this.guests[x].ClientID});
            }
            this.$refs.pt.setGuests(_guests);

            this.formStep=2;
        },
        refresh: function() {

            window.scrollTo(0,0);
            localStorage.setItem("clidetails",null);
            this.imageloaded=[];
            this.imageurl=[];

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

                                for(var x=0; x<this.tev.Guests.length; x++) {
                                    this.imageloaded.push(false);
                                    if (this.tev.Guests[x].ClientID!==null) {
                                        this.imageurl.push("https://avatars.schd.us/"+this.tev.Guests[x].ClientID);
                                    }
                                    else {
                                        this.imageurl.push(null);
                                    }
                                }
                            
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
        saveContacts: function() {   
          
            this.addEditGuest(true,this.$refs.contactModule.selectedContact.cname,this.$refs.contactModule.selectedContact.phone,this.$refs.contactModule.selectedContact.email);
                
            this.$refs.contactModule.contacts=[];
            this.$refs.contactModule.visiblehidecontacts=[];
            this.formStep=0;
            window.scrollTo(0,0);
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