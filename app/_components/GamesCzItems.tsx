"use client";

import React, {useEffect, useState} from 'react';
import ItemList from "./ItemList";
import fetchGamesCzItems from "../_utils/GamesCz";

export default function GamesCzItems() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchGamesCzItems().then(setItems).catch(console.error);
  }, []);

  console.log(items);

  return (
    <ItemList items={[]

    } />
  );
}
