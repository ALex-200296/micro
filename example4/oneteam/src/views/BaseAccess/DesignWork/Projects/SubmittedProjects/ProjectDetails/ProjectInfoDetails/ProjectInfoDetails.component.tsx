import React, { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectSelectors } from '@app/store/project/project.selectors';
import { ProjectsComputedProperty } from '@app/store/project/project.types';
import { getProjectRequestDetailsAction } from '@middleware/project/project.saga';

import DrawerDetails from '../../../components/DrawerDetails.component';
import LoadingIndicator from '../../../components/Sections/LoadingIndicator/LoadingIndicator.component';

const ProjectDetails: React.FC = () => {
  const id = useSelector(projectSelectors.getSelectedProjectId(ProjectsComputedProperty.projects));
  const project = useSelector(projectSelectors.getProjectDetailsById(ProjectsComputedProperty.projects));

  const dispatch = useDispatch();

  const projectsResponseFormProps = useMemo(
    () =>
      project && {
        id: id,
        lprList: project.lpr_list,
        responsible: project.cliRole.filter((role) => role.role === 'extLPR')[0]?.exm_mancode || '',
        extCode: project.extCode,
        extStatus: project.extStatus,
        extDateCreate: project.extDateCreate,
        extDateChange: project.extDateChange,
        statusList: project.statusList,
      },
    [project, id],
  );

  useEffect(() => {
    !project &&
      !!id &&
      dispatch(getProjectRequestDetailsAction({ id, detailsType: ProjectsComputedProperty.projects }));
  }, [project, id]);

  return project ? (
    <DrawerDetails
      requestInfo={{ ...project }}
      manInfo={{
        clients: project.cliRole,
        requestType: project.requestType,
      }}
      subRequestInfo={project}
      projectsResponseForm={projectsResponseFormProps}
    />
  ) : (
    <LoadingIndicator />
  );
};

export default memo(ProjectDetails);
