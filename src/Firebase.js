import firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBTy7ZOEYPcBlsCXCwCnWoYFvJfKpkg4-o",
  authDomain: "bussy-63153.firebaseapp.com",
  projectId: "bussy-63153",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = {
  /* your settings... */
  timestampsInSnapshots: true
};
firestore.settings(settings);
export default firestore;