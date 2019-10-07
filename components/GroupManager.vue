<template>
    <div id='groupManager'>
        <div id='loading' v-show="formStep===-1">
            <img src="@/assets/loading.gif" />
        </div>

        <div id='addFromGroup' v-show="formStep===0">
            <h1>Add from Group</h1>   
                
            <div v-show="groups.length===0">
                You have no groups
            </div>

            <v-list v-show="groups.length>0">
                <template v-for="(item, i) in groups">
                    <v-list-item :key="i">
                        <div class='layout row btop p4' @click="doAddFromGroup(item)">   
                            <div class='flex xs10 textleft fieldwell indented1 spfield'>
                                {{item.GroupName}}
                            </div>
                        </div>
                    </v-list-item>
                </template>
            </v-list>
        </div>  
    </div>
</template>

<script>
export default {
    name: "Group Manager",
    data() {
        return {
            formStep: -1
        }
    },
    methods: {
        addFromGroup: function() {

        },
        doAddFromGroup: function() {

        }
    }
}
</script>