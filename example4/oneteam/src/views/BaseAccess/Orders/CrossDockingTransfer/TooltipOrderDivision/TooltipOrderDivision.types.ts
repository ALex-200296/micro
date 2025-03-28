import { TooltipPropsWithTitle } from 'antd/lib/tooltip';

export interface ITooltipOrderDivisionProps extends Omit<TooltipPropsWithTitle, 'title'> {
  boxNumber: number;
  maxCount: number;
  onFinish?: (value: { count: number }) => void;
}
