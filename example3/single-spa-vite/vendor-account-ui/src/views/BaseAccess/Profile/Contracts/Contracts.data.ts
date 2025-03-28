import { IContractsPreviewData } from '@app/store/user/user.types';
import { IManualsData } from '@features/common/ui';
import { ColumnType } from '@shared/ui';
import { docsPath } from '@views/BaseAccess/BaseAccessPage.data';

export const keysToHeaders: { [key: string]: boolean | string } = {
  id: 'ID',
  contractNumber: 'Номер договора',
  dates: 'Период действия',
  edo: 'Инф. взаимодействие с ЭТМ',
};

export const correctRowValue = (value: string | boolean) => {
  switch (value) {
    case '':
      return '-';
    case true:
    case 'true':
      return 'Да';
    case false:
    case 'false':
      return 'Нет';
    default:
      return value;
  }
};

export const contractsTableConfig: ColumnType<IContractsPreviewData>[] = [
  {
    title: 'Номер договора',
    key: 'contractNumber',
    renderText: (_: unknown, row) => correctRowValue(row.contractNumber),
  },
  {
    title: 'Период действия',
    key: 'activePeriod',
    renderText: (_: unknown, row) => correctRowValue(row.dates),
  },
  {
    title: 'Инф. взаимодействие с ЭТМ',
    key: 'dealWithEtm',
    renderText: (_: unknown, row) => correctRowValue(row.edo),
  },
];

export const manualsData: IManualsData[] = [
  {
    name: 'Шаблон договора поставки',
    data: [
      {
        name: 'Договор поставки',
        to: `${docsPath}/contract.pdf`,
      },
      {
        name: 'Приложение 1 Протокол согласования скидок и отсрочки',
        to: `${docsPath}/attach1.pdf`,
      },
      {
        name: 'Приложение 2 Соглашение об информационном взаимодействии',
        to: `${docsPath}/attach2.pdf`,
      },
      {
        name: 'Общие правила взаимодействия по Договору поставки',
        to: `${docsPath}/interactionRules.pdf`,
      },
    ],
  },
  {
    name: 'Шаблон агентского договора',
    data: [
      {
        name: 'Агентский договор',
        to: `${docsPath}/agent_contract.pdf`,
      },
      {
        name: 'Приложение 1 Агентское вознаграждение',
        to: `${docsPath}/agent_attach1.pdf`,
      },
      {
        name: 'Приложение 2 Логистические услуги',
        to: `${docsPath}/agent_attach2.pdf`,
      },
      {
        name: 'Приложение 3 Ручательство',
        to: `${docsPath}/agent_attach3.pdf`,
      },
      {
        name: 'Приложение 4 Отчёт агента',
        to: `${docsPath}/agent_attach4.pdf`,
      },
      {
        name: 'Приложение 5 Соглашение ЭДО',
        to: `${docsPath}/agent_attach5.pdf`,
      },
      {
        name: 'Приложение 6 Доверенность Агенту',
        to: `${docsPath}/agent_attach6.pdf`,
      },
      {
        name: 'Общие правила взаимодействия по схеме Маркетплейс',
        to: `${docsPath}/interactionRulesMP.pdf`,
      },
    ],
  },
  {
    name: 'Шаблон Договора на оказание услуг',
    data: [
      {
        name: 'Договор возмездного оказания услуг',
        to: `${docsPath}/usl_contract.pdf`,
      },
      {
        name: 'Приложение 1 Поиск контента',
        to: `${docsPath}/usl_contract_attach1.pdf`,
      },
      {
        name: 'Приложение 2 Создание контента',
        to: `${docsPath}/usl_contract_attach2.pdf`,
      },
      {
        name: 'Приложение 3 Акт передачи образцов продукции',
        to: `${docsPath}/usl_contract_attach3.pdf`,
      },
    ],
  },
  {
    name: 'Пользовательское соглашение',
    data: [
      {
        name: 'Соглашение об использовании сервиса iPRO OneTeam',
        to: `${docsPath}/conventionOneTeam.pdf`,
      },
    ],
  },
];
