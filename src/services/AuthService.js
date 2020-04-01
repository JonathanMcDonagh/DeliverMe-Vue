import Api from '../services/api'

export default {
  register (driver) {
    return Api().post('/drivers/register', driver,
      { headers: {'Content-type': 'application/json'} })
  },
  driverLogin (credentials) {
    return Api().post('/drivers/login', credentials)
  },
  getOneDriver (id) {
    return Api().get(`/drivers/${id}`)
  },
  adminLogin (adminCredentials) {
    return Api().post('/admins/login', adminCredentials)
  }
}
