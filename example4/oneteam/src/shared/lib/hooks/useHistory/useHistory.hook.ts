import { useCallback } from 'react';
import { Location } from 'react-router-dom';

import { IHistory, UseHistoryType } from './useHistory.types';

let history: IHistory = {
  all: [],
  prevLocation: null,
  currentLocation: null,
};

export const useHistory: UseHistoryType = () => {
  const addHistory = useCallback((location: Location) => {
    history = {
      all: [...history.all, location],
      prevLocation: history.all.at(-1) || null,
      currentLocation: location,
    };
  }, []);

  return {
    addHistory,
    history,
  };
};
