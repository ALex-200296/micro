import { SubmittedProjectsFormValues } from './ProjectsFilterDrawer/SubmittedProjectsFilter.types';

export const dataTestId = 'submitted-projects';

export const limitsSearchClass = ['ВТ9920', 'ВТ9930'];

export const warningMessage = 'Ограничение вывода записей: 200. Рекомендуется применить фильтры.';

export const drawerTitle = 'Проект №';

export const projectFilterConfig = {
  [SubmittedProjectsFormValues.EXM_MAN_CODE]: {
    labelPropName: 'fio',
    valuePropName: 'exm_mancode',
  },
  [SubmittedProjectsFormValues.SUB_PRJ_STATUS]: {
    labelPropName: 'label',
    valuePropName: 'code',
  },
};
