<style scoped>
 
   div#eventStepOne {
      margin-top:2vh;
   }

   div#stepOneRadio {
       margin-bottom:5%;
   }
 

</style>

<template>
    <div class="moduleWrapper">

        <h1>Schedule a New Event</h1>

        <div id='eventStepOne' v-show='formStep === 0'>

            <p class="notopmargin">Let's get some information to schedule your event.</p>

            <p><button @click="goToCreateAccount()" class="linkbtn">Create an account</button> or <button @click="goToLogIn()" class="linkbtn">log in</button> to make this process much faster!</p>

            <div id='stepOneRadio'>
                <input type='radio' id='knownEvent' name='eventDetails' v-model='knownEventType' value='haveKnownEvent' />&nbsp;I already have an event in mind<br />
                <input type='radio' id='unknownEvent' name='eventDetails' v-model='knownEventType' value='haveUnknownEvent' />&nbsp;I would like to find something to do
            </div>

            <div id='knownEventDiv' v-show="knownEventType === 'haveKnownEvent'">
                <div class='fieldwell xs-12' v-show="knownEventType !== 'unknownEvent'">
                    Your name (this will appear on the invitation):<br />
                    <input type='text' class='textfield' id='eventYourName' />
                </div>

                <div class='fieldwell xs-12'>
                    Name of the event (e.g. Jenn's birthday party):<br />
                    <input type='text' class='textfield' id='eventName' />
                </div>
                <div class='fieldwell xs-12'>
                    Event address/location:<br />
                    <input type='text' class='textfield' id='eventAddress' />
                </div>
                <div class="layout row">
                    <div class='fieldwell flex xs6'>
                        City:<br />
                        <input type='text' class='textfield' id='eventCity' />
                    </div>
                    <div class='fieldwell flex xs2 ml-2'>
                        State:<br />
                        <select class="textfield">
                            <option value="--">-Choose-</option>
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
                        Zip:<br />
                        <input type='text' class='textfield' id='eventZip' />
                    </div>
                </div>
            </div>
            <div id='unknownEventDiv' v-show="knownEventType === 'haveUnknownEvent'">
                Code to find an event goes here
            </div> 
        
           

            <div class='buttonwell mt-3 textcenter'>
                <button v-show="knownEventType !== 'unknownEvent'" @click='goStepTwo'>Choose a time for your event -></button>
            </div>
            <p class='mt-3 textcenter'><button @click="goToAbout()" class="linkbtn">Learn about Schedule Us</button></p>
        </div>

        <div id='eventStepTwo' v-show='formStep === 1'>
            <h1>Who should attend?</h1>   
            <p>You may invite people to attend the event here. If you choose to allow open signup then you will be given a link to share for others to sign up on their own.</p>  
            <p>
                <button v-show="isCordovaApp === true" @click='loadContacts'>Load From Contacts</button>
            </p>
        </div>

        <div id='eventStepThree' v-show='formStep === 2'>
            <div id='stepThreeRadio'>
                <input type='radio' id='knownDate' name='dateDetails' v-model='eventDateType' value='exact' />&nbsp;I know exactly when I want to have my event<br />
                <input type='radio' id='unknownDate' name='dateDetails' v-model='eventDateType' value='range' />&nbsp;I want to specify different times and have Schedule Us suggest the best one<br />
                <input type='radio' id='unknownDate' name='dateDetails' v-model='eventDateType' value='flexible' />&nbsp;Schedule Us can pick the best for my event time on it's own
                
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data: function() {
        return {
            formStep: 0,
            eventDateType: 'unknownTime',
            knownEventType: 'unknownEvent'      
        }
    },
    methods: {
        contactFailure: function() {
         
        },
        contactSuccess: function() {

        },
        goStepTwo: function() {
            this.formStep=1;
        },
        goToLogIn: function() {
            this.$router.push('auth');
        },
        goToAbout: function() {
            this.$router.push('about');
        },
        goToCreateAccount: function() {
            this.$router.push('signup');
        },
        loadContacts: function() {
            var options      = {};
            options.filter   = "*";
            options.multiple = true;
            options.desiredFields = [navigator.contacts.fieldType.id];
            options.hasPhoneNumber = true;
            var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
            navigator.contacts.find(fields, this.contactSuccess, this.contactFailure, options);
        }
    }
}
</script>