"use client";

import React from 'react';
import {Typography} from "@mui/material";
import {useReadItems} from "@/app/_components/ReadItemsProvider";

export default function ItemCounter() {
  const {items, hiddenItems} = useReadItems();
  const doneTotal = items.length > 0 ? hiddenItems.size : 0;

  return (
    <Typography>{doneTotal} / {items.length}</Typography>
  );
}
