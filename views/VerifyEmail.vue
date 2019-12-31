<template>
    <div class="moduleWrapper">
        <h1>Email Verification</h1>
       <div  class='loadingImg'  v-show="loading===null">
                <img src="@/assets/loading.gif" />
        </div>
        <div v-show="loading!==null" class="mt-2">
            {{loading}}
        </div>
    
    </div>
</template>

<script>
export default {
    name: "VerifyEmail",
    data() {
        return {
            loading: null
        }
    },
    mounted() {
        window.scrollTo(0,0);

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
                url:this.$hostname+'/verifyemail',
                data: {
                    ClientID: c,
                    VerificationCode: v                    
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.loading="Email verification completed!"; 
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