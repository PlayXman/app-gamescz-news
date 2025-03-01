import {
  feedItemsDatabasePath,
  feedUpdatedAtDatabasePath,
  notificationTokensDatabasePath,
  RssItem
} from "@/functions/src/iGamesCzRss";
import {initializeApp} from "firebase/app";
import {
  connectDatabaseEmulator,
  get,
  getDatabase,
  ref,
  push,
  remove,
  query,
  equalTo,
  orderByChild,
  DataSnapshot, orderByValue
} from "firebase/database";
import {getMessaging, getToken, deleteToken} from "firebase/messaging";

/*
 * Initialize Firebase
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
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

/*
 * Storage functions
 */

/**
 * Fetch RSS items from Firebase Realtime Database.
 */
export async function fetchGamesCzItems(): Promise<{items: RssItem[]; updatedAt: Date | undefined}> {
  const database = getDatabase();
  const feedItemsRef = ref(database, feedItemsDatabasePath);
  const feedUpdatedAtRef = ref(database, feedUpdatedAtDatabasePath);

  const feedItems = await get(feedItemsRef);
  const feedUpgradedAt = await get(feedUpdatedAtRef);

  return {
    items: feedItems.val(),
    updatedAt: feedUpgradedAt.exists() ? new Date(feedUpgradedAt.val()) : undefined,
  }
}

export async function notificationsRegister(): Promise<void> {
  const messaging = getMessaging();
  const currentToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY });

  if (currentToken) {
    const database = getDatabase();
    const tokensRef = ref(database, notificationTokensDatabasePath);

    await push(tokensRef, currentToken);
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
}

export async function notificationsGetToken(): Promise<{key: string | undefined; val: string | undefined} | undefined> {
  const messaging = getMessaging();
  const currentToken = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY });

  if (currentToken) {
    const database = getDatabase();
    const tokensRef = ref(database, notificationTokensDatabasePath);

    const tokens = await get(query(tokensRef, orderByValue(), equalTo(currentToken)));
    const token = Object.entries(tokens.val())[0];

    return {
      key: token[0],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      val: token[1] as any,
    };
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
}

export async function notificationsUnregister(): Promise<void> {
  const currentToken = await notificationsGetToken();

  if(currentToken == null || currentToken.key == null) {
    return;
  }

  const database = getDatabase();
  const tokensRef = ref(database, `${notificationTokensDatabasePath}/${currentToken.key}`);

  await remove(tokensRef);

  const messaging = getMessaging();
  await deleteToken(messaging);
}
