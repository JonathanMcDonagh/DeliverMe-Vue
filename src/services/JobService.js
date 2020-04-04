import Api from '../services/api'

export default {
  fetchJobs () {
    return Api().get('/jobs')
  },
  fetchUserJobs (usertoken) {
    return Api().get(`/jobs/user/${usertoken}`)
  },
  fetchJob (id) {
    return Api().get(`/jobs/${id}`)
  },
  postJob (item) {
    return Api().post('/jobs', item,
      { headers: {'Content-type': 'application/json'} })
  },
  putJob (id, job) {
    console.log('REQUESTING ' + job._id + ' ' +
      JSON.stringify(job, null, 5))
    return Api().put(`/jobs/${id}/update`, job,
      { headers: {'Content-type': 'application/json'} })
  },
  deleteJob (id) {
    return Api().delete(`/jobs/${id}`)
  }
}
