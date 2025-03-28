import { IEmployeesValues } from '../Common/Employees/Employees.types';

import { IProductInfoValues, ProductInfoKey } from './ProductInfo/ProductInfo.types';

export const SuppliersProductsKey = {
  productInfo: 'productInfo',
  employees: 'employees',
} as const;

export interface ISuppliersProductsValues {
  [SuppliersProductsKey.productInfo]: Record<keyof typeof ProductInfoKey, IProductInfoValues>;
  [SuppliersProductsKey.employees]: Record<string, IEmployeesValues>;
}
