import { IFileLoadFormProps, IManualsData } from '@features/common/ui';
import { FileType, ruleForFileSize } from '@shared/lib';
import { docsPath } from '@views/BaseAccess/BaseAccessPage.data';

export const dataTestId = 'factoring';
export const heading = 'Факторинг';
export const manualsDrawerTitle = 'Документация ЭТМ';
export const templateAwareProps = {
  description: 'Для отправки заявки на факторинг загрузите заполненные шаблоны',
  name: 'Факторинг.zip',
  path: `${docsPath}/factoring.zip`,
};
export const templateTitle = 'Отправить заявку на факторинг';
export const fileLoadFormProps: Omit<IFileLoadFormProps, 'onFinish'> = {
  multiple: true,
  descriptions: [
    {
      title: 'Для отправки заявки на факторинг заполните и загрузите:',
      text: [
        { label: '1.', name: 'Анкету' },
        { label: '2.', name: 'Согласие на запрос данных в бюро кредитных историй и на обработку персональных данных' },
        { label: '3.', name: 'Скан-копию контракта' },
        { label: '4.', name: 'Годовую отчётность с отметкой налогового органа' },
      ],
    },
  ],
  rules: [
    {
      validator: (_, value: FileType) => ruleForFileSize(_, value),
    },
  ],
};

export const manualsData: IManualsData[] = [
  {
    name: 'Инструкции',
    data: [
      {
        name: 'Инструкция по работе в разделе',
        to: `${docsPath}/instruction_factoring.docx`,
      },
    ],
  },
];
