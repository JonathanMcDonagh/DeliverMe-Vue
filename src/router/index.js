import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Edit from '../components/Edit'
import Jobs from '../components/Jobs'
import Job from '../components/Job'
import DriverSignUp from '../components/DriverSignUp'
import Auth from '../components/UserLogin'
import DriverLogin from '../components/DriverLogin'

Vue.use(Router)

let router = new Router({
  mode: 'history', // to remove the aanoying # in url
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
      meta: {
        guest: true
      }
    },
    {
      path: '/driverlogin',
      name: 'DriverLogin',
      component: DriverLogin,
      meta: {
        guest: true
      }
    },
    { path: '/login',
      name: 'Auth',
      component: Auth
    }
  ]
})

export default router
