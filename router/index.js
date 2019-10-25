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
import VerifyPhone from '@/views/VerifyPhone'
import GoogleCalendar from '@/views/GoogleCalendar'
import Home from '@/views/Home'
import EventUpdate from '@/views/EventUpdate'
import OptOut from '@/views/OptOut'

Vue.use(Router);

const router =  new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {     
       path: '/create',
       name: 'Create Event',
       component: CreateEvent
    },
    {
       path: '/event',
       name: 'Event',
       component: Event
    },
    {
       path: '/update',
       name: 'Event Update',
       component: EventUpdate
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
    },
    {
       path: '/verifyphone',
       name: 'Verify Phone',
       component: VerifyPhone
    },
    {
        path: '/googcalendar',
        name: 'Google Calendar',
        component: GoogleCalendar
    },
    {
        path: '/optout',
        name: 'Opt Out',
        component: OptOut
    }
  ]
})

export default router;