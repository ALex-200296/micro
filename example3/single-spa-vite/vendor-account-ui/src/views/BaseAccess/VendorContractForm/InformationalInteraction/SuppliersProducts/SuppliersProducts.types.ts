import { IEmployeesValues } from '../Common/Employees/Employees.types';

import { IProductInfoValues, ProductInfoKey } from './ProductInfo/ProductInfo.types';

export const SuppliersProductsKey = {
  PRODUCT_INFO: 'productInfo',
  EMPLOYEES: 'employees',
} as const;

export interface ISuppliersProductsValues {
  [SuppliersProductsKey.PRODUCT_INFO]: Record<keyof typeof ProductInfoKey, IProductInfoValues>;
  [SuppliersProductsKey.EMPLOYEES]: Record<string, IEmployeesValues>;
}
