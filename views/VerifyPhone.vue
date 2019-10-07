<template>
    <div class="moduleWrapper">
        <h1>Phone Verification</h1>
       <div  class='loadingImg'  v-show="loading===null">
                <img src="@/assets/loading.gif" />
        </div>
        <div v-show="loading!==null" v-html="loading" class="mt-2">

        </div>
    
    </div>
</template>

<script>
export default {
    name: "VerifyPhone",
    data() {
        return {
            loading: null
        }
    },
    mounted() {

         var ev=null;
         var h=null;

         try {
             ev=this.$route.query.e;
             h=this.$route.query.h;
         }
         catch(e) {
             window.alert(e);
         }

         if (ev!==null && h!==null) {

            this.$http({
                method:'post',
                url:this.$hostname+'/verifyphone',
                data: {
                    EventID: ev,
                    Hash: h                    
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.loading="<p>Event/Activity verification completed!</p><p>You will receive a text with information on how to access your event/activity</p>"; 
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