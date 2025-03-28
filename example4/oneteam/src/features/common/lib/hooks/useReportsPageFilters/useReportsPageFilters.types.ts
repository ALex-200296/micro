import { CatalogComputedPropertyState } from '@app/store/catalog/catalog.types';
import { IInfoSearchState } from '@app/store/info/info.types';
import { IntegrationComputedPropertyKeyType } from '@app/store/integration/integration.types';
import { LogisticsComputedPropertyState } from '@app/store/logistics/logistics.types';
import { PricingComputedPropertyState } from '@app/store/pricing/pricing.types';
import { RootState } from '@store/root.store';

export interface IUseReportsPageFilters {
  dataSelector: (state: RootState) => IInfoSearchState[];
  computedProperty:
    | keyof typeof CatalogComputedPropertyState
    | keyof typeof LogisticsComputedPropertyState
    | keyof typeof PricingComputedPropertyState
    | IntegrationComputedPropertyKeyType;
  setReportsFiltersType: string;
  resetReportsFiltersType: string;
  afterFiltersSubmit?: () => void;
}
