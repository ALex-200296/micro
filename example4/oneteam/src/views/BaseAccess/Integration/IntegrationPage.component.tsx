import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { setIsShowMeeting, setNotification } from '@app/store/ui/ui.slice';
import { infoSearchAction } from '@middleware/info/info.saga';
import { useQueryParams } from '@shared/lib';

import EventReviewDrawer from '../components/EventReview/EventReviewDrawer.component';

const IntegrationPage: React.FC = () => {
  const dispatch = useDispatch();

  const isShowMeeting = useSelector(uiSelectors.getIsShowMeeting);
  const statusFilterOptions = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.co_table, CodeInfoSearch.job_state),
  );

  const { edoFormSuccess } = useQueryParams();

  const handleClose = useCallback(() => {
    dispatch(setIsShowMeeting(false));
  }, []);

  useEffect(() => {
    if (edoFormSuccess === 'true') {
      dispatch(setNotification({ message: { title: 'Данные успешно отправлены' }, variant: 'success' }));
    }
  }, [edoFormSuccess]);

  useEffect(() => {
    if (!statusFilterOptions.length) {
      dispatch(
        infoSearchAction({
          type: TypeInfoSearch.co_table,
          code: CodeInfoSearch.job_state,
        }),
      );
    }
  }, []);

  return (
    <>
      <Outlet />
      <EventReviewDrawer isOpen={isShowMeeting} handleClose={handleClose} />
    </>
  );
};

export default memo(IntegrationPage);
