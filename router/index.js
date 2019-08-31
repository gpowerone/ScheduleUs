import Vue from 'vue'
import Router from 'vue-router'
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

Vue.use(Router);

const router =  new Router({
  routes: [
    {     
       path: '/',
       name: 'Create Event',
       component: CreateEvent
    },
    {
       path: '/event',
       name: 'Event',
       component: Event
    },
    {
      path: '/auth',
      name: 'Login',
      component: Auth
    },
    {
       path: '/signup',
       name: 'Sign Up',
       component: Signup
    },
    {
      path: '/premium',
      name: 'Premium/Pro',
      component: Premium
    },
    {
      path: '/contact',
      name: 'Contact Us',
      component: Contact
    },
    {
       path: '/dashboard',
       name: 'Dashboard',
       component: MyEvents
    },
    {
       path: '/logout',
       name: 'Logout',
       component: Logout
    },
    {
       path: '/myaccount',
       name: 'My Account',
       component: MyAccount
    },
    {
       path: '/verify',
       name: 'Verification',
       component: Verify
    },
    {
       path: '/recover',
       name: 'Recover',
       component: Recover
    },
    {
       path: '/verifyemail',
       name: 'Verify Email',
       component: VerifyEmail
    }
  ]
})

export default router;