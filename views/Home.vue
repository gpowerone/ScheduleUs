<style scoped>
    button {
      background-color: transparent;
      border: 1px solid #ddd;
      border-radius: 3px;
      font-size: inherit;
      font-weight: 700;
      line-height: 2rem;
      padding: 0 2rem;
      display:block;
    }
    button:hover {
      cursor: pointer;
    }
    .button--facebook   { color: #3b5998; border: 1px solid #3b5998; }
    .button--google     { color: #ea4335; border: 1px solid #ea4335; }
    .button--instagram  { color: #c13584; border: 1px solid #c13584; }
    .authentication-status {
      background-color: #42b983;
      color: #fff;
      left: 0;
      padding: 16px 32px;
      position: fixed;
      right: 0;
      text-align: center;
      top: 0;
    }
    hr {
      border: 0;
      border-bottom: 1px solid #ddd;
      margin: 2rem 0;
    }
</style>

<template>
 <div class="index-component">
        <div class="authentication-status" v-if="isAuthenticated">
            You are successfully authenticated
            <div class="authentication-status__token">{{$auth.getToken()}}</div>
        </div>
        <div class="auth-buttons" v-if="!isAuthenticated">
           
            <button @click="auth('facebook')" class="button--facebook">Use Facebook</button>
            <button @click="auth('google')" class="button--google">Use Google</button>  
            <button @click="auth('instagram')" class="button--instagram">Use Instagram</button>
            <button @click="authLogin()">Use Email</button>

            <pre class="response" v-if="response !== null">{{JSON.stringify(response, null, 2)}}</pre>
        </div>
 </div>
</template>


<script>
import Vue from 'vue'
import VueAuthenticate from 'vue-authenticate'

Vue.use(VueAuthenticate, {
  tokenName: 'access_token',
  baseUrl: 'http://localhost:4000',
  storageType: 'cookieStorage',
  providers: {
    // Define OAuth providers config
  }
})

export default {
    name: 'home',
    data: function () {
          return {
            isAuthenticated: this.$auth.isAuthenticated(),
            access_token: null,
            response: null
          }
    },
    methods: {

        authLogin: function () {
            var this_ = this;
            let user = {
                email: 'john.doe@domain.com', 
                password: 'pass123456'
            };

            if (this.$auth.isAuthenticated()) {
                this.$auth.logout()
            }

            this.$auth.login(user).then(function (response) {
                this_.isAuthenticated = this_.$auth.isAuthenticated();
                this_.response = response
            })
        },

        authRegister: function () {
            var this_ = this;
            let user = {
                name: 'John Doe',
                email: 'john.doe@domain.com', 
                password: 'pass123456'
            };

            if (this.$auth.isAuthenticated()) {
                this.$auth.logout()  
            }
            
            this.$auth.register(user).then(function (response) {
                this_.isAuthenticated = this_.$auth.isAuthenticated();
                this_.response = response
            })
        },

        authLogout: function () {
            var this_ = this;
            this.$auth.logout().then(function () {
                if (!this_.$auth.isAuthenticated()) {
                this_.response = null
                }

                this_.isAuthenticated = this_.$auth.isAuthenticated();
            })
            },

            auth: function(provider) {
            if (this.$auth.isAuthenticated()) {
                this.$auth.logout()
            }

            this.response = null

            var this_ = this;
            this.$auth.authenticate(provider).then(function (authResponse) {
                this_.isAuthenticated = this_.$auth.isAuthenticated();

                if (provider === 'github') {
                this_.$http.get('https://api.github.com/user').then(function (response) {
                    this_.response = response
                })
                } else if (provider === 'facebook') {
                this_.$http.get('https://graph.facebook.com/v2.5/me', {
                    params: { access_token: this_.$auth.getToken() }
                }).then(function (response) {
                    this_.response = response
                })
                } else if (provider === 'google') {
                this_.$http.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect').then(function (response) {
                    this_.response = response
                })
                } else if (provider === 'twitter') {
                this_.response = authResponse.body.profile
                } else if (provider === 'instagram') {
                this_.response = authResponse
                } else if (provider === 'bitbucket') {
                this_.$http.get('https://api.bitbucket.org/2.0/user').then(function (response) {
                    this_.response = response
                })
                } else if (provider === 'linkedin') {
                this_.response = authResponse
                } else if (provider === 'live') {
                this_.response = authResponse
                }
            }).catch(function (err) {
                this_.isAuthenticated = this_.$auth.isAuthenticated()
                this_.response = err
            })
        }
    }
    
}
</script>
