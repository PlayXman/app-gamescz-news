import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, SxProps, Typography} from "@mui/material";

const rootSx: SxProps = {
  height: '100%'
};
const actionAreaSx: SxProps = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
};

export default function Item({
                               title,
                               imageUrl,
                               targetUrl,
                               description,
  publishedAt
                             }: {
  title: string;
  imageUrl: string | undefined;
  targetUrl: string | undefined;
  description?: string;
  publishedAt?: string;
}) {
  const publishedAtDate = publishedAt ? new Date(publishedAt) : undefined;

  const handleClick = () => {
    window.open(targetUrl, '_blank');
    window.focus();
  }

  return (
    <Card variant="outlined" sx={rootSx}>
      <CardActionArea sx={actionAreaSx} onClick={handleClick}>
        <CardMedia
          component="img"
          image={imageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="body1">
            {title}
          </Typography>
          {Boolean(description) && (
            <Typography variant="body2" sx={{color: 'text.secondary'}} component="p" gutterBottom>
              {description}
            </Typography>
          )}
          {Boolean(publishedAtDate) && (
            <Typography variant="caption" sx={{color: 'text.secondary'}} component="p">
              {publishedAtDate?.toLocaleString('cs-CZ')}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
