import Vue from 'vue'
import Router from 'vue-router'
import CreateEvent from '@/views/CreateEvent'
import Auth from '@/views/Auth'
import Signup from '@/views/Signup'
import About from '@/views/About'
import Contact from '@/views/Contact'
import Premium from '@/views/Premium'

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
      path: '/about',
      name: 'About',
      component: About
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
  ]
})

export default router;