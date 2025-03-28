import { BaseTable } from '@shared/ui/molecules';

import { Editable } from './Editable/Editable.component';

export const Table = BaseTable as typeof BaseTable & {
  Editable: typeof Editable;
};
Table.Editable = Editable;
