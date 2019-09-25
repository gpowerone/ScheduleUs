<template>
    <div class="moduleWrapper">
        <div v-show="tev===null">
              Loading...
        </div>
        <div v-show="errorMessage!==null" class="errorBox">
            {{errorMessage}}
        </div>
        <div v-show="okMessage!==null" class="okBox">
            {{okMessage}}
        </div>

         <modal name="addressModal" width=300 height=150>
            <div class='paddedField textcenter'>
                <div>
                    {{EventLocation}}<br />
                    {{EventAddress}}<br />
                    {{EventCity}}, {{EventState}} {{EventZip}} 
                </div>
                <div class='mt-2 textcenter'>
                    <button class='mr-2' @click="closeAddress()">Close</button>
                </div>
            </div>
        </modal>

        <modal name="commentModal" width="300" height="200">
            <div class="p2">
                <div class="layout row">
                    <div class="xs9 flex textleft fieldwell mt-2">
                        <label>Comment</label>
                    </div>
                    <div class="xs3 flex textright">                             
                        <img src="@/assets/smileyEmoji.png" width="30" height="30" @click="emojiModal" />                                                        
                    </div>
                </div>
                <div class="mt-2 layout row fieldwell">
                    <textarea v-model="newComment" rows="1" cols="1"></textarea>
                </div>       
                <div class="layout row mt-2">
                    <div class="flex xs6">
                        <button @click="closeComment" class="redButton">Cancel</button>
                    </div>
                    <div class="flex xs6 textright">
                        <button @click="submitComment" :disabled="btncomment">Submit</button>
                    </div>
                </div> 
            </div>
        </modal>

        <modal name="emojiModal" width="300" height="400">
            <div class="scrollbox">
                 <emojipicker></emojipicker>
            </div>
        </modal>

        <modal name="reportModal" width="300" height="400">
            <div class="p2">
                If this content is in violation of community guidelines (link needed) then it will be removed by a moderator. Are you sure you wish to make this report?
            </div>
        </modal>

        <modal name="rsvpModal" width="300" height="100">
            <div class="p2">
                <div v-show="Acceptance===true">
                    <div class="textcenter">
                        You are currently attending
                    </div>
                    <div class="mt-2 textcenter">
                        <button @click="doNoRSVP()">I can't attend</button>
                    </div>
                </div>
                <div v-show="Acceptance===false">
                    <div class="textcenter">
                        You are currently not going to attend
                    </div>
                    <div class="mt-2 textcenter" v-show="CanRSVP===true">
                        <button @click="doYesRSVP()">I will attend</button>
                    </div>
                    <div class="mt-2 textcenter" v-show="CanRSVP===false">
                        It is too late to RSVP
                    </div>
                </div>
            </div>
        </modal>

        <div v-show="tev!==null&&showFinder===false&&showPick===false" class="mt-2 fieldwell">
            <h1>{{EventName}}</h1>
            <div v-show="Rescheduled===true">*** Event/Activity Has Been Rescheduled ***</div>
            <div>{{EventDescription}}</div>
            <div class="layout row">
                <div class="xs6 flex textleft">{{EventDate}}</div>
                <div class="xs6 flex textright">{{EventTime}}</div>
            </div>
            <div class="layout row">
                <div class="flex xs10">{{EventLocation}}</div>
                <div class="flex xs1"><a @click="showAddress()" class="eventicons"><v-icon>map</v-icon></a></div>
                <div class="flex xs1"><a v-bind:href="EventMap" target="_blank" class="eventicons" rel="nopener noreferrer"><v-icon>navigation</v-icon></a></div>
            </div>
            <div v-show="IsOwner&&(ActionReq===5||ActionReq===6)">
                You need to accept the rescheduled changes
            </div>

            <div v-show="needAcceptance===true&&EGID!==null" class="fullborder p2">
                <div class="fieldwell">
                    <label>Will you Attend?</label>
                </div>
                <div class="mt-2 boldchoice">           
                    <span class="spfield greenicon" @click="doYesRSVP()"><v-icon>check</v-icon> Yes</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="spfield redicon" @click="doNoRSVP()"><v-icon>close</v-icon> No</span>
                </div> 
            </div>
            
            <div class="mt-2" v-show="needAcceptance===false&&EGID!==null">
                <div v-show="Acceptance===true" class="layout row">
                    <div class="flex xs12 attendingBox textcenter" @click="doRSVPModal()">
                        You are attending (tap to change)
                    </div>       
                </div>

                 <div v-show="Acceptance===false" class="layout row" @click="doRSVPModal()">
                    <div class="flex xs12 notAttendingBox textcenter">
                        You are not attending (tap to change)
                    </div>
                              
                </div>
            </div>

             <v-collapse-group>

                 <v-collapse-wrapper @onStatusChange="acc4s" v-show="RSVP===true&&needAcceptance===null&&CanRSVP===true" ref="acc4">
                     <div class="accheader" v-collapse-toggle>
                        <v-icon>{{ acc4i }}</v-icon> <span>Bring Others</span>
                    </div>
                    <div class="acccontent fieldwell" v-collapse-content>
                         <div v-show="MoreAllowed===true">
                            <div>
                                The host is allowing you to bring others
                            </div>
                            <div class="layout row mt-2">
                                <div class="flex xs6 textleft">
                                    Max Attendees:
                                </div>
                                <div class="flex xs6 textright">
                                    {{MaxAttendees}}
                                </div>
                            </div>
                            <ul class="mt-2"> 
                                <li v-show="AllowChildren===false">Children are not allowed</li>
                                <li v-show="AllowChildren===true">Children are allowed</li>
                                <li v-show="NewAttendeesRSVP===true">New attendees must RSVP below</li>
                                <li v-show="NewAttendeesRSVP===false">New attendees may optionally RSVP below</li>
                            </ul>
                            <div class="mt-2">
                                 <div class='fieldwell mt-2'>
                                    <label>Your Name</label><br />
                                    <input type='text' class='textfield' v-model='guestname' />
                                </div>
                                <div class='fieldwell mt-2'>
                                        <label>Your Phone</label><br />
                                        <input type='text' class='textfield' v-model='guestphone' />
                                </div>
                                <div class='fieldwell mt-2'>
                                        <label>Your Email</label><br />
                                        <input type='text' class='textfield' v-model='guestemail' />
                                </div>
                               
                                <div class='textright mt-2'>           
                                    <button @click="addGuest">RSVP</button>                                  
                                </div>
                            </div>
                         </div>
                         <div v-show="MoreAllowed===false">
                              This event/activity is at maximum capacity. No additional attendees are allowed.
                         </div>
                    </div>
                </v-collapse-wrapper>

                <v-collapse-wrapper @onStatusChange="acc2s" v-show="CanRelocate===true&&CanRSVP===true" ref="acc2">
                     <div class="accheader" v-collapse-toggle>
                        <v-icon>{{ acc2i }}</v-icon> <span>Suggest New Location</span>
                    </div>
                    <div class="acccontent fieldwell" v-collapse-content>
                         <div class='boldchoice'>
                             {{SuggestLocationStatus}}
                         </div>
                         <div class='mt-2'>
                            The host has allowed you to suggest a new location for the event/activity.
                         </div>
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
                             <button @click="doLocationChange" :disabled="btnlocationchange">Submit</button> 
                        </div>
                    </div>
                </v-collapse-wrapper>

                 <v-collapse-wrapper @onStatusChange="acc3s" v-show="CanReschedule===true&&CanRSVP===true" ref="acc3">
                     <div class="accheader" v-collapse-toggle>
                        <v-icon>{{ acc3i }}</v-icon> <span>Suggest New Time</span>
                    </div>
                    <div class="acccontent fieldwell" v-collapse-content>
                         <div class='boldchoice'>
                             {{SuggestTimeStatus}}
                         </div>
                         <div class='mt-2'>
                            The host has allowed you to suggest a new time for the event/activity. Use Pick for Us to suggest a good time based upon who is going.
                         </div>
                         <div class="fieldwell mt-1 textright">
                            <button class='schdusButton' @click='pickForUs'>Pick for Us!</button>
                         </div>

                         <div class="fieldwell mt-3">
                            <label>Date:</label>
                            <datetime format="MM-DD-YYYY" v-model="evday"></datetime>
                         </div>
                         <div class="fieldwell mt-3">
                            <label>Time:</label>
                            <datetime format="h:i" v-model="evtime" ></datetime>
                         </div>
                         <div class="mt-2 fieldwell textright">
                             <button @click="doTimeChange" :disabled="btntimechange">Submit</button> 
                        </div>
                    </div>
                </v-collapse-wrapper>

                <v-collapse-wrapper @onStatusChange="acc1s" ref="acc1">
                    <div class="accheader" v-collapse-toggle>
                        <v-icon>{{ acc1i }}</v-icon> <span>Attendees</span>
                    </div>
                    <div class="acccontent" v-collapse-content>
                         <div v-show="Guests.length===0">
                            The attendee list is hidden
                        </div>
                        <v-list v-show="Guests.length>0" >
                            <template v-for="(item, i) in Guests">
                                <v-list-item :key="i">
                                    <div class='layout row p4'>
                                        <div class='flex xs2 pl2 relative' v-show='SeeRSVPs===true'>
                                             <div class='greenicon' v-show="item.Acceptance===true">
                                                <v-icon>check</v-icon>
                                             </div>
                                             <div class='redicon' v-show="item.Acceptance===false">
                                                <v-icon>close</v-icon>      
                                             </div>                                         
                                        </div>
                                        <div class='flex xs2 pl2 relative'>                              
                                            <avatar class="vertical-center" size="30" :username="item.GuestName"></avatar>                           
                                        </div>
                                        <div class='flex xs8 textleft fieldwell indented1 spfield'>
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

                        <div v-show="EventComments.length===0">
                            <div>
                                There are no comments
                            </div>
                            <div class="mt-2">
                                <a @click="addComment(null)" class="spfield"><img src="@/assets/greenPlus.png" height="20" width="20" />&nbsp;&nbsp;<span>Add Comment</span></a>
                            </div>
                        </div>
                        <div v-show="EventComments.length>0">
                            <div class="mt-2 mb-2 textright">
                                <a @click="addComment(null)" class="spfield"><img src="@/assets/greenPlus.png" height="20" width="20" />&nbsp;&nbsp;<span>Add Comment</span></a>
                            </div>
                           <comments v-for="(node,n) in EventComments" v-bind:key="n" :comment="node.item" :children="node.children"></comments> 
                        </div>
                                              
                    </div>
                </v-collapse-wrapper>

             </v-collapse-group> 

              <div v-show="CanShare===true" class="mt-2 accheader p2 textcenter" >
                    <a v-bind:href="TwitterURL" class="twitter-share-button" data-show-count="false"><img src="@/assets/TwitterIcon.png" alt="Tweet" width="30" height="30" /></a>  
                    &nbsp;&nbsp;<a v-bind:href="LinkedInURL"><img src="@/assets/LIIcon.png" width="30" height="30" alt="Share on Linked In" /></a>           
              </div>
        </div>
        
        <div v-show="showFinder===true">
              <locationfinder ref="lf"></locationfinder>
        </div>

        <div v-show="showPick===true">
              <pickforus></pickforus>
        </div>
    </div>
