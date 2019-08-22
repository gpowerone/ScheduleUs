<template>
    <div class="moduleWrapper">
        <div class='errorBox' v-show='isError!==null'>
             {{isError}}
        </div>

        <h1>Account Recovery</h1>
        <div v-show="loading===null">
             Loading...
        </div>
        <div v-show="isOK===true">
            <div class="mt-2">
                Your account has been successfully recovered!
            </div>
            <div class="mt-2">
                <button @click="goToLogin">Go to Login</button>
            </div>
        </div>
        <div v-show="loading!==null&&isOK===false">
             <div class="mt-2">
                  Please answer your account security question
             </div>
              <div class="mt-2 fieldwell">
                <select class='textfield' v-model="loading" disabled>
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
              <div class="mt-1 fieldwell">
                  <input type='text' class='textfield' v-model="SecQuestion" />
              </div>
              <div class='mt-3'>
                <div>
                    <span class='boldchoice fieldwell'>Choose A New Password</span>
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
            <div class="mt-3">
                <button @click="doRecovery">Recover Account</button>
            </div>
        </div>
      
    </div>
</template>

<script>
export default {
    name: "Verify",
    data() {
        return {
            c: null,
            v: null,
            loading: null,
            TPasswd: null,
            RPasswd: null,
            isError: null,
            isOK: false,
            SecQuestion: null
        }
    },
    methods: {
        doRecovery: function() {

            if (this.SecQuestion===null || this.SecQuestion.length===0) {
                this.isError="The security answer is invalid";
                this.$forceUpdate();
                return;
            }

            if (this.TPasswd.length<8 || !/[a-z]/.test(this.TPasswd) || !/[0-9]/.test(this.TPasswd) || !/[A-Z]/.test(this.TPasswd)) {
                 this.isError="Password must be at least 8 characters and contain an uppercase character, a lowercase character, and a number";
                 this.$forceUpdate();
                 return;
            }

            if (this.TPasswd !== this.RPasswd) {
                 this.isError="The password and re-typed password must match";
                 this.$forceUpdate();
                 return;
            }

            this.$http({
                method:'post',
                url:this.$hostname+'/accountquestion',
                data: {
                    ClientID: this.c,
                    VerificationCode: this.v,
                    Passwd: this.TPasswd,
                    SecAnswer: this.SecQuestion                    
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {
                        this.isError=null;
                        this.isOK=true;
                        this.$forceUpdate();
                    }
                    else {
                        this.isError=r.data.message;
                        this.$forceUpdate();
                    }
                }
                else {
                    this.isError="Could not connect to backend service, please check your internet connection";
                    this.$forceUpdate();
                }
            })
        },
        goToLogin: function() {
            this.$router.push("auth");
        }
    },
    mounted() {

         this.c=null;
         this.v=null;

         try {
             this.c=this.$route.query.c;
             this.v=this.$route.query.v;
         }
         catch(e) {
             window.alert(e);
         }

         if (this.v!==null && this.c!==null) {

            this.$http({
                method:'post',
                url:this.$hostname+'/accountrecsec',
                data: {
                    ClientID: this.c,
                    VerificationCode: this.v                    
                }
            }).then(r=> {
                if (r.status===200) {
                    if (r.data.status===200) {       
                        this.loading=r.data.message;
                        this.$forceUpdate();
                    }
                    else {
                        this.isError=r.data.message;
                        this.$forceUpdate();
                    }
                }
                else {
                    this.isError="Could not connect to backend service. Please check your internet connection";
                    this.$forceUpdate();
                }
            })
         }
         else {
             this.isError="Invalid credentials";
             this.$forceUpdate();
         }
    }
}
</script>