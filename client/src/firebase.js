import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDoQCDcNEesf9f74uBOv9CfgcYRHOd-4tM',
  authDomain: 'group-chat-9cb45.firebaseapp.com',
  databaseURL: 'https://group-chat-9cb45.firebaseio.com',
  projectId: 'group-chat-9cb45',
  storageBucket: 'group-chat-9cb45.appspot.com',
  messagingSenderId: '818088442442',
  appId: '1:818088442442:web:d7b458a2a7a1b8d28604b3',
  measurementId: 'G-23J3T20R79',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
