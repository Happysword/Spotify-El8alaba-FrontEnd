// Firebase App (the core Firebase SDK) and messaging products
/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

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

// Called when a message is received while the app is out of focus
messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    // icon: '/firebase-logo.png',
  };

  // @note[XL3] Example said `self.registration...` instead of `this` but ESLint complained
  return this.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
