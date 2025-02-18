"use client";

import React, {useEffect, useState} from 'react';
import ItemList from "./ItemList";
import fetchGamesCzItems from "../_utils/GamesCz";
import {RssItem} from "@/functions/src/iGamesCzRss";
import Item from "@/app/_components/Item";

export default function GamesCzItems() {
  const [items, setItems] = useState<RssItem[]>([]);
  // todo
  // const [updatedAt, setUpdatedAt] = useState<Date | undefined>(undefined);

  useEffect(() => {
    fetchGamesCzItems()
      .then(result => {
        setItems(result.items);
        // setUpdatedAt(result.updatedAt);
      })
      .catch(console.error);
  }, []);

  return (
    <ItemList items={items.map((value, index) => {
      return [
        index.toString(),
        <Item key={index} title={value.title ?? ''} imageUrl={value.enclosure} targetUrl={value.link} description={value.description} publishedAt={value.pubDate} />
      ]
    })} />
  );
}
