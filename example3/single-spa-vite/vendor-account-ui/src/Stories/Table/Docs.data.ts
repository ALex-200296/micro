import { defaultPaginationConfig, defaultScrollConfig } from '@shared/ui/molecules/BaseTable/Table.data';
import { ColumnType } from '@shared/ui/molecules/BaseTable/Table.types';
import { defaultFiltersConfig } from '@shared/ui/organisms/Table/FilterDropdown/FilterDropDown.data';

import { getLinkToAntDesign, getLinkToAntDesignPro } from '../stories.data';

import { TableStory } from './Docs.stories';

export const tableColumnTypeDetail =
  '\n PRO: https://procomponents.ant.design/en-US/components/table#columns-column-definition \n' +
  '\n------ Конфиг для редактируемой таблицы ------\n' +
  'editable?: boolean;\n' +
  'operationCellConfig?: {\n' +
  '  saveLabel?: string;\n' +
  '  cancelLabel?: string;\n' +
  '  editName?: string;\n' +
  '  cancelConfimLabel?: string;\n' +
  '  saveIcon?: React.ReactNode;\n' +
  '  cancelIcon?: React.ReactNode;\n' +
  '  editIcon?: React.ReactNode;\n' +
  '};\n' +
  'formItem?: Omit<FormItemProps, initialValue> & {\n' +
  '  initialValue?: CellInitialValue<T>;\n' +
  '  disabled?: boolean | ((record:T) => boolean);\n' +
  '};';

export interface TableEntry {
  id: string;
  name: string;
  age: string;
  address: string;
  email: string;
}

const handleFilter = (value: boolean | React.Key, record: TableEntry, columnName: keyof TableEntry) =>
  record[columnName].toString().toLowerCase().includes(value.toString().toLowerCase());

export const tableData: TableEntry[] = [
  {
    id: '1',
    name: 'Иван Иванов Иванович',
    age: '35',
    address: '631155, Волгоградская область, город Ступино, пл. Сталина, 38',
    email: 'ashleigh01@schuster.net',
  },
  {
    id: '2',
    name: 'Большакова Лада Фёдоровна',
    age: '50',
    address: '638754, Новгородская область, город Москва, ул. Балканская, 49',
    email: 'gretchen78@hotmail.com',
  },
  {
    id: '3',
    name: 'Красильников Вениамин Дмитриевич',
    age: '47',
    address: '359135, Ульяновская область, город Клин, спуск Домодедовская, 31',
    email: 'bernier.cynthia@heaney.com',
  },
  {
    id: '4',
    name: 'Сорокина Алиса Сергеевна',
    age: '38',
    address: '677495, Липецкая область, город Дмитров, пер. Ладыгина, 44',
    email: 'kraig08@yahoo.com',
  },
  {
    id: '5',
    name: 'Кузнецова Альбина Сергеевна',
    age: '25',
    address: '631155, Волгоградская область, город Ступино, пл. Сталина, 38',
    email: 'lfarrell@hotmail.com',
  },
  {
    id: '6',
    name: 'Гаврилова Марина Владимировна',
    age: '29',
    address: '638754, Новгородская область, город Москва, ул. Балканская, 49',
    email: 'khammes@gmail.com',
  },
  {
    id: '7',
    name: 'Евсеев Гордей Евгеньевич',
    age: '71',
    address: '359135, Ульяновская область, город Клин, спуск Домодедовская, 31',
    email: 'camryn61@yahoo.com',
  },
  {
    id: '8',
    name: 'Яковлев Рафаил Владимирович',
    age: '39',
    address: '176836, Калужская область, город Люберцы, пер. Гоголя, 54',
    email: 'yrohan@yahoo.com',
  },
  {
    id: '9',
    name: 'Одинцов Аркадий Максимович',
    age: '15',
    address: '030513, Тамбовская область, город Наро-Фоминск, пер. Гагарина, 56',
    email: 'bglover@gmail.com',
  },
  {
    id: '10',
    name: 'Фомин Владимир Алексеевич',
    age: '43',
    address: '351147, Сахалинская область, город Талдом, наб. Домодедовская, 43',
    email: 'choen.otho@yahoo.com',
  },
];

