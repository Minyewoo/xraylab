import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAArPuxAeSEnSYRgA6NECIN0DcSWGIUdTU",
    authDomain: "xraylab-c64ad.firebaseapp.com",
    databaseURL: "https://xraylab-c64ad.firebaseio.com",
    projectId: "xraylab-c64ad",
    storageBucket: "",
    messagingSenderId: "40490136094",
    appId: "1:40490136094:web:000c3adee98f526f"
  };

  firebase.initializeApp(config);
  //firebase.firestore().settings({timestampsInSnapshots: true});

  export default firebase;