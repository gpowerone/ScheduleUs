<template>
    <div>
        <div id='loading' class='loadingImg' v-show='loading===true'>
                <img src="@/assets/loading.gif" />
         </div>
         <div v-show='loading===false'>

            <div class='errorBox' v-show='errorMessage!==null'>
                {{ errorMessage }}
            </div> 

            <div v-show="formStep===1" class="mt-5">
                <div class="textcenter mt-2">
                    <button @click="doKnownDate()" class="transButton"><img src="@/assets/EventImage1.png" width="271" alt="I know what date and time I want" /></button>
                </div>
                <div class="mt-3 textcenter">
                    <button @click="doPickForUs()" class="transButton"><img src="@/assets/EventImage2.png" width="271" alt="Help me pick a date and time" /></button>
                </div>
            </div>
            <div v-show="formStep===2">

            <div class="fieldwell mt-3">
                <label>Event Start Date:</label>
                <datetime format="MM-DD-YYYY" v-model="evday"></datetime>
            </div>
            <div class="fieldwell mt-3">
                <label>Event Start Time:</label>
                <datetime format="h:i" v-model="evtime" ></datetime>
            </div>
            </div>

            <div v-show="formStep!==1&&usedpfus===false">
                <div class="fieldwell mt-2">
                <label>How long do you anticipate the event will take:</label><br />
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
            </div>
            <div v-show="formStep===2&&evlength==='i'">
        
                <div class="fieldwell mt-3">
                    <label>Event End Date:</label>
                    <datetime format="MM-DD-YYYY" v-model="endevday"></datetime>
                </div>
                <div class="fieldwell mt-3">
                    <label>Event End Time:</label>
                    <datetime format="h:i" v-model="endevtime" ></datetime>
                </div>
            
            </div>

            <div v-show="formStep === 3" class="mt-2">
                
                <hr />
                <div class="mt-2 boldchoice">
                    Calendars Included
                </div>
                <div v-show="calendars.length>0">
                    <div class="mt-2">
                        The following calendars will be accessed when picking the best time. Only calendars owned by attendees will be considered (calendars subscribed to, default holiday calendars, etc... are not considered.) 
                    </div>
                    <template v-for="(item, i) in calendars"> 
                        <v-list-item :key="i">
                            <div class="mt-2">
                                {{item}}
                            </div>
                        </v-list-item>
                    </template>
                </div>
                <div class="mt-2" v-show="calendars.length===0">
                    No calendars will be included. Integrate your calendars on the <a href="/myaccount">My Account</a> page and have your attendees do the same!
                </div>
                <hr class="mt-2" />

                <div class="mt-2 textcenter">
                    <button class="transButton" @click="doPFUSDefault()"><img src="@/assets/EventImage3.png" width="271" alt="Pick the best time using default options"  /></button>
                </div>
            
                <div class="mt-2 textcenter">
                    <button class="transButton" @click="pickForUs()" ><img src="@/assets/EventImage4.png" width="271" alt="Provide additional data to help pick the time" /></button>
                </div>
            
                <div class="mt-2 textcenter">
                    <button class="transButton" @click="doKnownDate()" ><img src="@/assets/EventImage5.png" width="271" alt="I change my mind and I'll pick the time" /></button>
                </div>
            </div>

            <div class="fieldwell mt-3" v-show="showreminder===true">
                <label>Remind Attendees:</label><br />
                <select class="textfield" v-model="remindertime">
                    <option value="yes">1 day before</option>
                    <option value="no">No reminder</option>
                </select>
            </div>

            <div class='pickforus' v-show="formStep === 4">
                <pickforus ref="pfus"></pickforus>
            </div>
        </div>
    </div>
</template>

<script>
import datetime from 'vuejs-datetimepicker'
import pickforus from "@/components/PickForUs"
import {utilities} from '../mixins/utilities'
import { EventBus } from '../bus';