export const columnsConfig: ColumnType<TableEntry>[] = [
  {
    title: '№',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => Number(a.id) - Number(b.id),
    defaultSortOrder: 'descend',
  },
  {
    title: 'ФИО',
    dataIndex: 'name',
    key: 'name',
    ...defaultFiltersConfig(),
    onFilter: (value, record) => handleFilter(value, record, 'name'),
  },
  {
    title: 'Возраст',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => Number(a.age) - Number(b.age),
  },
  {
    title: 'Эл. почта',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: 'address',
    ...defaultFiltersConfig(),
    onFilter: (value, record) => handleFilter(value, record, 'address'),
  },
  {
    title: 'Действие',
  },
];

export const onChangeDetail =
  'onChangeData: {\n' +
  '  pagination: {\n' +
  '    page: number;\n' +
  '  };\n' +
  '  action: "filter" | "paginate" | "sort";\n' +
  '  sort: {\n' +
  '    column?: React.Key;\n' +
  '    order?: SortOrderType;\n' +
  '  };\n' +
  '}';
export const propsToDisable = [
  'expandIconColumnIndex',
  'expandedRowClassName',
  'childrenColumnName',
  'expandedRowRender',
  'defaultExpandedRowKeys',
  'expandedRowKeys',
  'prefixCls',
  'expandRowByClick',
  'expandIcon',
  'onExpand',
  'onExpandedRowsChange',
  'defaultExpandAllRows',
  'tailor',
  'id',
  'direction',
  'dropdownPrefixCls',
  'getContainerWidth',
  'rowHoverable',
  'onScroll',
  'columnsStateMap',
  'onColumnsStateChange',
  'tooltip',
  'ErrorBoundary',
  'name',
  'tableViewRender',
];

export const componentsOverrideDetail =
  '  table?: CustomizeComponent;\n' +
  '  header?: {\n' +
  '    wrapper?: CustomizeComponent;\n' +
  '    row?: CustomizeComponent;\n' +
  '    cell?: CustomizeComponent;\n' +
  '  };\n' +
  '  body?:\n' +
  '    | CustomizeScrollBody<T>\n' +
  '    | {\n' +
  '        wrapper?: CustomizeComponent;\n' +
  '        row?: CustomizeComponent;\n' +
  '        cell?: CustomizeComponent;\n' +
  '      };\n' +
  '}';

export const localeDetail =
  '{\n' +
  '    filterTitle?: string;\n' +
  '    filterConfirm?: React.ReactNode;\n' +
  '    filterReset?: React.ReactNode;\n' +
  '    filterEmptyText?: React.ReactNode;\n' +
  '    filterCheckall?: React.ReactNode;\n' +
  '    filterSearchPlaceholder?: string;\n' +
  '    emptyText?: React.ReactNode | (() => React.ReactNode);\n' +
  '    selectAll?: React.ReactNode;\n' +
  '    selectNone?: React.ReactNode;\n' +
  '    selectInvert?: React.ReactNode;\n' +
  '    selectionAll?: React.ReactNode;\n' +
  '    sortTitle?: string;\n' +
  '    expand?: string;\n' +
  '    collapse?: string;\n' +
  '    triggerDesc?: string;\n' +
  '    triggerAsc?: string;\n' +
  '    cancelSort?: string;\n' +
  '}';

export const stickyDetail = `{
    offsetHeader?: number;
    offsetSummary?: number;
    offsetScroll?: number;
    getContainer?: () => Window | HTMLElement;
}`;

