export const InformationEntityKey = {
  managment: 'managment',
  orgName: 'orgName',
  kpp: 'kpp',
  inn: 'inn',
  ogrn: 'ogrn',
} as const;

export interface IInformationEntityValues {
  [InformationEntityKey.managment]: string;
  [InformationEntityKey.orgName]: string;
  [InformationEntityKey.kpp]: string;
  [InformationEntityKey.inn]: string;
  [InformationEntityKey.ogrn]: string;
}
