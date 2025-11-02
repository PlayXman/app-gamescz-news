import React, {useCallback, useEffect, useRef} from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardActionAreaProps,
  CardContent,
  CardMedia,
  SxProps,
  Theme,
  Typography
} from "@mui/material";
import {SystemStyleObject} from "@mui/system";
import {isTouchDevice} from "@/app/_utils/swipe";

const swipeableActiveClassName = 'swipe--active';

const rootSx: SystemStyleObject = {
  height: '100%',
};
const cardSx: SystemStyleObject = {
  height: '100%',

  [`&.${swipeableActiveClassName}`]: {
    display: 'flex',
    overflow: 'scroll',
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'none',

    '& > *, &:before, &:after': {
      scrollSnapAlign: 'center',
      scrollSnapStop: 'always',
      minWidth: '100%',
    },
    '&:before, &:after': {
      content: '""',
      display: 'block',
      bgcolor: 'error.main',
    }
  }
};
const actionAreaSx: SxProps = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'stretch'
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onHide: (event: any) => void;
}) {
  const swipeableElement = useRef<HTMLDivElement | null>(null);

  // Clock handler
  const handleOpen = useCallback<NonNullable<CardActionAreaProps['onClick']>>((event) => {
    window.open(targetUrl, '_blank');
    onHide(event);
  }, [onHide, targetUrl]);

  // Swipe handler
  const handleSwipeEnd = useCallback<NonNullable<HTMLDivElement['onscrollend']>>((event) => {
    const el = event.currentTarget as HTMLDivElement | null;

    if (el == null) {
      return;
    }

    const scrollX = el.scrollLeft;
    const elWidth = el.offsetWidth + 20; // Add some tolerance. The element with can be with decimals which adds some inaccuracy.

    if (scrollX === 0 || scrollX > elWidth) {
      onHide(event);
    }
  }, [onHide]);

  useEffect(() => {
    if (swipeableElement.current != null && isTouchDevice()) {
      const el = swipeableElement.current;
      el.classList.add(swipeableActiveClassName);
      el.scrollTo({left: el.offsetWidth, behavior: "instant"});
    }
  }, []);

  return (
    <Box
      sx={rootSx}
    >
      {/* @ts-expect-error onScrollEnd is missing on Card but is propagated to underlying div element */}
      <Card
        ref={swipeableElement}
        variant="elevation"
        sx={cardSx}
        elevation={1}
        onScrollEnd={handleSwipeEnd}
      >
        <CardActionArea
          sx={actionAreaSx}
          onClick={handleOpen}
          onContextMenu={onHide}
        >
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
    </Box>
  );
}
