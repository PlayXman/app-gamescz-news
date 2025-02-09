const GAMES_CZ_RSS_URL = 'https://games.tiscali.cz/rss2.xml';

export default async function fetchGamesCzItems(): Promise<{
  title: string;
  description: string | undefined;
  link: string;
  pubDate: string | undefined;
  enclosureUrl: string | undefined;
}[]> {
  const response = await fetch(GAMES_CZ_RSS_URL, {
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0'
    }
  });
  const xml = await response.text();

  console.log(xml);

  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');

  const allItems = [];
  for(const item of doc.querySelectorAll('item')) {
    const title = item.querySelector('title')?.textContent;
    const link = item.querySelector('link')?.textContent;
    if(title && link) {
      allItems.push({
        title,
        description: item.querySelector('description')?.textContent ?? undefined,
        link,
        pubDate: item.querySelector('pubDate')?.textContent ?? undefined,
        enclosureUrl: item.querySelector('enclosure')?.attributes?.getNamedItem('url')?.value,
      });
    }
  }

  return allItems;
}
