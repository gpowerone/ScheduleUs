<template>
  <div class="moduleWrapper">
    <h1>Signup</h1>

    <div class='errorBox' v-show='isError===1'>
        {{ errorMessage }}
    </div>

    <div v-show='formStep === 0'>

      <div class='mt-3'>
           <div class='boldchoice fieldwell'>First Name</div>
           <div class='fieldwell'>
           <input type='text' v-model="FirstName" class='textfield'/>
           </div>
      </div>

      <div class='mt-3'>
           <div class='boldchoice fieldwell'>Last Name</div>
           <div class='fieldwell'>
           <input type='text' v-model="LastName" class='textfield'/>
           </div>
      </div>

      <div class='mt-3'>
        <div class='boldchoice fieldwell'>
           Phone Number with Area Code (US only)
        </div>
        <div class='fieldwell'>
           <input type='text' v-model="PhoneNumber" class='textfield'/>
         </div>
      </div>

      <div class='mt-3'>
           <div>
           <span class='boldchoice fieldwell'>Choose A Password</span>
           </div>
           <div class='highlightbox fieldwell'>
              <em>(your password must be at least 8 alphanumeric characters and contain an uppercase letter, a lowercase letter, and a number)</em>
           </div>
           <div class='fieldwell'>
               <input type='password' id='fPassword' v-model="TPasswd" class='textfield' />
           </div>
        </div>
        <div class='mt-2'>
           <div class='boldchoice fieldwell'>
           Verify Your Password
           </div>
           <div class='fieldwell'>
                <input type='password' id='vPassword' v-model="RPasswd" class='textfield' />
           </div>
        </div>

       <button class='fullWidth mt-3' @click='goStepTwo'>Proceed</button>

    </div>
    <div v-show='formStep === 1'>
       
        <div class='mt-3'>
        <span class='boldchoice fieldwell'>Choose Security Question and Answer</span>
        </div>
        <div class='highlightbox fieldwell'>
            <em>(if you need to reset your password we will ask you your security question)</em>
        </div>
        <div class='mt-3 fieldwell'>
             Question
        </div>
        <div class='fieldwell'>
          <select class='textfield' v-model="SecQuestion">
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
        <div class='mt-3 fieldwell'>
            Answer<br />
           <input type='text' id='fAnswer' v-model="SecAnswer" class='textfield'/>
        </div>
        <div class="mt-3">
            <span class="fieldwell boldchoice">Verify That You Are Human</span>
        </div>
        <div id='captchaDiv' class='mt-4'>
             <vue-recaptcha 
                  ref="recaptcha"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                  loadRecaptchaScript=true
                  sitekey="6Lc1xa4UAAAAAFWU99D-J6-RzsMZILRT2kaFCIy7"></vue-recaptcha> 
        </div>
        <button class='fullWidth mt-3' :disabled="status==='submitting'"  @click='submitSignup()'>Sign Up</button>
    </div>
    <div v-show='formStep===2'>
        <p class='mt-3'>
        You have successfully created an account. We are sending a verification text to your phone now. Once you click the verification link inside
        of the text you will be able to log in.
        </p>
        <p>
            <button @click="goToAuth()" class="linkbtn">Go to Login</button>
        </p>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';

export default {
    components: {
        'vue-recaptcha': VueRecaptcha
    },
    data() {
       return {
          formStep: 0,
          isError: 0,
          errorMessage: '',
          FirstName: '',
          LastName: '',
          PhoneNumber: '',
          RPasswd: '',
          status: 'submitting',
          RToken: '',
          TPasswd: '',
          SecQuestion: '',
          SecAnswer: ''
       }
    },
    methods: {
        doError: function(msg) {   
          this.errorMessage=msg;
          this.isError=1;  
          this.$forceUpdate();         
        },
        goStepTwo: function() {
           
           var msg = this.verifyStep1();
           if (msg==="OK") {
              this.formStep=1;
              this.undoError(); 
           }
           else {
               this.doError(msg);
           }
        },
        goToAuth: function() {
            this.$router.push('auth');
        },
        onCaptchaVerified: function (recaptchaToken) {
            const self = this;
            this.RToken=recaptchaToken;
            self.status = "";
        },
        onCaptchaExpired: function () {
            this.$refs.recaptcha.reset();
        },
        submitSignup: function() {
            const self = this;
            self.status = "submitting";
            self.$refs.recaptcha.reset();

            this.$http({
                method:'post',
                url:this.$hostname+'/createaccount',
                data: {
                    FirstName:this.FirstName,
                    LastName:this.LastName,
                    Phone:this.PhoneNumber,
                    Passwd:this.TPasswd,
                    SecQuestion:this.SecQuestion,
                    SecAnswer:this.SecAnswer,
                    recaptchaToken:this.RToken
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.formStep=2;
                        this.undoError();
                    }
                    else {
                        this.doError(r.data.message);
                    }
                }
                else {
                    this.doError("Error connecting to Schedule Us service, please try again")
                }
            });
        },
        undoError: function() {
            this.isError=0;
            this.errorMessage="";
            this.$forceUpdate();
        },
        verifyStep1: function() {

            if (this.FirstName.length<1) {
                return "First name is required";
            }

            if (this.LastName.length<1) {
                return "Last name is required";
            }

            if (this.FirstName.length>64) {
                return "First name is too long";
            }

            if (this.LastName.length>64) {
                return "Last name is too long";
            }

            var phoneVerification = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
            if (!phoneVerification.test(this.PhoneNumber)) {
                 return "Invalid Phone Number"
            }
              
            if (this.TPasswd.length<8 || !/[a-z]/.test(this.TPasswd) || !/[0-9]/.test(this.TPasswd) || !/[A-Z]/.test(this.TPasswd)) {
                 return "Password must be at least 8 characters and contain an uppercase character, a lowercase character, and a number";
            }

            if (this.TPasswd !== this.RPasswd) {
                 return "The password and re-typed password must match";
            }

             return "OK"
        }
        
    },
    beforeRouteLeave(to, from, next) {
        this.formStep=0;
        next();
    },
}
</script>

