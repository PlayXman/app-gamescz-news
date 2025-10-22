import {Grid, Typography} from '@mui/material';
import React, {ReactNode} from 'react';

export default function ItemList({
  items
                                 }: {
  /** Key-Element pairs */
  items: [string, ReactNode][];
}) {
  return (
    <Grid container spacing={2}>
      {items.length === 0 ? (
        <Grid container size={{xs: 12}} justifyContent="center">
          <Typography>
            No items to display
          </Typography>
        </Grid>
      ) : items.map(([key, element]) => (
        <Grid key={key} size={{xs: 12, sm: 6, md: 4, lg: 3}}>
          {element}
        </Grid>
      ))}
    </Grid>
  );
}
