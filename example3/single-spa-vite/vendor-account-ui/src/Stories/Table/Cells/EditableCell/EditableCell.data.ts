export const EditableCellDescription = `
\`EditableCell\` — компонент для отображения и редактирования содержимого ячейки таблицы. В режиме редактирования отображает \`FormItem\`, в обычном режиме — содержимое \`children\`.
      `;

export const EditableCellArgsDescription = {
  formItem: {
    description: 'Настройки для компонента `FormItem`.',
    control: 'object',
  },
  editing: {
    description: 'Флаг, указывающий, находится ли ячейка в режиме редактирования.',
    control: 'boolean',
  },
  children: {
    description: 'Содержимое ячейки в обычном режиме.',
    control: 'text',
  },
  className: {
    description: 'Дополнительный CSS-класс для стилизации ячейки.',
    control: 'text',
  },
  style: {
    description: 'Inline-стили для ячейки.',
    control: 'object',
  },
};
