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
            <div class="mt-2 textright">
                <button>Save</button>
            </div>
            <v-list v-show="members.length>0">
                <template v-for="(item, i) in guests">
                    <v-list-item :key="i">
                        <div class='layout row btop p4' @click="editGuest(item)">
                            <div class='flex xs2 pl2 relative'>
                                <div v-if="item.photo!==null">
                                    <div class="vertical-center">
                                        <img :src="item.photo" class="imgcircle" alt="photo" width="30" height="30" />
                                    </div>
                                </div>
                                <div v-if="item.photo===null">
                                        <avatar class="vertical-center" size="30" :username="item.gname"></avatar>
                                </div>
                            </div>
                            <div class='flex xs10 textleft fieldwell indented1 spfield'>
                                {{item.gname}}
                            </div>
                        </div>
                    </v-list-item>
                </template>
            </v-list>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../bus';

export default {
    name: "Group Manager",
    data() {
        return {
            errorMessage:null,
            formStep: -1,
            groupName:null,
            groupID:null,
            groups:[],
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
        cancelDeleteGroup: function() {
            this.$modal.hide("confirmDelete");
        },
        closeGroupManager: function() {
            EventBus.$emit("CloseGroupManagerEvent");
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
            this.groupName=item.GroupName;
            if (typeof(item.Clients)!=="undefined" && item.Clients.length>0) {
                // Fill members
            }

            this.errorMessage=null;
            this.formStep=2;
        },
        doRemoveGroup: function(item) {
            this.errorMessage=null;
            this.groupID=item.ClientGroupID;
            this.$modal.show("confirmDelete");
        },
        returnToGroupManager: function() {
            this.errorMessage=null;
            this.formStep=0;
        }
    }
}
</script>