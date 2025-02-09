import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";

export default function Item({
  title,
  imageUrl,
  targetUrl,
  description
                             }: {
  title: string;
  imageUrl: string;
  targetUrl: string;
  description?: string;
}) {
  return (
    <Card>
      <CardActionArea onClick={() => window.open(targetUrl, '_blank')}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          {Boolean(description) && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
