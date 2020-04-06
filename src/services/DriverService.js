import Api from '../services/api'

export default {
  // Gets all drivers
  fetchDrivers () {
    return Api().get('/drivers')
  },
  // Gets one driver based on the driver id
  fetchDriver (id) {
    return Api().get(`/drivers/${id}`)
  },
  // Update a job
  putDriver (id, driver) {
    console.log('REQUESTING ' + driver._id + ' ' +
      JSON.stringify(driver, null, 5))
    return Api().put(`/drivers/${id}/update`, driver,
      { headers: {'Content-type': 'application/json'} })
  },
  // Deletes driver based on driver id
  deleteDriver (id) {
    return Api().delete(`/drivers/${id}`)
  }
}
