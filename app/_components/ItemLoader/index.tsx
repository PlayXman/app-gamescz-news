import React from 'react';
import ItemList from "../ItemList";
import SingleItem from "./SingleItem";

export default function ItemLoader() {
  return (
    <ItemList items={[
      ['0', <SingleItem key="0" />],
      ['1', <SingleItem key="1" />],
      ['2', <SingleItem key="2" />],
    ]} />
  );
}
