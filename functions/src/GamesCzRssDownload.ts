import {logger} from "firebase-functions";
import {getDatabase} from "firebase-admin/database";
import {XMLParser} from "fast-xml-parser";
import {feedItemsDatabasePath, feedUpdatedAtDatabasePath, RssItem} from "./iGamesCzRss";

const gamesCzRssUrl = "https://www.games.cz/rss2.xml";

/**
 * Downloads the RSS file from games.cz and uploads it to Firebase Storage
 */
export async function gamesCzRssDownloadHandler(): Promise<void> {
  logger.debug('Downloading RSS file from games.cz');
  const gamesCzResponse = await fetch(gamesCzRssUrl);
  const rssFileContent = await gamesCzResponse.text();

  logger.debug('Converting XML to JSON');
  const xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix : "@_"
  });
  const xmlObj = xmlParser.parse(rssFileContent);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: RssItem[] = xmlObj.rss.channel.item.map((item: any) => {
    return {
      title: item.title,
      link: item.link,
      description: item.description?.replace(/<[^>]+>/g, ''),
      pubDate: item.pubDate ? new Date(item.pubDate).toISOString() : undefined,
      enclosure: item.enclosure['@_url'],
    }
  });
  logger.debug(items);

  logger.debug('Uploading RSS file to Firebase Realtime Database');
  const database = getDatabase();
  const feedItemsRef = database.ref(feedItemsDatabasePath);
  await feedItemsRef.set(items);
  const feedUpdatedAtRef = database.ref(feedUpdatedAtDatabasePath);
  await feedUpdatedAtRef.set(new Date().toISOString());

  logger.log("RSS file download finished");
}
