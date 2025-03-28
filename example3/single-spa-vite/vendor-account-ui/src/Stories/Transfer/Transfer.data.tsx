const getMock = () => {
  const tempMockData = [];
  for (let i = 0; i < 20; i++) {
    const data = {
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
    };
    tempMockData.push(data);
  }
  return tempMockData;
};

export const mockedData = getMock();

export const propsToDisable = ['style', 'prefixCls', 'titles', 'locale'];

export const TransferArgDescriptions = {
  className: {
    description: 'Класс стилей, навешиваемый на компонент',
    control: 'disabled',
  },
  hideDefaultItemCheckbox: {
    description: 'Скрывать ли дефолтный чекбокс в компонентах списка',
  },
  leftTitle: {
    description: 'Заголовок левой части',
  },
  rightTitle: {
    description: 'Заголовок правой части',
  },
  NoContentTextLeft: {
    description: 'Сообщение об отсутствии данных в левой части',
  },
  NoContentTextRight: {
    description: 'Сообщение об отсутствии данных в правой части',
  },
  targetKeys: {
    description: 'Массив ключей элементов, которые указаны в правом столбце',
  },
  dataSource: {
    description:
      'Используется для настройки исходных данных. Элементы, являющиеся частью этого массива, будут представлены в левом столбце. За исключением элементов, ключи которых включены в свойство targetKeys',
  },
  searchPlaceholder: {
    description: 'Placeholder поля поиска по данным',
  },
  rootClassName: {
    description: 'Корневой стиль компонента',
    control: 'disabled',
  },
  render: {
    description:
      'Функция для создания элемента, отображаемого в столбце. На основе записи (элемента массива dataSource) эта функция должна возвращать элемент React, созданный на основе этой записи. Кроме того, он может возвращать простой объект со значением и меткой, метка — это элемент React, а значение — заголовок',
  },
  onChange: {
    description: 'Функция обратного вызова, которая выполняется после завершения передачи между столбцами',
  },
  onSelectChange: {
    description: 'Функция обратного вызова, которая выполняется при изменении выбранных элементов',
  },
  listStyle: {
    description: 'Пользовательский стиль CSS, используемый для отображения столбцов передачи',
  },
  operationStyle: {
    description: 'Пользовательский стиль CSS, используемый для отображения столбца операций',
  },
  disabled: {
    description: 'Проп для передачи неактивного состояния',
  },
  operations: {
    description: 'Проп для передачи текста, который рендерится внутри кнопок перещения между колонками',
  },

  filterOption: {
    description:
      'Функция определения того, должен ли элемент отображаться в списке результатов поиска, работает только при поиске',
  },
  footer: {
    description: 'Функция, отвечающая за рендер футера',
  },
  onSearch: {
    description: 'Функция обратного вызова, которая выполняется при изменении поля поиска',
  },
  onScroll: {
    description: 'Функция обратного вызова, которая выполняется при прокрутке списка параметров',
  },
  rowKey: {
    description: 'Указывает, какое свойство использовать как ключ элемента при рендере списка',
  },
  showSelectAll: {
    description: 'Показать флажок «Выбрать все» в заголовке',
  },
  selectAllLabels: {
    description: 'Массив кастомизированных лейблов для выбора всех флажков в заголовке',
  },
  selectedKeys: {
    description: 'Массив ключей элементов с отмеченными чекбоксами',
  },
  showSearch: {
    description: 'Проп, отвечающий за показ поля поиска',
  },
  oneWay: {
    description: 'Отображать как однонаправленный трансфер',
  },
  pagination: {
    description: 'Используется ли пагинация',
    table: {
      type: {
        summary: 'boolean | { pageSize: number, simple: boolean, showSizeChanger?: boolean, showLessItems?: boolean }',
      },
    },
  },
  status: {
    description: 'Статус валидации',
  },
  selectionsIcon: {
    description: 'Кастомизированная иконка дропдауна',
  },
};
