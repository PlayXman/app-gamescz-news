import React, {useCallback} from 'react';
import {
  Card,
  CardActionArea,
  CardActionAreaProps,
  CardContent,
  CardMedia,
  SxProps,
  Theme,
  Typography
} from "@mui/material";

const rootSx: SxProps = {
  height: '100%'
};
const actionAreaSx: SxProps = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
};
const imageSx: SxProps<Theme> = {
  height: 'auto',
  backgroundColor: (theme) => theme.palette.grey[800],
};

export default function UnreadItem({
                                     title,
                                     imageUrl,
                                     targetUrl,
                                     description,
                                     publishedAt,
                                     onHide,
                                   }: {
  title: string;
  imageUrl: string | undefined;
  targetUrl: string | undefined;
  description?: string;
  publishedAt?: Date;
  onHide: NonNullable<CardActionAreaProps['onClick']>;
}) {
  const handleOpen = useCallback<NonNullable<CardActionAreaProps['onClick']>>((event) => {
    window.open(targetUrl, '_blank');
    onHide(event);
  }, [onHide, targetUrl]);

  return (
    <Card variant="elevation" sx={rootSx}>
      <CardActionArea sx={actionAreaSx} onClick={handleOpen} onContextMenu={onHide}>
        <CardMedia
          component="img"
          image={imageUrl}
          width={653}
          height={367}
          alt=""
          sx={imageSx}
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
          {Boolean(publishedAt) && (
            <Typography variant="caption" sx={{color: 'text.secondary'}} component="p">
              <em>{publishedAt?.toLocaleString('cs-CZ')}</em>
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
