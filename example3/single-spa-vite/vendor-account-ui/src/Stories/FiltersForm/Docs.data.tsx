import { getReportsFilterFormItems } from '@features/common/lib/hooks/useReportsPageFilters/useReportsPageFilters.data';

export const initialValues = {
  date: null,
  status: '',
};

export const FormItemTypeDetail =
  '\n------ Конфиг для FormItems ------\n' +
  'interface FormItemProps extends Omit<AntdFormItemProps, "colon"> {\n' +
  'children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;\n' +
  'labelType?: "default" | "float"; \n' +
  'inputType?: "default" | "file";\n' +
  '}';

const filterFormItems = [
  { id: '1', code: 'option 1' },
  { id: '2', code: 'option 2' },
];

export const filterItems = getReportsFilterFormItems(filterFormItems);
