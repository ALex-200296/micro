import { IReturnAdapterInvoiceBody } from '@middleware/invoice/invoice.types';
import { createId, declension } from '@shared/lib';
import { TransferDirection } from 'antd/es/transfer';
import { TransferKey } from 'antd/es/transfer/interface';

import { ProductsBodyType, RightStateType } from './CrossDockingTransfer.types';

export const activeBoxName = 'Коробка №';
export const transferHeaderText = '*Распределите товары по коробкам';
export const validationErrorText = 'Распределите все товары';
export const noContentTextLeft = 'Все товары распределены по коробкам';
export const noContentTextRight = 'Коробка пуста \n Переместите сюда товары из списка слева';
export const noContentFilter = 'Товаров по указанному поиску не найдено';
export const productWordVariants: [string, string, string] = ['товар', 'товара', 'товаров'];

export const getNoContent = (inputValue: string, direction: TransferDirection) =>
  direction === 'left'
    ? { noContentTextLeft: inputValue ? noContentFilter : noContentTextLeft }
    : { noContentTextRight: inputValue ? noContentFilter : noContentTextRight };

export const addNewBox = () => createId();
export const getDataSource = (dataList: IReturnAdapterInvoiceBody[], activeDataList: IReturnAdapterInvoiceBody[]) => [
  ...dataList,
  ...activeDataList,
];
export const getTargetkeys = (data?: IReturnAdapterInvoiceBody[]) => (data ? data.map((product) => product.rowId) : []);

export const splitProductsByTransferKeys = (dataList: IReturnAdapterInvoiceBody[], transferKeys: TransferKey[]) =>
  dataList.reduce<{
    leftSide: Record<string, IReturnAdapterInvoiceBody>;
    rightSide: Record<string, IReturnAdapterInvoiceBody>;
  }>(
    (prevState, currentState) => {
      !transferKeys.includes(currentState.rowId)
        ? (prevState.leftSide[currentState.id] = currentState)
        : (prevState.rightSide[currentState.id] = currentState);
      return prevState;
    },
    { leftSide: {}, rightSide: {} },
  );

export const unionProducts = (
  state: Record<string, IReturnAdapterInvoiceBody>,
  products: IReturnAdapterInvoiceBody[],
) => {
  const newState = { ...state };
  const newUnionProducts = products.map((product) => {
    if (newState[product.id]) {
      const combinedProducts = { ...product, productCount: newState[product.id].productCount + product.productCount };
      Reflect.deleteProperty(newState, product.id);
      return combinedProducts;
    }
    return product;
  });
  return [...Object.values(newState), ...newUnionProducts];
};

export const getCountText = (totalCount: number) => `${totalCount} ${declension(totalCount, productWordVariants)}`;

export const filterOption = (inputValue: string, option: IReturnAdapterInvoiceBody) => {
  const lowerCaseValue = inputValue.toLocaleLowerCase();
  return option.article
    ? option.article.toLowerCase().indexOf(lowerCaseValue.toLowerCase()) > -1 ||
        option.productName.toLowerCase().indexOf(lowerCaseValue) > -1
    : option.productName.toLowerCase().indexOf(lowerCaseValue) > -1;
};

export const getProductsForBody = (id: string, data: RightStateType) => {
  const products = Object.values(data).reduce<ProductsBodyType>((accumulator, currentValues, idx) => {
    for (const { lineNum, productCount } of currentValues) {
      const extraDetails = `;GP${id}_${idx + 1}#${productCount}#`;
      if (accumulator[lineNum]) {
        accumulator[lineNum].extra2_HU += extraDetails;
      } else {
        accumulator[lineNum] = { linenum: lineNum, extra2_HU: `${id}${extraDetails}` };
      }
    }
    return accumulator;
  }, {});
  return Object.values(products);
};
