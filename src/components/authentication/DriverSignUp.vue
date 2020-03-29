<template>
  <div class="hero">
    <h3 class="vue-title"><i style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container register-form">
      <form @submit.prevent="submit">
        <div class="form-content align-center">
          <div class="column">
            <div class="form-group">
              <input type="text" class="form-control" name="fname" placeholder="First Name*" required="" v-model.trim="fname" />
            </div>
            <div class="form-group">
              <input type="text" class="form-control" name="lname" placeholder="Last Name*" required="" v-model="lname" />
            </div>
            <div class="form-group">
              <input type="email" class="form-control" name="email" placeholder="Email Address*" required="" v-model="email" />
            </div>
            <div class="form-group">
              <input type="password" class="form-control" name="password" placeholder="Password*" required="" v-model="password" />
            </div>
            <div class="form-group">
              <input type="password" class="form-control" name="passwordconfirm" placeholder="Confirm Password*" required=""
                     v-model="confirmpassword" />
            </div>

            <label class="signUpLabels">Please note we require proof of a Full Drivers Licence (see note below if you wish to do deliveries by bike) and proof Billing Address</label><br>

            <label class="signUpLabels">Please upload a clear image of your forms</label><br>

            <div >
              <p>Upload proof of driving licence (Image name format example - YOURFULLNAME_DL and YOURFULLNAME_POA)</p>
              <input type="file" @change="previewImage" accept="image/*" >
            </div>

            <div>
              <p>Progress: {{uploadValue.toFixed()+"%"}}
                <progress id="progress" :value="uploadValue" max="100" ></progress></p>
            </div>
            <div v-if="imageData!=null">
              <img class="preview" :src="picture">
              <br>
              <button class="btn btn-primary btn1" @click="onUpload">Upload</button>
            </div>

          </div>
          <button class="btnSubmit" type="submit" :disabled="submitStatus === 'PENDING'">Register</button>
          <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Check if the passwords match</p>
          <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for Registering!</p>
          <p class="typo__p" v-if="submitStatus === 'PENDING'">Pending...</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from '../../services/AuthService'
import Vue from 'vue'
import VueForm from 'vueform'
import firebase from 'firebase'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

export default {
  data () {
    return {
      messagetitle: 'Register',
      fname: '',
      lname: '',
      email: '',
      password: '',
      confirmpassword: '',
      driver: {},
      submitStatus: null,
      imageData: null,
      picture: null,
      uploadValue: 0
    }
  },
  methods: {
    submit () {
      console.log('submit!')
      // do your submit logic here
      this.submitStatus = 'PENDING'
      setTimeout(() => {
        if (this.password === this.confirmpassword) {
          this.submitStatus = 'OK'
          var driver = {
            fname: this.fname,
            lname: this.lname,
            email: this.email,
            password: this.password
          }
          this.driver = driver
          console.log('Submitting in Register : ' + JSON.stringify(this.driver, null, 5))
          this.submitDriver(this.driver)
        } else {
          // alert('Please ensure passwords match')
          this.submitStatus = 'ERROR'
          this.$swal({
            title: 'Please Ensure the passwords both match',
            type: 'warning',
            showLoaderOnConfirm: true
          })
        }
      }, 500)
    },
    submitDriver: function (driver) {
      console.log('submitDriver')
      AuthService.register(driver)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response)
          console.log(driver)
          this.loginDriver(this.driver)
        })
        .catch(err => {
          this.errors.push(err)
          console.log(err)
        })
    },
    loginDriver: function (driver) {
      const credentials = {
        email: driver.email,
        password: driver.password
      }
      AuthService.login(credentials)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response)
          // localStorage.setItem('token', response.data.token)
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setDriver', response.data.driver)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    previewImage (event) {
      this.uploadValue = 0
      this.picture = null
      this.imageData = event.target.files[0]
    },
    onUpload () {
      this.picture = null
      const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData)
      storageRef.on(`state_changed`, snapshot => {
        this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, error => { console.log(error.message) },
      () => {
        this.uploadValue = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.picture = url
        })
      }
      )
    }
  }
}
</script>

<style scoped>
  .vue-title {
    margin-top: 100px;
    text-align: center;
    font-size: 30pt;
    margin-bottom: 10px;
  }
  .form-content {
    padding: 5%;
    border: 1px solid #ced4da;
    margin-bottom: 2%;
  }
  .form-control {
    border-radius: 1.5rem;
  }
  .btnSubmit {
    border: none;
    border-radius: 1.5rem;
    padding: 1%;
    width: 20%;
    margin-bottom: 10px;
    cursor: pointer;
    background: #3AAFA9;
    color: #fff;
  }
  img.preview {
    width: 200px;
  }
  .signUpLabels {
    text-align: center;
  }
</style>
