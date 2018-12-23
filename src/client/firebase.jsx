
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDr-s7Sb2M0EZKqnzEa7aAvdnphoyAol9s",
  authDomain: "habits-cd935.firebaseapp.com",
  databaseURL: "https://habits-cd935.firebaseio.com",
  projectId: "habits-cd935",
  storageBucket: "habits-cd935.appspot.com",
  messagingSenderId: "826281549662"
}

firebase.initializeApp(firebaseConfig)

export default firebase