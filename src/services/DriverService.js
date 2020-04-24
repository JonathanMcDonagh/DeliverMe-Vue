import Api from '../services/api'

export default {
  // Gets all drivers
  fetchDrivers () {
    return Api().get('/drivers')
  },
  // Like a driver
  likeDriver (id) {
    return Api().put(`/driver/${id}/like`)
  },
  // Dislike a driver
  dislikeDriver (id) {
    return Api().put(`/driver/${id}/dislike`)
  },
  // Deletes driver based on driver id
  deleteDriver (id) {
    return Api().delete(`/drivers/${id}`)
  }
}
