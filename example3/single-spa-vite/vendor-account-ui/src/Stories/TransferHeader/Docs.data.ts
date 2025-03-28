export const TransferHeaderArgDescriptions = {
  items: {
    description: 'Массив элементов выпадающего списка',
    table: {
      type: { summary: 'Array<string>' },
    },
  },
  itemTitle: {
    description: 'Название элемента выпадающего списка',
    table: {
      type: { summary: 'string' },
    },
  },
  children: {
    description: 'Содержимое, которое будет отображаться в основной области компонента',
    table: {
      type: { summary: 'ReactNode' },
    },
  },
  dropdownIcon: {
    control: 'disabled',
    description: 'Иконка выпадающего списка ',
    table: {
      type: { summary: 'ReactNode' },
    },
  },
  addElement: {
    control: 'disabled',
    description: 'Функция для добавления элемента списка',
    table: { type: { summary: '() => void' } },
  },
  removeElement: {
    control: 'disabled',
    description: 'Функция для удаления элемента списка',
    table: { type: { summary: '(item: string) => void' } },
  },
  selectElement: {
    control: 'disabled',
    description: 'Функция для выбора элемента списка',
    table: { type: { summary: '(item: string) => void' } },
  },
  addButtonTitle: {
    description: 'Содержимое, которое будет отображаться в кнопке добавления элемента',
    table: {
      type: { summary: 'ReactNode' },
    },
  },
};
