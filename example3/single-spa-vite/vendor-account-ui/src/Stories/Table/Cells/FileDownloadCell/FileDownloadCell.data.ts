export const FileDownloadCellDescription =
  '`FileDownloadCell` — компонент для отображения ячейки таблицы с возможностью загрузки файла.';

export const FileDownloadCellArgsDescription = {
  entryData: {
    description: 'Содержимое ячейки .',
    control: 'text',
  },
  href: {
    description: 'URL для загрузки файла .',
    control: 'text',
  },
  addDownloadAttributes: {
    description: 'Добавляет атрибуты download и noreferrer .',
    control: 'boolean',
    defaultValue: {
      summary: 'false',
    },
  },
  onClick: {
    description: 'Функция для обработки клика .',
    action: 'clicked',
  },
  disabled: {
    description: 'Делает ячейку неактивной .',
    control: 'boolean',
    defaultValue: {
      summary: 'false',
    },
  },
  title: {
    description: 'Всплывающая подсказка при наведении .',
    control: 'text',
  },
  className: {
    description: 'Дополнительный CSS-класс .',
    control: 'text',
  },
};
