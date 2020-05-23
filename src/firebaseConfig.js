import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const firebaseConfig = {
    
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const storageRef = firebase.storage().ref();

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const reactsCollection = db.collection('reacts')

const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    reactsCollection,
    increment,
    decrement,
    storageRef
}