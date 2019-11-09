<template>
    <div id='groupManager'>
        <div id='loading' v-show="formStep===-1">
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

        <div id='addFromGroup' v-show="formStep===0">
            <h1>Add from Group</h1>   
                
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
                                <div class='flex xs10 textleft fieldwell spfield' @click="doAddFromGroup(item)">
                                    <v-icon>group</v-icon>&nbsp;&nbsp;<span>{{item.GroupName}}</span>
                                </div>
                                <div class="flex xs1 textcenter">
                                    <v-icon @click="doEditGroup(item)">edit</v-icon>
                                </div>
                                 <div class="flex xs1 textcenter">
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
            <h1>Create Group</h1>
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
            <h1>Edit Group</h1>
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
                                                <img v-bind:src="imageurl[i]" v-show="imageurl[i]!==null&&imageloaded[i]===true" @load="loadedImage(i)" width=50 height=50 />
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

            <div v-show="guesterror!==null" class="errorBox">
                {{guesterror}}
            </div>

            <h1>Add/Edit Group Member</h1>

            <div class='fieldwell mt-2'>
                    <label>Name</label><br />
                    <input type='text' class='textfield' v-model='guestname' />
            </div>
            <div class='fieldwell mt-2'>
                    <label>Phone</label><br />
                    <input type='text' class='textfield' v-model='guestphone' />
            </div>
            <div class='fieldwell mt-2'>
                    <label>Email</label><br />
                    <input type='text' class='textfield' v-model='guestemail' />
            </div>
            <div class='layout row mt-2'>
                <div class='flex xs6 textleft'>
                    <button @click="closeManualAddGuest" class="tanButton">Cancel</button>
                </div>
                <div class='flex xs6 textright'>
                    <button @click="addGuest" class="tanButton">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../bus';
import {utilities} from '../mixins/utilities'
import Avatar from 'vue-avatar'

export default {
    name: "Group Manager",
    components: {Avatar},
    mixins: [utilities],
    data() {
        return {
            editgid: null,
            editmode: false,
            errorMessage:null,
            formStep: -1,
            gid:null,
            guestname:"",
            guestphone:"",
            guestemail:"",
            guesterror:null,
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
                }
                else {
                    this.errorMessage="Could not contact backend service";
                }

                this.formStep=0;
            })        
        },
        addGuest: function() {

            this.guesterror=null;

            if (this.guestname.length<1 || this.guestname.length>128) {
                this.guesterror="Guest name is required and should not be longer than 128 characters";
                this.$forceUpdate();
                return;
            }
            if (this.guestphone.length<1 && this.guestemail.length<1) {
                this.guesterror="Either guest phone number or email address are required";
                this.$forceUpdate();
                return;
            }
            if (this.guestphone.length>0 && this.verifyPhone(this.guestphone)!=="OK") {
                this.guesterror="Please enter valid phone number with area code in format NNN-NNN-NNNN";
                this.$forceUpdate();
                return;
            } 
            if (this.guestemail.length>0 && this.verifyEmail(this.guestemail)!=="OK") {
                this.guesterror="Please enter valid email address";
                this.$forceUpdate();
                return;
            }

            if (this.guestphone.length<1) {
                this.guestphone="Not Specified";
            }
            if (this.guestemail.length<1) {
                this.guestemail="Not Specified";
            }

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
        doAddFromGroup: function(item) {

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
                        EventBus.$emit("DoAddFromGroupEvent",JSON.parse(r.data.message));
                     }
                     else {
                         this.errorMessage="This group has no members and cannot be added";
                     }
                }
                else {
                    this.errorMessage="Could not contact backend service";
                }

         
            })        

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
                        Name: this.guestname,
                        PhoneNumber: this.guestphone,
                        EmailAddress: this.guestemail
                    }
            }}).then(r=>{
                if (r.status===200) {
                    if (r.data.status===200) {

                        this.imageloaded.push(false);
                        this.imageurl.push("https://avatars.schd.us/"+r.data.message);

                        this.members.push({
                            gid: r.data.message, 
                            gname: this.guestname,
                            gphone: this.guestphone,
                            gemail: this.guestemail,
                            greq: false,
                            photo: null
                        });

                        this.okMessage="Added member to group";
                        var self=this;
                        window.setTimeout(function() {
                            self.okMessage=null;
                        },3000) 

                        this.guesterror=null;
                        this.guestname=""; 
                        this.guestphone="";
                        this.guestemail=""; 
                        
                        this.doEditGroup({
                            ClientGroupID: this.groupID,
                            GroupName: this.groupName
                        });
                    }
                    else {
                        this.errorMessage=r.data.message;

                        this.guesterror=null;
                        this.guestname=""; 
                        this.guestphone="";
                        this.guestemail=""; 
                        this.formStep=2;
                        this.$forceUpdate();
                    }
                }
                else {
                    this.errorMessage="Could not contact backend service";

                    this.guesterror=null;
                    this.guestname=""; 
                    this.guestphone="";
                    this.guestemail=""; 
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
                    Name: this.guestname,
                    PhoneNumber: this.guestphone,
                    EmailAddress: this.guestemail               
            }}).then(r=>{
                if (r.status===200) {
                    if (r.data.status===200) {
           
                        this.okMessage="Edited member";
                        var self=this;
                        window.setTimeout(function() {
                            self.okMessage=null;
                        },3000) 

                        this.guesterror=null;
                        this.guestname=""; 
                        this.guestphone="";
                        this.guestemail=""; 

                        this.doEditGroup({
                            ClientGroupID: this.groupID,
                            GroupName: this.groupName
                        });
                    }
                    else {
                        this.errorMessage=r.data.message;

                        this.guesterror=null;
                        this.formStep=2;
                        this.$forceUpdate();
                    }
                }
                else {
                    this.errorMessage="Could not contact backend service";

                    this.guesterror=null;
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
            this.guestname=item.gname;
            this.guestphone=item.gphone==="Not Specified"?"":item.gphone;
            this.guestemail=item.gemail==="Not Specified"?"":item.gemail;
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