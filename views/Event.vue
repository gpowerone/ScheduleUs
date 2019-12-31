<template>
    <div class="moduleWrapper">
         <div id='loading' class='loadingImg' v-show='loading===true'>
            <img src="@/assets/loading.gif" />
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

        <modal name="calendarAdd" width="300" height="325">
            <div class="p2">
                <div v-show="hasgoogcalendar===true">
                    <div class="mt-2 layout row" @click="addToGoogleCalendar()" style="cursor:pointer;">
                        <div class="flex xs3 textcenter">
                             <img src="@/assets/Google.png" alt="Google" />
                        </div>
                        <div class="flex xs9 fieldwell boldchoice mt-1">
                             Google<br />
                             Calendar
                        </div>
                    </div>
                </div>
                <div v-show="hasgoogcalendar===false">
                    <div class="mt-2 layout row" @click="doOUIGoogle()" style="cursor:pointer;">
                        <div class="flex xs3 textcenter">
                             <img src="@/assets/Google.png" alt="Google" />
                        </div>
                        <div class="flex xs9 fieldwell boldchoice mt-1">
                             Google<br />
                             Calendar
                        </div>
                    </div>
                </div>
                <div class="mt-2 layout row" @click="doOUIYahoo()" style="cursor:pointer;">
                    <div class="flex xs3 textcenter">
                        <img src="@/assets/Yahoo.png" alt="Yahoo" />
                    </div>
                    <div class="flex xs9 fieldwell boldchoice mt-1">
                            Yahoo<br />
                            Calendar
                    </div>
                </div>
                <div class="mt-2 layout row" @click="doOUIiCal()" style="cursor:pointer;">
                    <div class="flex xs3 textcenter">
                        <img src="@/assets/ical.png" alt="iCal" />
                    </div>
                    <div class="flex xs9 fieldwell boldchoice mt-1">
                            iCal
                    </div>
                </div>
                <div class="mt-2 layout row" @click="doOUIOutlook()" style="cursor:pointer;">
                    <div class="flex xs3 textcenter">
                        <img src="@/assets/Outlook.png" alt="Outlook" />
                    </div>
                    <div class="flex xs9 fieldwell boldchoice mt-1">
                            Outlook
                    </div>
                </div>
             
            </div>
        </modal>

        <modal name="commentModal" width="300" height="275">
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
                <div class='mt-2'>
                     By commenting, you agree to our <a href='/termsofservice'>Terms of Service</a> and <a href='/privacypolicy'>Privacy Policy</a>
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

        <modal name="confirmCancel" width="300" height="175">
            <div class="p2">
                <h1>Confirm Cancel Event</h1>
                <div class="mt-2">
                    Are you sure you wish to cancel this event? Attendees will receive a message indicating they have been uninvited.
                </div>
                <div class="mt-2 layout row">
                    <div class="flex xs6 textleft">
                        <button @click="undoEventCancel()">Do Not Cancel</button>
                    </div>
                    <div class="flex xs6 textright">
                        <button @click="confirmEventCancel()" class="redButton">Cancel Event</button>
                    </div>
                </div>
            </div>
        </modal>

        <modal name="emojiModal" width="300" height="400">
            <div class="scrollbox">
                 <emojipicker></emojipicker>
            </div>
        </modal>

        <modal name="recurringModal" width="300" height="250">
            <div class="p2 textcenter">
                <p>Event Will Occur Every {{RecurFreq}} {{RecurUnit}}</p>
                <p>{{RecurTime}}</p>
                <p>Each time this event occurs a new message will be sent out to attendees</p>
                <button @click="recurCloseModal()">Close</button>
            </div>
        </modal>

        <modal name="reportModal" width="300" height="175">
            <div class="p2">
                <div>
                If this content is in violation of the Schedule Us <a href='/termsofservice'>Terms of Service</a> then it will be removed by a moderator. Are you sure you wish to make this report?
                </div>
                
                <div class="mt-3 layout row">
                    <div class="flex xs6">
                        <button @click="closeReportModal()" class="redButton">Close</button>
                    </div>
                    <div class="flex xs6 textright">
                        <button @click="doReportComment()">Report Comment</button>
                    </div>
                </div>
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
                </div>
            </div>
        </modal>

        <div v-show="noevent===true">
            <h1 class="textcenter">Event Not Found</h1>
            <div class="mt-2 textcenter fieldwell">This event may have passed already or may have been cancelled :(</div>
            <div class="mt-3">
                <div class="textcenter fieldwell">
                Planning a get together?<br />Use <span class="schdusPurple">Schedule Us</span> to make it much easier!
                </div>
                <div class="mt-2 textcenter">
                    <button class="schdusButton" @click="goHome()">Learn More</button>
                </div>
            </div>
        </div>

        <div v-show="tev!==null&&showFinder===false&&showPick===false" class="fieldwell">
            <div class="layout row" style="border-bottom:1px dashed #777" v-show="IsOwner==true"> 
                <div class="flex xs8 lg11 textleft spfield fieldwell" style="padding-top:5px;padding-bottom:5px;" @click="goToMyEvents()">
                    <v-icon>keyboard_backspace</v-icon> <span>Return to My Events</span>
                </div>
                <div class="flex xs4 lg1 textright" v-show="IsPast===false">
                    <v-icon class="editicon" @click="doEventUpdate()">edit</v-icon>&nbsp;&nbsp;
                    <v-icon class="editicon" @click="doEventCancel()">remove_circle_outline</v-icon>
                </div>
                
            </div>
            
            <div class="layout row">
                <div class="flex xs12 mt-2">
                    <h1>{{EventName}}</h1>
                </div>
                  
            </div>
            <div v-show="CanRSVP===true">
                <div v-show="Rescheduled===true">*** Event Has Been Changed ***</div>
                <div>{{EventDescription}}</div>
            
                <div class="layout row mt-2">
                    <div class="flex xs6 lg10 md10">
                        <div>
                            {{EventLocation}}
                        </div>
                        <div v-show="IsMultiDay===false">
                            <div>{{EventDate}}</div>
                            <div>{{EventTime}}</div>
                        </div>
                        <div v-show="IsMultiDay===true">
                            <div class="mt-2">
                                {{EventMultiDate}}
                            </div>            
                        </div>
                        
                    </div>

                    <div class="flex xs6 lg2 md2">
                        <div class="layout row">
        
                            <div class="flex xs4 lg4 textright"><a v-show="HasAddress===true" @click="showAddress()" class="eventicons"><v-icon>map</v-icon></a></div>
                            <div class="flex xs4 lg4 textright"><a v-show="HasAddress===true" v-bind:href="EventMap" target="_blank" class="eventicons" rel="nopener noreferrer"><v-icon>navigation</v-icon></a></div>
                            <div class="flex xs4 lg4 textright"><a @click="addToCalendar()" class="eventicons" ><v-icon>event</v-icon></a></div>
                        </div>
                        
                        
                    </div>
                </div>
                <div class="mt-2" v-show="RSVP===true">
                    Share: {{URL}} 
                </div>
                <div class="layout row mt-2">
                    <div class="flex xs6 textleft">
                        <div v-show="IsRecurring===true">
                            <a href="javascript:void(0)" @click="showRecurring()">Event Will Happen Again</a>
                        </div>
                    </div>
                    <div class="flex xs6 textright">
                       <a href="javascript:void(0)" @click="addToCalendar()">Add to Calendar</a>
                    </div>
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

                    <v-collapse-wrapper @onStatusChange="acc4s" v-show="RSVP===true&&needAcceptance===null" ref="acc4">
                        <div class="accheader" v-collapse-toggle>
                            <v-icon>{{ acc4i }}</v-icon> <span>RSVP</span>
                        </div>
                        <div class="acccontent fieldwell" v-collapse-content>
                            <div v-show="MoreAllowed===true">
                                <div>
                                    The host is allowing for additional attendees
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
                                This event is at maximum capacity. No additional attendees are allowed.
                            </div>
                        </div>
                    </v-collapse-wrapper>

                    <v-collapse-wrapper @onStatusChange="acc2s" v-show="CanRelocate===true" ref="acc2">
                        <div class="accheader" v-collapse-toggle>
                            <v-icon>{{ acc2i }}</v-icon> <span>Suggest New Location</span>
                        </div>
                        <div class="acccontent fieldwell" v-collapse-content>

                            <div v-show="locLoading===true" class="loadingMod">
                                <img src="@/assets/loading.gif" />
                            </div>
                            <div v-show="locLoading===false">

                                <div class='boldchoice'>
                                    {{suglocations}}
                                </div>
                                <div class='mt-2'>
                                    The host has allowed you to suggest a new location for the event.
                                </div>
                                <div class='fieldwell xs-12 mt-2'>
                                    <label>Location</label>
                                
                                    <div class="spfield textcenter p2 grayborder" v-show="imic===true" @click="goLocationFinder()">
                                        <v-icon>location_on</v-icon>&nbsp;<span>Find a Location</span>
                                    </div>
                                                                    
                                    <div class='mt-2'>
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
                        </div>
                    </v-collapse-wrapper>

                    <v-collapse-wrapper @onStatusChange="acc3s" v-show="CanReschedule===true" ref="acc3">
                        <div class="accheader" v-collapse-toggle>
                            <v-icon>{{ acc3i }}</v-icon> <span>Suggest New Date/Time</span>
                        </div>
                        <div class="acccontent fieldwell" v-collapse-content>

                            <div v-show="timeLoading===true" class="loadingMod">
                                <img src="@/assets/loading.gif" />
                            </div>
                            <div v-show="timeLoading===false">
                                <div class='boldchoice'>
                                    {{sugtimes}}
                                </div>
                                <div class='mt-2'>
                                    The host has allowed you to suggest a new date/time for the event. 
                                </div>

                                <div class="fieldwell mt-3">
                                    <label>Date:</label>
                                    <datetime format="MM-DD-YYYY" v-model="evday"></datetime>
                                </div>
                                <div class="fieldwell mt-3">
                                    <label>Time:</label>
                                    <datetime format="h:i" v-model="evtime" ></datetime>
                                </div>
                                <div class="mt-2 fieldwell layout row">
                                    <div class="flex xs6">
                                        <button class='schdusButton' @click='pickForUs'>Help Me Pick a Time</button>
                                    </div>
                                    <div class="flex xs6 textright">
                                        <button @click="doTimeChange" :disabled="btntimechange">Submit</button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-collapse-wrapper>

                    <v-collapse-wrapper @onStatusChange="acc1s" ref="acc1">
                        <div class="accheader" v-collapse-toggle>
                            <div class="layout row">
                                <div class="flex xs12">
                                    <v-icon>{{ acc1i }}</v-icon> <span>Attendees</span>
                                </div>
                            </div>
                        </div>
                        <div class="acccontent" v-collapse-content>
                            <div v-show="guests.length===0">
                                The attendee list is hidden
                            </div>
                            <v-list v-show="guests.length>0" >
                                <template v-for="(item, i) in guests">
                                    <v-list-item :key="i">
                                        <div class='layout row p4'>
                                            <div class='flex xs1 lg1 md1 pl2 relative mt-3' v-show='SeeRSVPs===true'>
                                                <div class='greenicon' v-show="item.Acceptance===true">
                                                    <v-icon>check</v-icon>
                                                </div>
                                                <div class='redicon' v-show="item.Acceptance===false">
                                                    <v-icon>close</v-icon>      
                                                </div>                                         
                                            </div>
                                            <div class='flex xs3 lg1 md1 pl4 relative' style='height:50px;'>            
                                                 <img src="@/assets/SilverCrown.png" width="36" class="crowningAround" v-show="item.Flair===1"  alt="Premium User" />                         
                                                 <img src="@/assets/GoldCrown.png" class="crowningAround"  v-show="item.Flair===2" width="36" alt="Pro User" />                  
                                                <avatar class="vertical-center" size="50" :username="item.GuestName" v-show="imageloaded[i]===false"></avatar>   
                                                <img style="border-radius:50%;" v-bind:src="imageurl[i]" v-show="imageurl[i]!==null&&imageloaded[i]===true" @load="loadedImage(i)" width=50 height=50 />                        
                                            </div>
                       
                                            <div class='flex xs8 lg9 md9 textleft fieldwell indented1 spfield p12 mt-2'>
                                                <div class="boldchoice">{{item.GuestName}}</div>
                                                <div v-show="IsOwner===true" v-html="iContact(item)"></div>
                                            </div>
                                        </div>
                                    </v-list-item>
                                </template>
                            </v-list>
                        </div>
                    </v-collapse-wrapper>

                

                    <v-collapse-wrapper @onStatusChange="acc6s" v-show="CanChat===true" ref="acc6" >
                        <div class="accheader" v-collapse-toggle>
                            <v-icon>{{ acc6i }}</v-icon> <span>Conversation</span>
                        </div>
                        <div class="acccontent" v-collapse-content>

                            <div v-show="commentsLoading===true" class="loadingMod">
                                <img src="@/assets/loading.gif" />
                            </div>
                            <div v-show="commentsLoading===false">
                                <div v-show="evcomments.length===0">
                                    <div>
                                        There are no comments
                                    </div>
                                    <div class="mt-2" v-show="imic===true||hasGU===true">
                                        <a @click="addComment(null)" class="spfield"><img src="@/assets/greenPlus.png" height="20" width="20" />&nbsp;&nbsp;<span>Add Comment</span></a>
                                    </div>
                                </div>
                                <div v-show="evcomments.length>0">
                                    <div class="mt-2 mb-2 textright" v-show="imic===true||hasGU===true">
                                        <a @click="addComment(null)" class="spfield"><img src="@/assets/greenPlus.png" height="20" width="20" />&nbsp;&nbsp;<span>Add Comment</span></a>
                                    </div>
                                <comments v-for="(node,n) in evcomments" v-bind:key="n" :comment="node.item" :children="node.children"></comments> 
                                </div>
                            </div>
                                                
                        </div>
                    </v-collapse-wrapper>

                </v-collapse-group> 

                <div v-show="CanShare===true" class="mt-2 accheader p2 textcenter" >
                        <a v-bind:href="TwitterURL" class="twitter-share-button" data-show-count="false"><img src="@/assets/TwitterIcon.png" alt="Tweet" width="30" height="30" /></a>  
                        &nbsp;&nbsp;<a v-bind:href="LinkedInURL"><img src="@/assets/LIIcon.png" width="30" height="30" alt="Share on Linked In" /></a> 
                        &nbsp;&nbsp;<a v-bind:href="FacebookURL"><img src="@/assets/Facebook.png" width="30" height="30" alt="Share on Facebook" /></a>  
                        &nbsp;&nbsp;<a v-bind:href="PinterestURL"><img src="@/assets/Pinterest.png" width="30" height="30" alt="Share on Pinterest" /></a>
                        &nbsp;&nbsp;<a v-bind:href="EmailURL"><img src="@/assets/Mail.png" width="30" height="30" alt="Share via Email" /></a>                      
                </div>
            </div>
            <div v-show="CanRSVP===false">
                 <div v-show="IsOwner===true">
                    <div class="mt-2">
                        Accept or reject the schedule changes:
                    </div>
                    <div class="mt-2">
                            {{EventLocation}}
                    </div>
                     <div v-show="IsMultiDay===false">
                        <div>{{EventDate}}</div>
                        <div>{{EventTime}}</div>
                     </div>
                     <div v-show="IsMultiDay===true">
                        <div class="mt-2">
                             {{EventMultiDate}}
                        </div>            
                     </div>
                     <div class="layout row mt-2">
                         <div class="flex xs6 textleft">
                             <button @click="rejectChanges()" class="redButton">Reject</button>
                         </div>
                         <div class="flex xs6 textright">
                             <button @click="acceptChanges()">Accept</button>
                        </div>
                     </div>
                </div>
                <div v-show="IsOwner===false" class="mt-2">
                    Schedule changes have been submitted to the host for review. The event page will become available again once these changes have been approved or rejected.
                </div>
            </div>
        </div>

        <div v-show="showFinder===true">
              <locationfinder ref="lf"></locationfinder>
        </div>

        <div v-show="showPick===true">
              <pickforus ref="pt"></pickforus>
        </div>

        <div class="accheader" v-show="tev!==null&&Owner===false">
            <div class="textcenter fieldwell">
                Planning a get together?<br />Use <span class="schdusPurple">Schedule Us</span> to make it much easier!
            </div>
            <div class="mt-2 textcenter">
                <button class="schdusButton" @click="goHome()">Learn More</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
 .eventicons i {
     font-size:2.5rem;
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
     color:#444;
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
import {utilities} from '../mixins/utilities'

export default {
    name: "Event",
    components: {Avatar, emojipicker, locationfinder, datetime, pickforus, comments},
    mixins: [utilities],
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
            commentsLoading: true,
            currentec:null,
            errorMessage: null,
            evcomments:[],
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
            hasgoogcalendar:false, 
            hasGU:false,
            imageloaded:[],
            imageurl:[],
            imic: null,
            input: '',
            loading: true,
            locLoading: true,
            needAcceptance: false,
            newComment: '',
            noevent: false,
            okMessage: null,
            search: '',
            showFinder: false,
            showPick: false,
            suglocations: "",
            sugtimes:"",
            RecurFreq:null, 
            RecurUnit:null, 
            RecurTime:null,
            timeLoading: true,
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
                this.suggestedLocations();
            }
        },
        acc3s: function() {

            if (this.acc3i==="expand_more") {
                this.acc3i="expand_less";
            }
            else {
                this.acc3i="expand_more";
                this.suggestedTimes();
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
                   this.commentsOpened();
            }
        },
        acceptChanges: function() {
            this.$http({
                method:'post',
                url:this.$hostname+'/acceptchanges',
                data: {
                    EventID: this.tev.EventID,
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r")         
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                       this.okMessage="Changes accepted";
                        var self=this;
                        window.setTimeout(function() {
                            self.okMessage=null;
                            window.location.reload();
                        },3000) 
                    }
                    else {
                        this.errorMessage=r.data.message;
                    }
                }
                else {
                    this.errorMessage="Error contacting backend service";
                }
            });
        },
        addComment: function(ec) {
            this.newComment=null;

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
                    gphone:  this.guestphone             
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
        addToCalendar: function() {
             this.$http({
                method:'post',
                url:this.$hostname+'/getclientcalendars',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r")
                }
            }).then(r=> {
                if (r.status===200 && r.data.status===200) {
                    if (r.data.message.length>0) {
                        this.hasgoogcalendar=true;
                    }
                }
              
                this.$modal.show("calendarAdd");           
            });

            
        },
        addToGoogleCalendar: function() {

            this.errorMessage=null;
            var address=this.EventLocation+" "+this.EventAddress+" "+this.EventCity+", "+this.EventState+" "+this.EventZip;

            this.$http({
                method:'post',
                url:this.$hostname+'/addtogooglecalendar',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    EventName: this.tev.EventName,
                    EventAddr: address,
                    EventStartDate: this.makeStartDate(),
                    EventEndDate: this.makeEndDate(),
                    EventDesc: this.tev.EventDescription
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                        
                        this.okMessage="Event successfully added to your Google calendar";
                        var self=this;
                        window.setTimeout(function() {
                            self.okMessage=null;
                            window.location.reload();
                        },3000) 
                    }
                    else {
                        this.errorMessage=r.data.message;
                    }
                }
                else {
                    this.errorMessage="Error connecting to backend";
                }

                this.$modal.hide("calendarAdd");
                   
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
        closeReportModal: function() {
            this.$modal.hide("reportModal");
        },
        commentsOpened: function() {
             this.commentsLoading=true;

             this.$http({
                method:'post',
                url:this.$hostname+'/getcomments',
                data: {
                    EventID: this.tev.EventID
                }
            }).then(r=> {
                if (r.status===200 && r.data.status===200) {
                    this.evcomments=JSON.parse(r.data.message);
                }
                this.commentsLoading=false;
            });
        },
        confirmEventCancel: function() {
             this.$modal.hide("confirmCancel");

             this.$http({
                method:'post',
                url:this.$hostname+'/cancelevent',
                data: {
                    EventID: this.tev.EventID,
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r")
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.$router.push("dashboard");
                    }
                    else {
                        this.errorMessage=r.data.message;
                    }
                }
                else {
                    this.errorMessage="Error contacting backend service";       
                }
            });
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

            if (this.evlocation.length>255) {
                this.errorMessage="Street address is invalid";
                this.evstreetfe="errorHighlight";
                return false;
            }

            if (this.evcity.length>64) {
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
                            this.errorMessage="You have already suggested a new location. You may suggest another new location if/when the event is rescheduled."   
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
        doOUI: function() {
            return {
                title: this.tev.EventName,
                start: new Date(parseInt(this.tev.Schedules[0].StartDate)),
                end: this.EventMultiDate===true?new Date(parseInt(this.tev.Schedules[0].EndDate)):null,
                duration: this.tev.Schedules[0].EventLength,
                address: this.tev.Schedules[0].Address+" "+this.tev.Schedules[0].City+", "+this.tev.Schedules[0].State+" "+this.tev.Schedules[0].PostalCode,
                description: this.tev.EventDescription
            }
        },
        doOUIGoogle: function() {
            window.location=this.google(this.doOUI());
        },
        doOUIYahoo: function() {
            window.location=this.yahoo(this.doOUI());
        },
        doOUIiCal: function() {
            window.location=this.ical(this.doOUI());
        },
        doOUIOutlook: function() {
            window.location=this.outlook(this.doOUI());
        },
        doReport: function(ec) {
            this.currentec=ec;
            this.$modal.show("reportModal");
        },
        doReportComment: function() {

            this.$http({
                method:'post',
                url:this.$hostname+'/reportcomment',
                data: {
                    EventCommentID: this.currentec         
                }
            }).then(r=> {
                if (r.status===200 && r.data.status===200) {
                    this.okMessage="This comment has been reported to our moderation team for review";
                    var self=this;
                    window.setTimeout(function() {
                        self.okMessage=null;
                        window.location.reload();
                    },3000) 
                }
                else {
                    this.errorMessage="An unexpected error occurred";
                }

                 this.$modal.hide("reportModal");
            });

           
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
                    EvTime: this.makeDate(this.evday,this.evtime)         
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
                             this.errorMessage="You have already suggested a new time. You may suggest another new time if/when the event is rescheduled."  
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
        doEventCancel: function() {
            this.$modal.show("confirmCancel");
        },
        doEventUpdate: function() {
            this.$router.push("update?e="+this.tev.Hash);
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
        goHome: function() {
            this.$router.push("/");
        },
        goLocationFinder: function() {
            this.$refs.lf.doRender();
            this.showFinder=true;
        },
        goToMyEvents: function() {
            this.$router.push("/dashboard");
        },
        goToMyAccount: function() {
            this.$router.push("/myaccount");
        },
        iContact: function(it) {
            try {
                if (it.PhoneNumber!==null && it.PhoneNumber.length>0) {
                    return this.formatPhone(it.PhoneNumber);
                }
                else {
                    return it.EmailAddress;
                }
            }
            catch(e) {
                return ""; 
            }
        },
        insertEmoji: function(emoji) {
            if (this.newComment===null) {
                this.newComment=""; 
            }
            this.newComment+=emoji;
            this.$modal.hide("emojiModal");
        },
        loadedImage: function(i) {
            this.imageloaded[i]=true;
            this.$forceUpdate();
        },
        makeEndDate: function() {
              var d = null;
              if (this.EventMultiDate) {
                 d = new Date(parseInt(this.tev.Schedules[0].EndDate));
              }
              else {
                 d = new Date(parseInt(this.tev.Schedules[0].StartDate)+(this.tev.Schedules[0].EventLength*60*1000));
              }
              var i = d.toISOString();
              var p = i.split(".");
              var o = d.getTimezoneOffset()/60;
              var po=null;
              if (o<10) {
                  po="0"+"0";
              }
              else {
                  po=o;
              }

              if (o>0) {
                return p[0]+"-"+po+":00";
              }
              else {
                return p[0]+"+"+po+":00";
              }
        },
        makeStartDate: function() {
              var d = new Date(parseInt(this.tev.Schedules[0].StartDate));
              var i = d.toISOString();
              var p = i.split(".");
              var o = d.getTimezoneOffset()/60;
              var po=null;
              if (o<10) {
                  po="0"+"0";
              }
              else {
                  po=o;
              }

              if (o>0) {
                return p[0]+"-"+po+":00";
              }
              else {
                return p[0]+"+"+po+":00";
              }
             
        },
        pickForUs: function() {
            var _guests=[];
            for (var x=0; x<this.tev.Guests.length; x++) {
                _guests.push({cid: this.tev.Guests[x].ClientID});
            }
            this.$refs.pt.setGuests(_guests);

            this.showPick=true; 
        },
        recurCloseModal: function() {
            this.$modal.hide("recurringModal");
        },
        rejectChanges: function() {
              this.$http({
                method:'post',
                url:this.$hostname+'/rejectchanges',
                data: {
                    EventID: this.tev.EventID,
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r")         
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                       this.okMessage="Changes rejected";
                        var self=this;
                        window.setTimeout(function() {
                            self.okMessage=null;
                            window.location.reload();
                        },3000) 
                    }
                    else {
                        this.errorMessage=r.data.message;
                    }
                }
                else {
                    this.errorMessage="Error contacting backend service";
                }
            });
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
        showRecurring: function() {
            this.$http({
                method:'post',
                url:this.$hostname+'/getrecurringinfo',
                data: {
                    EventID: this.EventID
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                        var e = JSON.parse(r.data.message);
                        this.RecurFreq = e.Frequency;
                        this.RecurUnit=e.IsMonthly?" Month(s)":" Week(s)";
                        this.RecurTime="Day and time will change every event";
                        if (e.Day!==null) {
                            var dayofweek="";
                            switch(e.Day) {
                                case 1: dayofweek="Monday"; break;
                                case 2: dayofweek="Tuesday"; break;
                                case 3: dayofweek="Wednesday"; break;
                                case 4: dayofweek="Thursday"; break;
                                case 5: dayofweek="Friday"; break;
                                case 6: dayofweek="Saturday"; break;
                                case 7: dayofweek="Sunday"; break;
                            }

                            if (e.IsMonthly) {
                                this.RecurTime="Happens on "+dayofweek+" of Week "+e.Week+" at "+e.Time+" (local time)";
                            }
                            else {
                                this.RecurTime="Happens on "+dayofweek+" at "+e.Time+" (local time)";
                            }
                        }
                        this.$modal.show("recurringModal");
                    }
                    else {
                        this.errorMessage="An unexpected error occurred";
                    }
                }
                else {
                    this.errorMessage="Error contacting backend service";
                }
            })
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
                            this.evcomments.push({
                                children: [],
                                item: item
                            })
                        }
                        else {
                            for(var x=0; x<this.evcomments.length; x++) {
                                if (this.evcomments[x].item.EventCommentID===item.ParentID) {
                                    this.evcomments[x].children.push({
                                        children: [],
                                        item: item
                                    })                                    
                                }
                            }
                        }          
                        this.$forceUpdate();

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
        suggestedLocations: function() {
            this.locLoading=true;

            this.$http({
                method:'post',
                url:this.$hostname+'/getsuggestedlocations',
                data: {
                    EventID: this.tev.EventID,
                    IterationNum: this.tev.Schedules[0].IterationNum
                }
            }).then(r=> {
                if (r.status===200 && r.data.status===200) {
                    var loccnt = JSON.parse(r.data.message);
                    this.suglocations="At least "+Math.ceil(this.tev.Guests.length/2)+" attendees must request a location change to change locations. "+loccnt.length+" requests have been received."
                }
                this.locLoading=false;
            });

        },
        suggestedTimes: function() {
            this.timeLoading=true;

            this.$http({
                method:'post',
                url:this.$hostname+'/getsuggestedtimes',
                data: {
                    EventID: this.tev.EventID,
                    IterationNum: this.tev.Schedules[0].IterationNum
                }
            }).then(r=> {
                if (r.status===200 && r.data.status===200) {
                    var loccnt = JSON.parse(r.data.message);
                    this.sugtimes="At least "+Math.ceil(this.tev.Guests.length/2)+" attendees must request a time change to change times. "+loccnt.length+" requests have been received."
                }
                this.timeLoading=false;
            });
        },
        undoEventCancel: function() {
            this.$modal.hide("confirmCancel");
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

        /*OUI calendar functions*/
        google: function(event) {
            var startTime = this.formatTime(event.start);
            var endTime = this.calculateEndTime(event);

            var href = encodeURI([
                'https://www.google.com/calendar/render',
                '?action=TEMPLATE',
                '&text=' + (event.title || ''),
                '&dates=' + (startTime || ''),
                '/' + (endTime || ''),
                '&details=' + (event.description || ''),
                '&location=' + (event.address || ''),
                '&sprop=&sprop=name:'
            ].join(''));
            
            return href;
        },

        yahoo: function(event) {
            var eventDuration = event.end ?
                ((event.end.getTime() - event.start.getTime())/ 60000) :
                event.duration;

            var yahooHourDuration = eventDuration < 600 ?
                '0' + Math.floor((eventDuration / 60)) :
                Math.floor((eventDuration / 60)) + '';

            var yahooMinuteDuration = eventDuration % 60 < 10 ?
                '0' + eventDuration % 60 :
                eventDuration % 60 + '';

            var yahooEventDuration = yahooHourDuration + yahooMinuteDuration;

            // Remove timezone from event time
            var st = this.formatTime(new Date(event.start - (event.start.getTimezoneOffset() *
                                                        60000))) || '';

            var href = encodeURI([
                'http://calendar.yahoo.com/?v=60&view=d&type=20',
                '&title=' + (event.title || ''),
                '&st=' + st,
                '&dur=' + (yahooEventDuration || ''),
                '&desc=' + (event.description || ''),
                '&in_loc=' + (event.address || '')
            ].join(''));

            return href;
        },

        ics: function(event, eClass, calendarName) {
            var startTime = this.formatTime(event.start);
            var endTime = this.calculateEndTime(event);

            var href = encodeURI(
                'data:text/calendar;charset=utf8,' + [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'BEGIN:VEVENT',
                'URL:' + document.URL,
                'DTSTART:' + (startTime || ''),
                'DTEND:' + (endTime || ''),
                'SUMMARY:' + (event.title || ''),
                'DESCRIPTION:' + (event.description || ''),
                'LOCATION:' + (event.address || ''),
                'END:VEVENT',
                'END:VCALENDAR'].join('\n'));

            return href;
        },
       
        ical: function(evnt) {
            return this.ics(evnt, 'icon-ical', 'iCal');
        },

        outlook: function(evnt) {
            return this.ics(evnt, 'icon-outlook', 'Outlook');
        },

        formatTime: function(date) {
            return date.toISOString().replace(/-|:|\.\d+/g, '');
        },

        calculateEndTime: function(event) {
            return event.end ?
            this.formatTime(event.end) :
            this.formatTime(new Date(event.start.getTime() + (event.duration * 60000)));
        }
        
    },
    mounted() {

        window.scrollTo(0,0);

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

        try {
          if (gu!==null&&gu.length>0) {
             this.hasGU=true;
          }
        }
        catch(e) {}


         this.URL=encodeURI("https://schd.us/event?e="+ev);

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

                            for(var x=0; x<this.tev.Guests.length; x++) {
                                this.imageloaded.push(false);
                                if (this.tev.Guests[x].ClientID!==null) {
                                    this.imageurl.push("https://avatars.schd.us/"+this.tev.Guests[x].ClientID);
                                }
                                else {
                                    this.imageurl.push(null);
                                }
                            }

                            if (this.tev.NeedsAcceptance===null) {
                                if (this.RSVP===true&&this.needAcceptance===null&&this.CanRSVP===true) {
                                    this.$refs.acc4.open();
                                }
                                else {
                                    this.$refs.acc1.open();
                                }
                            }
                            else {
                                this.$refs.acc1.open();
                            }

                            if (this.CanChat===true) {
                                this.$refs.acc6.open();
                            }

                        }
                        else {
                            this.noevent=true;
                        }
                    }
                    else {
                         this.novevent=true;
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
                  return this.tev.AllowLocationChange&&this.imic!==true&&this.hasGU===true;
              }
              return false;
          },
          CanReschedule: function() {
              if (this.tev!==null) {
                  return this.tev.AllowReschedule&&this.imic!==true&&this.hasGU===true;
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
          EventMultiDate: function() {
                if (!this.IsMultiDay) return "";

                var d = new Date(parseInt(this.tev.Schedules[0].StartDate));

                var mth="";
                switch(d.getMonth()) {
                    case 0: mth="Jan"; break;
                    case 1: mth="Feb"; break;
                    case 2: mth="Mar"; break;
                    case 3: mth="Apr"; break;
                    case 4: mth="May"; break;
                    case 5: mth="Jun"; break;
                    case 6: mth="Jul"; break;
                    case 7: mth="Aug"; break;
                    case 8: mth="Sep"; break;
                    case 9: mth="Oct"; break;
                    case 10: mth="Nov"; break;
                    case 11: mth="Dec"; break;
                }

                var h = d.getHours();
                var ap="AM";
                if (h===0) {
                    h=12;
                }
                else if (h===12) {
                    ap="PM";
                }
                if (h>12) {
                    ap="PM";
                    h-=12;
                }
                var mins = d.getMinutes();
                var dmin = String(mins);
                if (mins<10) {
                    dmin="0"+dmin;
                }
                var da = new Date(parseInt(this.tev.Schedules[0].EndDate));

                var dmth="";
                switch(da.getMonth()) {
                    case 0: dmth="Jan"; break;
                    case 1: dmth="Feb"; break;
                    case 2: dmth="Mar"; break;
                    case 3: dmth="Apr"; break;
                    case 4: dmth="May"; break;
                    case 5: dmth="Jun"; break;
                    case 6: dmth="Jul"; break;
                    case 7: dmth="Aug"; break;
                    case 8: dmth="Sep"; break;
                    case 9: dmth="Oct"; break;
                    case 10: dmth="Nov"; break;
                    case 11: dmth="Dec"; break;
                }

                var ha = da.getHours();
                var apa="AM";
                if (ha===0) {
                    ha=12;
                }
                else if (ha===12) {
                    apa="PM";
                }
                if (ha>12) {
                    apa="PM";
                    ha-=12;
                }
                var minsa = da.getMinutes();
                var dmina = String(minsa);
                if (minsa<10) {
                    dmina="0"+dmina;
                }

                return mth +" "+d.getDate()+", "+d.getFullYear()+" "+h+":"+dmin+" "+ap+" - "+ dmth +" "+da.getDate()+", "+da.getFullYear()+" "+ha+":"+dmina+" "+apa;
          },
          EventTime: function() {
                if (this.tev!==null) { 
                    var d = new Date(parseInt(this.tev.Schedules[0].StartDate));
                    var h = d.getHours();
                    var ap="AM";
                    if (h===0) {
                        h=12;
                    }
                    else if (h===12) {
                        ap="PM";
                    }
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
                    if (ha===0) {
                        ha=12;
                    }
                    else if (ha===12) {
                        apa="PM";
                    }
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
          guests: function() {
              if (this.tev!==null) {
                  return this.tev.Guests;
              }
              return [];
          },
          HasAddress: function() {
              if (this.tev===null) {
                  return false;
              }

              if (this.tev.Schedules[0].Address.length>0 || this.tev.Schedules[0].City.length>0 || this.tev.Schedules[0].PostalCode.length>0) {
                  return true;
              }
              return false;
          },
          IsMultiDay: function() {
              if (this.tev!==null) {
                  return this.tev.Schedules[0].EventLength===-1;
              }
              return false;
          },
          IsPast: function() {
              if (this.tev!==null) {
                  if (this.tev.Schedules[0].StartDate<new Date().getTime()) {
                      return true;
                  }
              }
              return false;
          },
          IsOwner: function() {
              if (this.tev!==null) {
                  return this.tev.IsOwner;          
              }
              return false;
          }, 
          IsRecurring: function() {
              if (this.tev!==null) {
                  return this.tev.IsRecurring;
              }
              return false;
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
                  return this.tev.Reschedule;
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
          EmailURL: function() {
              return "mailto:their_address@address.com?&subject="+this.EventName+"&body=Please join me at "+encodeURIComponent(this.EventName)+". For more information: "+encodeURIComponent(this.URL);
          },
          FacebookURL: function () {
              return "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(this.URL);
          },
          LinkedInURL: function() {
              return "https://www.linkedin.com/shareArticle?mini=true&source=LinkedIn&title="+encodeURIComponent(this.EventName)+"&url="+encodeURIComponent(this.URL);
          },
          PinterestURL: function() {
              return "https://pinterest.com/pin/create/button/?url="+encodeURIComponent(this.URL)+"&media=&description="+encodeURIComponent(this.EventName);
          },
          TwitterURL: function() {
              return "https://twitter.com/home?status="+encodeURIComponent(this.URL)+" "+encodeURIComponent(this.EventName);
          }
    }
}
</script>