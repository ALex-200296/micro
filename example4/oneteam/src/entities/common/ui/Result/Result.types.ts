import { Location } from 'react-router-dom';
import { ResultProps as ResultPropsAntd } from 'antd';

export const Status = { clientError: 'clientError', serverError: 'serverError', noAccess: 'noAccess' } as const;

export type StatusesType = keyof typeof Status;

export interface IResultProps extends ResultPropsAntd {
  path: Pick<Location, 'pathname' | 'search'> & { isAbsolutePath?: boolean };
  text: string;
}
export type GetDataCodesType = ({ title, prevLocation }: { title: string; prevLocation?: Location | null }) =>  Record<StatusesType, IResultProps> ;