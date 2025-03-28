import { CombineRules } from '@shared/lib/services/rules/rules.service';
import { IActions } from '@shared/lib/services/rules/rules.types';

export type GetAccessRouteType = (section: keyof CombineRules) => boolean;
export type GetActionAccessType = (section: keyof CombineRules, action: keyof IActions) => boolean;
export type UseRulesType = () => {
  isAuth: boolean;
  getAccessRoute: GetAccessRouteType;
  getActionAccess: GetActionAccessType;
};
