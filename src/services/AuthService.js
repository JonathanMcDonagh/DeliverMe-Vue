import Api from '../services/api'

export default {
  // To add a driver
  registerDriver (driver) {
    return Api().post('/drivers/register', driver,
      { headers: {'Content-type': 'application/json'} })
  },
  // Driver login
  driverLogin (credentials) {
    return Api().post('/drivers/login', credentials)
  },
  // Admin login
  adminLogin (credentials) {
    return Api().post('/admins/login', credentials)
  }
}
