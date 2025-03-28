import { IDescription } from '../../BaseAccessPage.types';
import { IInfoDataType } from '../PricingPage.types';

import { KeyTab } from './PriceListsPage.data';

export type KeyType = (typeof KeyTab)[keyof typeof KeyTab];

export type PriceListsInfoDataType = Record<KeyType, IInfoDataType>;

export type DescriptionType = Record<KeyType, IDescription>;