export const paginationStoryTabs = [
  { label: 'Дефолт', key: '1' },
  { label: 'С быстрым переходом', key: '2' },
  { label: 'Упрощенный вид', key: '3' },
  { label: 'Маленький размер', key: '4' },
  { label: 'Показывать total', key: '5' },
];

export const storyArgs = {
  title: undefined,
  footer: undefined,
  caption: undefined,
  summary: undefined,
  headerTitle: undefined,
};

export const proTableData = [
  {
    id: 1,
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
    password: 'Пароль парольный',
    date: new Date(),
    avatar:
      'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    code: '<html><p><span>Текст</span></p></html>',
    jsonCode: '{key: "value", key1: "value1"}',
    fromNow: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    percent: 20,
    money: 1000000030340,
    progress: 75,
    rate: 3.5,
    color: '#32a87b',
  },
];

export const proConfigWithFormats: ColumnType<(typeof proTableData)[number]>[] = [
  { dataIndex: 'image', valueType: 'image', title: 'Картинка' },
  { dataIndex: 'password', valueType: 'password', title: 'Пароль' },
  { dataIndex: 'fromNow', valueType: 'fromNow', title: 'Подсчет разницы от даты до сегодня' },
  { dataIndex: 'percent', valueType: 'percent', title: 'Проценты' },
  { dataIndex: 'progress', valueType: 'progress', title: 'Прогресс' },
  { dataIndex: 'rate', valueType: 'rate', title: 'Рейтинг' },
  { dataIndex: 'color', valueType: 'color', title: 'Цвет' },
  { dataIndex: 'date', valueType: 'dateTime', title: 'Дата' },
  { dataIndex: 'avatar', valueType: 'avatar', title: 'Аватар' },
  { dataIndex: 'money', valueType: 'money', title: 'Деньги' },
  { dataIndex: 'code', valueType: 'code', title: 'Код' },
  { dataIndex: 'jsonCode', valueType: 'jsonCode', title: 'jSON' },
];

export const tableDocsDataSection: TableStory['argTypes'] = {
  dataSelector: {
    table: {
      category: 'Данные',
      type: { summary: '(state: RootState) => readonly T[]' },
    },
    description:
      'Селектор данных для таблицы. ' +
      'Таблице отдается селектор и уже далее, в самом компоненте, данные достаются и отображаются.',
  },
  dataSource: {
    table: {
      category: 'Данные',
    },
    description: 'Данные для таблицы',
  },
  request: {
    table: {
      category: 'Данные',
      type: { summary: '(params?: { pageSize,current }, sort, filter) => { data, success, total }' },
    },
    description: 'Асинхронная функция для запроса данных таблицы',
  },
  manualRequest: {
    table: {
      category: 'Данные',
    },
    description: 'Автоматически или вручную запускать первый запрос на данные',
  },
  params: {
    table: {
      category: 'Данные',
    },
    description: 'Дополнительные параметры, добавляемые в строку запроса в request',
  },
  postData: {
    table: {
      category: 'Данные',
      type: { summary: '(data: T[]) => T[]' },
    },
    description: 'Адаптер данных для таблицы, вызываемый после успешного request.',
  },
  defaultData: {
    table: {
      category: 'Данные',
    },
    description: 'Дефолтный датасет таблицы. Лучше использовать, если данные получаются через request',
  },
  dateFormatter: {
    table: {
      category: 'Данные',
    },
    description: 'Форматтер для колонки типа date, принимает формат полной даты',
    control: 'text',
  },
  polling: {
    table: {
      category: 'Данные',
    },
    control: 'number',
    description:
      'Интервал для long-polling (запрос данных в интервале). Добавляется для совместной работы с request пропом.',
  },
};

