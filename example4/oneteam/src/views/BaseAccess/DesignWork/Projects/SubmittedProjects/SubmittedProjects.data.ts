import { SubmittedProjectsFormValues } from './ProjectsFilterDrawer/SubmittedProjectsFilter.types';

export const dataTestId = 'submitted-projects';

export const limitsSearchClass = ['ВТ9920', 'ВТ9930'];

export const warningMessage = 'Ограничение вывода записей: 200. Рекомендуется применить фильтры.';

export const drawerTitle = 'Проект №';

export const projectFilterConfig = {
  [SubmittedProjectsFormValues.exmManCode]: {
    labelPropName: 'fio',
    valuePropName: 'exm_mancode',
  },
  [SubmittedProjectsFormValues.subPrjStatus]: {
    labelPropName: 'label',
    valuePropName: 'code',
  },
};
