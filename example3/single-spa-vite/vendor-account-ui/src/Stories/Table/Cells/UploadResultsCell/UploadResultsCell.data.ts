export const UploadCellDescription =
  'Компонент `UploadResultsCell` отображает результаты загрузки файлов в таблице. Каждый результат представляет собой строку, содержащую иконку статуса и ссылку для скачивания файла. Если URL файла отсутствует, ссыылка скачивания будет отключена.';
export const UploadCellArgsDescription = {
  results: {
    description: 'Массив объектов, представляющих загруженные файлы и их статус.',
    control: 'object',
    table: {
      type: {
        summary: 'ObjectFile[]',
        detail: `
type ObjectFile = {
  id: string;
  name: string;
  URL: string;
  cat: string;
  credate: string;
  file: string;
  cta_code: string;
};
          `,
      },
      defaultValue: {
        summary: '[]',
      },
    },
  },
};

export const UploadCellMockResult = [
  {
    id: '1',
    name: 'Category 1',
    URL: 'http://example.com/file1.pdf',
    cat: 'File 1',
    credate: '2023-08-22',
    file: 'file1.pdf',
    cta_code: '1',
  },
  {
    id: '2',
    name: 'Category 2',
    URL: '',
    cat: 'File 2',
    credate: '2023-08-22',
    file: 'file2.pdf',
    cta_code: '2',
  },
  {
    id: '3',
    name: 'Category 3',
    URL: 'http://example.com/file3.pdf',
    cat: 'File 3',
    credate: '2023-08-22',
    file: 'file3.pdf',
    cta_code: '3',
  },
  {
    id: '4',
    name: 'Category 4',
    URL: 'http://example.com/file4.pdf',
    cat: 'File 4',
    credate: '2023-08-22',
    file: 'file4.pdf',
    cta_code: '4',
  },
];
