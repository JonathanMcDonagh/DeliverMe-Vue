<template>
  <div class="hero">
    <h3 class="vue-title">Driver Sign Up</h3>
    <div class="container register-form">

      <form @submit.prevent="submit">
        <div class="form-content align-center">
          <div class="column">
            <div class="form-group">
              <input type="text" class="form-control" name="fname" placeholder="First Name*" required="" v-model.trim="fname" />
              <div class="error" v-if="!$v.fname.required">First Name is Required</div>
            </div>

            <div class="form-group">
              <input type="text" class="form-control" name="lname" placeholder="Last Name*" required="" v-model="lname" />
              <div class="error" v-if="!$v.lname.required">Last Name is Required</div>
            </div>

            <div class="form-group">
              <input type="email" class="form-control" name="email" placeholder="Email Address*" required="" v-model="email" />
              <div class="error" v-if="!$v.email.required">Email is Required</div>
            </div>

            <div class="form-group">
              <input type="password" class="form-control" name="password" placeholder="Password*" required="" v-model="password" />
              <div class="error" v-if="!$v.password.required">Password is Required</div>
            </div>

            <div class="form-group">
              <input type="password" class="form-control" name="passwordconfirm" placeholder="Confirm Password*" required=""
                     v-model="confirmpassword" />
              <div class="error" v-if="!$v.confirmpassword.required">Confirm Password is Required</div>
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
              <div class="error" v-if="!$v.required">Please upload your form to display register button</div>
            </div>
            <div v-if="imageData!=null">
              <img class="preview" :src="picture">
              <br>
              <button class="btnSubmit" type="submit" @click="onUpload" :disabled="submitStatus === 'PENDING'">Register</button>
            </div>

          </div>
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
import { required } from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

export default {
  data () {
    return {
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
  validations: {
    fname: {
      required
    },
    lname: {
      required
    },
    email: {
      required
    },
    password: {
      required
    },
    confirmpassword: {
      required
    }
  },
  methods: {
    submit () {
      console.log('submit!')
      this.submitStatus = 'PENDING'
      setTimeout(() => {
        // Checks to see if password is the same as confirm password
        if (this.password === this.confirmpassword) {
          this.submitStatus = 'OK'
          var driver = {
            fname: this.fname,
            lname: this.lname,
            email: this.email,
            password: this.password
          }
          this.driver = driver
          console.log('Submitting : ' + JSON.stringify(this.driver, null, 5))
          this.submitDriver(this.driver)
        } else {
          this.submitStatus = 'ERROR'
          this.$swal({
            title: 'Please make sure that both passwords both match',
            type: 'warning',
            showLoaderOnConfirm: true
          })
        }
      }, 500)
    },
    // To add driver
    submitDriver: function (driver) {
      console.log('submitDriver')
      AuthService.registerDriver(driver)
        .then(response => {
          console.log(response)
          console.log(driver)
          this.loginDriver(this.driver)
        })
        .catch(err => {
          this.errors.push(err)
          console.log(err)
        })
    },
    // To login driver
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
          this.$store.dispatch('setDriverToken', response.data.token)
          this.$store.dispatch('setDriver', response.data.driver)
          // window.location.reload()
          // this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    // To preview image user uploaded
    previewImage (event) {
      this.uploadValue = 0
      this.picture = null
      this.imageData = event.target.files[0]
    },
    // To upload image to firebase
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
  .error {
    border-color: #3AAFA9;
    background: #3AAFA9;
    color: whitesmoke;
    border-radius: 1.5rem;
    margin-top:0;
  }
</style>
