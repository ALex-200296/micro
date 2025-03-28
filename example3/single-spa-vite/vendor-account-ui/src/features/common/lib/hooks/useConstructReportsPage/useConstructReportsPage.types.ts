import { catalogSliceName } from '@app/store/catalog/catalog.slice';
import { CatalogComputedPropertyState } from '@app/store/catalog/catalog.types';
import { financeSliceName } from '@app/store/finance/finance.slice';
import { FinanceReportsType } from '@app/store/finance/finance.types';
import { integrationSliceName } from '@app/store/integration/integration.slice';
import { IntegrationComputedPropertyKeyType } from '@app/store/integration/integration.types';
import { logisticsSliceName } from '@app/store/logistics/logistics.slice';
import { LogisticsComputedPropertyState } from '@app/store/logistics/logistics.types';
import { pricingSliceName } from '@app/store/pricing/pricing.slice';
import { PricingComputedPropertyState } from '@app/store/pricing/pricing.types';
import { IPostTaskActionState } from '@middleware/reports/reports.types';
import { IPostTemplateActionState } from '@middleware/template/template.types';
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '@store/root.store';
import { IDefaultReportsState } from '@store/root.types';

interface IFilesUpload {
  params: Pick<IPostTemplateActionState, 'rc' | 'man'>;
  handleClose: () => void;
}

export interface IStateByComputedProperty extends Omit<IDefaultReportsState, 'missingData'> {
  missingData?: IDefaultReportsState['missingData'];
}

export interface IUseConstructReportsPage {
  dataSelector: (state: RootState) => IStateByComputedProperty;
  sliceName:
    | typeof catalogSliceName
    | typeof logisticsSliceName
    | typeof integrationSliceName
    | typeof financeSliceName
    | typeof pricingSliceName;
  computedProperty:
    | (typeof CatalogComputedPropertyState)[keyof typeof CatalogComputedPropertyState]
    | (typeof LogisticsComputedPropertyState)[keyof typeof LogisticsComputedPropertyState]
    | (typeof PricingComputedPropertyState)[keyof typeof PricingComputedPropertyState]
    | FinanceReportsType
    | IntegrationComputedPropertyKeyType;
  type: number;
  setUpdate: () => AnyAction;
  resetFilters: () => AnyAction;
  templateProps?: IFilesUpload;
  postTaskProps?: Partial<IPostTaskActionState>;
  resourceUploadProps?: IFilesUpload;
  getExtraTaskParams?: (values: Record<string, any>) => Record<string, any>;
}
