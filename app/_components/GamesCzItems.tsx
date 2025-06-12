"use client";

import React from 'react';
import ItemList from "./ItemList";
import Item from "@/app/_components/Item";
import {Box, SxProps, Typography} from "@mui/material";
import ItemLoader from "@/app/_components/ItemLoader";
import {useReadItems} from "@/app/_components/ReadItemsProvider";

const updatedAtSx: SxProps = {
  marginTop: 2,
  paddingY: 1,
  textAlign: 'center',
};

export default function GamesCzItems() {
  const {items, updatedAt, loading} = useReadItems();

  if (loading) {
    return (
      <ItemLoader/>
    );
  }

  return (
    <div>
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
      {updatedAt != null && (
        <Box sx={updatedAtSx}>
          <Typography variant="body2">Updated at: <em>{updatedAt?.toLocaleString('cs-CZ')}</em></Typography>
        </Box>
      )}
    </div>
  );
}
