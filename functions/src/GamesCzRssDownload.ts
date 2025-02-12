import {logger} from "firebase-functions";
import {getStorage} from "firebase-admin/storage";
import {XMLParser} from "fast-xml-parser";

const gamesCzRssUrl = "https://www.games.cz/rss2.xml";
export const storageFilePath = "rss.json";

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
  const items: RssItem[] = xmlObj.rss.channel.item.map((item: any) => {
    return {
      title: item.title,
      link: item.link,
      description: item.description,
      pubDate: item.pubDate,
      enclosure: item.enclosure['@_url'],
    }
  });
  logger.debug(items);

  logger.debug('Uploading RSS file to Firebase Storage');
  const storage = getStorage();
  const storageFile = storage.bucket().file(storageFilePath);
  await storageFile.save(JSON.stringify(items));

  logger.log("RSS file download finished");
}

export interface RssItem {
  title: string | undefined;
  link: string | undefined;
  description: string | undefined;
  pubDate: string | undefined;
  enclosure: string | undefined;
}
