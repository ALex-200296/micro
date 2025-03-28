import { Location } from 'react-router-dom';
import { ResultProps as ResultPropsAntd } from 'antd';

export const Status = {
  CLIENT_ERROR: 'clientError',
  SERVER_ERROR: 'serverError',
  NO_ACCESS: 'noAccess',
} as const;

export type StatusesType = (typeof Status)[keyof typeof Status];

export interface IResultProps extends ResultPropsAntd {
  path: Pick<Location, 'pathname' | 'search'> & { isAbsolutePath?: boolean };
  text: string;
}
export type GetDataCodesType = ({
  title,
  prevLocation,
}: {
  title: string;
  prevLocation?: Location | null;
}) => Record<StatusesType, IResultProps>;
