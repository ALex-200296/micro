import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { useHistory } from '@shared/lib';

export let globalNavigate: NavigateFunction;

let prevKey: string = '';

export const GlobalHistory = () => {
  globalNavigate = useNavigate();
  const location = useLocation();
  const { addHistory } = useHistory();

  if (location.key !== prevKey) {
    prevKey = location.key;
    addHistory(location);
  }

  return null;
};
