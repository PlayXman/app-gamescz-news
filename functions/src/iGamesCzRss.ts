/**
 * Items from the RSS file.
 */
export const feedItemsDatabasePath = '/feedItems';
/**
 * ISO date. When the feed was last updated.
 */
export const feedUpdatedAtDatabasePath = '/feedUpdatedAt';

/**
 * RSS item converted from RSS XML file.
 */
export interface RssItem {
  title: string | undefined;
  description: string | undefined;
  link: string | undefined;
  /** ISO date */
  pubDate: string | undefined;
  /** Image url */
  enclosure: string | undefined;
}
