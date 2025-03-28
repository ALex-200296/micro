import React, { memo, NamedExoticComponent } from 'react';
import { Space } from 'antd';
import cn from 'classnames';

import { AddGoods } from './Tools/AddGoods.component';
import { ApplyFilter } from './Tools/ApplyFilter.component';
import { CreateAct } from './Tools/CreateAct.component';
import { CreateFactoring } from './Tools/CreateFactoring.component';
import { CreateTask } from './Tools/CreateTask.component';
import { DownloadAsExcel } from './Tools/DownloadAsExcel.component';
import { DownloadFile } from './Tools/DownloadFile.component';
import { DownloadUnpublishedGoods } from './Tools/DownloadUnpublishedGoods.compopnent';
import { EditGoods } from './Tools/EditGoods.component';
import { EdoApplication } from './Tools/EdoApplication.component';
import { EdoProvider } from './Tools/EdoProvider.component';
import { OpenDocumentation } from './Tools/OpenDocumentation.component';
import { SubscribeToCalendar } from './Tools/SubscribeToCalendar.component';
import { IToolbarProps } from './Toolbar.types';

import styles from './Toolbar.module.scss';

const BaseToolbar: React.FC<IToolbarProps> = ({
  children,
  className = 'margin_4_toolbar',
  excludeClassName,
  ...props
}) => (
  <Space className={cn(styles.toolbar, { [className]: !excludeClassName })} {...props}>
    {children}
  </Space>
);

export const Toolbar = memo(BaseToolbar) as NamedExoticComponent<IToolbarProps> & {
  DownloadFile: typeof DownloadFile;
  DownloadAsExcel: typeof DownloadAsExcel;
  ApplyFilter: typeof ApplyFilter;
  CreateFactoring: typeof CreateFactoring;
  OpenDocumentation: typeof OpenDocumentation;
  CreateTask: typeof CreateTask;
  SubscribeToCalendar: typeof SubscribeToCalendar;
  CreateAct: typeof CreateAct;
  EdoApplication: typeof EdoApplication;
  EdoProvider: typeof EdoProvider;
  AddGoods: typeof AddGoods;
  EditGoods: typeof EditGoods;
  DownloadUnpublishedGoods: typeof DownloadUnpublishedGoods;
};

Toolbar.DownloadFile = DownloadFile;
Toolbar.DownloadAsExcel = DownloadAsExcel;
Toolbar.ApplyFilter = ApplyFilter;
Toolbar.OpenDocumentation = OpenDocumentation;
Toolbar.CreateTask = CreateTask;
Toolbar.SubscribeToCalendar = SubscribeToCalendar;
Toolbar.CreateAct = CreateAct;
Toolbar.EdoApplication = EdoApplication;
Toolbar.EdoProvider = EdoProvider;
Toolbar.CreateFactoring = CreateFactoring;
Toolbar.AddGoods = AddGoods;
Toolbar.EditGoods = EditGoods;
Toolbar.DownloadUnpublishedGoods = DownloadUnpublishedGoods;
