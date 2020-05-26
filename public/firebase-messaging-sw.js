/* eslint-disable */
// Firebase App (the core Firebase SDK) and messaging products
importScripts('https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.14.5/firebase-messaging.js',
);

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD0CTf2ccNsvNcZX7igmD1t9ijXpTXEZdU',
  authDomain: 'sp8-notifications.firebaseapp.com',
  databaseURL: 'https://sp8-notifications.firebaseio.com',
  projectId: 'sp8-notifications',
  storageBucket: 'sp8-notifications.appspot.com',
  messagingSenderId: '872884422789',
  appId: '1:872884422789:web:612529319b1904df52c1ec',
  measurementId: 'G-1R3DXZHMCX',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();
