import React, { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectSelectors } from '@app/store/project/project.selectors';
import { ProjectsComputedProperty } from '@app/store/project/project.types';
import { getProjectRequestDetailsAction } from '@middleware/project/project.saga';

import DrawerDetails from '../../components/DrawerDetails.component';
import LoadingIndicator from '../../components/Sections/LoadingIndicator/LoadingIndicator.component';

import { ProjectDetailsProps } from './ProjectDetails.types';

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ afterSubmit }) => {
  const id = useSelector(projectSelectors.getSelectedProjectId(ProjectsComputedProperty.PROJECT_REQUESTS));
  const project = useSelector(projectSelectors.getProjectDetailsById(ProjectsComputedProperty.PROJECT_REQUESTS));

  const supplierResponseProps = useMemo(
    () =>
      project && {
        id: id,
        projectName: project.extName,
        projectNumber: project.extCode,
        comment: project.extComment,
        currentStatus: project.extStatus,
        crmDate: project.extCRMDateCreate,
        dateCreate: project.extDateCreate,
        dateChange: project.extDateChange,
        requestNumber: project.requestNum,
        statusList: project.statusList,
        compMnf: project.compMnf,
        lpr_list: project.lpr_list,
        responsible: project.cliRole.filter((role) => role.role === 'extLPR')[0]?.exm_mancode || '',
        afterSubmit,
      },
    [project, id],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!project && id) {
      dispatch(getProjectRequestDetailsAction({ id, detailsType: ProjectsComputedProperty.PROJECT_REQUESTS }));
    }
  }, [project, id]);

  return project ? (
    <DrawerDetails
      requestInfo={{ ...project }}
      manInfo={{
        clients: project.cliRole,
        requestType: project.requestType,
        author: {
          role: 'Автор запроса',
          manPost: project.avtor_pos,
          fio: project.avtor_fio,
          phone: project.avtor_phone,
          email: project.avtor_email,
        },
      }}
      subRequestInfo={project}
      supplierResponse={
        supplierResponseProps && {
          ...supplierResponseProps,
        }
      }
    />
  ) : (
    <LoadingIndicator />
  );
};

export default memo(ProjectDetails);
