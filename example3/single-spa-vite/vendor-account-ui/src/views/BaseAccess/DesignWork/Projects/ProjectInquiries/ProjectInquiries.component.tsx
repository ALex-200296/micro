import React, { memo, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { projectSelectors } from '@app/store/project/project.selectors';
import { projectSliceName, setProjectsPagination, setSelectedProjectId } from '@app/store/project/project.slice';
import { IProjectsListDataForTable, ProjectsComputedProperty } from '@app/store/project/project.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import {Manuals} from '@features/common/ui';
import { getProjectRequestsListAction } from '@middleware/project/project.saga';
import { useOnTableChange,useToggleState } from '@shared/lib';
import {Drawer, Table, Toolbar} from '@shared/ui';
import { manualsDrawerTitle } from '@views/BaseAccess/BaseAccessPage.data';

import { getProjectsColumnsConfig, manualsData } from '../Projects.data';

import ProjectDetails from './ProjectDetails/ProjectDetails.component';
import { inquiriesDrawerTitle } from './ProjectInquiries.data';

import styles from '../Projects.module.scss';

const ProjectInquiries: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { isOpen: manualsOpen, handleOpen: handleManualsOpen, handleClose: handleManualsClose } = useToggleState();
  const { isOpen: detailsOpen, handleOpen: handleDetailsOpen, handleClose: handleDetailsClose } = useToggleState();

  const { records, page, rows } = useSelector(
    projectSelectors.getProjectsPaginationData(ProjectsComputedProperty.PROJECT_REQUESTS),
  );
  const isLoading = useSelector(
    uiSelectors.getIsRequestPending(`${projectSliceName}/${ProjectsComputedProperty.PROJECT_REQUESTS}`),
  );
  const extCode = useSelector(projectSelectors.getExtCodeOfSelectedProject(ProjectsComputedProperty.PROJECT_REQUESTS));

  const onTableChange = useOnTableChange({
    onPaginate: setProjectsPagination,
    computedProperty: ProjectsComputedProperty.PROJECT_REQUESTS,
  });

  const columns = useMemo(() => getProjectsColumnsConfig<IProjectsListDataForTable>(intl.formatNumber, true), []);

  useEffect(() => {
    dispatch(getProjectRequestsListAction({ page, rows }));
  }, [page, rows]);

  return (
    <>
      <Toolbar>
        <Toolbar.OpenDocumentation
          onClick={handleManualsOpen}
          drawerProps={{
            open: manualsOpen,
            onClose: handleManualsClose,
            title: manualsDrawerTitle,
            children: <Manuals manualsData={manualsData} showManufacturerInfo />,
          }}
        />
      </Toolbar>
      <Table
        className={styles.projects_table}
        dataSelector={projectSelectors.getProjectsListDataForTable}
        pagination={{ current: page, total: records, pageSize: rows }}
        onChange={onTableChange}
        rowKey='id'
        size='small'
        loading={isLoading}
        columns={columns}
        onRow={(record) => ({
          onClick: () => {
            dispatch(
              setSelectedProjectId({ id: record.id, computedProperty: ProjectsComputedProperty.PROJECT_REQUESTS }),
            );
            handleDetailsOpen();
          },
        })}
      />
      <Drawer
        open={detailsOpen}
        onClose={handleDetailsClose}
        destroyOnClose
        width='md'
        title={inquiriesDrawerTitle}
        copyableTitlePart={extCode}
      >
        <ProjectDetails afterSubmit={handleDetailsClose} />
      </Drawer>
    </>
  );
};

export default memo(ProjectInquiries);
