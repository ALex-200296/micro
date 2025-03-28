
export const themeCode = ['ВТ98'];
export const hasUpdate = (theme: string, isUpdate: boolean) => !themeCode.includes(theme) && isUpdate;
export const dataTestId = 'diary-meeting-showing';
