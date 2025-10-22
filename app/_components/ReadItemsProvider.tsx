"use client";

import React, {createContext, ReactNode, useCallback, useContext, useEffect, useReducer, useRef, useState} from 'react';
import {RssItem} from "@/functions/src/iGamesCzRss";
import fetchGamesCzItems from "@/app/_utils/GamesCz";

const ReadItemsContext = createContext<{
  /** List of items from the latest RSS feed. */
  items: RssItem[];
  /** List of titles of items that are marked as read. */
  hiddenItems: Set<string>,
  /** When was the RSS last updated. */
  updatedAt: Date | undefined;
  /** Are items being loaded? */
  loading: boolean;
  /** Hide/show item. */
  toggleItem: (title: string) => void;
}>({
  items: [],
  hiddenItems: new Set(),
  updatedAt: undefined,
  loading: true,
  toggleItem: () => {},
});

/**
 * Read items context hook
 */
export function useReadItems() {
  return useContext(ReadItemsContext);
}

// Reducer

const localStorageKey = 'readItemTitles';

function persistReducerState(state: Set<string>): void {
  localStorage.setItem(localStorageKey, JSON.stringify(Array.from(state)));
}

function loadPersistedReducerState(): Set<string> {
  return new Set(JSON.parse(localStorage.getItem(localStorageKey) ?? '[]'));
}

function reducer(state: Set<string>, action: {type: 'toggle', title: string} | {type: 'init', rssItems: RssItem[]}): Set<string> {
  switch (action.type) {
    case "init": {
      const persistedState = loadPersistedReducerState();

      if(action.rssItems.length === 0) {
        return persistedState;
      }

      const nextState = new Set<string>();
      for(const rssItem of action.rssItems) {
        if(rssItem.title && persistedState.has(rssItem.title)) {
          nextState.add(rssItem.title);
        }
      }

      persistReducerState(nextState);
      return nextState;
    }
    case "toggle": {
      const title = action.title;
      const nextState = new Set(state);
      if (nextState.has(title)) {
        nextState.delete(title);
      } else {
        nextState.add(title);
      }

      persistReducerState(nextState);
      return nextState;
    }
    default:
      return state;
  }
}

// ! reducer

export default function ReadItemsProvider({
                                            children,
                                          }: {
  children: ReactNode;
}) {
  const [rssItems, setRssItems] = useState<RssItem[]>([]);
  const [rssUpdatedAt, setRssUpdatedAt] = useState<Date | undefined>(undefined);
  const [rssLoading, setRssLoading] = useState(true);
  const [hiddenItems, dispatchHiddenItems] = useReducer(reducer, null, () => new Set());
  const interacted = useRef(false);

  const toggleItem = useCallback((title: string) => {
    interacted.current = true;
    dispatchHiddenItems({type: 'toggle', title});
  }, []);

  // Load items.
  useEffect(() => {
    fetchGamesCzItems()
      .then(result => {
        const {items, updatedAt} = result;
        setRssItems(items);
        setRssUpdatedAt(updatedAt);
        dispatchHiddenItems({type: 'init', rssItems: items});
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setRssLoading(false)
      });
  }, []);

  // Auto-close window if all items are read.
  useEffect(() => {
    if(interacted.current && hiddenItems.size === rssItems.length) {
      window.close();
    }
  }, [hiddenItems, rssItems]);

  return (
    <ReadItemsContext.Provider value={{
      items: rssItems,
      loading: rssLoading,
      updatedAt: rssUpdatedAt,
      hiddenItems,
      toggleItem
    }}>
      {children}
    </ReadItemsContext.Provider>
  );
}
