import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/views/Home'
import Edit from '../components/activities/Edit'
import Jobs from '../components/views/Jobs'
import Job from '../components/activities/Job'
import DriverSignUp from '../components/authentication/DriverSignUp'
import Auth from '../components/authentication/UserLogin'
import DriverLogin from '../components/authentication/DriverLogin'
import ManageJobs from '../components/activities/ManageJobs'

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
      path: '/job',
      name: 'Job',
      component: Job
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
      component: DriverSignUp
    },
    {
      path: '/driverlogin',
      name: 'DriverLogin',
      component: DriverLogin
    },
    { path: '/login',
      name: 'Auth',
      component: Auth
    }
  ]
})

export default router
