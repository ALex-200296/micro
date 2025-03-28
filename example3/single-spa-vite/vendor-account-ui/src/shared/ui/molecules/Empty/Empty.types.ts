import { IButtonProps } from '@shared/ui/atoms';
import { EmptyProps } from 'antd';
export interface IEmptyProps extends Omit<EmptyProps, 'rootClassName'> {
  linkProps?: Required<Pick<IButtonProps, 'onClick' | 'children'>>;
}
