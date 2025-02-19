import React, {createContext, ReactNode, useCallback, useContext, useEffect, useReducer} from 'react';
import {RssItem} from "@/functions/src/iGamesCzRss";

const ReadItemsContext = createContext<{
  /**
   * List of pubDates (timestamp) of items that are marked as read.
   */
  hiddenPubDates: Set<number>,
  markItemAsRead: (pubDate: Date) => void;
}>({
  hiddenPubDates: new Set(),
  markItemAsRead: () => {},
});

/**
 * Read items context hook
 */
export function useReadItems() {
  return useContext(ReadItemsContext);
}

// Reducer

const localStorageKey = 'readItemPubDates';

function persistReducerState(state: Set<number>): void {
  localStorage.setItem(localStorageKey, JSON.stringify(Array.from(state)));
}

function reducer(state: Set<number>, action: {type: 'markItemAsRead', pubDate: Date} | {type: 'init', rssItems: RssItem[]}): Set<number> {
  switch (action.type) {
    case "init": {
      const oldestPubDateString = action.rssItems.at(-1)?.pubDate

      if(oldestPubDateString == null) {
        return state;
      }

      const oldestPubDate = new Date(oldestPubDateString).getTime();
      const nextState = new Set<number>();
      for(const presistedPubDate of Array.from(state)) {
        if(presistedPubDate >= oldestPubDate) {
          nextState.add(presistedPubDate);
        }
      }

      persistReducerState(nextState);
      return nextState;
    }
    case "markItemAsRead": {
      const pubDate = action.pubDate.getTime();
      const nextState = new Set(state);
      if (nextState.has(pubDate)) {
        nextState.delete(pubDate);
      } else {
        nextState.add(pubDate);
      }

      persistReducerState(nextState);
      return nextState;
    }
    default:
      return state;
  }
}

function reducerInit(): Set<number> {
  return new Set(JSON.parse(localStorage.getItem(localStorageKey) ?? '[]'));
}

// ! reducer

export default function ReadItemsProvider({
                                            children,
                                            rssItems,
                                          }: {
  children: ReactNode;
  rssItems: RssItem[] | undefined;
}) {
  const [hiddenPubDates, dispatch] = useReducer(reducer, null, reducerInit);

  const markItemAsRead = useCallback((pubDate: Date) => {
    dispatch({type: 'markItemAsRead', pubDate});
  }, []);

  useEffect(() => {
    dispatch({type: 'init', rssItems: rssItems ?? []});
  }, [rssItems]);

  return (
    <ReadItemsContext.Provider value={{
      hiddenPubDates,
      markItemAsRead
    }}>
      {children}
    </ReadItemsContext.Provider>
  );
}
