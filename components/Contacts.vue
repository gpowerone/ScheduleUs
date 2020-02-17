<template>
   <div class="manualaddguest">

        <modal name="detailsSelect" width="90%" height="70%">
            <div class="p2">
                <div class="mt-2" style="height:50px;position:relative">
                     <div v-if="selectedContact.hasimage!==null">
                        <div class="textcenter" style="padding-top:5px;">
                            <img :src="selectedContact.hasimage" class="imgcircle" style="border-radius:50%;" alt="photo" width="50" height="50" />
                        </div>
                    </div>
                    <div v-if="selectedContact.hasimage===null">
                         <avatar style="margin: 0 auto;" :username="selectedContact.cname" size="50"></avatar>
                    </div>
                </div>
                <div class="textcenter mt-3">
                    <b>{{selectedContact.cname}}</b>
                </div>
                <div class="textcenter mt-2" style="border-top:1px solid gray;">
                    Choose from one of the phone numbers or email addresses below. Phone numbers must be able to receive texts for invitation to work.
                </div>
                <template v-for="(cmi, cm) in selectedContact.contactMatrix"  class="mt-2" v-show="selectedContact.contactMatrix.length>0">
                      <v-list-item :key="cm">
                          <div class="layout row mt-2">
                              <div class="flex xs8 textleft fieldwell">
                                  {{cmi.ntype}}<br />
                                  {{cmi.nvalue}}
                              </div>
                              <div class="flex xs4 textright">
                                  <button @click="chooseContact(cm)">Select</button>
                              </div>
                          </div>
                      </v-list-item>
                </template>
                <div class="mt-2 textcenter" v-show="selectedContact.contactMatrix.length===0">
                     No Contact Phone Numbers or Email Addresses Found
                </div>
                <div class="mt-2 textleft">
                    <button @click="closeModal()" class="redButton">Close</button>
                </div>
            </div>
        </modal>

        <div class="layout row p2">
            <div class="flex xs12 textright">
                <button class="redButton" @click="closeContacts">Close</button>
            </div>
           
        </div>
        
        <v-list class="nopadding">
            <div class="fieldwell p2">
                Search:&nbsp;&nbsp;<input class="textfield" v-model="csearch" @input="e => csearch = e.target.value">
            </div>
            <div v-show="contacts.length===0" class="mt-2 mb-2 textcenter">
                    No contacts found
            </div>
            <template v-for="(item, i) in contacts" v-show="contacts.length>0">
                <v-list-item :key="i" >
                    <div  @click="selectContact(item)">
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
                                {{item.cname}}                                                    
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
import {utilities} from '../mixins/utilities'

export default {
    name: "Contacts",
    components: {Avatar},
    mixins:[utilities],
    data() {
        return {
            csearch: null,
            contacts: [],
            selectedContact: {
                hasimage: false,
                cname: "",
                contactMatrix: [] 
            },
            visiblehidecontacts:[]
        }
    },
    methods: {
        chooseContact: function(i) {

            this.selectedContact.email=null;
            this.selectedContact.phone=null;

            var it = this.selectedContact.contactMatrix[i];
            if (it.ntype==="email address") {
                this.selectedContact.email=it.nvalue;
            }
            else {
                this.selectedContact.phone=it.nvalue;
            }

            this.$modal.hide("detailsSelect");
            this.$parent.saveContacts();
        },
        closeContacts: function() {
            this.$parent.closeContacts();
        },
        closeModal: function() {
            this.$modal.hide("detailsSelect");
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

                var cm=[];
                var ctcname=ctcs[i].name.formatted;
    
        
                if (typeof(ctcs[i].emails)!=="undefined" && ctcs[i].emails!==null && ctcs[i].emails.length>0) {
                    for(var q=0; q<ctcs[i].emails.length; q++) {
                        cm.push({ntype: "email address", nvalue:ctcs[i].emails[0].value});
                    }
                }
        
                if (typeof(ctcs[i].phoneNumbers)!=="undefined" && ctcs[i].phoneNumbers!==null && ctcs[i].phoneNumbers.length>0) {
                    for (var x=0; x<ctcs[i].phoneNumbers.length; x++) {
                       
                        try {
                            var ctcphone = ctcs[i].phoneNumbers[0].value.replace("+","").replace("(","").replace(")","");
                            if (this.verifyPhone(ctcphone)==="OK") {
                                cm.push({ntype: ctcs[i].phoneNumbers[x].type, nvalue:ctcphone});
                            }
                        }
                        catch(e) {
                     
                        }
                                  
                    }
                }
            
         
                var hasimage=null;
          
                if (typeof(ctcs[i].photos)!=="undefined" && ctcs[i].photos!==null && ctcs[i].photos.length>0) {                    
                    hasimage=window.Ionic.WebView.convertFileSrc(ctcs[i].photos[0].value);                           
                }
            

                if (ctcname!==null)
                {
                    this.contacts.push({
                        cname: ctcname,                   
                        hasimage: hasimage,                     
                        contactMatrix: cm
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
     
        selectContact: function(item) {
            this.selectedContact=item;

            this.$modal.show("detailsSelect")
            
            
        }
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

            val=val.trim();
   
            for(var y=0; y<this.visiblehidecontacts.length; y++) {
                if (this.visiblehidecontacts[y].cname!==null && this.visiblehidecontacts[y].cname.toLowerCase().indexOf(val.toLowerCase())>-1 ) {
                    this.contacts.push(this.visiblehidecontacts[y]);
                }
            }
        }
    }
}
</script>