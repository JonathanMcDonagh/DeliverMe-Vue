import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Edit from '../components/Edit'
import Jobs from '../components/Jobs'
import Job from '../components/Job'

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
    }
  ]
})
