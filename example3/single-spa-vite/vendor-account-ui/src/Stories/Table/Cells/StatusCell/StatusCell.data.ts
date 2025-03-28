export const StatusCellDescription = `
\`StatusCell\` — компонент для отображения статуса в ячейке таблицы. Компонент принимает статус и описание, отображая их в виде значка с текстом.
      `;

export const StatusCellArgsDescription = {
  entryData: {
    description: 'Статус для отображения в виде значка.',
    control: 'select',
    options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  },
  statusDesc: {
    description: 'Текстовое описание статуса.',
    control: 'text',
  },
  getStatus: {
    description: 'Функция для определения свойств Badge, которая соотносит статус и цвет',
    control: 'disabled',
  },
};
