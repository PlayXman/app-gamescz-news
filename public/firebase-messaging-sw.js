importScripts("https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/11.3.1/firebase-messaging.js");

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCgs1D3EWtG5QP2egMmKEkPfsj2DOB1svg',
  authDomain: 'aa-gamescz-news.firebaseapp.com',
  databaseURL: 'https://aa-gamescz-news-default-rtdb.firebaseio.com',
  projectId: 'aa-gamescz-news',
  storageBucket: 'aa-gamescz-news.firebasestorage.app',
  messagingSenderId: '629484238169',
  appId: '1:629484238169:web:f3229d2347d6c23b670848',
});

const messaging = getMessaging(firebaseApp);
// const messaging = getMessaging();

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    // icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
