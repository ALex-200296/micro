import React from 'react';
import { IObjectFile } from '@middleware/reports/reports.types';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { BadgeProps } from 'antd';

export interface ICellProps {
  entryData: string;
  getStatus?: (status: string) => Pick<BadgeProps, 'status' | 'color'>;
}

export interface IStatusCellProps extends ICellProps {
  statusDesc: string;
}

export interface IShowTaskCellProps extends ICellProps {
  onClickAction: ActionCreatorWithPayload<{ id: string }>;
}

export interface IBaseFileDownloadCellProps {
  entryData: ICellProps['entryData'] | React.ReactNode;
  href?: string;
  addDownloadAttributes?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
  title?: string;
}
export interface IUploadResultsCellProps {
  results: IObjectFile[];
}
