import "./firebaseInit";
import {feedItemsDatabasePath, feedUpdatedAtDatabasePath, RssItem} from "@/functions/src/GamesCzRssDownload";
import {get, getDatabase, ref} from "firebase/database";

/**
 * Fetch RSS items from Firebase Realtime Database.
 */
export default async function fetchGamesCzItems(): Promise<{items: RssItem[]; updatedAt: Date | undefined}> {
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
