import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.firestore = app.firestore();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  user = (uid) => this.db.ref(`users/${uid}`);

  getUserData = (uid, setValue) => {
    this.user(uid).on("value", (snapshot) => {
      setValue(snapshot.val());
    });
  };

  users = () => this.db.ref("users");

  addItemForSelling(uid, item){
    var marketData = {
      ...item,
      uid: uid
    };

    var newMarketKey = this.db.ref().child('markets').push().key;

    var updates = {};
    updates['/markets/' + newMarketKey] = marketData;
    updates['/users/' + uid + '/selling-items/' + newMarketKey] = marketData;

    return this.db.ref().update(updates);
  }
}

export default Firebase;
