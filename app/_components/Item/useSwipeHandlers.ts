import {CardActionAreaProps} from "@mui/material";
import {useCallback, useState} from "react";

type Handler<H extends keyof CardActionAreaProps> = NonNullable<CardActionAreaProps[H]>;

type EventParam<H extends keyof CardActionAreaProps> = Parameters<Handler<H>>[0]

export function useSwipeHandlers(
  onStart: ((event: EventParam<'onTouchStart'>) => void) | undefined,
  onMove: ((deltaX: number, deltaY: number, event: EventParam<'onTouchMove'>) => void) | undefined,
  onEnd: ((deltaX: number, deltaY: number, event: EventParam<'onTouchEnd'>) => void) | undefined
): {
  swipeStartHandler: Handler<'onTouchStart'>;
  swipeMoveHandler: Handler<'onTouchMove'>;
  swipeEndHandler: Handler<'onTouchEnd'>;
} {
  const [startPos, setStartPos] = useState([0, 0]);

  const swipeStartHandler = useCallback<Handler<'onTouchStart'>>((event) => {
    setStartPos([event.touches[0].screenX, event.touches[0].screenY]);
    onStart?.(event);
  }, [onStart]);

  const swipeMoveHandler = useCallback<Handler<'onTouchMove'>>((event) => {
    const deltaX = event.touches[0].screenX - startPos[0];
    const deltaY = event.touches[0].screenY - startPos[1];

    onMove?.(deltaX, deltaY, event);
  }, [onMove, startPos]);

  const swipeEndHandler = useCallback<Handler<'onTouchEnd'>>((event) => {
    const deltaX = event.changedTouches[0].screenX - startPos[0];
    const deltaY = event.changedTouches[0].screenY - startPos[1];

    onEnd?.(deltaX, deltaY, event);

  }, [onEnd, startPos]);

  return {
    swipeStartHandler,
    swipeMoveHandler,
    swipeEndHandler,
  };

}
