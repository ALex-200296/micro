import { Location } from 'react-router-dom';

export interface IHistory {
  all: Location[];
  prevLocation: Location | null;
  currentLocation: Location | null;
}

export type UseHistoryType = () => {
  addHistory: (location: Location) => void;
  history: IHistory;
};
