<template>
    <div>
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
             
             <div class="mt-4 textcenter">
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
            errorMessage: null,
            formStep: 1,
            endevday:null,
            evday:null,
            evtime:null,
            endevtime:null,
            evlength:"",
            guests:[],
            remindertime:"yes",
            showreminder: false,
            usedpfus: false
        }
    },
    methods: {
         closePickForUs: function() {
             this.usedpfus=false;
             this.$parent.buttonsenabled=true;
             this.formStep=3;
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
            this.formStep=3;
        },
        doPFUSDefault: function() {
            if (this.evlength==="" || this.evlength==="i") {
                this.errorMessage="In order to choose a time you need to choose a length for your event and the event cannot span multiple days";
            }
            else {
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
                        AgeRange: 0
                    }
                }).then(r=> {
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