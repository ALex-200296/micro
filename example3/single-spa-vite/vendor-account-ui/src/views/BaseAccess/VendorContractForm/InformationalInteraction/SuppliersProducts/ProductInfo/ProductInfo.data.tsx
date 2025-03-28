import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IInfoSearchState } from '@app/store/info/info.types';
import { ColumnType, DatePicker, disabledPastDate } from '@shared/ui';
import { dataTestId } from '@views/BaseAccess/VendorContractForm/VendorContractForm.data';
import { Flex, Select, Tooltip, Typography } from 'antd';

import { GetDataSourceType, StepKey } from '../../../VendorContractForm.types';
import { InformationalInteractionKey } from '../../InformationalInteraction.types';
import { SuppliersProductsKey } from '../SuppliersProducts.types';

import { IDataSource, IDescriptions, IProductInfoValues, ProductInfoKey } from './ProductInfo.types';

import styles from '../../../VendorContractForm.module.scss';

const { Text } = Typography;

export const productInfoValue: IProductInfoValues = { date: null, transfer: '' };

export const productInfoInitialValues: Record<keyof typeof ProductInfoKey, IProductInfoValues> = Object.fromEntries(
  Object.keys(ProductInfoKey).map((key) => [key, structuredClone(productInfoValue)]),
) as Record<keyof typeof ProductInfoKey, IProductInfoValues>;

export const descriptions: Record<keyof typeof ProductInfoKey, IDescriptions> = {
  [ProductInfoKey.IMAGE_GOOD]: {
    text: 'Изображение товара',
  },
  [ProductInfoKey.CONFIGURATOR]: {
    text: 'Конфигуратор',
    help: 'Технические характеристики для поиска товара',
  },
  [ProductInfoKey.TACHNICAL_INFO]: {
    text: 'Техническая информация',
    help: 'Страницы каталога, паспорта, инструкции',
  },
  [ProductInfoKey.CURRENT_CERTIFICATES]: {
    text: 'Действующие сертификаты',
  },
  [ProductInfoKey.PRODUCT_DESCRIPTION]: {
    text: 'Описание товара',
  },
  [ProductInfoKey.ADDITIONAL_IMAGE_GOOD]: {
    text: 'Дополнительные изображения товара',
  },
  [ProductInfoKey.VIDEO_MATERIALS]: {
    text: 'Видео материалы для товара',
  },
  [ProductInfoKey.MODEL_TECHNICAL_INFO]: {
    text: 'Техническая информация (3D/2D-модели)',
  },
  [ProductInfoKey.CONSTRUCTOR]: {
    text: 'Конструктор',
    help: ' Подбор аксессуаров и доп.оборудования',
  },
  [ProductInfoKey.PRODUCT_ANALOGUES]: {
    text: 'Товарные аналоги',
  },
  [ProductInfoKey.SIMILAR_PRODUCTS]: {
    text: 'Однотипные товары',
    help: 'Множественный выбор',
  },
  [ProductInfoKey.CHARACTERISTICS_DATABASE]: {
    text: 'Характеристики для баз данных САПР',
  },
};

export const getDataSource: GetDataSourceType<Record<keyof typeof ProductInfoKey, IProductInfoValues>, IDataSource> = (
  initialValues,
) => {
  return Object.entries<IProductInfoValues>(initialValues).map(([key, value]) => {
    return {
      id: [
        StepKey.INFORMATIONAL_INTERACTION,
        InformationalInteractionKey.SUPPLIERS_PRODUCTS,
        SuppliersProductsKey.PRODUCT_INFO,
        key,
      ],
      ...value,
    };
  });
};

export const getProductInfoColumns = (goodsTransitionWay: IInfoSearchState[]): ColumnType<IDataSource>[] => {
  return [
    {
      title: 'Наименование информации о товаре',
      width: '40%',
      renderText: (_, record) => {
        const { text, help } = descriptions[record.id.at(-1) as keyof typeof ProductInfoKey];

        return (
          <Flex align='center'>
            <Text>{text}</Text>
            {!!help && (
              <Tooltip title={help}>
                <ExclamationCircleOutlined className={styles.icon} data-testid={`tooltip-${dataTestId}`} />
              </Tooltip>
            )}
          </Flex>
        );
      },
    },
    {
      title: 'Способ передачи',
      dataIndex: 'transfer',
      key: 'transfer',
      width: '35%',
      editable: true,
      formItem: {
        name: 'transfer',
        rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
        children: <Select options={goodsTransitionWay} />,
      },
    },
    {
      title: 'Срок наполнения до 100%',
      tooltip:
        'По основному контенту - не более 3 месяцев, по расширенному контенту - не более 6 месяцев с даты подписания договора',
      dataIndex: 'date',
      key: 'date',
      width: '25%',
      editable: true,
      formItem: {
        name: 'date',
        rules: [{ required: true, message: 'Пожалуйста, заполните обязательное поле' }],
        children: <DatePicker dataTestId='' disabledDate={disabledPastDate} />,
      },
    },
  ];
};
