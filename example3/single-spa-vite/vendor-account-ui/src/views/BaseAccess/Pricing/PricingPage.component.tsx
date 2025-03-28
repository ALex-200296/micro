import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { setIsShowMeeting } from '@app/store/ui/ui.slice';
import { infoSearchAction } from '@middleware/info/info.saga';

import EventReviewDrawerComponent from '../components/EventReview/EventReviewDrawer.component';

const PricingPage: React.FC = () => {
  const dispatch = useDispatch();

  const statusFilterOptions = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.CO_TABLE, CodeInfoSearch.JOB_STATE),
  );
  const isShowMeeting = useSelector(uiSelectors.getIsShowMeeting);
  const handleClose = useCallback(() => {
    dispatch(setIsShowMeeting(false));
  }, []);

  useEffect(() => {
    if (!statusFilterOptions.length) {
      dispatch(
        infoSearchAction({
          type: TypeInfoSearch.CO_TABLE,
          code: CodeInfoSearch.JOB_STATE,
        }),
      );
    }
  }, []);

  return (
    <>
      <Outlet />
      <EventReviewDrawerComponent isOpen={isShowMeeting} handleClose={handleClose} />
    </>
  );
};

export default memo(PricingPage);
