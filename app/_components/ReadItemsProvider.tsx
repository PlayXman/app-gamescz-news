import React, {createContext, ReactNode, useCallback, useContext, useEffect, useReducer} from 'react';
import {RssItem} from "@/functions/src/iGamesCzRss";

const ReadItemsContext = createContext<{
  /**
   * List of titles of items that are marked as read.
   */
  hiddenItems: Set<string>,
  toggleItem: (title: string) => void;
}>({
  hiddenItems: new Set(),
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

function reducer(state: Set<string>, action: {type: 'toggle', title: string} | {type: 'init', rssItems: RssItem[]}): Set<string> {
  switch (action.type) {
    case "init": {
      if(action.rssItems.length === 0) {
        return state;
      }

      const nextState = new Set<string>();
      for(const rssItem of action.rssItems) {
        if(rssItem.title && state.has(rssItem.title)) {
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

function reducerInit(): Set<string> {
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
  const [hiddenItems, dispatch] = useReducer(reducer, null, reducerInit);

  const toggleItem = useCallback((title: string) => {
    dispatch({type: 'toggle', title});
  }, []);

  useEffect(() => {
    dispatch({type: 'init', rssItems: rssItems ?? []});
  }, [rssItems]);

  return (
    <ReadItemsContext.Provider value={{
      hiddenItems,
      toggleItem
    }}>
      {children}
    </ReadItemsContext.Provider>
  );
}
