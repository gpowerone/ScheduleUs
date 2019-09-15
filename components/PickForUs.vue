<template>
    <div>
        <div class='errorBox' v-show='errorMessage!==null'>
            {{ errorMessage }}
        </div>

        <h1>Pick for Us</h1>
        <div class="mt-2">
            If attendees have integrated their calendars with Schedule Us then 
            Pick for Us will use that information in addition to these settings and our AI to find the best time.  
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
                    <toggle-button width="35" height="16" v-model="pfusmorning"/> Morning (7-12)
                </div>
                <div class="mt-2">
                    <toggle-button width="35" height="16" v-model="pfusafternoon"/> Afternoon (12-5)
                </div>
            </div>
            <div class="flex xs6">
                <div>
                    <toggle-button width="35" height="16" v-model="pfusevening"/> Evening (5-9)
                </div>
                <div class="mt-2">
                    <toggle-button width="35" height="16" v-model="pfuslatenight"/> Late Night
                </div>
            </div>
        </div>
        <div class="mt-2 layout row btop">
            <div class="flex xs6 mt-2">
            <toggle-button width="35" height="16" v-model="pfusmeal" /> Includes a Meal
            </div>
            <div class="flex xs6 mt-2">
            <toggle-button width="35" height="16" v-model="pfuswork" /> Is for Work
            </div>
        </div>
        <div class="mt-2 btop boldchoice">
            Consider Dates Within
        </div>
        <div class="mt-2 layout row">
            <div class="flex xs6">

                <div>
                        <toggle-button width="35" height="16" v-model="pfusrequiretoday"/> Today
                </div>
                <div class="mt-2">
                    <toggle-button width="35" height="16" v-model="pfussoon"/> 1-3 Days
                </div>
                <div class="mt-2">
                    <toggle-button width="35" height="16" v-model="pfusweek"/> 4-7 Days
                </div>
            </div>
            <div class="flex xs6">
                <div>
                    <toggle-button width="35" height="16" v-model="pfusmonth"/> 1-4 Weeks
                </div>
                <div class="mt-2">
                    <toggle-button width="35" height="16" v-model="pfusmonthmore"/> 1-3 Months
                </div>
            </div>
        </div>
        <div class="mt-2 layout row btop">
            <div class="flex xs6 mt-3">
                Average Attendee Age
            </div>
            <div class="flex xs6 fieldwell mt-2">
            <select v-model="pfusage" class="textfield">
                <option value='0'>--- Unspecified ---</option>
                <option value='1'>13-18</option>
                <option value='2'>18-23</option>
                <option value='3'>23-28</option>
                <option value='4'>28-48</option>
                <option value='5'>48-65</option>
                <option value='6'>65+</option>
            </select>
            </div>
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
</template>

<script>
export default {
  name: "pickforus",
  data: function() {
    return {
        errorMessage:null,
        pfusage:0,
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
        pfuswork:false
    }
  },
  methods: {
       pickForUsClose: function() {
            this.$parent.closePickForUs();
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
                    Length: this.$parent.evlength,
                    ForWork: this.pfuswork,
                    AgeRange: this.pfusage
                }
            }).then(r=> {
                if (r.status===200 && r.data.status===200) {
                    if (r.data.message==="N") {
                        this.errorMessage="Pick for Us failed to find a time";
                    }
                    else {
                        this.$parent.setPickForUs(JSON.parse(r.data.message));      
                    }
                }
                else {
                    this.errorMessage="Pick for Us failed to find a time";
                } 
            })
       }
   }
}
</script>