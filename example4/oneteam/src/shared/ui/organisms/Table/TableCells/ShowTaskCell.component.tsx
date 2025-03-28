import React, { memo, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { FileProtectOutlined } from '@ant-design/icons';
import { setIsShowMeeting } from '@app/store/ui/ui.slice';

import IconButton from '../../../molecules/Button/IconButton/IconButton.component';

import { getMeetingId } from './TableCell.data';
import { IShowTaskCellProps } from './TableCellsProps.types';

export const ShowTaskCell: React.FC<IShowTaskCellProps> = memo(({ entryData, onClickAction }) => {
  const dispatch = useDispatch();
  const meetingId = useMemo(() => getMeetingId(entryData, '$'), [entryData]);

  const handleShowMeeting = useCallback(() => {
    if (meetingId) {
      dispatch(onClickAction({ id: meetingId }));
      dispatch(setIsShowMeeting(true));
    }
  }, [meetingId]);

  return (
    <IconButton
      dataTestId='show-task-cell'
      onClick={handleShowMeeting}
      disabled={!meetingId}
      icon={<FileProtectOutlined />}
    />
  );
});