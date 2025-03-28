import { ICollapseProps } from '@shared/ui';

export type GetCollapseItemsFuncType<T> = (valuesList: T[]) => ICollapseProps['items'];

