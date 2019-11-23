<template>
   <div class="moduleWrapper">
       <div v-show="formStep===0">
            Logging out...
       </div>
       <div v-show="formStep===1">
            <h1>You Have Been Logged Out</h1>
            <p class='mt-3'>
                <button class="linkbtn" @click="goToLogin()">Log back in</button> or navigate from the menu
            </p>
       </div>
   </div>
</template>

<script>
import {utilities} from '../mixins/utilities'

export default {
    data() {
        return {
            formStep: 0     
        }
    },
    mixins: [utilities],
    methods: {
        goToLogin: function() {
            this.$router.push("auth");
        },
        isLoggedIn: function() {
            var c = localStorage.getItem("_c");
            if (typeof(c)==="undefined" || c===null) {
                return false;
            }
            return true;
        }
    },
    mounted() {
        if (this.isLoggedIn()) {
            this.formStep=1;
            this.doLogoutRoutine(true);
        }
        else {
            this.$http({
                method:'post',
                url:this.$hostname+'/logout',
                data: {
                    ClientID: this._schdusc,
                    SessionID: this._schduss
                }
            }).then(()=> {        
                this.formStep=1;
                this.doLogoutRoutine(true);
            });
        }
    }
}
</script>