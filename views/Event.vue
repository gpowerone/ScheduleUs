<template>
    <div class="moduleWrapper">
        <div v-show="tev===null">
              Loading...
        </div>
        <div v-show="errorMessage!==null" class="errorBox">
            {{errorMessage}}
        </div>

         <modal name="addressModal" width=300 height=200>
            <div class='paddedField'>
                <div>
                    {{EventLocation}}<br />
                    {{EventAddress}}<br />
                    {{EventCity}}, {{EventState}} {{EventZip}} 
                </div>
                <div class='mt-2'>
                    <button class='mr-2' @click="closeAddress()">Close</button>
                </div>
            </div>
        </modal>
   
        <div v-show="tev!==null&&errorMessage===null" class="mt-2">
            <h1>{{EventName}}</h1>
            <div>{{EventDate}}</div>
            <div class="layout row">
                <div class="flex xs10">{{EventLocation}}</div>
                <div class="flex xs1"><a @click="showAddress()"><v-icon>home</v-icon></a></div>
                <div class="flex xs1"><a v-bind:href="EventMap" target="_blank" rel="nopener noreferrer"><v-icon>map</v-icon></a></div>
            </div>
            <div v-show="needAcceptance===true">
                Acceptance
            </div>

             <v-collapse-group>


                 <v-collapse-wrapper @onStatusChange="acc4s" v-show="RSVP===true" ref="acc4">
                     <div class="accheader" v-collapse-toggle>
                        <v-icon>{{ acc4i }}</v-icon> <span>RSVP</span>
                    </div>
                    <div class="acccontent" v-collapse-content>
                         RSVP content here
                    </div>
                </v-collapse-wrapper>

                <v-collapse-wrapper @onStatusChange="acc2s" v-show="CanRelocate===true" ref="acc2">
                     <div class="accheader" v-collapse-toggle>
                        <v-icon>{{ acc2i }}</v-icon> <span>Suggest New Location</span>
                    </div>
                    <div class="acccontent" v-collapse-content>
                         Relocation content here
                    </div>
                </v-collapse-wrapper>

                 <v-collapse-wrapper @onStatusChange="acc3s" v-show="CanReschedule===true" ref="acc3">
                     <div class="accheader" v-collapse-toggle>
                        <v-icon>{{ acc3i }}</v-icon> <span>Suggest New Time</span>
                    </div>
                    <div class="acccontent" v-collapse-content>
                         Time change content here
                    </div>
                </v-collapse-wrapper>

                 <v-collapse-wrapper @onStatusChange="acc5s" v-show="CanShare===true" ref="acc5">
                     <div class="accheader" v-collapse-toggle>
                        <v-icon>{{ acc5i }}</v-icon> <span>Share This Event/Activity</span>
                    </div>
                    <div class="acccontent" v-collapse-content>
                         <div class="layout row">
                             <div class="flex xs1">
                                 <a class="twitter-timeline" v-bind:href="thisURL"><img src="@/assets/TwitterIcon.png" height="18" width="18" alt="Twitter" /></a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>   
                             </div>
                             <div class="flex xs3">
                                <iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&layout=button_count&size=small&width=88&height=20&appId" width="88" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
                             </div>
                             
                         </div>
                    </div>
                </v-collapse-wrapper>


                <v-collapse-wrapper @onStatusChange="acc1s" v-show="Guests.length>0" ref="acc1">
                    <div class="accheader" v-collapse-toggle>
                        <v-icon>{{ acc1i }}</v-icon> <span>Attendees</span>
                    </div>
                    <div class="acccontent" v-collapse-content>
                        <v-list >
                            <template v-for="(item, i) in Guests">
                                <v-list-item :key="i">
                                    <div class='layout row p4'>
                                        <div class='flex xs2 pl2 relative'>                              
                                            <avatar class="vertical-center" size="30" :username="item.GuestName"></avatar>                           
                                        </div>
                                        <div class='flex xs10 textleft fieldwell indented1 spfield'>
                                            {{item.GuestName}}
                                        </div>
                                    </div>
                                </v-list-item>
                            </template>
                        </v-list>
                    </div>
                 </v-collapse-wrapper>


                <v-collapse-wrapper @onStatusChange="acc6s" v-show="CanChat===true" ref="acc6">
                     <div class="accheader" v-collapse-toggle>
                        <v-icon>{{ acc6i }}</v-icon> <span>Conversation</span>
                    </div>
                    <div class="acccontent" v-collapse-content>
                         <emoji-picker @emoji="insert" :search="search">
                            <div slot="emoji-invoker" slot-scope="{ events: { click: clickEvent } }" @click.stop="clickEvent">
                                <button type="button">open</button>
                            </div>
                            <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
                                <div>
                                <div>
                                    <input type="text" v-model="search">
                                </div>
                                <div>
                                    <div v-for="(emojiGroup, category) in emojis" :key="category">
                                    <h5>{{ category }}</h5>
                                    <div>
                                        <span
                                        v-for="(emoji, emojiName) in emojiGroup"
                                        :key="emojiName"
                                        @click="insert(emoji)"
                                        :title="emojiName"
                                        >{{ emoji }}</span>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </emoji-picker>
                    </div>
                </v-collapse-wrapper>

             </v-collapse-group> 
        </div>
        
    </div>
