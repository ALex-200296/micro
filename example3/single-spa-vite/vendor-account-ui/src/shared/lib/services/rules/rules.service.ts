import { analyticsRules } from './analytics/analytics.rules';
import { baseRules } from './base/base.rules';
import { catalogRules } from './catalog/catalog.rules';
import { CommunicationsRules } from './communications/Communications.rules';
import { factoringRules } from './factoring/factoring.rules';
import { financeRules } from './finance/finance.rules';
import { integrationRules } from './integration/integration.rules';
import { limitedRules } from './limited/limited.rules';
import { logisticsRules } from './logistics/logistics.rules';
import { marketingRules } from './marketing/marketing.rules';
import { ordersRules } from './orders/orders.rules';
import { pricingRules } from './pricing/pricing.rules';
import { profileRules } from './profile/profile.rules';
import { projectsRules } from './projects/projects.rules';
import { Rules } from './rules.class';

const combineRules = {
  ...limitedRules,
  ...baseRules,
  ...factoringRules,
  ...projectsRules,
  ...financeRules,
  ...marketingRules,
  ...CommunicationsRules,
  ...pricingRules,
  ...catalogRules,
  ...profileRules,
  ...analyticsRules,
  ...logisticsRules,
  ...ordersRules,
  ...integrationRules,
};

export type CombineRules = typeof combineRules;

export const configureRules = () => Rules.createRules(combineRules);
