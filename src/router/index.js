import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Edit from '../components/Edit'
import Jobs from '../components/Jobs'
import Job from '../components/Job'
import DriverSignUp from '../components/DriverSignUp'
import Auth from '../components/Auth'
import DriverLogin from '../components/DriverLogin'

Vue.use(Router)

export default new Router({
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
      component: DriverSignUp,
      props: true
    },
    { path: '/driverlogin',
      name: 'DriverLogin',
      component: DriverLogin
    },
    { path: '/login',
      name: 'Auth',
      component: Auth
    }
  ]
})
