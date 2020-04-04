import Api from '../services/api'

export default {
  fetchDrivers () {
    return Api().get('/drivers')
  },
  fetchDriver (id) {
    return Api().get(`/drivers/${id}`)
  },
  editDriver (id, driver) {
    console.log('REQUESTING ' + driver._id + ' ' +
      JSON.stringify(driver, null, 5))
    return Api().put(`/drivers/${id}/update`, driver,
      { headers: {'Content-type': 'application/json'} })
  },
  deleteDriver (id) {
    return Api().delete(`/drivers/${id}`)
  }
}
