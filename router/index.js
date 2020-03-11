import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import CreateEvent from '@/views/CreateEvent'
import Auth from '@/views/Auth'
import Signup from '@/views/Signup'
import Contact from '@/views/Contact'
import Premium from '@/views/Premium'
import MyEvents from '@/views/MyEvents'
import Logout from '@/views/Logout'
import MyAccount from '@/views/MyAccount'
import Verify from '@/views/Verify'
import Recover from '@/views/Recover'
import VerifyEmail from '@/views/VerifyEmail'
import Event from '@/views/Event'
import VerifyPhone from '@/views/VerifyPhone'
import GoogleCalendar from '@/views/GoogleCalendar'
import Home from '@/views/Home'
import EventUpdate from '@/views/EventUpdate'
import OptOut from '@/views/OptOut'
import TermsOfService from '@/views/TermsOfService'
import PrivacyPolicy from '@/views/PrivacyPolicy'
import Purchase from '@/views/Purchase'
import Cancel from '@/views/Cancel'
import Ethics from '@/views/Ethics'
import AboutGCalendar from '@/views/AboutGCalendar'
import NProgress from 'nprogress'
import Credits from '@/views/Credits'

Vue.use(Router);

const router =  new Router({
  mode:'history',
  components: { Axios },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: false }
    },
    {     
       path: '/create',
       name: 'Create Event',
       component: CreateEvent,
       meta: { requiresAuth: true }
    },
    {
       path: '/event',
       name: 'Event',
       component: Event,
       meta: { requiresAuth: false }
    },
    {
       path: '/update',
       name: 'Event Update',
       component: EventUpdate,
       meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'Login',
      component: Auth,
      meta: { requiresAuth: false }
    },
    {
       path: '/signup',
       name: 'Sign Up',
       component: Signup,
       meta: { requiresAuth: false }
    },
    {
      path: '/premium',
      name: 'Premium/Pro',
      component: Premium,
      meta: { requiresAuth: true }
    },
    {
      path: '/contact',
      name: 'Contact Us',
      component: Contact,
      meta: { requiresAuth: false }
    },
    {
       path: '/dashboard',
       name: 'Dashboard',
       component: MyEvents,
       meta: { requiresAuth: true }
    },
    {
       path: '/logout',
       name: 'Logout',
       component: Logout,
       meta: { requiresAuth: false }
    },
    {
       path: '/myaccount',
       name: 'My Account',
       component: MyAccount,
       meta: { requiresAuth: true }
    },
    {
       path: '/verify',
       name: 'Verification',
       component: Verify,
       meta: { requiresAuth: false }
    },
    {
       path: '/recover',
       name: 'Recover',
       component: Recover,
       meta: { requiresAuth: false }
    },
    {
       path: '/verifyemail',
       name: 'Verify Email',
       component: VerifyEmail,
       meta: { requiresAuth: false }
    },
    {
       path: '/verifyphone',
       name: 'Verify Phone',
       component: VerifyPhone,
       meta: { requiresAuth: false }
    },
    {
        path: '/googcalendar',
        name: 'Google Calendar',
        component: GoogleCalendar,
        meta: { requiresAuth: true }
    },
    {
        path: '/optout',
        name: 'Opt Out',
        component: OptOut,
        meta: { requiresAuth: false }
    },
    {
      path: '/privacypolicy',
      name: 'Privacy Policy',
      component: PrivacyPolicy,
      meta: { requiresAuth: false }
    },
    {
      path: '/termsofservice',
      name: 'Terms of Service',
      component: TermsOfService,
      meta: { requiresAuth: false }
    },
    {
       path: '/purchase',
       name: 'Purchase',
       component: Purchase,
       meta: { requiresAuth: false }
    },
    {
       path: '/cancel',
       name: 'Cancel',
       component: Cancel,
       meta: { requiresAuth: false }
    },
    {
       path: '/ethics',
       name: 'Ethics',
       component: Ethics,
       meta: { requiresAuth: false }
    },
    {
       path: '/aboutgcalendar',
       name: 'AboutGCalendar',
       component: AboutGCalendar,
       meta: { requiresAuth: false }
    },
    {
       path: '/credits',
       name: 'Credits',
       component: Credits,
       meta: { requiresAuth: false }
    }
  ]
})

router.beforeResolve((to, from, next) => {
   if (to.name) {
       NProgress.start()
   }
   next()
 })
 
 router.afterEach((to, from) => {
    NProgress.done()
 })

router.beforeEach((to,from,next)=> {
  
  if (!to.matched.some(record => record.meta.requiresAuth)) {
      next();
  }
  else {


      var c = localStorage.getItem("_c");
      if (typeof(c)==="undefined" || c===null || c.length===0) {
           next("/auth");
      }
      else {

         var n=next;
         NProgress.inc();

         Axios({
               method:'post',
               url:Vue.prototype.$hostname+'/getclient',
               data: {
                  ClientID: c,
                  SessionID: localStorage.getItem("_s"),
                  SessionLong: localStorage.getItem("_r"),                    
               }
         }).then(r=> {
               if (r.status===200) {
                  if (r.data.status===200) {
   
                     localStorage.setItem("clidetails",r.data.message);
                     n();
                  }      
                  else {
                     n("/auth");
                  }
               }
               else {
                  n("/auth");
               }
         }).catch(e=> {
            n("/auth");
         })
      }
   }
});

export default router