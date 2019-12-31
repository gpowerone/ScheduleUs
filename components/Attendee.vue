<template>
    <div>
        <div v-show="guesterror!==null" class="errorBox">
            {{guesterror}}
        </div>

        <h1>Add or Edit Attendee</h1>

        <div class='fieldwell mt-2'>
                <label>Name</label><br />
                <input type='text' class='textfield' v-model='gname' />
        </div>
        <div class='fieldwell mt-2'>
             <input type='radio' value="p" v-model='isemail'/> Phone Number<br />
             <input type='radio' value="e" v-model='isemail' /> Email Address
        </div>
        <div class='fieldwell mt-2' v-show="isemail==='p'">
                <input type='text' class='textfield' v-model='gphone' />
        </div>
        <div class='fieldwell mt-2' v-show="isemail==='e'">
                <input type='text' class='textfield' v-model='gemail' />
        </div>
        <div class='layout row mt-2'>
            <div class='flex xs6 textleft'>
                <button @click="closeManualAddGuest" class="redButton">Cancel</button>
            </div>    
            <div class='flex xs6 textright'>
                <button @click="addEditGuest">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import {utilities} from '../mixins/utilities'

export default {
    name: "AddEditAttendee",
    mixins:[utilities],
    data: function() {
        return {
            cliemail:null,
            cliphone:null,
            guesterror:null,
            guestname:null,
            guestphone:null,
            guestemail:null,
            gname:"",
            gphone:"",
            gemail:"",
            isemail:"p"
        }
    },
    methods: {
        addEditGuest: function() {
            this.guesterror=null;

        
            if (this.gname.length<1 || this.gname.length>128) {
                this.guesterror="Guest name is required and should not be longer than 128 characters";
                return;
            }
           

            if (this.isemail==="p") {
               
               if (this.gphone===null) {
                    this.guesterror="Please enter valid phone number with area code in format NNN-NNN-NNNN";
                    return;
               }
               this.gphone=this.gphone.trim();
                if (this.gphone.length===0 || this.verifyPhone(this.gphone)!=="OK") {
                    this.guesterror="Please enter valid phone number with area code in format NNN-NNN-NNNN";
                    return;
                } 
                if (this.standardizePhone(this.gphone)===this.cliphone) {
                    this.guesterror="You cannot add yourself to the event this way";
                    return;
                }
                this.guestemail=null;
                this.guestphone=this.gphone;

            }
            else {

                if (this.gemail===null) {
                    this.guesterror="Please enter valid email address";
                    return;
               }
                this.gemail=this.gemail.trim();
                if (this.gemail.length===0 || this.verifyEmail(this.gemail)!=="OK") {
                    this.guesterror="Please enter valid email address";
                    return;
                }
                if (this.gemail===this.cliemail) {
                    this.guesterror="You cannot add yourself to the event this way";
                    return;
                }
                this.guestphone=null;
                this.guestemail=this.gemail;
            }

         
            this.guestname=this.gname;

            this.gname="";
            this.gphone="";
            this.gemail="";

            this.$parent.addEditGuest();
        },
        closeManualAddGuest: function() {

            this.gname=null;
            this.gphone=null;
            this.gemail=null;

            this.$parent.closeManualAddGuest();
        }
    }
}
</script>