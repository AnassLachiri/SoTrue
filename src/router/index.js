import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      requiresGuest: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresGuest = to.matched.some(x => x.meta.requiresGuest)
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresGuest && currentUser) {
      next('/')
  } else if (requiresAuth && !currentUser) {
      next('/login')
  } else {
      next()
  }
})

export default router
