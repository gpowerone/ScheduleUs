<template>
    <div id='groupManager'>
        <div id='loading' class='loadingImg' v-show="formStep===-1">
            <img src="@/assets/loading.gif" />
        </div>

        <div v-show="errorMessage!==null" class="errorBox">
            {{errorMessage}}
        </div>
        <div v-show="okMessage!==null" class="okBox">
            {{okMessage}}
        </div>

        <modal name="confirmDelete" width="300" height="150">
            <div class="p2">
                <h3>Delete Group</h3>
                <div class="mt-2">
                    Are you sure you wish to delete this group? You cannot recover it once deleted.
                </div>
                <div class="mt-2 layout row">
                    <div class="flex xs6">
                        <button @click="cancelDeleteGroup()">Cancel</button>
                    </div>
                    <div class="flex xs6 textright">
                        <button @click="confirmDeleteGroup()">Confirm</button>
                    </div>
                </div>
            </div>
        </modal>

        <modal name="confirmRemoveMember" width="300" height="150">
             <div class="p2">
                <h3>Delete Member</h3>
                <div class="mt-2">
                    Are you sure you wish to remove this member? You cannot recover it once deleted.
                </div>
                <div class="mt-2 layout row">
                    <div class="flex xs6">
                        <button @click="cancelRemoveGroupMember()">Cancel</button>
                    </div>
                    <div class="flex xs6 textright">
                        <button @click="doRemoveGroupMember()">Confirm</button>
                    </div>
                </div>
            </div>

        </modal>

        <div v-show="formStep===0">
            <h1 v-show="headers===true">Edit Groups</h1>   
                
            <div v-show="groups.length===0" class="mt-2">
                <div>
                    You have no groups
                </div>
                <div class="mt-2 layout row">
                     <div class="flex xs6">
                        <button @click="closeGroupManager()">Close</button>
                    </div>
                    <div class="flex xs6 textright">
                        <button @click="createGroup()">Create Group</button>
                    </div>
                </div>
            </div>

            <div v-show="groups.length>0">
                <v-list>
                    <template v-for="(item, i) in groups">
                        <v-list-item :key="i">
                            <div class='layout row btop p4'>   
                                <div class='flex xs8 lg10 md10 textleft fieldwell spfield'>
                                    <v-icon>group</v-icon>&nbsp;&nbsp;<span>{{item.GroupName}}</span>
                                </div>
                                <div class="flex xs2 lg1 md1 textright">
                                    <v-icon @click="doEditGroup(item)">edit</v-icon>
                                </div>
                                 <div class="flex xs2 lg1 md1 textright">
                                    <v-icon @click="doRemoveGroup(item)">remove_circle_outline</v-icon>
                                </div>
                            </div>
                        </v-list-item>
                    </template>
                </v-list>
                <div class="mt-2 layout row">
                    <div class="flex xs6">
                        <button @click="closeGroupManager()">Close</button>
                    </div>
                    <div class="flex xs6 textright">
                        <button @click="createGroup()">Create Group</button>
                    </div>
                </div>
            </div>
        </div>  

        <div id='createGroup' v-show="formStep===1">
            <h1 v-show="headers===true">Create Group</h1>
            <div class="mt-2 fieldwell">
                <label>Group Name</label><br />
                <input type="text" v-model="newgroupname" class="textfield" />
            </div>
            <div class="mt-2 layout row">
                <div class="flex xs6">
                    <button @click="returnToGroupManager()">Cancel</button>
                </div>
                <div class="flex xs6 textright">
                    <button @click="doCreateGroup(null)">Create Group</button>
                </div>
            </div>
        </div>

        <div id='editGroup' v-show="formStep===2">
            <h1 v-show="headers===true">Edit Group</h1>
            <div class="mt-2 fieldwell">
                <label>Group Name:</label>&nbsp;&nbsp; <input type="text" v-model="groupName" class="textfield" />
            </div>
           


            <h4 class="mt-2">Group Members:</h4>
            <div class='guestlist mt-1 p2'>
                      
                <div class='guestlistcontents'>

                    <div class="spfield" @click='addToGroup()'>
                        <v-icon>person_add</v-icon>&nbsp;<span>Add</span>
                    </div>

                    <div class="mt-2" v-show="members.length===0">
                         There are no group members yet
                    </div>

                    <v-list v-show="members.length>0">
                        <template v-for="(item, i) in members">
                            <v-list-item :key="i">
                                <div class='layout row btop p4'>
                                    <div class='flex xs2 pl2 relative' @click="editGroupMember(item)">
                                        <div v-if="item.photo!==null">
                                            <div class="vertical-center">
                                                <img :src="item.photo" class="imgcircle" alt="photo" width="30" height="30" />
                                            </div>
                                        </div>
                                        <div v-if="item.photo===null">
                                                <avatar class="vertical-center" size="50" :username="item.gname" v-show="imageloaded[i]===false"></avatar>
                                                <img v-bind:src="imageurl[i]" v-show="imageurl[i]!==null&&imageloaded[i]===true" @load="loadedImage(i)" style="border-radius:50%;" width=50 height=50 />
                                        </div>
                                    </div>
                                    <div class='flex xs9 textleft fieldwell indented1 spfield mt-2' @click="editGroupMember(item)">
                                        {{item.gname}}
                                    </div>
                                     <div class="flex xs1 textcenter mt-2">
                                    <v-icon @click="removeGroupMember(item)">remove_circle_outline</v-icon>
                                </div>
                                </div>
                            </v-list-item>
                        </template>
                    </v-list>
                </div>
            </div>

             <div class="mt-2 layout row">
                <div class="flex xs6">
                    <button @click="returnToGroupManager()">Cancel</button>
                </div>
                <div class="flex xs6 textright">
                    <button @click="saveEditGroup()">Save</button>
                </div>
            </div>
        </div>
        <div class='manualaddguest mt-2 p2' v-show="formStep === 3">
            <addeditattendee ref="aeAttendee"></addeditattendee>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../bus';
