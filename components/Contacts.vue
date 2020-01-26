<template>
   <div class="manualaddguest">
        <div class="layout row p2">
            <div class="flex xs6 textleft">
                <button class="tanButton" @click="closeContacts">Close</button>
            </div>
            <div class="flex xs6 textright">
                <button class="modifiedNormal" @click="saveContacts">Done</button>
            </div>
        </div>
        
        <v-list class="nopadding">
            <div class="fieldwell p2">
                Search:&nbsp;&nbsp;<input class="textfield" v-model="csearch">
            </div>
            <div v-show="contacts.length===0" class="mt-2 mb-2 textcenter">
                    No contacts found
            </div>
            <template v-for="(item, i) in contacts" v-show="contacts.length>0">
                <v-list-item :key="i" >
                    <div v-bind:class="{ selectedTile: item.isselected }" @click="selectContact(item)">
                        <div class='layout row btop p4'>
                            <div class='flex xs2 pl2 relative'>
                                <div v-if="item.hasimage!==null">
                                    <div class="vertical-center" style="padding-top:5px;">
                                        <img :src="item.hasimage" class="imgcircle" style="border-radius:50%;" alt="photo" width="50" height="50" />
                                    </div>
                                </div>
                                <div v-if="item.hasimage===null">
                                        <avatar class="vertical-center" :username="item.cname" size="50"></avatar>
                                </div>
                            </div>
                            <div class='flex xs10 textleft fieldwell indented1 spfield mt-1'>
                                {{item.cname}}<br />
                                <span v-show="item.cphone!==null&&item.cphone.length>0">Phone: {{item.cphone}}<br /></span>
                                <span v-show="item.cemail!==null&&item.cemail.length>0">Email: {{item.cemail}}</span>                                     
                            </div>
                        </div>
                    </div>
                </v-list-item>
            </template>
        </v-list>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
    name: "Contacts",
    components: {Avatar},
    data() {
        return {
            csearch: null,
            contacts: [],
            selectOneMode: false,
            visiblehidecontacts:[]
        }
    },
    methods: {
        closeContacts: function() {
            this.$parent.closeContacts();
        },
        compareContacts: function( a, b ) {
            if ( a.cname < b.cname ){
                return -1;
            }
            if ( a.cname > b.cname ){
                return 1;
            }
            return 0;
        },
        contactFailure: function() {
            this.$parent.closeContacts();
            window.alert("Could not load contacts. Please give Schedule Us contact permissions in your settings.");
        },
        contactSuccess: function(ctcs) {
            this.contacts=[];

            for (var i=0; i<ctcs.length; i++) {

                var ctcname=null;
                var ctcemail=null;
                var ctcphone=null;
        
                ctcname = ctcs[i].name.formatted;
                 
                if (typeof(ctcs[i].emails)!=="undefined" && ctcs[i].emails!==null && ctcs[i].emails.length>0) {
                    ctcemail = ctcs[i].emails[0].value;
                }
        
                if (typeof(ctcs[i].phoneNumbers)!=="undefined" && ctcs[i].phoneNumbers!==null && ctcs[i].phoneNumbers.length>0) {
                    for (var x=0; x<ctcs[i].phoneNumbers.length; x++) {
                        if (ctcs[i].phoneNumbers[x].type==="mobile") {
                            ctcphone = ctcs[i].phoneNumbers[0].value;
                            break;
                        }
                    }
                }
         
                var hasimage=null;
          
                if (typeof(ctcs[i].photos)!=="undefined" && ctcs[i].photos!==null && ctcs[i].photos.length>0) {                    
                    hasimage=window.Ionic.WebView.convertFileSrc(ctcs[i].photos[0].value);                           
                }
            

                if (ctcname!==null && (ctcemail!==null || ctcphone!==null))
                {
                    this.contacts.push({
                        cname: ctcname,
                        cemail: ctcemail,
                        cphone: ctcphone,
                        hasimage: hasimage,
                        isselected: false
                    })
                }      
            } 

            this.contacts.sort(this.compareContacts);
            this.visiblehidecontacts=[];
            for(var y=0; y<this.contacts.length; y++) {
                this.visiblehidecontacts.push(this.contacts[y]);
            }

            this.$forceUpdate();
            window.scrollTo(0,0);
        },
        loadContacts: function() {
            var options      = {};
            options.filter   = "";
            options.multiple = true;
            options.desiredFields = [navigator.contacts.fieldType.id, navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name, navigator.contacts.fieldType.phoneNumbers, navigator.contacts.fieldType.emails, navigator.contacts.fieldType.photos];
            var fields  = [navigator.contacts.fieldType.displayName];
            navigator.contacts.find(fields, this.contactSuccess, this.contactFailure, options);
        },
        saveContacts: function() {
            this.$parent.saveContacts();
        },       
        selectContact: function(item) {
            if (this.selectOneMode===true) {
                for(var x=0; x<this.contacts.length; x++) {
                    this.contacts[x].isselected=false;
                }
            }

            item.isselected=!item.isselected;
            
        },
    },
    watch: {
         csearch: function(val) {
            this.contacts=[]; 
            if (val===null || val.length===0) {     
                for(var x=0; x<this.visiblehidecontacts.length; x++) {
                     this.contacts.push(this.visiblehidecontacts[x]);                   
                }
                return;
            }

   
            for(var y=0; y<this.visiblehidecontacts.length; y++) {
                if (this.visiblehidecontacts[y].cname!==null && this.visiblehidecontacts[y].cname.toLowerCase().indexOf(val.toLowerCase())>-1 ) {
                    this.contacts.push(this.visiblehidecontacts[y]);
                }
            }
        }
    }
}
</script>