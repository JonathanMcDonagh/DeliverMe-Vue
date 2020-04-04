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
  context: null,
  uiConfig: null,
  ui: null,

  init (context) {
    this.context = context

    firebase.initializeApp(config)
    this.uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    this.ui = new firebaseui.auth.AuthUI(firebase.auth())

    firebase.auth().onAuthStateChanged((user) => {
      this.context.$store.dispatch('user/setCurrentUser')

      let requireAuth = this.context.$route.matched.some(record => record.meta.requireAuth)
      let guestOnly = this.context.$route.matched.some(record => record.meta.guestOnly)

      if (requireAuth && !user) this.context.$router.push('/login')
      else if (guestOnly && user) this.context.$router.push('/myjobs')
    })
  },
  authForm (container) {
    this.ui.start(container, this.uiConfig)
  },
  user () {
    return this.context ? firebase.auth().currentUser : null
  }
}

export default firebaseAuth
