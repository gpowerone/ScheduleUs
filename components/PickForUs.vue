<template>
    <div>

         <div id='loading' class='loadingImg' v-show='loading===true'>
                <img src="@/assets/loading.gif" />
         </div>
         <div v-show='loading===false'>     

            <div class='errorBox' v-show='errorMessage!==null'>
                {{ errorMessage }}
            </div>

            
            <div class="mt-2 boldchoice fieldwell">
                Allow Days of the Week
            </div>
            <div class="mt-2 layout row">
                <div class="flex xs6">
                    <div class="fieldwell">
                        <toggle-button width="35" height="16" v-model="pfussunday"/> Sunday
                    </div>
                    <div class="mt-2 fieldwell">
                        <toggle-button width="35" height="16" v-model="pfusmonday"/> Monday
                    </div>
                    <div class="mt-2 fieldwell">
                        <toggle-button width="35" height="16" v-model="pfustuesday"/> Tuesday
                    </div>
                    <div class="mt-2 fieldwell">
                        <toggle-button width="35" height="16" v-model="pfuswednesday"/> Wednesday
                    </div>
                </div>
                <div class="flex xs6">
                    <div class="fieldwell">
                        <toggle-button width="35" height="16" v-model="pfusthursday"/> Thursday
                    </div>
                    <div class="mt-2 fieldwell">
                        <toggle-button width="35" height="16" v-model="pfusfriday"/> Friday
                    </div>
                    <div class="mt-2 fieldwell">
                        <toggle-button width="35" height="16" v-model="pfussaturday"/> Saturday
                    </div>
                </div>
            </div>
            <div class="mt-2 btop boldchoice fieldwell p2top">
                Allow Times of Day
            </div>
            <div class="mt-2 layout row">
                <div class="flex xs6">
                    <div class="fieldwell">
                        <toggle-button width="35" height="16" v-model="pfusmorning"/> Morning (7-12)
                    </div>
                    <div class="mt-2 fieldwell">
                        <toggle-button width="35" height="16" v-model="pfusafternoon"/> Afternoon (12-5)
                    </div>
                </div>
                <div class="flex xs6">
                    <div class="fieldwell">
                        <toggle-button width="35" height="16" v-model="pfusevening"/> Evening (5-9)
                    </div>
                    <div class="mt-2 fieldwell">
                        <toggle-button width="35" height="16" v-model="pfuslatenight"/> Late Night
                    </div>
                </div>
            </div>
            <div class="mt-2 layout row btop p2top">
                <div class="flex xs6 mt-2 fieldwell">
                <toggle-button width="35" height="16" v-model="pfusmeal" /> Includes a Meal
                </div>
                <div class="flex xs6 mt-2 fieldwell">
                <toggle-button width="35" height="16" v-model="pfuswork" /> Is for Work
                </div>
            </div>
            <div class="mt-2 btop boldchoice fieldwell p2top">
                Consider Dates Within
            </div>
            <div class="mt-2 layout row">
                <div class="flex xs6">

                    <div class="fieldwell">
                            <toggle-button width="35" height="16" v-model="pfusrequiretoday"/> Today
                    </div>
                    <div class="mt-2 fieldwell">
                        <toggle-button width="35" height="16" v-model="pfussoon"/> 1-3 Days
                    </div>
                    <div class="mt-2 fieldwell">
                        <toggle-button width="35" height="16" v-model="pfusweek"/> 4-7 Days
                    </div>
                </div>
                <div class="flex xs6">
                    <div class="fieldwell">
                        <toggle-button width="35" height="16" v-model="pfusmonth"/> 1-4 Weeks
                    </div>
                    <div class="mt-2 fieldwell">
                        <toggle-button width="35" height="16" v-model="pfusmonthmore"/> 1-3 Months
                    </div>
                </div>
            </div>
            
            <div class="mt-5 layout row">
                <div class="flex xs6 textleft">
                    <button @click="pickForUsClose">Cancel</button>
                </div>
                <div class="flex xs6 textright">
                    <button class="schdusButton" @click="pickForUsDo">Pick a Time</button>
                </div>
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
        guests:[],
        loading:false,
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
                    AgeRange: this.pfusage,
                    passedCalendars:this.$parent.passedCalendars
                }
            }).then(r=> {
                this.loading=false;
                if (r.status===200 && r.data.status===200) {
                    if (r.data.message==="N") {
                        this.$parent.failPickForUs();
                    }
                    else {
                        this.$parent.setPickForUs(JSON.parse(r.data.message));      
                    }
                }
                else {
                     this.$parent.failPickForUs();
                } 
            })
       },
       setGuests: function(_guests) {
           this.guests=_guests;
       }
   }
}
</script>