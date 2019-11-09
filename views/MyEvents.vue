<template>  
    <div class="moduleWrapper">
        <div v-show="loading===true">
             <img src="@/assets/loading.gif" />
        </div>
        <div v-show="loading===false">

            <div class='okBox' v-show='isOK!==null'>
                {{isOK}}
            </div>

            <h1>My Events</h1>
            <div v-show="isOrganizing.length>0">
                <div class="mt-3 fieldwell boldchoice">
                    Events I am Organizing
                </div>
                <div class="mt-2 botdot">
                    <template v-for="(item, i) in isOrganizing">
                        <v-list-item :key="i" >
                            <div v-if="item.ActionReq<9" class="myevscheduling" @click="goEvent(item.Hash)">
                                <div class="layout row">
                                    <div class="flex xs10">
                                      
                                        <div class='mt-2'>
                                            {{item.EventName}}
                                        </div>
                                        
                                    </div>
                                    <div class="flex xs2">
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
                    I am not currently organizing any activities
                </div>
                <div class="mt-2">
                    <button class="schdusButton" @click="goToCreateEvent()">Schedule Something!</button>
                </div>
            </div>
            <div v-show="isParticipating.length>0">
                <div class="mt-3 fieldwell boldchoice">
                    Events I am Participating In
                </div>
                 <div class="mt-2">
                    <template v-for="(item, i) in isParticipating">
                        <v-list-item :key="i" >
                            <div v-if="item.ActionReq<9" class="myevscheduling" @click="goEvent(item.Hash)">
                                <div class="layout row">
                                    <div class="flex xs10">
                                      
                                        <div class='mt-2'>
                                            {{item.EventName}}
                                        </div>
                                        
                                    </div>
                                    <div class="flex xs2">
                                        <v-icon size="50px">keyboard_arrow_right</v-icon>
                                    </div>
                                </div>
                            </div>
                            
                        </v-list-item>
                    </template> 
                </div>
            </div>

             <div v-show="isArchived.length>0">
                <div class="mt-3 fieldwell boldchoice">
                    Past Events
                </div>
                 <div class="mt-2">
                    <template v-for="(item, i) in isArchived">
                        <v-list-item :key="i" >
                            <div class="myevscheduling" @click="goEvent(item.Hash)">
                                <div class="layout row">
                                    <div class="flex xs10">
                                      
                                        <div class='mt-2'>
                                            {{item.EventName}}
                                        </div>
                                        
                                    </div>
                                    <div class="flex xs2">
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
            isArchived: [],
            isOrganizing: [],
            isParticipating: [],
            isOK: null,
            loading:true
        }
    },
    methods: {
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
    mounted() {
         this.$http({
                method:'post',
                url:this.$hostname+'/getevents',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),                    
                }
            }).then(r=> {

                
                if (r.status===200 && r.data.status===200) {
                    var evdetails = JSON.parse(r.data.message);
                    var rp=[];

                    if (evdetails.p!==null && evdetails.p.length>0) {
                        for(var r=0; r<evdetails.p.length; r++) {
                            var include=true;

                            if (evdetails.h!==null && evdetails.h.length>0) {
                                for(var o=0; o<evdetails.h.length; o++) {
                                    if (evdetails.h[o].EventID===evdetails.p[r].EventID) {
                                        include=false;
                                    }                          
                                }
                                if (include) {
                                    rp.push(evdetails.p[r]);
                                }
                            }
                        }
                    }
                  
                    if (evdetails.h!==null) {
                        this.isOrganizing=evdetails.h;
                    }
                    this.isArchived = evdetails.a;
                    this.isParticipating=rp; 
                }
                else {
                    this.doLogoutRoutine();
                }

            }).catch(e=> {
                this.doLogoutRoutine();
            })

            this.loading=false;
    }
}
</script>