import React from 'react';
import {Skeleton} from "@mui/material";

export default function SingleItem() {
  return (
    <div>
      <Skeleton variant="rectangular" height={118} />
      <Skeleton />
      <Skeleton width="60%" />
    </div>
  );
}
