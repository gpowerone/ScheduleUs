<template>
    <div>
        <div class='errorBox' v-show='isError!==null'>
            {{ isError }}
        </div>

        <h1>Contact Us</h1>

        <div v-show='isOK!==null' class='mt-2'>
            Thank you for your message, we will get back to you shortly
        </div>

        <div v-show='isOK===null'>
            <div class="fieldwell mt-3">
                <label>Your Name</label>
                <input type="text" class="textfield" v-model="yourname" />
            </div>
            <div class="fieldwell mt-3">
                <label>Contact Email</label>
                <input type="text" class="textfield" v-model="contactemail" />
            </div>
            <div class="fieldwell mt-3">
                <label>Contact Phone (optional)</label>
                <input type="text" class="textfield" v-model="contactphone" />
            </div>
            <div class="fieldwell mt-3">
                <label>Reason for Contact</label><br />
                <select v-model="contactreason" class="textfield">
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Sales">Sales/Licensing</option>
                </select>
            </div>
            <div class="fieldwell mt-3">
                <label>Details</label>
                <textarea rows="1" cols="1" class="textfield" v-model="contactdetails" />
            </div>
            <div class="fieldwell mt-3 textright">
                <button @click="doContact" :disabled="btncontact">Contact Us</button>
            </div>
        </div>
    </div>
</template>

<script>
import {utilities} from '../mixins/utilities'

export default {
    name: "ContactModule",
    mixins: [utilities],
    data() {
        return {
            yourname:"",
            btncontact:false,
            contactemail:"",
            contactphone:"",
            contactreason:"General Inquiry",
            contactdetails:"",
            isError:null,
            isOK:null
        }
    },
    mounted() {
        window.scrollTo(0,0);
    },
    methods: {
        doContact: function() {

            if (this.yourname.length===0) {
                this.isError="Your name is required";
                this.$forceUpdate();
                return;
            }

            if (this.contactemail.length===0) {
                this.isError="Contact email is required";
                this.$forceUpdate();
                return;
            }

            this.btncontact=true;

            this.$http({
                method:'post',
                url:this.$hostname+'/contact',
                data: {
                   YourName: this.yourname,
                   ContactEmail: this.contactemail,
                   ContactPhone: this.contactphone,
                   ContactReason: this.contactreason,
                   ContactDetails: this.contactdetails                  
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.isOK="Y";
                        this.isError=null;
                        this.$forceUpdate();
                    }
                    else {
                        this.isError=r.data.message;
                    }
                }
                else {
                    this.isError="An internet connection error occurred. Please check your connection";
                }
                this.btncontact=false;
            })

        }
    }
}
</script>