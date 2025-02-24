import React, {useCallback, useRef, useState} from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardActionAreaProps,
  CardContent,
  CardMedia, Paper,
  SxProps,
  Theme,
  Typography
} from "@mui/material";
import {SystemStyleObject} from "@mui/system";
import {useSwipeHandlers} from "@/app/_components/Item/useSwipeHandlers";

const animationLength = 0.4;

const rootSx: SystemStyleObject = {
  height: '100%',
  position: 'relative',
  zIndex: 'var(--index, 0)',
};
const cardSx: SystemStyleObject = {
  '@keyframes swipeRight': {
    '0%': {
      transform: 'translateX(0%)',
      opacity: 1,
    },
    '20%': {
      opacity: 1,
    },
    '100%': {
      transform: 'translateX(100%)',
      opacity: 0,
    }
  },
  '@keyframes swipeLeft': {
    '0%': {
      transform: 'translateX(0%)',
      opacity: 1,
    },
    '20%': {
      opacity: 1,
    },
    '100%': {
      transform: 'translateX(-100%)',
      opacity: 0,
    }
  },
  height: '100%',
  position: 'relative',
  zIndex: 1,
  animationDuration: `${animationLength}s`,
  animationFillMode: 'forwards',
  animationTimingFunction: 'linear',
  animationPlayState: 'var(--animState, paused)',
  animationDelay: 'var(--animDelay, 0s)',
  animationDirection: 'var(--animDirection, normal)',
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
const swipeBackgroundSx: SxProps = {
  bgcolor: 'error.main',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

function animateCard(progress: number, state: 'reset' | 'animate' | 'finish'): SystemStyleObject {
  if(progress === 0) {
    return null;
  }

  let animationProgress = animationLength * Math.abs(progress);
  if(state === 'reset') {
    animationProgress = animationLength - animationProgress;
  }

  return {
    animationName: progress < 0 ? 'swipeLeft' : 'swipeRight',
    '--animDelay': `-${animationProgress.toFixed(3)}s`,
    '--animState': state === 'animate' ? 'paused' : 'running',
    '--animDirection': state === 'reset' ? 'reverse' : 'normal',
  };
}

type SwipeHandlersCallback<Index extends number> = NonNullable<Parameters<typeof useSwipeHandlers>[Index]>;

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
  const [isSwiping, setIsSwiping] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [animationState, setAnimationState] = useState<Parameters<typeof animateCard>[1]>('animate');
  const [elementWidth, setElementWidth] = useState(0);
  const element = useRef<HTMLDivElement | null>(null);

  // Clock handler
  const handleOpen = useCallback<NonNullable<CardActionAreaProps['onClick']>>((event) => {
    window.open(targetUrl, '_blank');
    onHide(event);
  }, [onHide, targetUrl]);

  // Swipe handlers
  const handleSwipeStart = useCallback<SwipeHandlersCallback<0>>(() => {
    setElementWidth(element.current?.offsetWidth ?? 0);
    setAnimationState('animate');
    setAnimationProgress(0);
  }, []);

  const handleSwipeProgress = useCallback<SwipeHandlersCallback<1>>((deltaX, _deltaY, event) => {
    event.stopPropagation();

    if(Math.abs(deltaX) > 30) {
      // Prevent scrolling and animate
      setIsSwiping(true);

      let progress = deltaX / elementWidth;
      if(Math.abs(progress) > 1) {
        progress = progress < 0 ? -1 : 1;
      }
      setAnimationProgress(progress);
      setAnimationState('animate');
    } else {
      // Allow scrolling, no animation
      setIsSwiping(false);
      setAnimationProgress(0);
    }
  }, [elementWidth]);

  const handleSwipeEnd = useCallback<SwipeHandlersCallback<2>>((_deltaX, _deltaY, event) => {
    if(Math.abs(animationProgress) > 0.4) {
      setAnimationState('finish');
      setTimeout(() => {
        setIsSwiping(false);
        onHide(event)
      }, animationLength * 600);
    } else {
      setIsSwiping(false);
      setAnimationState('reset');
    }
  }, [animationProgress, onHide]);

  const {swipeStartHandler, swipeMoveHandler, swipeEndHandler} = useSwipeHandlers(handleSwipeStart, handleSwipeProgress, handleSwipeEnd)

  return (
    <Box sx={[rootSx, {'--index': isSwiping ? 1 : 0}]}>
      <Card
        ref={element}
        variant="elevation"
        sx={[cardSx, animateCard(animationProgress, animationState)]}
        elevation={isSwiping ? 8 : 1}
      >
        <CardActionArea
          sx={actionAreaSx}
          onClick={handleOpen}
          onContextMenu={onHide}
          onTouchStart={swipeStartHandler}
          onTouchMove={swipeMoveHandler}
          onTouchEnd={swipeEndHandler}
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

      <Paper sx={swipeBackgroundSx} />
    </Box>
  );
}