</template>

<script>
import Avatar from 'vue-avatar'
import EmojiPicker from 'vue-emoji-picker'

export default {
    name: "Event",
    components: {Avatar, EmojiPicker},
    data() {
        return {
            acc1i: "expand_less",
            acc2i: "expand_less",
            acc3i: "expand_less",
            acc4i: "expand_less",
            acc5i: "expand_less",
            acc6i: "expand_less",
            errorMessage: null,
            input: '',
            loading: null,
            needAcepptance: false,
            search: '',
            tev: null, 
            thisURL: null
        }
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
        acc5s: function() {

            if (this.acc5i==="expand_more") {
                this.acc5i="expand_less";
            }
            else {
                this.acc5i="expand_more";
            }
        },
        acc6s: function() {

            if (this.acc6i==="expand_more") {
                this.acc6i="expand_less";
            }
            else {
                this.acc6i="expand_more";
            }
        },
        closeAddress: function() {
            this.$modal.hide("addressModal");
        },
        insert(emoji) {

        },
        showAddress: function() {
            this.$modal.show("addressModal");
        }
    },
    mounted() {

         var ev=null;
         var gu=null;
         var imic=false;

         try {
             ev=this.$route.query.e;
         }
         catch(e) {
         
         }

         try {
             gu=this.$route.query.g;           
         }
         catch(e) {
       
         }

         this.thisURL="https://schd.us/#/app/event?e="+ev;

         var c = localStorage.getItem("_c");
         if (typeof(c)!=="undefined" && c!==null || c!=="null") {      
            gu = c;
            imic=true;
         }

         if (typeof(ev)!=="undefined" && ev!==null && gu!==null) {
               this.$http({
                    method:'post',
                    url:this.$hostname+'/geteventbyhash',
                    data: {
                        hsh: ev,
                        me: gu,
                        mic: imic                    
                    }
                }).then(r=> {
                    this.loading=false;

                    if (r.status===200) {
                        if (r.data.status===200) {                         
                            this.tev = JSON.parse(r.data.message);
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
    computed: {
          CanChat: function() {
              if (this.tev!==null) {
                  return this.tev.GuestsCanChat;
              }
              return false;
          },
          CanRelocate: function() {
              if (this.tev!==null) {
                  return this.tev.AllowLocationChange;
              }
              return false;
          },
          CanReschedule: function() {
              if (this.tev!==null) {
                  return this.tev.AllowReschedule;
              }
              return false;
          },
          CanShare: function() {
              if (this.tev!==null) {
                  return this.tev.ProvideSharing;
              }
              return false;
          },
          EventAddress: function() {
              if (this.tev!==null) {
                  return this.tev.Schedules[0].Address;
              }
              return ""; 
          },
          EventCity: function() {
              if (this.tev!==null) {
                  return this.tev.Schedules[0].City;
              }
              return ""; 
          },
          EventState: function () {
              if (this.tev!==null) {
                  return this.tev.Schedules[0].State;
              }
              return "";   
          },
          EventZip: function() {
              if (this.tev!==null) {
                  return this.tev.Schedules[0].PostalCode;
              }
              return ""; 
          },
          EventName: function() {
              if (this.tev!==null) {
                  return this.tev.EventName;
              }
              return "";
          },
          EventDate: function() {
              if (this.tev!==null) {
                  var d = new Date(parseInt(this.tev.Schedules[0].StartDate));
                  var h = d.getHours();
                  var ap="AM";
                  if (h>12) {
                      ap="PM";
                      h-=12;
                  }
                  var mins = d.getMinutes();
                  var dmin = String(mins);
                  if (mins<10) {
                      dmin="0"+dmin;
                  }

                  return (d.getMonth()+1)+"-"+d.getDate()+"-"+d.getFullYear()+" | "+h+":"+dmin+" "+ap;
              }
              return null;
          },
          EventLocation: function() {
              if (this.tev!==null) {                 
                  return this.tev.Schedules[0].Location; 
              }
              return null;
          },
          EventMap: function() {
              if (this.tev!==null) {
                  return "https://www.google.com/maps/dir/?api=1&destination="+
                  encodeURI(this.tev.Schedules[0].Address+"+"+this.tev.Schedules[0].City+"+"+this.tev.Schedules[0].State+"+"+this.tev.Schedules[0].PostalCode); 
              }
              return "#"
          },
          Guests: function() {
              if (this.tev!==null) {
                  return this.tev.Guests;
              }
              return [];
          },
          RSVP: function() {
              if (this.tev!==null) {
                  return this.tev.GuestsCanBringOthers;
              }
              return false;
          }
    }
}
</script>