export const InformationEntityKey = {
  MANAGMENT: 'managment',
  ORG_NAME: 'orgName',
  KPP: 'kpp',
  INN: 'inn',
  OGRN: 'ogrn',
} as const;

export interface IInformationEntityValues {
  [InformationEntityKey.MANAGMENT]: string;
  [InformationEntityKey.ORG_NAME]: string;
  [InformationEntityKey.KPP]: string;
  [InformationEntityKey.INN]: string;
  [InformationEntityKey.OGRN]: string;
}
