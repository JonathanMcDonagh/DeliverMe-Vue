import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/views/Home'
import Edit from '../components/activities/Edit'
import Jobs from '../components/views/Jobs'
import Job from '../components/activities/Job'
import DriverSignUp from '../components/authentication/DriverSignUp'
import DriverLogin from '../components/authentication/DriverLogin'
import ManageJobs from '../components/activities/ManageJobs'
import Map from '../components/views/Map'
import AdminLogin from '../components/authentication/AdminLogin'
import UserJobs from '../components/activities/UserJobs'
import ManageDrivers from '../components/activities/ManageDrivers'
import Login from '../components/authentication/UserLogin'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/jobs',
      name: 'Jobs',
      component: Jobs
    },
    {
      path: '/managejobs',
      name: 'ManageJobs',
      component: ManageJobs
    },
    {
      path: '/managedrivers',
      name: 'ManageDrivers',
      component: ManageDrivers
    },
    {
      path: '/myjobs',
      name: 'UserJobs',
      component: UserJobs,
      meta: { requireAuth: true }
    },
    {
      path: '/job',
      name: 'Job',
      component: Job,
      meta: { requireAuth: true }
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit,
      props: true
    },
    {
      path: '/RegisterAsDriver',
      name: 'DriverSignUp',
      component: DriverSignUp,
      meta: { guestOnly: true }
    },
    {
      path: '/driverlogin',
      name: 'DriverLogin',
      component: DriverLogin,
      meta: { guestOnly: true }
    },
    { path: '/login',
      name: 'Login',
      component: Login,
      meta: { guestOnly: true }
    },
    { path: '/admin',
      name: 'AdminLogin',
      component: AdminLogin,
      meta: { guestOnly: true }
    },
    { path: '/map',
      name: 'Map',
      component: Map
    }
  ]
})

export default router

/*
router.beforeEach((to, from, next) => {
  let currentUser = auth.user()
  let requireAuth = to.matched.some(record => record.meta.requireAuth)
  let guestOnly = to.matched.some(record => record.meta.guestOnly)

  if (requireAuth && !currentUser) next('login')
  else if (guestOnly && currentUser) next('myjobs')
  else next()
})

 */