</template>

<style scoped>
 .eventicons i {
     font-size:2rem;
 }
 .notAttendingBox {
     border-radius:3px;
     background-color:indianred;
     color:white;
     padding:2%;
     font-weight:bold;
  }
  .attendingBox {
     border-radius:5px;
     background-color: lightgreen;
     color:#777;
     padding:2%;
     font-weight:bold;
  }
</style>

<script>
import Avatar from 'vue-avatar'
import emojipicker from '@/components/EmojiPicker'
import locationfinder from "@/components/LocationFinder"
import datetime from 'vuejs-datetimepicker'
import pickforus from "@/components/PickForUs"
import comments from '@/components/Comments'
import { EventBus } from '../bus';

export default {
    name: "Event",
    components: {Avatar, emojipicker, locationfinder, datetime, pickforus, comments},
    data() {
        return {
            acc1i: "expand_less",
            acc2i: "expand_less",
            acc3i: "expand_less",
            acc4i: "expand_less",
            acc6i: "expand_less",
            btncomment: false,
            btntimechange: false,
            btnlocationchange:false,
            commentParent: null,
            errorMessage: null,
            evday: null,
            evtime: null,
            evlength:"",
            evlocation:"",
            evstreet:"",
            evcity:"",
            evstate:"",
            evzip:"",
            evlocationfe: "",
            evstreetfe: "",
            evcityfe: "",
            guestemail: "",
            guestname: "",
            guestphone: "", 
            imic: null,
            input: '',
            loading: null,
            needAcceptance: false,
            newComment: '',
            okMessage: null,
            search: '',
            showFinder: false,
            showPick: false,
            tev: null, 
            URL: null
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
        acc6s: function() {

            if (this.acc6i==="expand_more") {
                this.acc6i="expand_less";
            }
            else {
                this.acc6i="expand_more";
            }
        },
        addComment: function(ec) {
            if (typeof(ec)==="undefined" || ec===null) {
                this.commentParent= "00000000-0000-0000-0000-000000000000";
            }
            else {
                this.commentParent = ec;
            }
            this.$modal.show("commentModal");
        },
        addGuest: function() {
            this.errorMessage=null;

            if (this.guestname.length<1 || this.guestname.length>128) {
                this.errorMessage="Guest name is required and should not be longer than 128 characters";
                return;
            }
            if (this.guestphone.length<1 && this.guestemail.length<1) {
                this.errorMessage="Either guest phone number or email address are required";
                return;
            }
            if (this.guestphone.length>1 && this.verifyPhone(this.guestphone)!=="OK") {
                this.errorMessage="Please enter valid phone number with area code in format NNN-NNN-NNNN";
                return;
            } 
            if (this.guestemail.length>1 && this.verifyEmail(this.guestemail)!=="OK") {
                this.errorMessage="Please enter valid email address";
                return;
            }

            if (this.guestphone.length<1) {
                this.guestphone="Not Specified";
            }
            if (this.guestemail.length<1) {
                this.guestemail="Not Specified";
            }

              this.$http({
                method:'post',
                url:this.$hostname+'/addguest',
                data: {
                    EventID: this.tev.EventID,
                    gname: this.guestname,
                    gemail: this.guestemail,
                    gphone:  this.guestphone,
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),                
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {    
                         this.okMessage="RSVP Successful";
                         this.tev.Guests.push({
                             GuestName: this.guestname,
                             Acceptance: true
                         })
                         this.guestname=null;
                         this.guestemail=null;
                         this.guestphone=null;
                         var self=this;
                         this.$forceUpdate();
                         window.setTimeout(function() {
                            self.okMessage=null;
                        },3000) 
                    }
                    else {
                        this.errorMessage=r.data.message;
                    }
                }
                else {
                    this.errorMessage="Error connecting to the backend service. Please check your internet connection";
                }
            });

        },
        closeAddress: function() {
            this.$modal.hide("addressModal");
        },
        closeComment: function() {
            this.$modal.hide("commentModal");
        },
        closeLocationFinder: function() {
            this.showFinder=false;
        },
        closePickForUs: function() {
            this.showPick=false;
        },
        doLocationChange: function() {
            this.errorMessage=null;

            this.evlocationfe="";
            this.evstreetfe="";
            this.evcityfe="";


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
                url:this.$hostname+'/suggestnewlocation',
                data: {
                    EventID: this.tev.EventID,
                    EventGuestID: this.EGID,
                    Location: this.evlocation,
                    Address: this.evstreet,
                    City: this.evcity,
                    State: this.evstate,
                    PostalCode: this.evzip
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.okMessage="Your location suggestion has been submitted";
                        this.evlocation=null;
                        this.evstreet=null;
                        this.evcity=null;
                        this.evstate=null;
                        this.evzip=null;
     
                        var self=this;
                        window.setTimeout(function() {
                            self.okMessage=null;
                            window.location.reload();
                        },3000) 
                    }
                    else {
                        if (r.data.message==="AlreadyPresent") {
                            this.errorMessage="You have already suggested a new location. You may suggest another new location if/when the event/activity is rescheduled."   
                        }
                        else {
                            this.errorMessage=r.data.message;
                        }
                    }
                }
                else {
                    this.errorMessage="There was an error connecting to the backend service. Check your internet connection.";
                }    
            });
        },
        doReport: function(ec) {
            this.$modal.show("reportModal");
        },
        doTimeChange: function() {

            this.errorMessage=null;

            if (this.evday===null || this.evtime===null) {
                this.errorMessage="Date and time are required";
            }

            this.$http({
                method:'post',
                url:this.$hostname+'/suggestnewtime',
                data: {
                    EventID: this.tev.EventID,
                    EventGuestID: this.EGID,
                    EvTime: this.makeDate()         
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                         this.okMessage="Your time suggestion has been submitted";
                         var self=this;
                         window.setTimeout(function() {
                            self.okMessage=null;
                            window.location.reload();
                         },3000) 
                    }
                    else {
                        if (r.data.message==="AlreadyPresent") {
                             this.errorMessage="You have already suggested a new time. You may suggest another new time if/when the event/activity is rescheduled."  
                        }
                        else {
                            this.errorMessage=r.data.message;
                        }
                    }
                }
                else {
                    this.errorMessage="There was an error connecting to the backend service. Check your internet connection.";
                }    
            });
        },
        doNoRSVP: function() {
            this.doRSVP(false);
        },
        doRSVP: function(rsvp) {
            this.errorMessage=null;

            this.$http({
                method:'post',
                url:this.$hostname+'/dorsvp',
                data: {
                    EventID: this.tev.EventID,
                    EventScheduleID: this.tev.Schedules[0].EventScheduleID,
                    rsvp: rsvp,
                    me: this.EGID              
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {    
                        this.okMessage="RSVP status changed";
                        this.tev.Acceptance=rsvp;
                        this.tev.NeedsAcceptance=false;
                        this.needAcceptance=false;
                        for (var x=0; x<this.tev.Guests.length; x++) {
                            if (this.tev.Guests[x].EventGuestID===this.EGID) {
                                this.tev.Guests[x].Acceptance=rsvp;
                            }
                        }

                        this.$forceUpdate();
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
                    this.errorMessage="A network error has occurred";
                }
                this.$modal.hide("rsvpModal");
            });
        },
        doYesRSVP: function() {
            this.doRSVP(true);
        },
        doRSVPModal: function() {
            this.$modal.show("rsvpModal");
        },
        emojiModal: function() {
            this.$modal.show("emojiModal");
        },
        fillLocation: function(location, address, city) {
            this.evlocation=location;
            this.evstreet=address;
            this.evcity=city;
            this.showFinder=false;
        },
        goLocationFinder: function() {
            this.$refs.lf.doRender();
            this.showFinder=true;
        },
        insertEmoji: function(emoji) {
            this.newComment+=emoji;
            this.$modal.hide("emojiModal");
        },
        makeDate: function() {
          
            var fdate;
            var ds=this.evday.split('-');
            var dt = ds[2]+"-"+ds[0]+"-"+ds[1]+"T";
            
            if (this.evtime!==null && this.evtime!=="") {
                var pt=this.makeTime(this.evtime).split(":");
                
                var ah=0;
                if (this.evtime.indexOf(" PM")>-1) {
                    pt[0] = String(parseInt(pt[0])+12);
                }

                if (pt[0].length===1) {
                    pt[0]="0"+pt[0];
                }
                if (pt[1].length===1) {
                    pt[1]="0"+pt[1];
                }
                fdate= dt+pt[0]+":"+pt[1]+":"+pt[2];
            }
            else {
                fdate= dt+"00:00:00";
            }

            return new Date(fdate).getTime()+new Date(fdate).getTimezoneOffset();
    
        },
        makeTime: function() {
            var e=this.evtime;
            if (e.indexOf(" AM")>-1) {
               return e.replace(" AM","")+":00";
            }
            else {
                return e.replace(" PM","")+":00";
            }
        },
        parseTime: function(ti) {
            var tip = ti.split(":");
            var ap="AM";
            if (tip[0]>12) {
                ap="PM";
                tip[0]-=12;
            }
            return tip[0]+":"+tip[1]+" "+ap;
        },
        pickForUs: function() {
            this.showPick=true;
        },
        setPickForUs: function(t) {
             this.evday=t.date;
             this.evtime=this.parseTime(t.time);
             this.showPick=false;
             this.$forceUpdate();
        },
        showAddress: function() {
            this.$modal.show("addressModal");
        },

        submitComment: function() {
            this.btncomment=true;

            this.$http({
                method:'post',
                url:this.$hostname+'/addcomment',
                data: {
                    EventID: this.EventID,
                    EventGuestID: this.EGID,
                    ParentID: this.commentParent,
                    Comment: this.newComment
                }
            }).then(r=> {
                this.btncomment=false;
                this.$modal.hide("commentModal");

                if (r.status===200) {
                    if (r.data.status===200) {

                        var item =JSON.parse(r.data.message);

                        if (this.commentParent==="00000000-0000-0000-0000-000000000000") {
                            this.tev.Comments.push({
                                children: [],
                                item: item
                            })
                        }
                        else {
                            for(var x=0; x<this.tev.Comments.length; x++) {
                                if (this.tev.Comments[x].item.EventCommentID===item.ParentID) {
                                    this.tev.Comments[x].children.push({
                                        children: [],
                                item: item
                                    })                                    
                                }
                            }
                        }          

                        this.okMessage="Comment Added";
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
                    this.errorMessage="An error occurred while connecting to the service. Please check your internet connection";
                }
                
            })
        },
        verifyEmail: function(email) {
            var emailVerification = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
            if (!emailVerification.test(email)) {
                return "Email address is invalid";
            }
            return "OK";
        },
        verifyPhone: function(phone) {
            var phoneVerification = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
            if (!phoneVerification.test(phone)) {
                return "Phone number is invalid";
            }
            return "OK";
        },
    },
    mounted() {

        EventBus.$on("CommentReplyEvent", (ec) => {
            this.addComment(ec);
        })

        EventBus.$on("CommentReportEvent", (ec) => {
            this.doReport(ec);
        })

         var ev=null;
         var gu=null;
         this.imic=false;

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


         this.URL=encodeURI("https://schd.us/app/index.html#/event?e="+ev);

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
                        mic: this.imic                    
                    }
                }).then(r=> {
                    this.loading=false;

                    if (r.status===200) {
                        if (r.data.status===200) {                         
                            this.tev = JSON.parse(r.data.message);
                            this.evlength = this.tev.Schedules[0].EventLength;
                            this.needAcceptance = this.tev.NeedsAcceptance;

                            console.log(this.tev);
    
                         

                            if (this.tev.NeedsAcceptance===null) {
                                this.$refs.acc4.open();
                            }
                            else {
                                this.$refs.acc1.open();
                            }

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
          Acceptance: function() {
              if (this.tev!==null) {
                  return this.tev.Acceptance;
              }
              return false;
          },
          ActionReq: function() {
              if (this.tev!==null) {
                  return this.tev.ActionReq;
              }
              return 0;
          },
          AllowChildren: function() {
             if (this.tev!==null) {
                  return this.tev.AllowChildren;
              }
              return false;
          },
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
          CanRSVP: function() {
              if (this.tev!==null) {
                  return this.tev.ActionReq===1||this.tev.ActionReq===2;
              }
              return false;
          },
          CanShare: function() {
              if (this.tev!==null) {
                  return this.tev.ProvideSharing;
              }
              return false;
          },
          EGID: function() {
              if (this.tev!==null) {
                  return this.tev.EGID
              }
              return null;
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
          EventComments: function() {
              if (this.tev!==null) {
                  return this.tev.Comments;
              }
              return [];
          },
          EventDescription: function() {
              if (this.tev!==null) {
                  return this.tev.EventDescription;
              }
              return "";
          },
          EventID: function() {
              if (this.tev!==null) {
                  return this.tev.EventID;
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
          EventTime: function() {
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
                    var da = new Date(d.getTime()+parseInt(this.tev.Schedules[0].EventLength)*60000);
                    var ha = da.getHours();
                    var apa="AM";
                    if (ha>12) {
                        apa="PM";
                        ha-=12;
                    }
                    var minsa = da.getMinutes();
                    var dmina = String(minsa);
                    if (minsa<10) {
                        dmina="0"+dmina;
                    }

                    return h+":"+dmin+" "+ap+" - "+ha+":"+dmina+" "+apa;
                }
                return "";
          },
          Guests: function() {
              if (this.tev!==null) {
                  return this.tev.Guests;
              }
              return [];
          },
          IsOwner: function() {
              if (this.tev!==null) {
                  return this.tev.IsOwner;          
              }
              return false;
          },
          LinkedInURL: function() {
               return "https://www.linkedin.com/shareArticle?mini=true&source=LinkedIn&title="+encodeURIComponent(this.EventName)+"&url="+encodeURIComponent(this.URL);
          },
          MaxAttendees: function() {
              if (this.tev!==null) {
                  return this.tev.EventMaxCapacity;
              }
              return "Unknown";
          },
          MoreAllowed: function() {
              if (this.tev!==null) {
                  return this.tev.MoreAllowed;
              }
              return false;
          },
          NewAttendeesRSVP: function() {
              if (this.tev!==null) {
                  return this.tev.GuestsMustRegister;
              }
              return false;
          },
          Rescheduled: function() {
              if (this.tev!==null) {
                  return this.tev.Rescheduled;
              }
              return false;
          },
          RSVP: function() {
              if (this.tev!==null) {
                  return this.tev.GuestsCanBringOthers;
              }
              return false;
          },
          SeeRSVPs: function() {
              if (this.tev!==null) {
                  return this.tev.SeeRSVPed;
              }

              return false;
          },
          SuggestLocationStatus: function() {
              if (this.tev!==null) {
                  return "To reschedule: "+this.tev.SuggestedLocationsCount+" of "+Math.ceil(this.tev.Guests.length/2)+" required locations have been submitted"
              }
              return ""; 
          },
          SuggestTimeStatus: function() {
              if (this.tev!==null) {
                  return "To reschedule: "+this.tev.SuggestedTimesCount+" of "+Math.ceil(this.tev.Guests.length/2)+" required times have been submitted"
              }
              return ""; 
          },
          TwitterURL: function() {
              return "https://twitter.com/share?ref_src="+encodeURIComponent(this.URL);
          }
    }
}
</script>