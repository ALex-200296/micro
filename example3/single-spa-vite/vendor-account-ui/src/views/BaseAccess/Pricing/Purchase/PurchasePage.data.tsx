import { docsPath } from '@views/BaseAccess/BaseAccessPage.data';
import { IDescription } from '@views/BaseAccess/BaseAccessPage.types';

export const heading = 'Управление ценами';

export const description: IDescription = {
  descr: 'Для управления ценами на товары загрузите заполненный файл в формате .csv, разделитель - точка с запятой',
  path: `${docsPath}/price_template.xlsx`,
  name: 'Шаблон загрузки цен на товары.xlsx',
};
