import Vue from 'vue'
import Router from 'vue-router'
import CreateEvent from '@/views/CreateEvent'
import Auth from '@/views/Auth'

Vue.use(Router);

const router =  new Router({
  routes: [
    {     
       path: '/',
       name: 'Create Event',
       component: CreateEvent,
       meta: { requiresAuth: false }
    },
    {
       path: '/Auth',
       name: 'Login',
       component: Auth,
       meta: { requiresAuth: false },
       props: {
         class: "authenticator"
       }
    }
  ]
})

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      await Vue.prototype.$Amplify.Auth.currentAuthenticatedUser();
      next();
    } catch (e) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    }
  }
  next();
});

export default router;