<template>
  <div id="app1" class="hero">

    <form @submit.prevent="submit">
      <div class="col-lg-12 col-md-12 col-sm-12 align-center">

        <div class="form-content align-center">
          <div class="column">
            <div class="form-group">
              <b-form-file
                placeholder="Upload Profile Picture"
                drop-placeholder=""
                @change="onProfileFileSelected"
              ></b-form-file>
            </div>
            <div class="form-group">
              <div class="input-container">
                <i class="fa fa-user icon"></i>
              <input type="text" class="form-control" style="border-radius: 0!important;" name="fname" placeholder="First Name*" required="" v-model.trim="fname" />
              </div>
            </div>

            <div class="form-group">
              <div class="input-container">
                <i class="fa fa-user icon"></i>
              <input type="text" class="form-control" style="border-radius: 0!important;" name="lname" placeholder="Last Name*" required="" v-model="lname" />
              </div>
            </div>

            <div class="form-group">
              <div class="input-container">
                <i class="fa fa-envelope icon"></i>
              <input type="email" class="form-control" style="border-radius: 0!important;" name="email" placeholder="Email Address*" required="" v-model="email" />
              </div>
            </div>

            <div class="form-group">
              <div class="input-container">
                <i class="fa fa-key icon"></i>
              <input type="password" class="form-control" style="border-radius: 0!important;" name="password" placeholder="Password*" required="" v-model="password" />
              </div>
            </div>

            <div class="form-group">
              <div class="input-container">
                <i class="fa fa-key icon"></i>
              <input type="password" class="form-control" style="border-radius: 0!important;" name="passwordconfirm" placeholder="Confirm Password*" required=""
                     v-model="confirmpassword" />
              </div>
            </div>

            <label class="signUpLabels">Please note we require proof of a Full Drivers Licence or Proof of Address if cyclist</label><br>

            <label class="signUpLabels">Please upload a clear image</label><br>

            <div class="form-group">
              <b-form-file
                style="border-radius: 0!important;"
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
      driverprofilepicture: this.driver.driverprofilepicture,
      uploadURL: this.driver.uploadURL,
      likes: 0,
      selectedProfileFile: null,
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

            const file = this.selectedFile
            const ref = firebase.storage().ref()
            const name = (+new Date()) + '-' + file.name
            const metadata = {contentType: file.type}
            const task = ref.child(name).put(file, metadata)
            task
              .then(snapshot => snapshot.ref.getDownloadURL())
              .then((url) => {
                this.uploadURL = url

                const file = this.selectedProfileFile
                const ref = firebase.storage().ref()
                const name = (+new Date()) + '-' + file.name
                const metadata = {contentType: file.type}
                const task = ref.child(name).put(file, metadata)
                task
                  .then(snapshot => snapshot.ref.getDownloadURL())
                  .then((url) => {
                    this.driverprofilepicture = url

                    var driver = {
                      fname: this.fname,
                      lname: this.lname,
                      email: this.email,
                      password: this.password,
                      driverprofilepicture: this.driverprofilepicture,
                      uploadURL: this.uploadURL,
                      likes: this.likes
                    }
                    this.driver = driver
                    console.log('Submitting in DriverForm : ' + JSON.stringify(this.driver, null, 5))
                    this.$emit('driver-is-created-updated', this.driver)
                    this.$router.push('/driverlogin')
                  }, 500)
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
    onProfileFileSelected (event) {
      this.selectedProfileFile = event.target.files[0]
    },
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 100%;
    margin: 0 auto;
  }
  .form-control {
    border-radius: 1.5rem;
  }
  .btnSubmit {
    border: none;
    border-radius: 1.5rem;
    padding: 1%;
    width: 100%;
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
    color: #feffff;
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
  }
  .form-control {
    border-radius: 1.5rem;
  }

  .input-container {
    display: -ms-flexbox; /* IE10 */
    display: flex;
    width: 100%;
    margin-bottom: 15px;
  }

  .icon {
    padding: 10px;
    background: #3AAFA9;
    color: white;
    min-width: 50px;
    text-align: center;
  }
</style>
