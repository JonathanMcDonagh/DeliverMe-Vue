<template>
  <div class="hero">

    <form @submit.prevent="submit">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 align-center">

      <div class="form-content align-center">
        <div class="column">
          <div class="form-group">
            <input type="text" class="form-control" name="fname" style="text-transform: capitalize;" placeholder="First Name*" required="" v-model.trim="fname" />
            <div class="error" v-if="!$v.fname.required">First Name is Required</div>
          </div>

          <div class="form-group">
            <input type="text" class="form-control" name="lname" style="text-transform: capitalize;" placeholder="Last Name*" required="" v-model="lname" />
            <div class="error" v-if="!$v.lname.required">Last Name is Required</div>
          </div>

          <div class="form-group">
            <input type="email" class="form-control" name="email" style="text-transform: capitalize;" placeholder="Email Address*" required="" v-model="email" />
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

          <label class="signUpLabels">Please note we require proof of a Full Drivers Licence or Proof of Address if cyclist</label><br>

          <label class="signUpLabels">Please upload a clear image</label><br>

          <div class="form-group">
            <b-form-file
              placeholder="Upload document"
              drop-placeholder="Drag and drop you form"
              @change="onFileSelected"
            ></b-form-file>
          </div>

          <div>
            <button class="btnSubmit" v-if="selectedFile != null" type="submit" :disabled="submitStatus === 'PENDING'">Register</button>
          </div>

        </div>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Check if the passwords match</p>
        <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for Registering!</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Pending...</p>
      </div>

        </div>
      </div>
    </form>

  </div>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import firebase from 'firebase'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})
Vue.use(Vuelidate)
export default {
  name: 'DriverDate',
  props: ['driverBtnTitle', 'driver'],
  data () {
    return {
      fname: this.driver.fname,
      lname: this.driver.lname,
      email: this.driver.email,
      password: this.driver.password,
      confirmpassword: this.driver.password,
      uploadURL: this.driver.uploadURL,
      selectedFile: null,
      drivers: {},
      submitStatus: null,
      imageData: null,
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
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          // Checks to see if password is the same as confirm password
          if (this.password === this.confirmpassword) {
            this.submitStatus = 'OK'
            this.submitStatus = 'OK'
            const name = (+new Date()) + '-' + this.selectedFile.name
            const metadata = { contentType: this.selectedFile.type }
            const task = firebase.storage().ref().child(name).put(this.selectedFile, metadata)
            task
              .then(snapshot => snapshot.ref.getDownloadURL())
              .then(url => {
                this.uploadURL = url

                var driver = {
                  fname: this.fname,
                  lname: this.lname,
                  email: this.email,
                  password: this.password,
                  uploadURL: this.uploadURL
                }
                this.driver = driver
                console.log('Submitting in DriverForm : ' + JSON.stringify(this.driver, null, 5))
                this.$emit('driver-is-created-updated', this.driver)
                this.$router.push('/driverlogin')
              }, 500)
          } else {
            this.submitStatus = 'ERROR'
            this.$swal({
              title: 'Please make sure that both passwords both match',
              type: 'warning',
              showLoaderOnConfirm: true
            })
          }
        }, 500)
      }
    },
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
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
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .error {
    border-color: #3AAFA9;
    background: #3AAFA9;
    color: whitesmoke;
    border-radius: 1.5rem;
    margin-top:0;
  }
  .form-content {
    padding: 5%;
    margin-bottom: 2%;
    border: 2px solid #DEF2F1;
  }
  .form-control {
    border-radius: 1.5rem;
  }
</style>
