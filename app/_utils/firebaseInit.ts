import { initializeApp } from "firebase/app";
import {connectDatabaseEmulator, getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCgs1D3EWtG5QP2egMmKEkPfsj2DOB1svg",
  authDomain: "aa-gamescz-news.firebaseapp.com",
  databaseURL: "https://aa-gamescz-news-default-rtdb.firebaseio.com",
  projectId: "aa-gamescz-news",
  storageBucket: "aa-gamescz-news.firebasestorage.app",
  messagingSenderId: "629484238169",
  appId: "1:629484238169:web:f3229d2347d6c23b670848"
};

initializeApp(firebaseConfig);

// Connect database to emulator if running locally
if(typeof window !== 'undefined') {
  const db = getDatabase();
  if (window.location.hostname === "localhost") {
    // Point to the RTDB emulator running on localhost.
    connectDatabaseEmulator(db, "127.0.0.1", 9000);
  }
}
