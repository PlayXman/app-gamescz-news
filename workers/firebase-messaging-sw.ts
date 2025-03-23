
// importScripts("https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/9.20.0/firebase-messaging.js");
//
// console.log(process.env.NEXT_PUBLIC_API_KEY);
//
// const firebaseApp = initializeApp({
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
// });
//
// const messaging = getMessaging(firebaseApp);
//
// onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     // icon: '/firebase-logo.png'
//   };
//
//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
declare const self = self as unknown as ServiceWorkerGlobalScope;

import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";

const messaging = getMessaging();
onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
