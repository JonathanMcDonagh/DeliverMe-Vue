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
  // Deletes driver based on driver id
  deleteDriver (id) {
    return Api().delete(`/drivers/${id}`)
  }
}
