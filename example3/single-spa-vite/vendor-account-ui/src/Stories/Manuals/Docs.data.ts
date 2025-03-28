export const mockedUserData = {
  isAuth: false,
  error: false,
  userProfile: {
    fio: '',
    firstname: '',
    lastname: '',
    parentname: '',
    exw_positionName: '',
    cliName: '',
    phone: '',
    email: '',
    ofic: '',
    mancode: '',
    manager: '',
    ArrManagerKuCp: [],
    ArrEmployeeIvp: [],
    ArrManagerKuRc: [],
    users_lkp: [],
    firms: [],
  },
  user: {
    city: '',
    clicode: '',
    login: '',
    login_type: '',
    org_id: '',
    rights: null,
    manufs: [
      {
        code: '111222333',
        name: 'Производитель 1',
      },
      {
        code: '444555666',
        name: 'Производитель 2',
      },
      {
        code: '777888999',
        name: 'Производитель 3',
      },
    ],
  },
};

export const manualsMockedData = [
  {
    name: 'Заголовок раздела',
    data: [
      {
        name: 'Пункт раздела - видео',
        to: 'https://v3.cdnpk.net/videvo_files/video/free/2014-06/large_watermarked/Blue_Sky_and_Clouds_Timelapse_0892__Videvo_preview.mp4',
        video: true,
        thumbnail: 'https://media-us-west-motionelements.s3.amazonaws.com/m/s/14378/14368283/7081127.jpg',
      },
      {
        name: 'Пункт раздела - ссылка со скачиванием и указанием имени',
        to: '',
        downLoadName: 'Пример скачивания.txt',
      },
    ],
  },
  {
    name: 'Заголовок раздела',
    data: [{ name: 'Пункт раздела - ссылка со скачиванием без указания имени', to: '' }],
  },
];

export const manualsDataDetail = `
ManualsData {
  name: string;
  data: ManualData[];
}

ManualData {
  name: string;
  to: string;
  downLoadName?: string;
  video?: boolean;
  thumbnail?: string
}
`;