export const tableDocsConfigsSection: TableStory['argTypes'] = {
  columns: {
    description: 'Конфигурация колонок таблицы',
    table: {
      type: {
        detail: getLinkToAntDesign('table#column') + tableColumnTypeDetail,
      },
      category: 'Конфигурации',
    },
  },
  scroll: {
    description:
      'Конфигурация скролла. Позволяет задать конфиг на вертикальный/горизонтальный скролл ' +
      'и нужно ли сбрасывать скролл при вызове onChange',
    table: {
      category: 'Конфигурации',
      defaultValue: { summary: JSON.stringify(defaultScrollConfig) },
    },
    control: 'object',
  },
  pagination: {
    description:
      'Пагинация таблицы. Если конфиг не задан - пагинация отстутствует. ' +
      'Если конфиг настроен - отображается, за основу берется дефолтный конфиг пагинации + переданные значения.',
    table: {
      type: { detail: getLinkToAntDesign('pagination') },
      category: 'Конфигурации',
      defaultValue: {
        summary: 'false | defaultConfig',
        detail: JSON.stringify(defaultPaginationConfig).replaceAll(',', '\n'),
      },
    },
  },
  expandable: {
    description: 'Настройка раскрывающегося контента (строк)',
    table: {
      category: 'Конфигурации',
      type: { detail: getLinkToAntDesign('table#expandable') },
    },
  },
  search: {
    table: {
      category: 'Конфигурации',
      type: {
        detail: getLinkToAntDesignPro('table#search-search-form'),
      },
    },
    description: 'Настройка встроенного в таблицу поиска',
  },
  options: {
    description: 'Настройка меню, которое конфигурирует таблицу, ее варианты отображения, и т.д',
    table: {
      type: {
        detail: getLinkToAntDesignPro('table#menu-bar-options-configuration'),
      },
      category: 'Конфигурации',
    },
  },
  toolbar: {
    table: {
      category: 'Конфигурации',
      type: {
        detail: getLinkToAntDesignPro('table#listtoolbarprops'),
      },
    },
    description: 'Пропы для тулбара таблицы',
  },
  editable: {
    table: {
      category: 'Конфигурации',
      type: {
        detail: getLinkToAntDesignPro('editable-table#editable-edit-line-configuration'),
      },
    },
    description: 'Настройка редактируемого варианта таблицы (от PRO версии)',
  },
  columnsState: {
    table: {
      category: 'Конфигурации',
      type: {
        detail: getLinkToAntDesignPro('table#columnstatetype'),
      },
    },
    description: 'Конфигурация состояния колонок (прим. отображение, положение и тп)',
  },
  sticky: {
    description: 'Установка sticky хедера и скролла таблицы.',
    control: 'boolean',
    table: {
      category: 'Конфигурации',
      type: { detail: stickyDetail },
    },
  },
  sortDirections: {
    description:
      'Конфигурация порядка сортировки для всей таблицы. Также можно задать и для конкретного стоблца (см columns)',
    table: {
      category: 'Конфигурации',
      defaultValue: { summary: '[ascend, descend]' },
      type: { detail: '(ascend | descend | null)[]' },
    },
    control: 'object',
  },
  rowSelection: {
    description: 'Настройка работы выбора строчек.',
    table: {
      category: 'Конфигурации',
      type: { detail: getLinkToAntDesign('table#rowselection') },
    },
  },
  locale: {
    description: 'Настройка локализации компонента. Влияет на текст фильтрации, сортировки, отсутствия данных и т.п.',
    table: {
      category: 'Конфигурации',
      type: { detail: localeDetail },
    },
  },
  type: {
    description: 'Тип представления таблицы',
    table: {
      category: 'Конфигурации',
    },
  },
  cardProps: {
    description: 'Пропы для компонента card (при type=cardList)',
    table: {
      category: 'Конфигурации',
      type: { detail: getLinkToAntDesign('card') },
    },
  },
  virtual: {
    description: 'Поддержка виртуального скролла.',
    table: {
      category: 'Конфигурации',
    },
  },
  form: {
    description: 'Настройка пропов формы',
    table: {
      category: 'Конфигурации',
      type: {
        detail: getLinkToAntDesign('form'),
        summary: 'FormProps',
      },
    },
  },
};

