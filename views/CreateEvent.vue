<style scoped>
   div#eventWrapper {
      padding:5%;
   }

   div#eventStepOne {
      margin-top:10%;
   }

   div#stepOneRadio {
       margin-bottom:5%;
   }

   input.textfield {
       border:1px solid gray;
       width:80%;
   }

   button {
       background:green;
       color:#FFF;
       padding:2%;
   }

   .fieldwell {
        margin-top:2%;
   }

   .buttonwell {
       margin-top:4%;
   }

</style>

<template>
    <div id='eventWrapper'>

        <div id='eventAccountBanner'>
            <a href='/auth'>Create an account or login</a> to create events faster and/or to create recurring events
        </div>

        <h1>Create New Event</h1>

        <div id='eventStepOne' v-show='formStep === 0'>
            <div id='stepOneRadio'>
                <input type='radio' id='knownEvent' name='eventDetails' v-model='knownEventType' value='haveKnownEvent' />&nbsp;I already have an event in mind<br />
                <input type='radio' id='unknownEvent' name='eventDetails' v-model='knownEventType' value='haveUnknownEvent' />&nbsp;I would like to find something to do
            </div>

            <div id='knownEventDiv' v-show="knownEventType === 'haveKnownEvent'">
                <div class='fieldwell'>
                    Name of the event (e.g. Jenn's birthday party):<br />
                    <input type='text' class='textfield' id='eventName' />
                </div>
                <div class='fieldwell'>
                    Event address/location:<br />
                    <input type='text' class='textfield' id='eventAddress' />
                </div>
                <div class='fieldwell'>
                    City:<br />
                    <input type='text' class='textfield' id='eventCity' />
                </div>
                <div class='fieldwell'>
                    State:<br />
                    <input type='text' class='textfield' id='eventState' />
                </div>
                <div class='fieldwell'>
                    Zip:<br />
                    <input type='text' class='textfield' id='eventZip' />
                </div>
            </div>
            <div id='unknownEventDiv' v-show="knownEventType === 'haveUnknownEvent'">
                Code to find an event goes here
            </div> 
        
            <div class='fieldwell' v-show="knownEventType !== 'unknownEvent'">
                Your name (this will appear on the invitation):<br />
                <input type='text' class='textfield' id='eventYourName' />
            </div>

            <div class='buttonwell'>
                <button v-show="knownEventType !== 'unknownEvent'" @click='goStepTwo'>Choose a time for your event -></button>
            </div>
        </div>

        <div id='eventStepTwo' v-show='formStep === 1'>
            <h2>Who should come to this event?</h2>     
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
            console.log("failure");
        },
        contactSuccess: function() {
            console.log("success");
        },
        goStepTwo: function() {
            this.formStep=1;
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