import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: 'https://deliverme-wit.herokuapp.com/'
  })
}
