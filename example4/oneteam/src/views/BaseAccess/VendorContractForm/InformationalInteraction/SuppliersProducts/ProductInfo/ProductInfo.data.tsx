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
  [ProductInfoKey.imageGood]: {
    text: 'Изображение товара',
  },
  [ProductInfoKey.configurator]: {
    text: 'Конфигуратор',
    help: 'Технические характеристики для поиска товара',
  },
  [ProductInfoKey.technicalInfo]: {
    text: 'Техническая информация',
    help: 'Страницы каталога, паспорта, инструкции',
  },
  [ProductInfoKey.currentCertificates]: {
    text: 'Действующие сертификаты',
  },
  [ProductInfoKey.productDescription]: {
    text: 'Описание товара',
  },
  [ProductInfoKey.additionalImageGood]: {
    text: 'Дополнительные изображения товара',
  },
  [ProductInfoKey.videoMaterials]: {
    text: 'Видео материалы для товара',
  },
  [ProductInfoKey.modelTechnicalInfo]: {
    text: 'Техническая информация (3D/2D-модели)',
  },
  [ProductInfoKey.constructor]: {
    text: 'Конструктор',
    help: ' Подбор аксессуаров и доп.оборудования',
  },
  [ProductInfoKey.productAnalogues]: {
    text: 'Товарные аналоги',
  },
  [ProductInfoKey.similarProducts]: {
    text: 'Однотипные товары',
    help: 'Множественный выбор',
  },
  [ProductInfoKey.characteristicsDatabase]: {
    text: 'Характеристики для баз данных САПР',
  },
};

export const getDataSource: GetDataSourceType<Record<keyof typeof ProductInfoKey, IProductInfoValues>, IDataSource> = (
  initialValues,
) => {
  return Object.entries<IProductInfoValues>(initialValues).map(([key, value]) => {
    return {
      id: [
        StepKey.informationalInteraction,
        InformationalInteractionKey.suppliersProducts,
        SuppliersProductsKey.productInfo,
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
