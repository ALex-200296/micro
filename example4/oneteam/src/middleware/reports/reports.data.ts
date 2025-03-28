import { analyticsSliceName } from '@app/store/analytics/analytics.slice';
import { catalogSliceName } from '@app/store/catalog/catalog.slice';
import { pricingSliceName } from '@app/store/pricing/pricing.slice';

import { SliceNameType } from './reports.types';

export const getReportsActionName = (sliceName: string) => {
  return `${sliceName}/setReportsData`;
};

export const reportsDirectory: Record<SliceNameType, string> = {
  [catalogSliceName]: `${catalogSliceName}/setMissingData`,
  [analyticsSliceName]: `${analyticsSliceName}/setReportsData`,
  [pricingSliceName]: `${pricingSliceName}/setReportsData`,
};
