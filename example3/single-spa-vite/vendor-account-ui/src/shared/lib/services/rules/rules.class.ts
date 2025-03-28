import { CombineRules } from './rules.service';
import { IRule } from './rules.types';

export class Rules {
  private static INSTANCE: Record<string, IRule>;

  public static createRules = <T extends Record<string, IRule>>(combineRules: T): void => {
    Rules.INSTANCE = combineRules;
  };

  public static createSliceRule = <T>(rule: Record<keyof T, IRule>) => rule;

  public static getRule = (key: keyof CombineRules) => Rules.INSTANCE[key];
}
