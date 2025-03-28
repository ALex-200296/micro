export const CardArgDescriptions = {
  title: {
    description: 'Заголовок карточки',
    control: { type: 'text' },
  },
  subtitle: {
    description: 'Подзаголовок карточки',
    control: { type: 'text' },
  },
  checked: {
    description: 'Статус чекбокса',
    control: { type: 'boolean' },
  },
  onCheckChange: {
    description: 'Функция для изменения состояния чекбокса',
  },
  bottomnNode: {
    description: 'Текст в правом нижнем углу',
    control: { type: 'text' },
  },
  extra: {
    description: 'Дополнительный элемент в правом верхнем углу',
  },
  indeterminate: {
    description: 'Промежуточное состояние чекбокса',
    control: { type: 'boolean' },
  },
  className: {
    description: 'Класс стилей, навешиваемый на компонент.',
  },
  rootClassName: {
    description: 'Класс стилей, позволяющий переписать дефолтные библиотечные стили.',
  },
  defaultChecked: {
    description: 'Чекбокс установлен по умолчанию',
    control: { type: 'boolean' },
  },
  style: {
    description: 'Inline стили checkbox.',
  },
  disabled: {
    description: 'Отключение элемента',
    control: { type: 'boolean' },
  },
  onChange: {
    description: 'Функция, вызываемая при изменении состояния',
  },
  onClick: {
    description: 'Функция, вызываемая при клике на элемент',
  },
  onMouseEnter: {
    description: 'Функция, вызываемая при наведении мыши',
  },
  onMouseLeave: {
    description: 'Функция, вызываемая при уходе курсора с элемента',
  },
  onKeyPress: {
    description: 'Функция, вызываемая при нажатии клавиши',
  },
  onKeyDown: {
    description: 'Функция, вызываемая при удержании клавиши',
  },
  name: {
    description: 'Имя элемента',
    control: { type: 'text' },
  },
  id: {
    description: 'Идентификатор элемента',
    control: { type: 'text' },
  },
  autoFocus: {
    description: 'Автоматическое фокусирование элемента',
    control: { type: 'boolean' },
  },
  required: {
    description: 'Обязательный элемент',
    control: { type: 'boolean' },
  },
};
