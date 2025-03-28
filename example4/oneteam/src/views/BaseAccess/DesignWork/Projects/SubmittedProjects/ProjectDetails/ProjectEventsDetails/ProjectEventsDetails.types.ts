import React from 'react';

export interface IProjectEventsDetailsProps {
  handleOpenUpdateMeeting: () => void;
  children?: React.ReactNode;
  setEventsPage: React.Dispatch<React.SetStateAction<number>>;
}
