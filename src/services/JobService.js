import Api from '@/services/api'

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
  fetchJob (id) {
    return Api().get(`/jobs/${id}`)
  },
  putJob (id, job) {
    console.log('REQUESTING ' + job._id + ' ' +
      JSON.stringify(job, null, 5))
    return Api().put(`/job/${id}/update`, job,
      { headers: {'Content-type': 'application/json'} })
  },
  fetchJobsByUser (userId) {
    return Api().get(`/users/${userId}/jobs`)
  }
}
