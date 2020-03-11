<template>  
    <div class="moduleWrapper">
        <div class='loadingImg'  v-show="loading===true">
             <img src="@/assets/loading.gif" />
        </div>
        <div v-show="loading===false">

            <div class='errorBox' v-show='errorMessage!==null'>
                {{ errorMessage }}
            </div>

            <div class='okBox' v-show='isOK!==null'>
                {{isOK}}
            </div>

            <div class="layout row">
                <div class="flex xs6 textleft">
                    <h1>My Events</h1>
                </div>
                <div class="flex xs6 textright">
                    <button @click="goToCreateEvent()">Create Event</button>
                </div>
            </div>
            <div v-show="isOrganizing.length>0">
                <div class="mt-3 fieldwell boldchoice">
                    Events I am Organizing
                </div>
                <div class="mt-2 botdot">
                    <template v-for="(item, i) in isOrganizing">
                        <v-list-item :key="i" >
                            <div  class="myevscheduling" @click="goEvent(item.Hash)" style="cursor:pointer;">
                                <div class="layout row">
                                    <div class="flex xs10">
                                      
                                        <div class='mt-2' style='line-height:1.3rem;'>                                     
                                            {{item.EventName}}<br />
                                            <span class="smallgray"  v-html="displayDate(item.EventDate)"></span>                                      
                                        </div>
                                        
                                    </div>
                                    <div class="flex xs2 textright">
                                        <v-icon size="50px">keyboard_arrow_right</v-icon>
                                    </div>
                                </div>
                            </div>
                            
                        </v-list-item>
                    </template> 
                </div>
            </div>
            <div v-show="isOrganizing.length===0">
                <div class="mt-3 fieldwell">
                    I am not currently organizing any events
                </div>
              
            </div>
            <div v-show="isParticipating.length>0">
                <div class="mt-5 fieldwell boldchoice">
                    Events I am Participating In
                </div>
                 <div class="mt-2">
                    <template v-for="(item, i) in isParticipating">
                        <v-list-item :key="i" >
                            <div  class="myevscheduling" @click="goEvent(item.Hash)" style="cursor:pointer;">
                                <div class="layout row">
                                    <div class="flex xs10">
                                      
                                        <div class='mt-2' style='line-height:1.3rem;'>
                                            {{item.EventName}}<br />
                                            <span class="smallgray"  v-html="displayDate(item.EventDate)"></span>
                                        </div>
                                        
                                    </div>
                                    <div class="flex xs2 textright">
                                        <v-icon size="50px">keyboard_arrow_right</v-icon>
                                    </div>
                                </div>
                            </div>
                            
                        </v-list-item>
                    </template> 
                </div>
            </div>

             <div v-show="isArchived.length>0">
                <div class="mt-5 fieldwell boldchoice">
                    Past Events
                </div>
                 <div class="mt-2">
                    <template v-for="(item, i) in isArchived">
                        <v-list-item :key="i" >
                            <div class="myevscheduling" @click="goEvent(item.Hash)" style="cursor:pointer;">
                                <div class="layout row">
                                    <div class="flex xs10">
                                      
                                        <div class='mt-2' style='line-height:1.3rem;'>
                                            {{item.EventName}}<br />
                                            <span class="smallgray" v-html="displayDate(item.EventDate)"></span>
                                        </div>
                                        
                                    </div>
                                    <div class="flex xs2 textright">
                                        <v-icon size="50px">keyboard_arrow_right</v-icon>
                                    </div>
                                </div>
                            </div>
                            
                        </v-list-item>
                    </template> 
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import {utilities} from '../mixins/utilities'

export default {
    name: 'myEvents',
    mixins: [utilities],
    data() {
        return {
            errorMessage:null,
            isArchived: [],
            isOrganizing: [],
            isParticipating: [],
            isOK: null,
            loading:true
        }
    },
    methods: {
        displayDate: function(tstmp) {
            var d = new Date(parseInt(tstmp));

            var minute=d.getMinutes();
            if (minute<10) {
                minute="0"+minute;
            }
            var hour =d.getHours();
            var ampm="AM";
            if (hour>=12) {
                hour=hour-12;
                ampm="PM";
            }
            if (hour===0) {
                hour=12;
            }

            return "&nbsp;&nbsp;&nbsp;"+(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear()+" "+hour+":"+minute+" "+ampm;
        },
        goToCreateEvent: function() {
            this.$router.push("/create");
        },
        goEvent: function(evHash) {
            this.$router.push("/event?e="+evHash)
        }
    },
    beforeRouteEnter (to, from, next) {

        var c = localStorage.getItem("_c");
        if (typeof(c)==="undefined" || c===null || c==="null") {         
            from();
        }
        else {
            next()
        }
    },
    computed: {
        EventDate: function() {
            var d = new Date(parseInt(this.tev.Schedules[0].StartDate));
            
            var mth="";
            switch(d.getMonth()) {
                case 0: mth="January"; break;
                case 1: mth="February"; break;
                case 2: mth="March"; break;
                case 3: mth="April"; break;
                case 4: mth="May"; break;
                case 5: mth="June"; break;
                case 6: mth="July"; break;
                case 7: mth="August"; break;
                case 8: mth="September"; break;
                case 9: mth="October"; break;
                case 10: mth="November"; break;
                case 11: mth="December"; break;
            }

            return mth +" "+d.getDate()+", "+d.getFullYear(); 
        }
    },
    mounted() {
         window.scrollTo(0,0);
         localStorage.setItem("clidetails",null);

         this.$http({
                method:'post',
                url:this.$hostname+'/getevents',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),                    
                }
            }).then(r=> {

                
                if (r.status===200) {
                    if (r.data.status===200) {
                        var evdetails = JSON.parse(r.data.message);
                        var rp=[];


                        if (evdetails.p!==null && evdetails.p.length>0) {
                            for(var q=0; q<evdetails.p.length; q++) {
                                var include=true;

                                if (evdetails.h!==null && evdetails.h.length>0) {
                                    for(var o=0; o<evdetails.h.length; o++) {
                                        if (evdetails.h[o].EventID===evdetails.p[q].EventID) {
                                            include=false;
                                        }                          
                                    }
                                    if (include) {
                                        rp.push(evdetails.p[q]);
                                    }
                                }
                                else {
                                    rp.push(evdetails.p[q]);
                                }
                            }
                        }
                    
                        if (evdetails.h!==null) {
                            this.isOrganizing=evdetails.h;
                        }
                        this.isArchived = evdetails.a;
                        this.isParticipating=rp; 
                        this.loading=false;

                        if (typeof window.cordova !== "undefined") {
                            FirebasePlugin.getToken(function(fcmToken) {
                                console.log("gottoken");
                                console.log(fcmToken);

                                this.$http({
                                        method:'post',
                                        url:this.$hostname+'/addcm',
                                        data: {
                                            ClientID: localStorage.getItem("_c"),
                                            SessionID: localStorage.getItem("_s"),
                                            SessionLong: localStorage.getItem("_r"),  
                                            Token: fcmToken                  
                                        }
                                });
                            }, function(error) {
                                console.error("Firebase Error");
                                console.error(error);
                            });
                        }
                    }
                 
                }
                else {
                    this.loading=false;
                    this.errorMessage="Something went wrong"; 
                }
               

            }).catch(e=> {
                this.loading=false;
                this.errorMessage="Something went wrong"; 
            })

           
    }
}
</script>