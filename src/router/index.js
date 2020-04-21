import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/views/Home'
import Edit from '../components/activities/Edit'
import Jobs from '../components/activities/Jobs'
import Job from '../components/activities/Job'
import DriverSignUp from '../components/authentication/DriverSignUp'
import DriverLogin from '../components/authentication/DriverLogin'
import ManageJobs from '../components/activities/ManageJobs'
import AdminLogin from '../components/authentication/AdminLogin'
import UserJobs from '../components/activities/UserJobs'
import ManageDrivers from '../components/activities/ManageDrivers'
import Login from '../components/authentication/UserLogin'
import Accept from '../components/activities/Accept'
import JobDetails from '../components/activities/JobDetails'
import PageNotFound from '../components/views/PageNotFound'
import UserProfile from '../components/views/UserProfile'
import DriverProfile from '../components/views/DriverProfile'
import Map from '../components/views/Map'
import Drivers from '../components/activities/Drivers'

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
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '/jobs',
      name: 'Jobs',
      component: Jobs
    },
    {
      path: '/drivers',
      name: 'Drivers',
      component: Drivers
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
      component: UserJobs
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
      path: '/accept',
      name: 'Accept',
      component: Accept,
      props: true
    },
    {
      path: '/jobdetails',
      name: 'JobDetails',
      component: JobDetails,
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
      name: 'Login',
      component: Login
    },
    { path: '/admin',
      name: 'AdminLogin',
      component: AdminLogin
    },
    { path: '/map',
      component: Map
    },
    { path: '/account',
      name: 'UserProfile',
      component: UserProfile
    },
    { path: '/driveraccount',
      name: 'DriverProfile',
      component: DriverProfile
    }
  ]
})

export default router
