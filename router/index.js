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

Vue.use(Router);

const router =  new Router({
  routes: [
    {     
       path: '/',
       name: 'Create Event',
       component: CreateEvent
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
      name: 'Premium',
      component: Premium
    },
    {
      path: '/contact',
      name: 'Contact Us',
      component: Contact
    },
    {
       path: '/myevents',
       name: 'My Events',
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
    }
  ]
})

export default router;