import Api from '../services/api'

export default {
  // Get all jobs
  fetchJobs () {
    return Api().get('/jobs')
  },
  // Get all jobs based on user
  fetchUserJobs (usertoken) {
    return Api().get(`/jobs/user/${usertoken}`)
  },
  // Gets job based on id
  fetchJob (id) {
    return Api().get(`/jobs/${id}`)
  },
  // Add a job
  postJob (item) {
    return Api().post('/jobs', item,
      { headers: {'Content-type': 'application/json'} })
  },
  // Update a job
  putJob (id, job) {
    console.log('REQUESTING ' + job._id + ' ' +
      JSON.stringify(job, null, 5))
    return Api().put(`/jobs/${id}/update`, job,
      { headers: {'Content-type': 'application/json'} })
  },
  // Delete a job
  deleteJob (id) {
    return Api().delete(`/jobs/${id}`)
  }
}
