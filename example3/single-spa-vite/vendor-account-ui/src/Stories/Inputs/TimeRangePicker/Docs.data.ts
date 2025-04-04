export const disabledTimeDetails = `{
  type DisabledTime = (now: Dayjs) => {
    disabledHours?: () => number[];
    disabledMinutes?: (selectedHour: number) => number[];
    disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  };
}`;

export const propsToDisable = [
  'defaultPickerValue',
  'mode',
  'onPanelChange',
  'id',
  'tabIndex',
  'role',
  'onFocus',
  'onBlur',
  'onKeyDown',
  'onClick',
  'onContextMenu',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseUp',
  'prefixCls',
  'direction',
  'name',
  'picker',
  'disabledDate',
  'dateRender',
  'monthCellRender',
  'dropdownClassName',
  'dropdownAlign',
  'popupStyle',
  'transitionName',
  'defaultOpen',
  'clearIcon',
  'superPrevIcon',
  'superNextIcon',
  'inputRender',
  'pickerRef',
  'autoComplete',
  'ranges',
  'activePickerIndex',
  'showTime',
  'showHour',
  'showMinute',
  'showSecond',
  'disabledHours',
  'disabledMinutes',
  'disabledSeconds',
  'defaultOpenValue',
  'bordered',
  'builtinPlacements',
  'classNames',
  'styles',
  'popupAlign',
  'showMillisecond',
  'millisecondStep',
  'changeOnBlur',
  'changeOnScroll',
  'popupClassName',
  'showWeek',
  'showToday',
  'minDate',
  'maxDate',
  'onPickerValueChange',
];
