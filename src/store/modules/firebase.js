// Import the Firebase SDK and Messaging product
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import api from 'api-client';

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

export default {
  init() {
    if (process.env.NODE_ENV === 'production') {
      // Retrieve Firebase Messaging object
      const messaging = firebase.messaging();

      // Add the public app key
      messaging.usePublicVapidKey(
        'BOgqSRLNMqwLJENF3HiJzgPHyTLdKvVUf7vRV_YEfCuv5uAQcv-6lTr-uhCtuKS0bFTIShtUyE7RTLzrHdefZuk',
      );
      // Get Instance ID token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      messaging
        .getToken()
        .then(async (currentToken) => {
          if (currentToken) {
            const response = await api.sendNotificationToken({
              token: currentToken,
            });
            if (response.status !== 200) console.log(response.data);
          } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });

      // Callback fired if Instance ID token is updated.
      messaging.onTokenRefresh(() => {
        messaging
          .getToken()
          .then(async (refreshedToken) => {
            const response = await api.sendNotificationToken({
              token: refreshedToken,
            });
            if (response.status !== 200) console.log(response.data);
          })
          .catch((err) => {
            console.log('Unable to retrieve refreshed token ', err);
          });
      });

      // Handle incoming messages. Called when:
      // - a message is received while the app has focus
      // - the user clicks on an app notification created by a service worker
      // `messaging.setBackgroundMessageHandler` handler.
      messaging.onMessage((payload) => {
        const options = {
          body: payload.notification.body,
        };
        return new Notification(payload.notification.title || 'Spotify El-8alaba', options);
      });
    }
  },

  getMessagingInstance: () => {
    if (process.env.NODE_ENV === 'production') {
      // Retrieve Firebase Messaging object
      const messaging = firebase.messaging();
      return messaging;
    }
    return undefined;
  },
};