import {utilities} from '../mixins/utilities'
import Avatar from 'vue-avatar'
import addeditattendee from '@/components/Attendee'

export default {
    name: "Group Manager",
    components: {Avatar,addeditattendee},
    mixins: [utilities],
    data() {
        return {
            editgid: null,
            editmode: false,
            errorMessage:null,
            formStep: -1,
            gid:null,        
            groupName:null,
            groupID:null,
            groups:[],
            imageloaded:[],
            imageurl:[],
            members:[],
            newgroupname: null,
            okMessage:null
        }
    },
    props: ['passheaders'],
    computed: {
        headers: function() {
            if (typeof(this.passheaders)!=="undefined") {
                return this.passheaders;
            }
            else {
                return true;
            }
        }
    },
    methods: {
        addFromGroup: function() {

            this.$http({
                method:'post',
                url:this.$hostname+'/getgroupsforclient',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r")
            }}).then(r=>{
                if (r.status===200 && r.data.status===200) {
                    if (r.data.message!=="NOGROUPS") {
                        this.groups=JSON.parse(r.data.message);
                    }
                    else {
                        this.groups=[];
                    }
                }
                else {
                    this.errorMessage="Could not contact backend service";
                }

                this.formStep=0;
                this.$forceUpdate();
            })        
        },
        addEditGuest: function() {


            if (this.editmode===false) {
                this.doAddToGroup();
            }
            else {
                this.doEditGroupMember();
            }
        
        },
        addToGroup: function() {
            this.formStep=3;
            this.editmode=false;
        },
        cancelDeleteGroup: function() {
            this.$modal.hide("confirmDelete");
        },
        cancelRemoveGroupMember: function() {
            this.$modal.hide("confirmRemoveMember");
        },
        closeGroupManager: function() {
            EventBus.$emit("CloseGroupManagerEvent");
        },
        closeManualAddGuest: function() {
            this.formStep=2;
        },
        confirmDeleteGroup: function() {
            this.$modal.hide("confirmDelete");

            this.$http({
                method:'post',
                url:this.$hostname+'/removegroup',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"), 
                    ClientGroupID: this.groupID
            }}).then(r=>{
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.okMessage="Group successfully removed";
                        var self=this;
                        window.setTimeout(function() {
                            self.okMessage=null;
                        },3000) 
                        this.addFromGroup();
                    }
                    else {
                        this.errorMessage=r.data.message;
                    }
                }
                else {
                    this.errorMessage="Could not contact backend service";
                }
            });
        },
        createGroup: function() {
            this.formStep=1;
        },
        doAddToGroup: function(name,phone,email) {
              this.$http({
                method:'post',
                url:this.$hostname+'/addtogroup',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    ClientGroupID: this.groupID,
                    Client: {
                        Name: this.$refs.aeAttendee.guestname,
                        PhoneNumber: this.$refs.aeAttendee.guestphone,
                        EmailAddress: this.$refs.aeAttendee.guestemail
                    }
            }}).then(r=>{
                if (r.status===200) {
                    if (r.data.status===200) {

                        this.imageloaded.push(false);
                        this.imageurl.push("https://avatars.schd.us/"+r.data.message);

                        this.members.push({
                            gid: r.data.message, 
                            gname: this.$refs.aeAttendee.guestname,
                            gphone: this.$refs.aeAttendee.guestphone,
                            gemail: this.$refs.aeAttendee.guestemail,
                            greq: false,
                            photo: null
                        });

                        this.okMessage="Added member to group";
                        var self=this;
                        window.setTimeout(function() {
                            self.okMessage=null;
                        },3000) 
                        
                        this.doEditGroup({
                            ClientGroupID: this.groupID,
                            GroupName: this.groupName
                        });
                    }
                    else {
                        this.errorMessage=r.data.message;

                        this.formStep=2;
                        this.$forceUpdate();
                    }
                }
                else {
                    this.errorMessage="Could not contact backend service";

                    this.formStep=2;
                    this.$forceUpdate();
                }
            })        
        },
        doCreateGroup: function(clients) {
            if (clients===null) {
                clients=[];
            }
            if (this.newgroupname.length===0 || this.newgroupname.length>128) {
                this.errorMessage="Group name is too short or too long";
                return;
            }

            this.$http({
                method:'post',
                url:this.$hostname+'/addgroup',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"), 
                    GroupName: this.newgroupname,
                    Clients: clients
            }}).then(r=>{
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.newgroupname=""; 
                        this.addFromGroup();
                    }
                    else {
                        this.errorMessage=r.data.message;
                    }
                }
                else {
                    this.errorMessage="Could not contact backend service";
                }
            });
        },
        doEditGroup: function(item) {

            this.errorMessage=null;
            this.groupName=item.GroupName;
            this.groupID=item.ClientGroupID;
            this.members=[];
            this.imageurl=[];
            this.imageloaded=[];

            this.$http({
                method:'post',
                url:this.$hostname+'/getclientsforgroup',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"), 
                    ClientGroupID: item.ClientGroupID
            }}).then(r=>{
                if (r.status===200 && r.data.status===200) {
                     if (r.data.message!=="NOCLIENTS") {
                       
                        var clients=JSON.parse(r.data.message);
                        for(var x=0; x<clients.Clients.length; x++) {

                            this.imageloaded.push(false);

                            if (clients.Clients[x].ClientID!==null) {
                                this.imageurl.push("https://avatars.schd.us/"+clients.Clients[x].ClientID);
                            }
                            else {
                                this.imageurl.push(null);
                            }

                            this.members.push({
                                gid: clients.Clients[x].ClientGroupClientID, 
                                gname: clients.Clients[x].Name,
                                gphone: clients.Clients[x].PhoneNumber,
                                gemail: clients.Clients[x].EmailAddress,
                                greq: false,
                                photo: null
                            });
                        }

                        this.formStep=2;
                     }
                     else {
                         this.formStep=2;
                     }
                    
                }
                else {
                    this.errorMessage="Could not contact backend service";
                    this.formStep=2;
                }
            })        
 
        },
        doEditGroupMember: function() {
             this.$http({
                method:'post',
                url:this.$hostname+'/editgroupmember',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"),
                    ClientGroupClientID: this.editgid,
                    Name: this.$refs.aeAttendee.guestname,
                    PhoneNumber: this.$refs.aeAttendee.guestphone,
                    EmailAddress: this.$refs.aeAttendee.guestemail               
            }}).then(r=>{
                if (r.status===200) {
                    if (r.data.status===200) {
           
                        this.okMessage="Edited member";
                        var self=this;
                        window.setTimeout(function() {
                            self.okMessage=null;
                        },3000)  

                        this.doEditGroup({
                            ClientGroupID: this.groupID,
                            GroupName: this.groupName
                        });
                    }
                    else {
                        this.errorMessage=r.data.message;

                        this.formStep=2;
                        this.$forceUpdate();
                    }
                }
                else {
                    this.errorMessage="Could not contact backend service";

                    this.formStep=2;
                    this.$forceUpdate();
                }
            })        
        },
        doRemoveGroup: function(item) {
            this.errorMessage=null;
            this.groupID=item.ClientGroupID;
            this.$modal.show("confirmDelete");
        },
        doRemoveGroupMember: function() {
            this.errorMessage=null;
            this.$modal.hide("confirmRemoveMember");

            this.$http({
                method:'post',
                url:this.$hostname+'/removefromgroup',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"), 
                    ClientGroupClientID: this.gid,
                    ClientGroupID: this.groupID
            }}).then(r=>{
                 if (r.status===200) {
                    if (r.data.status===200) {
                        this.okMessage="Removed member from group";
                        var self=this;
                        window.setTimeout(function() {
                            self.okMessage=null;
                        },3000) 
 
                        this.doEditGroup({
                            ClientGroupID: this.groupID,
                            GroupName: this.groupName
                        });
                    }
                    else {
                        this.errorMessage=r.data.message;
                    }
                }
                else {
                    this.errorMessage="Could not contact backend service";
                }
            });
        },
        editGroupMember: function(item) {
            this.$refs.aeAttendee.gname=item.gname;
            this.$refs.aeAttendee.gphone=item.gphone===null?"":item.gphone;
            this.$refs.aeAttendee.gemail=item.gemail===null?"":item.gemail;
             if (item.gemail!==null) {
                this.$refs.aeAttendee.isemail='e';
            }
            this.editgid=item.gid;
            this.formStep=3;
            this.editmode=true;
        },
        loadedImage: function(i) {
            this.imageloaded[i]=true;
            this.$forceUpdate();
        },
        removeGroupMember: function(item) {
            this.gid=item.gid;
            this.$modal.show("confirmRemoveMember");
        },
        returnToGroupManager: function() {
            this.errorMessage=null;
            this.formStep=0;
        },
        saveEditGroup: function() {
             this.$http({
                method:'post',
                url:this.$hostname+'/editgroupname',
                data: {
                    ClientID: localStorage.getItem("_c"),
                    SessionID: localStorage.getItem("_s"),
                    SessionLong: localStorage.getItem("_r"), 
                    GroupName: this.groupName,
                    ClientGroupID: this.groupID
            }}).then(r=>{
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.okMessage="Group name successfully changed";
                        var self=this;
                        window.setTimeout(function() {
                            self.okMessage=null;
                        },3000) 
                         this.errorMessage=null;
                         this.formStep=0;
                         this.addFromGroup();
                    }
                    else {
                        this.errorMessage=r.data.message;
                    }
                }
                else {
                    this.errorMessage="Could not contact backend service";
                }
            });
        }
    }
}
</script>