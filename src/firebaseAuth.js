import firebase from 'firebase'
import * as firebaseui from 'firebaseui'

const config = {
  apiKey: 'AIzaSyDq_lK_lXL51B8A3hW6Qd27hs0-oocvw3E',
  authDomain: 'deliverme-wit.firebaseapp.com',
  databaseURL: 'https://deliverme-wit.firebaseio.com',
  projectId: 'deliverme-wit',
  storageBucket: 'gs://deliverme-wit.appspot.com/',
  messagingSenderId: '902093639897'
}

const firebaseAuth = {
  initializeFirebaseLogin (context) {
    this.context = context

    // Sign in options
    firebase.initializeApp(config)
    this.uiConfig = {
      signInSuccessUrl: '/myjobs',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    this.ui = new firebaseui.auth.AuthUI(firebase.auth())
  },
  // form for the UserLogin.vue file
  firebaseAuthForm (container) {
    this.ui.start(container, this.uiConfig)
  }
}

export default firebaseAuth
