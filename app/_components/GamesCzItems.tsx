"use client";

import React, {useEffect, useState} from 'react';
import ItemList from "./ItemList";
import fetchGamesCzItems from "../_utils/GamesCz";
import {RssItem} from "@/functions/src/iGamesCzRss";
import Item from "@/app/_components/Item";
import {Box, SxProps, Typography} from "@mui/material";
import ItemLoader from "@/app/_components/ItemLoader";
import ReadItemsProvider from "@/app/_components/ReadItemsProvider";

const updatedAtSx: SxProps = {
  marginTop: 2,
  paddingY: 1,
  textAlign: 'center',
};

export default function GamesCzItems() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<RssItem[]>([]);
  const [updatedAt, setUpdatedAt] = useState<Date | undefined>(undefined);

  useEffect(() => {
    fetchGamesCzItems()
      .then(result => {
        setItems(result.items);
        setUpdatedAt(result.updatedAt);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false)
      });
  }, []);

  if (loading) {
    return (
      <ItemLoader/>
    );
  }

  return (
    <div>
      <ReadItemsProvider rssItems={items}>
        <ItemList
          items={items.map((value, index) => {
            return [
              index.toString(),
              <Item
                key={index}
                title={value.title ?? ''}
                imageUrl={value.enclosure}
                targetUrl={value.link}
                description={value.description}
                publishedAt={value.pubDate}
              />
            ]
          })}
        />
      </ReadItemsProvider>
      {updatedAt != null && (
        <Box sx={updatedAtSx}>
          <Typography variant="body2">Updated at: <em>{updatedAt?.toLocaleString('cs-CZ')}</em></Typography>
        </Box>
      )}
    </div>
  );
}
