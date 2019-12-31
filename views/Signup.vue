<template>
  <div class="moduleWrapper">
  

     <h1>Create Account</h1>
     <signupmodule ref="sM"></signupmodule>
     
  </div>
</template>

<script>
import signupmodule from '@/components/SignupModule'
import {utilities} from '../mixins/utilities'

export default {
    components: {
        signupmodule
    },
    mixins: [utilities],
    mounted() {
        window.scrollTo(0,0);
        this.doLogoutRoutine();
    }
   
}
</script>

