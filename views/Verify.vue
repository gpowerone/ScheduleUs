<template>
    <div class="moduleWrapper">
        <h1>Account Verification</h1>
        <div v-show="loading===null">
              Loading...
        </div>
        <div v-show="loading!==null" class="mt-2">
            {{loading}}
        </div>
        <div v-show="showlogin===true" class="mt-2">
            <button @click="goToLogin">Go to Login</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Verify",
    data() {
        return {
            loading: null,
            showlogin: false
        }
    },
    methods: {
        goToLogin: function() {
            this.$router.push("auth");
        }
    },
    mounted() {

         var c=null;
         var v=null;

         try {
             c=this.$route.query.c;
             v=this.$route.query.v;
         }
         catch(e) {
             window.alert(e);
         }

         if (v!==null && c!==null) {

            this.$http({
                method:'post',
                url:this.$hostname+'/verifyaccount',
                data: {
                    ClientID: c,
                    VerificationCode: v                    
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.showlogin=true;
                        this.loading="Account verification completed!"; 
                    }
                    else {
                        this.loading=r.data.message;
                    }
                }
                else {
                    this.loading="Could not connect to backend service. Please check your internet connection";
                }
            })
         }
         else {
            this.loading="Invalid credentials";
         }
    }
}
</script>