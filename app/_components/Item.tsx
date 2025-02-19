import React, {useCallback, useMemo} from 'react';
import {
  Avatar,
  Card,
  CardActionArea, CardActionAreaProps,
  CardContent,
  CardHeader,
  CardMedia,
  SxProps,
  Theme,
  Typography
} from "@mui/material";
import {useReadItems} from "@/app/_components/ReadItemsProvider";

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
  backgroundColor: (theme) => theme.palette.grey[100],
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
  const {hiddenPubDates, markItemAsRead} = useReadItems();

  const publishedAtDate = useMemo(() => publishedAt ? new Date(publishedAt) : undefined, [publishedAt]);

  const handleOpen = useCallback(() => {
    window.open(targetUrl, '_blank');
    if (publishedAtDate) {
      markItemAsRead(publishedAtDate);
    }
  }, [markItemAsRead, publishedAtDate, targetUrl]);

  const handleHideUnhide = useCallback<NonNullable<CardActionAreaProps['onClick']>>((event) => {
    event.preventDefault();
    if (publishedAtDate) {
      markItemAsRead(publishedAtDate);
    }
  }, [markItemAsRead, publishedAtDate]);

  if(hiddenPubDates.has(publishedAtDate?.getTime() ?? -1)) {
    return (
      <Card variant="outlined">
        <CardActionArea onClick={handleHideUnhide}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'success.main' }}>
                ✔
              </Avatar>
            }
            title={title}
          />
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card variant="outlined" sx={rootSx}>
      <CardActionArea sx={actionAreaSx} onClick={handleOpen} onContextMenu={handleHideUnhide}>
        <CardMedia
          component="img"
          image={imageUrl}
          width={653}
          height={367}
          alt="caption"
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
          {Boolean(publishedAtDate) && (
            <Typography variant="caption" sx={{color: 'text.secondary'}} component="p">
              <em>{publishedAtDate?.toLocaleString('cs-CZ')}</em>
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
