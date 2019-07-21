<template>
  <div class="moduleWrapper">
    <h1>Signup</h1>
    <div v-show='formStep === 0'>
      <div class='mt-3'>
           <span class='emphasis1'>Phone Number with Area Code (US only)</span><br />
           <input type='text' id='fPhoneNumber' class='textfield'/>
      </div>

      <div class='mt-3'>
           <div>
           <span class='emphasis1'>Choose A Password</span>
           </div>
           <div class='highlightbox'>
              <em>(your password must be at least 8 alphanumeric characters and contain an uppercase letter, a lowercase letter, and a number</em>
           </div>
           <input type='password' id='fPassword' class='textfield' />
        </div>
        <div class='mt=3'>
           Verify Your Password<br />
           <input type='password' id='vPassword' class='textfield' />
        </div>

       <button class='fullWidth mt-3' @click='goStepTwo'>Proceed</button>

    </div>
    <div v-show='formStep === 1'>
       
        <div class='mt-3'>
        <span class='emphasis1'>Choose Security Question and Answer</span>
        </div>
        <div class='highlightbox'>
            <em>(if you need to reset your password we will ask you your security question)</em>
        </div>
        <div class='mt-3'>
             Question
        </div>
        <div>
          <select class='textfield'>
            <option value='-'>--- Choose One ---</option>
            <option value='0'>What was the name of your first pet?</option>
            <option value='1'>What was the name of your first kiss?</option>
            <option value='2'>What was the make and model of your first car?</option>
            <option value='3'>In what town or city was your first full time job?</option>
            <option value='4'>What was your first full time job?</option>
            <option value='5'>Where was your first road trip to?</option>
            <option value='6'>Where was your first airplane ride to?</option>
            <option value='7'>What was your favorite birthday gift you received?</option>
            <option value='8'>What was your favorite club or sport in high school?</option>
            <option value='9'>Who was your favorite teacher in middle school?</option>
            <option value='10'>Who was your favorite neighbor growing up?</option>
            <option value='11'>What was your favorite book when you were a kid?</option>
          </select>
        </div>
        <div class='mt-3'>
            Answer<br />
           <input type='text' id='fAnswer' class='textfield'/>
        </div>
        <div id='captchaDiv' class='mt-3'>
             <vue-recaptcha 
                  ref="recaptcha"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                  size="invisible"
                  sitekey="6Lc1xa4UAAAAAFWU99D-J6-RzsMZILRT2kaFCIy7"></vue-recaptcha> 
        </div>
        <button class='fullWidth mt-3' :disabled="status==='submitting'"  @click='submitSignup()'>Sign Up</button>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';

export default {
    components: {
        VueRecaptcha
    },
    data() {
       return {
          formStep: 0,
          status: ''
       }
    },
    methods: {
        goStepTwo: function() {
            this.formStep=1;
        },
        submitSignup: function() {
            this.$refs.recaptcha.execute();
        },
        onCaptchaVerified: function (recaptchaToken) {
            const self = this;
            self.status = "submitting";
            self.$refs.recaptcha.reset();
        },
        onCaptchaExpired: function () {
            this.$refs.recaptcha.reset();
        }
    }
}
</script>

