import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: 'http://localhost:3000/',
    // baseURL: 'https://deliverme-wit.herokuapp.com/', // Backend Hosting
    json: true
  })
}
