import app from "firebase/app";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";

import { v4 as uuidv4 } from "uuid";
import * as ROUTES from "../../constants/routes";

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

    this.storage = firebase.storage();
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

  addItemForSelling(uid, item) {
    var marketData = {
      ...item,
      uid: uid,
    };

    var newMarketKey = this.db.ref().child("markets").push().key;

    var updates = {};
    updates["/markets/" + newMarketKey] = marketData;
    updates["/users/" + uid + "/selling-items/" + newMarketKey] = marketData;

    return this.db.ref().update(updates);
  }

  addArticle(uid, article) {
    var articleData = {
      ...article,
      uid: uid,
    };
    var updates = {};
    var newArticleKey = this.db.ref().child("articles").push().key;
    updates["/articles/" + newArticleKey] = articleData;
    return this.db.ref().update(updates);
  }
  getItem = (id, setValue) => {
    this.db.ref(`markets/${id}`).on("value", (snapshot) => {
      setValue(snapshot.val());
    });
  };

  getItems = (setValue) => {
    this.db.ref(`markets`).on("value", (snapshot) => {
      let list = new Array();
      snapshot.forEach(function (data) {
        let item = {
          id: data.key, //this is to get the ID, if needed
          ...data.val(),
        };
        list.push(item);
      });
      setValue(list);
    });
  };

  // CHATS
  openOrCreateRoom = async (uid1, uid2, firestore, history) => {
    const id = uuidv4();
    const roomsRef = firestore.collection("rooms");
    const usersRef = firestore
      .collection("users")
      .doc(uid1)
      .collection("rooms")
      .doc(uid2);

    const usersRef2 = firestore
      .collection("users")
      .doc(uid2)
      .collection("rooms")
      .doc(uid1);

    await usersRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        usersRef.onSnapshot((doc) => {
          console.log("doc", doc.data());
          const roomRef = doc.data().roomRef;
          roomRef.get().then((room) => {
            console.log("ooom", room.id);
            history.push(ROUTES.CHATS + "/" + room.id);
          });
        });
      } else {
        roomsRef.doc(id).set({ createdAt: Date.now().toString() });
        usersRef.set({
          roomRef: firestore.doc(`rooms/${id}`),
        });
        usersRef2.set({
          roomRef: firestore.doc(`rooms/${id}`),
        });
        history.push(ROUTES.CHATS + "/" + id);
      }
    });
  };
}

export default Firebase;
