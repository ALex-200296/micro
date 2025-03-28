import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { setIsShowMeeting } from '@app/store/ui/ui.slice';
import { infoSearchAction } from '@middleware/info/info.saga';
import EventReviewDrawer from '@views/BaseAccess/components/EventReview/EventReviewDrawer.component';

const CatalogPage: React.FC = () => {
  const dispatch = useDispatch();

  const isShowMeeting = useSelector(uiSelectors.getIsShowMeeting);
  const statusFilterOptions = useSelector(
    infoSelectors.getInfoSearch(TypeInfoSearch.co_table, CodeInfoSearch.job_state),
  );

  const handleClose = useCallback(() => {
    dispatch(setIsShowMeeting(false));
  }, []);

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

export default memo(CatalogPage);
