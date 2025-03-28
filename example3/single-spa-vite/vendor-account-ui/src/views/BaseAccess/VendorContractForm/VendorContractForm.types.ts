import React from 'react';
import { FileType } from '@shared/lib';
import { FormInstance, StepsProps } from 'antd';
import { NamePath } from 'antd/es/form/interface';

import { IDefermentValues } from './DiscountDeferment/Deferment/Deferment.types';
import { IDiscountValues } from './DiscountDeferment/Discount/Discount.types';
import { DiscountDefermentKey } from './DiscountDeferment/DiscountDeferment.types';
import { IAgreementValues } from './GenerateContract/Agreement/Agreement.types';
import { IBankDetailsValues } from './GenerateContract/BankDetails/BankDetails.types';
import { GenerateContractKey } from './GenerateContract/GenerateContract.types';
import { IInformationEntityValues } from './GenerateContract/InformationEntity/InformationEntity.types';
import { IElectronicExchangeValues } from './InformationalInteraction/ElectronicExchange/ElectronicExchange.types';
import { InformationalInteractionKey } from './InformationalInteraction/InformationalInteraction.types';
import { IOtherDirectionsValues } from './InformationalInteraction/OtherDirections/OtherDirections.types';
import { ISuppliersProductsValues } from './InformationalInteraction/SuppliersProducts/SuppliersProducts.types';
import { IUzedoValues } from './InformationalInteraction/Uzedo/Uzedo.types';
import { IPathwiseValues } from './Pathwise/Pathwise.types';
import { VendorContractUploadKeys } from './UploadDocs/UploadDocs.data';

export const StepKey = {
  PATHWISE: 'pathwise',
  GENERATE_CONTRACT: 'generateContract',
  DISCOUNT_DEFERMENT: 'discountDeferment',
  INFORMATIONAL_INTERACTION: 'informationInteraction',
  UPLOADING_DOCUMENTS: 'uploadingDocuments',
  RESULT: 'result',
} as const;

export type LinksForForm = {
  href: string;
  name: string;
};

export interface IInitialValues {
  [StepKey.PATHWISE]: IPathwiseValues;
  [StepKey.GENERATE_CONTRACT]: {
    [GenerateContractKey.INFORMATION_ENTITY]: IInformationEntityValues;
    [GenerateContractKey.AGREEMENT]: IAgreementValues;
    [GenerateContractKey.BANK_DETAILS]: IBankDetailsValues;
  };
  [StepKey.DISCOUNT_DEFERMENT]: {
    [DiscountDefermentKey.DEFERMENT_ENTITY]: IDefermentValues;
    [DiscountDefermentKey.DISCOUNT_ENTITY]: Record<string, IDiscountValues>;
  };
  [StepKey.INFORMATIONAL_INTERACTION]: {
    [InformationalInteractionKey.SUPPLIERS_PRODUCTS]: ISuppliersProductsValues;
    [InformationalInteractionKey.ELECTRONIC_EXCHANGE]: IElectronicExchangeValues;
    [InformationalInteractionKey.UZEDO]: IUzedoValues;
    [InformationalInteractionKey.OTHER_DIRECTIONS]: IOtherDirectionsValues;
  };
  [StepKey.UPLOADING_DOCUMENTS]: Record<keyof typeof VendorContractUploadKeys, FileType> & { pdf: string };
}

export interface IStepContent {
  form: FormInstance<IInitialValues>;
  initialValues: IInitialValues;
  nextStep?: (step?: number) => void;
  prevStep?: (step?: number) => void;
}
export interface ISteps extends Pick<StepsProps, 'status'> {
  key: string;
  title: string;
  getStepsContent: (props: IStepContent) => React.ReactNode;
}

export type GetDataSourceType<T, K> = (initialValues: T, pathValues?: NamePath<IInitialValues>) => K[];
