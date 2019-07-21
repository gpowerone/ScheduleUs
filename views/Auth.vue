<template>
    <div class="moduleWrapper">
        <div id='loginFlow' v-show="formStep===0">
            <h1>Login</h1>
            <p><button @click="goToCreateAccount()" class="linkbtn">Register here</button> for an account</p>
            <div class="layout row mt-5">
                <div class="flex xs2">
                    &nbsp;
                </div>
                <div class="fieldwell flex xs8">
                    Phone Number or Email Address:<br />
                    <input type='text' id='user' v-model="Phone" class='textfield' />
                </div>
                <div class="flex xs2">
                    &nbsp;
                </div>
            </div>
            <div class="layout row mt-1">
                <div class="flex xs2">
                    &nbsp;
                </div>
                <div class="fieldwell flex xs8">
                    Password:<br />
                    <input type='password' id='pass' v-model="Passwd" class='textfield' />
                </div>
                <div class="flex xs2">
                    &nbsp;
                </div>
            </div>
            <div class="layout row mt-1">
                <div class="flex xs2">
                    &nbsp;
                </div>
                <div class="fieldwell flex xs8">
                    <button class="fullWidth" @click="doLogin()" >Login</button>
                </div>
                <div class="flex xs2">
                    &nbsp;
                </div>
            </div>
              <div class="layout row mt-1">
                <div class="flex xs2">
                    &nbsp;
                </div>
                <div class="fieldwell flex xs8">
                    <button @click="goToAccountRecovery()" class="fullWidth textcenter linkbtn">Forgot your password?</button>
                </div>
                <div class="flex xs2">
                    &nbsp;
                </div>
            </div>
         </div>    
         <div id='accountRecoveryFlow' v-show="formStep===1">
             <h1>Recover your account</h1>
         </div>
    </div>
</template>

<script>
export default {
    name: "Auth",
    data() {
        return {
            Phone:"",
            Passwd:"",
            formStep: 0
        }
    },
    methods: {
        doLogin: function() {
            this.$http({
                method:'post',
                url:'http://localhost:3000/login',
                data: {
                    Phone:this.Phone,
                    Passwd:this.Passwd
                }
            }).then(r=> {
                window.alert(r);
            });
        },
        goToAccountRecovery: function() {
            this.formStep=1;
        },
        goToCreateAccount: function() {
            this.$router.push('signup');
        }
    }
}
</script>