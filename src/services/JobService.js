import Api from '../services/api'

export default {
  fetchJobs () {
    return Api().get('/jobs')
  },
  postJob (item) {
    return Api().post('/jobs', item,
      { headers: {'Content-type': 'application/json'} })
  },
  deleteJob (id) {
    return Api().delete(`/jobs/${id}`)
  },
  acceptJob (id, job) {
    console.log('REQUESTING ' + job._id + ' ' +
      JSON.stringify(job, null, 5))
    return Api().put(`/job/${id}/accept`, job,
      { headers: {'Content-type': 'application/json'} })
  },
  fetchJob (id) {
    return Api().get(`/jobs/${id}`)
  },
  putJob (id, job) {
    console.log('REQUESTING ' + job._id + ' ' +
      JSON.stringify(job, null, 5))
    return Api().put(`/job/${id}/update`, job,
      { headers: {'Content-type': 'application/json'} })
  },
  fetchUserJobs (userId) {
    return Api().get(`/donations/${userId}`)
  }
}