export const tableDocsLooksSection: TableStory['argTypes'] = {
  size: {
    description: 'Размер таблицы. Отвечает за размер отступов, пагинации, кегль, и т.п',
    table: {
      category: 'Внешний вид',
    },
  },
  defaultSize: {
    description: 'Дефолтный размер таблицы. Отвечает за размер отступов, пагинации, кегль, и т.п',
    table: {
      category: 'Внешний вид',
    },
  },
  className: {
    table: {
      category: 'Внешний вид',
    },
  },
  style: {
    table: {
      category: 'Внешний вид',
    },
  },
  tableStyle: {
    description: 'Inline стили контейнера таблицы',
    control: 'object',
    table: {
      category: 'Внешний вид',
    },
  },
  rowClassName: {
    description: 'CSS класс, накладываемый на строки таблицы.',
    table: {
      category: 'Внешний вид',
    },
  },
  tableClassName: {
    description: 'CSS класс, накладываемый на контейнер таблицы.',
    table: {
      category: 'Внешний вид',
    },
  },
  indentSize: {
    description: 'Размеры отступов в пикселях для древовидных структур (прим. для expandable контента).',
    control: 'number',
    table: {
      category: 'Внешний вид',
    },
  },
  bordered: {
    description: 'Отображение границ для таблицы.',
    table: {
      category: 'Внешний вид',
    },
  },
  cardBordered: {
    description: 'Добавлять ли границу вокруг таблицы с поиском при type=cardList',
    table: {
      category: 'Внешний вид',
      type: {
        detail: 'boolean | {search?: boolean, table?: boolean}',
      },
    },
  },
  ghost: {
    description: 'Включает ghost режим (прозрачный фон)',
    table: {
      category: 'Внешний вид',
    },
  },
  tableLayout: {
    description: 'Браузерный атрибут table-layout таблицы',
    table: {
      category: 'Внешний вид',
    },
    control: 'radio',
    options: ['-', 'auto', 'fixed'],
  },
};
export const tableDocsSectionsSection: TableStory['argTypes'] = {
  title: {
    description: 'Функция рендера заголовка таблицы.',
    table: {
      category: 'Секции таблицы',
      type: {
        detail: '(data: readonly RecordType[]) => React.ReactNode',
      },
    },
  },
  footer: {
    description:
      'Функция рендера подвала таблицы. Располагается под таблицей, визуально отличается от саммари заливкой блока.',
    table: {
      category: 'Секции таблицы',
      type: {
        detail: '(data: readonly RecordType[]) => React.ReactNode',
      },
    },
  },
  caption: {
    description: 'Компонент заголовка таблицы. Не имеет установленного форматирования.',
    control: 'text',
    table: {
      category: 'Секции таблицы',
    },
  },
  summary: {
    description: 'Функция рендера саммари таблицы. Располагается под таблицей.',
    table: {
      category: 'Секции таблицы',
    },
  },
  showHeader: {
    description: 'Флаг, отвечающий на отображение HeaderRow таблицы.',
    table: {
      category: 'Секции таблицы',
    },
  },
  headerTitle: {
    description: 'Большой заголовок таблицы',
    control: 'text',
    table: {
      category: 'Секции таблицы',
    },
  },
  optionsRender: {
    table: {
      category: 'Секции таблицы',
    },
  },
  toolBarRender: {
    table: {
      category: 'Секции таблицы',
    },
  },
  columnEmptyText: {
    description: 'Отображение контента при пустом значении dataIndex',
    control: 'text',
    table: {
      defaultValue: { summary: '-' },
      category: 'Секции таблицы',
    },
  },
  getPopupContainer: {
    description: 'Функция, позволяющая получить и изменить контейнер выпадающих списков таблицы (прим. фильтрация)',
    table: {
      category: 'Секции таблицы',
    },
  },
  showSorterTooltip: {
    description: 'Отображение или сокрытие тултипа, вызывающегося при использовании сотрировки.',
    table: {
      category: 'Секции таблицы',
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
  },
  components: {
    description: 'Позволяет переписать используемые в таблице подкомпоненты (прим. ячейки, хедер, строки и т.п)',
    table: {
      category: 'Секции таблицы',
      type: { detail: componentsOverrideDetail },
    },
  },
  searchFormRender: {
    table: {
      category: 'Секции таблицы',
    },
  },
  tableExtraRender: {
    table: {
      category: 'Секции таблицы',
      type: {
        summary: '(props: ProTableProps<T, U>, dataSource: T[]) => ReactNode',
      },
    },
    description: '',
  },
  tableAlertRender: {
    table: {
      category: 'Секции таблицы',
      type: {
        detail: '({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: () => void }) => ReactNode) | false',
      },
    },
    description: 'Функция рендера алерта таблицы (алерт располагается СЛЕВА от операций, не показывается когда false)',
  },
  tableAlertOptionRender: {
    table: {
      category: 'Секции таблицы',
      type: {
        detail: '({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: () => void }) => ReactNode) | false',
      },
    },
    description: 'Функция рендера алерта таблицы (алерт располагается СПРАВА от операций, не показывается когда false)',
  },
  tableRender: {
    table: {
      category: 'Секции таблицы',
      type: {
        summary: '(props, dom, domList: { toolbar,alert,table}) => ReactNode',
      },
    },
    description: 'Функция для задания кастомного рендера таблицы',
  },
};

export const tableDocsActionsSection: TableStory['argTypes'] = {
  onChange: {
    description:
      'Функция, вызывающаяся при работе с пагинацией, сортировкой и фильтрацией таблицы. ' +
      'В самом простом варианте используется только для пагинации. ' +
      'Чтобы правильно сконструировать функцию следует использовать хук useOnTableChange.',
    table: {
      category: 'Экшены',
      type: {
        detail: onChangeDetail,
      },
    },
  },
  onHeaderRow: {
    description: 'Установить пропы на строку заголовка. К примеру, позволяет назначить onClick и т.п.',
    table: {
      category: 'Экшены',
      type: { detail: '(columns, index) => HeaderRowProps' },
    },
  },
  onRow: {
    description: 'Установить пропы на строку. К примеру, позволяет назначить onClick и т.п.',
    table: {
      category: 'Экшены',
      type: { detail: '(record, index) => RowProps' },
    },
  },
  onReset: {
    description: 'Вызывается, когда происходит сброс формы при type="form"',
    table: {
      category: 'Экшены',
    },
  },
  onSizeChange: {
    description: 'Функция, вызываемая на изменение size таблицы',
    table: {
      category: 'Экшены',
      type: { summary: '(size: SizeType) => void', detail: 'SizeType = "default" |"middle" |"small"' },
    },
  },
  onLoadingChange: {
    description: 'Вызывается, когда меняется флаг loading',
    table: {
      category: 'Экшены',
    },
  },
  onRequestError: {
    description: 'Вызывается, когда при запросе данных происходит ошибка',
    table: {
      category: 'Экшены',
    },
  },
  onDataSourceChange: {
    description: 'Вызывается, когда меняется источник данных таблицы',
    table: {
      category: 'Экшены',
    },
  },
  onSubmit: {
    description: 'Вызывается, когда происходит отправка формы при type="form"',
    table: {
      category: 'Экшены',
    },
  },
  onLoad: {
    description: 'Вызывается, когда происходит загрузка данных (при request)',
    table: {
      category: 'Экшены',
    },
  },
  beforeSearchSubmit: {
    table: {
      category: 'Экшены',
      type: { summary: '(params:T) => T' },
    },
    description:
      'Функция, вызываемая перед отправкой параметров поиска.' +
      'Позволяет трансформировать передаваемые поиском параметры.',
  },
};