export default {
    name:"PickTime",
    components: {datetime,pickforus},
    mixins: [utilities],
    data() {
        return {
            calendars: [],
            errorMessage: null,
            formStep: 1,
            endevday:null,
            evday:null,
            evtime:null,
            endevtime:null,
            evlength:"",
            guests:[],
            loading:false,
            passedCalendars:[],
            remindertime:"yes",
            showreminder: false,
            usedpfus: false
        }
    },
    methods: {
         calendarRecursion: function(s,p,cals) {
              if (p==="ios") {
                    
                    var self=this;
                    window.plugins.calendar.findAllEventsInNamedCalendar(cals[0],function(ev) {
                        
                        var tzOffset = new Date().getTimezoneOffset()*(60*1000);
                        for (var x=0; x<ev.length; x++) {
                           
                            var startDate=new Date(Date.parse(ev[x].startDate.replace(" ","T"))+tzOffset);
                            var endDate=new Date(Date.parse(ev[x].endDate.replace(" ","T"))+tzOffset);

                            self.passedCalendars.push(self.createPassedCalendar(startDate,endDate));
                        }

                        if (cals.length>1) {
                             cals.shift();
                             s.calendarRecursion(s,p,cals);
                        }
                        else {
                            s.formStep=3;
                        }
                    },
                    function(ev) {
                        if (cals.length>1) {
                             cals.shift();
                             s.calendarRecursion(s,p,cals);
                        }
                        else {
                            s.formStep=3;
                        }
                    });
              }
              else {
                    var self=this;
         
                    window.plugins.calendar.listEventsInRange(new Date(), new Date(new Date().getTime()+7776000000), function(res) {
                        for (var x=0; x<res.length; x++) {
                            for (var y=0; y<cals.length; y++) {
                                if (cals[y]===res[x].calendar_id) {
                                     var startDate=new Date(res[x].dtstart);
                                     var endDate=new Date(res[x].dtend);

                                     self.passedCalendars.push(self.createPassedCalendar(startDate,endDate));

                                    
                                }
                            }
                        }
                        s.formStep=3;
                    }, function() {
                        s.formStep=3;
                    })
              }
         },
         closePickForUs: function() {
             this.usedpfus=false;
             this.$parent.buttonsenabled=true;
             this.formStep=3;
         },
         createPassedCalendar: function (startDate,endDate) {
                var tzOffset = new Date().getTimezoneOffset()*(60*1000);
                var tomorrow = new Date();
                tomorrow.setHours(24,0,0,0);

                var pc={}; 
                if (startDate.getTime()<tomorrow.getTime()) {
                    pc.startDay=0;
                }
                else {
                    var hours = 48;
                    var foundDate=false;
                    do {
                        var someday = new Date();
                        someday.setHours(hours,0,0,0);

                        if (startDate.getTime()>=someday.getTime()) {
                            hours+=24;
                        }
                        else {
                            pc.startDay=(hours/24)-1;
                            foundDate=true;
                        }
                    } while (foundDate===false);
                }

                if (endDate.getTime()<tomorrow.getTime()) {
                    pc.endDay=0;
                }
                else {
                    var hours = 48;
                    var foundDate=false;
                    do {
                        var someday = new Date();
                        someday.setHours(hours,0,0,0);

                        if (endDate.getTime()>=someday.getTime()) {
                            hours+=24;
                        }
                        else {
                            pc.endDay=(hours/24)-1;
                            foundDate=true;
                        }
                    } while (foundDate===false);
                }

                pc.startHour = startDate.getHours(); 
                pc.endHour = endDate.getHours();
                pc.startMinute = startDate.getMinutes();
                pc.endMinute = endDate.getMinutes();

                return pc;
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
        doKnownDate: function() {
            this.errorMessage=null;
            this.formStep=2;
            this.showreminder=true;
            this.$parent.datepicked=true;
        },
        doPickForUs: function() {
            this.errorMessage=null;
            this.loading=true;

            this.$http({
                method:'post',
                url:this.$hostname+'/pfuscalendars',
                data: {                  
                    Users: this.guests                     
                }
            }).then(r=> {
                if (r.status===200 && r.data.status===200) {
                    this.calendars=r.data.message;
                                    
                    if ((typeof window.cordova !== "undefined")) {
                    
                        this.passedCalendars=[];
                        var self=this;
                        window.plugins.calendar.listCalendars(function(e) {
                            try {
                                var passCalendars=[];

                                for (var x=0; x<e.length; x++) {
        
                                    if (window.cordova.platformId==="ios") {
                                        if (e[x].name.indexOf("Contacts")===-1 && e[x].name.indexOf("Holidays")===-1 && (e[x].type==="Local" || e[x].type==="CalDAV")) {
                                            passCalendars.push(e[x].name);
                                        }
                                    }
                                    else {
                                        if (e[x].name.indexOf("Holidays")===-1 && e[x].name.indexOf("Birthdays")===-1 && e[x].name.indexOf("Contacts")===-1) {
                                            passCalendars.push(e[x].id);
                                        }
                                    }
                                }

                                if (passCalendars.length>0) {
                                    self.calendars.push("Local Calendar (On This Device)");
                                    self.calendarRecursion(self,window.cordova.platformId,passCalendars);
                                    this.loading=false;
                                }
                                else {            
                                    self.formStep=3;
                                    this.loading=false;
                                }
                                
                            }
                            catch(ex) {
                                self.formStep=3;
                                this.loading=false;
                            }

                        },
                        function(e) {
                            self.formStep=3;
                            this.loading=false;
                        });
                    
                        
                    }
                    else {
                        this.formStep=3;
                        this.loading=false;
                    }
                }
                
                this.loading=false;
            });

        },
        doPFUSDefault: function() {
            if (this.evlength==="" || this.evlength==="i") {
                this.errorMessage="In order to choose a time you need to choose a length for your event and the event cannot span multiple days";
            }
            else {
                this.loading=true;
                this.$http({
                    method:'post',
                    url:this.$hostname+'/pickforus',
                    data: {
                        ClientID: localStorage.getItem("_c"),
                        SessionID: localStorage.getItem("_s"),
                        SessionLong: localStorage.getItem("_r"),   
                        Users: this.guests,   
                        Offset:  new Date().getTimezoneOffset(),
                        Mondays: true,
                        Tuesdays: true,
                        Wednesdays: true,
                        Thursdays: true,
                        Fridays: true,
                        Saturdays: true,
                        Sundays: true,   
                        RequireToday: false,
                        Mornings: true,
                        Afternoons: true,
                        Evenings: true,
                        LateNight: false,
                        Meal: false,
                        LSoon: true,
                        LWeek: true,
                        LMonth: false,
                        LMonthPlus: false,
                        Length: this.evlength,
                        ForWork: false,
                        AgeRange: 0,
                        passedCalendars: this.passedCalendars
                    }
                }).then(r=> {
                    this.loading=false;
                    if (r.status===200 && r.data.status===200) {
                        if (r.data.message==="N") {
                            this.failPickForUs();
                        }
                        else {
                            this.setPickForUs(JSON.parse(r.data.message));      
                        }
                    }
                    else {
                        this.failPickForUs();
                    } 
                })
            }
        },
        failPickForUs: function() {
            this.errorMessage="We failed to find a good time";
            this.usedpfus=false;
            this.formStep=3;
        },
        pickForUs: function() {
            if (this.evlength==="" || this.evlength==="i") {
                this.errorMessage="In order to choose a time you need to choose a length for your event and the event cannot span multiple days";
            }
            else {
                this.errorMessage=null;
                this.usedpfus=true;
                this.$parent.buttonsenabled=false;
                this.formStep=4;
            }
        },
        setGuests: function(_guests) {
            this.guests=_guests;
            this.$refs.pfus.setGuests(_guests);
        },
        setPickForUs: function(t) {
             this.errorMessage=null;
             this.evday=t.date;
             this.evtime=this.parseTime(t.time);
             this.formStep=2;
             this.showreminder=true;
             this.usedpfus=false;
             this.$parent.buttonsenabled=true;
             this.$parent.datepicked=true;
             this.$forceUpdate();
        }
    },
    watch: {
        evday(value) {
            if (value!==null && value!=="") {
                this.dateChanged();
            }
        }
    }
}
</script>