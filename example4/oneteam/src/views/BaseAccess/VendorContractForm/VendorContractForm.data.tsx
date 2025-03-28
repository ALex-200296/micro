import React, { lazy } from 'react';
import { IClientCreVendorContractPayload } from '@middleware/client/client.types';
import { dashedFormat, slashedFormat } from '@shared/ui/atoms/Inputs/DatePicker/DatePicker.formats';
import { DefermentKey } from '@views/BaseAccess/VendorContractForm/DiscountDeferment/Deferment/Deferment.types';
import { getDiscountInitialValues } from '@views/BaseAccess/VendorContractForm/DiscountDeferment/Discount/Discount.data';
import { DiscountDefermentKey } from '@views/BaseAccess/VendorContractForm/DiscountDeferment/DiscountDeferment.types';
import { BankDetailsKey } from '@views/BaseAccess/VendorContractForm/GenerateContract/BankDetails/BankDetails.types';
import { GenerateContractKey } from '@views/BaseAccess/VendorContractForm/GenerateContract/GenerateContract.types';
import { InformationEntityKey } from '@views/BaseAccess/VendorContractForm/GenerateContract/InformationEntity/InformationEntity.types';
import { getEmployeesInitialValues } from '@views/BaseAccess/VendorContractForm/InformationalInteraction/Common/Employees/Employees.data';
import { ElectronicExchangeKey } from '@views/BaseAccess/VendorContractForm/InformationalInteraction/ElectronicExchange/ElectronicExchange.types';
import { listMessagesInitialValues } from '@views/BaseAccess/VendorContractForm/InformationalInteraction/ElectronicExchange/ListMessages/ListMessages.data';
import { InformationalInteractionKey } from '@views/BaseAccess/VendorContractForm/InformationalInteraction/InformationalInteraction.types';
import { OtherDirectionsKey } from '@views/BaseAccess/VendorContractForm/InformationalInteraction/OtherDirections/OtherDirections.types';
import { productInfoInitialValues } from '@views/BaseAccess/VendorContractForm/InformationalInteraction/SuppliersProducts/ProductInfo/ProductInfo.data';
import { SuppliersProductsKey } from '@views/BaseAccess/VendorContractForm/InformationalInteraction/SuppliersProducts/SuppliersProducts.types';
import { UzedoKey } from '@views/BaseAccess/VendorContractForm/InformationalInteraction/Uzedo/Uzedo.types';
import { uzedoTermValues } from '@views/BaseAccess/VendorContractForm/InformationalInteraction/Uzedo/UzedoTerm/UzedoTerm.data';
import { PathwiseKey } from '@views/BaseAccess/VendorContractForm/Pathwise/Pathwise.types';
import {
  uploadDocsInitialValues,
  VendorContractUploadKeys,
} from '@views/BaseAccess/VendorContractForm/UploadDocs/UploadDocs.data';
import { Flex, FormInstance, Result } from 'antd';
import dayjs from 'dayjs';
import { XMLBuilder } from 'fast-xml-parser';

import { docsPath } from '../BaseAccessPage.data';

import { AgreementKey } from './GenerateContract/Agreement/Agreement.types';
import { IInitialValues, ISteps, LinksForForm, StepKey } from './VendorContractForm.types';

import styles from './VendorContractForm.module.scss';

const Pathwise = lazy(() => import('./Pathwise/Pathwise.component'));
const GenerateContract = lazy(() => import('./GenerateContract/GenerateContract.component'));
const DiscountDeferment = lazy(() => import('./DiscountDeferment/DiscountDeferment.component'));
const InformationalInteraction = lazy(() => import('./InformationalInteraction/InformationalInteraction.component'));
const UploadDocs = lazy(() => import('./UploadDocs/UploadDocs.component'));

export const dataTestId = 'vendor-contract-form';
export const heading = 'Договор поставщика';
export const alertMessage =
  'Все данные, которые вы добавляете, автоматически вносятся в текст договора. Вам останется только распечатать его, подписать, прикрепить скан-копию и отправить его нам';

export const docsLinks: LinksForForm[] = [
  {
    href: `${docsPath}/contract.pdf`,
    name: 'Договор поставщика',
  },
  {
    href: `${docsPath}/attach1.pdf`,
    name: 'Приложение 1 Протокол согласования скидок и отсрочки',
  },
  {
    href: `${docsPath}/attach2.pdf`,
    name: 'Приложение 2 Соглашение об ИВП',
  },
  {
    href: `${docsPath}/interactionRules.pdf`,
    name: 'Общие правила взаимодействия',
  },
  {
    href: `${docsPath}/conventionOneTeam.pdf`,
    name: 'Соглашение об использовании сервиса iPRO OneTeam',
  },
];

export const steps: ISteps[] = [
  {
    key: StepKey.pathwise,
    title: 'Заполнение или загрузка договора',
    getStepsContent: (props) => <Pathwise {...props} />,
  },
  {
    key: StepKey.generateContract,
    title: 'Данные об организации',
    status: 'wait',
    getStepsContent: (props) => <GenerateContract {...props} />,
  },
  {
    key: StepKey.discountDeferment,
    title: 'Скидки и отсрочка',
    status: 'wait',
    getStepsContent: (props) => <DiscountDeferment {...props} />,
  },
  {
    key: StepKey.informationalInteraction,
    title: 'Информационное взаимодействие',
    status: 'wait',
    getStepsContent: (props) => <InformationalInteraction {...props} />,
  },
  {
    key: StepKey.uploadingDocuments,
    title: 'Загрузка уставных документов',
    getStepsContent: (props) => <UploadDocs {...props} />,
  },
  {
    key: StepKey.result,
    title: 'Данные успешно загружены',
    getStepsContent: () => (
      <Flex className={styles.result_container} justify='center' align='center' wrap='wrap'>
        <Result
          status='success'
          title='Договор успешно отправлен на согласование.'
          subTitle='Мы сообщим вам статус согласования договора после его рассмотрения.'
        />
      </Flex>
    ),
  },
];

export const getStepsItems = (pathwise: string) =>
  steps.map((item) => ({ key: item.title, title: item.title, ...(pathwise === 'Да' ? { status: item.status } : {}) }));

const today = dayjs();
const builder = new XMLBuilder({ processEntities: false, format: true, ignoreAttributes: false });
export const createPdfParams = {
  xsl: 'merch_contract',
  copyTo: 'lkp_files/contractsmnf',
  copyXml: 'yes',
};

export const clearInputContract = (form: FormInstance<IInitialValues>) => {
  if (form.getFieldValue([StepKey.uploadingDocuments, VendorContractUploadKeys.contract]).fileList.length) {
    form.setFieldValue([StepKey.uploadingDocuments, VendorContractUploadKeys.contract], { file: null, fileList: [] });
  }
};

export const defaultClientCreVendorContractParams: Pick<
  IClientCreVendorContractPayload,
  'begDate' | 'endDate' | 'datePriceRegulation' | 'dateZreq'
> = {
  begDate: today.format(slashedFormat),
  endDate: today.add(365, 'day').format(slashedFormat),
  datePriceRegulation: today.add(375, 'day').format(slashedFormat),
  dateZreq: today.add(375, 'day').format(slashedFormat),
};

export const getVendorContractParams = (obj: IInitialValues): Omit<IClientCreVendorContractPayload, 'action'> => {
  const {
    discountDeferment: {
      defermentEntity: { deferment },
    },
    informationInteraction: {
      electronicExchange: {
        listMessages: { electronicArrival },
      },
    },
  } = obj;

  return {
    ...defaultClientCreVendorContractParams,
    payDelay: deferment,
    electronicArrival: `-${dayjs(electronicArrival.launchDate).format(slashedFormat)}`,
  };
};

export const getXml = (obj: IInitialValues, merchContractName: string): XMLBuilder => {
  const {
    generateContract: {
      agreement: { checkbox, ...agreementData },
      bankDetails,
      informationEntity,
    },
    discountDeferment: { defermentEntity, discountEntity },
    informationInteraction: {
      suppliersProducts: { productInfo, employees: employeesSuppliersProducts },
      electronicExchange: { listMessages, employees: employeesListMessages },
      uzedo: { uzedoTerm, employees: employeesUzedo },
      otherDirections: { employees: employeesOtherDirections, supplierStartDate },
    },
  } = obj;
  void checkbox;
  return builder.build({
    root: {
      informationEntity: {
        ...informationEntity,
        merchContractName,
        merchContractData: today.format(slashedFormat),
      },
      agreement: {
        ...agreementData,
        ...(agreementData[AgreementKey.date]
          ? { [AgreementKey.date]: dayjs(agreementData[AgreementKey.date]).format(dashedFormat) }
          : {}),
      },
      bankDetails: {
        ...bankDetails,
        [BankDetailsKey.currentAccount]: bankDetails[BankDetailsKey.currentAccount].replaceAll(' ', ''),
      },
      attach1: {
        ...defermentEntity,
        table1: {
          row: Object.values(discountEntity),
        },
      },
      attach2: {
        table1: Object.fromEntries(
          Object.entries(productInfo).map(([key, value]) => [
            key,
            { ...value, date: dayjs(value.date).format(dashedFormat) },
          ]),
        ),
        table2: Object.fromEntries(
          Object.entries(listMessages).map(([key, value]) => [
            key,
            {
              ...value,
              startDate: dayjs(value.startDate).format(dashedFormat),
              launchDate: dayjs(value.launchDate).format(dashedFormat),
            },
          ]),
        ),
        table3: Object.fromEntries(
          Object.entries(uzedoTerm).map(([key, value]) => [
            key,
            {
              ...value,
              startDate: dayjs(value.startDate).format(dashedFormat),
              launchDate: dayjs(value.launchDate).format(dashedFormat),
            },
          ]),
        ),
        lprtable1: {
          row: Object.values(employeesSuppliersProducts),
        },
        lprtable2: {
          row: Object.values(employeesListMessages),
        },
        lprtable3: {
          row: Object.values(employeesUzedo),
        },
        lprtable4: {
          row: Object.values(employeesOtherDirections),
        },
        supplierStartDate: dayjs(supplierStartDate).format(dashedFormat),
      },
    },
  });
};

export const getInitialValues = (OrgName: string, OrgKpp: string, OrgInn: string) => ({
  [StepKey.pathwise]: {
    [PathwiseKey.radio]: '',
  },
  [StepKey.generateContract]: {
    [GenerateContractKey.informationEntity]: {
      [InformationEntityKey.managment]: '',
      [InformationEntityKey.orgName]: OrgName,
      [InformationEntityKey.kpp]: OrgKpp,
      [InformationEntityKey.inn]: OrgInn,
      [InformationEntityKey.ogrn]: '',
    },
    [GenerateContractKey.agreement]: {
      [AgreementKey.fioSignatory]: '',
      [AgreementKey.positionSignatory]: '',
      [AgreementKey.fioProps]: '',
      [AgreementKey.positionProps]: '',
      [AgreementKey.emailMerch]: '',
      [AgreementKey.legalAddress]: '',
      [AgreementKey.actualAddress]: '',
      [AgreementKey.rightToSign]: '',
      [AgreementKey.number]: '',
      [AgreementKey.date]: null,
      [AgreementKey.checkbox]: false,
    },
    [GenerateContractKey.bankDetails]: {
      [BankDetailsKey.bik]: '',
      [BankDetailsKey.nameBank]: '',
      [BankDetailsKey.correspondentAccount]: '',
      [BankDetailsKey.currentAccount]: '',
    },
  },
  [StepKey.discountDeferment]: {
    [DiscountDefermentKey.defermentEntity]: {
      [DefermentKey.deferment]: '',
    },
    [DiscountDefermentKey.discountEntity]: { ...getDiscountInitialValues() },
  },
  [StepKey.informationalInteraction]: {
    [InformationalInteractionKey.suppliersProducts]: {
      [SuppliersProductsKey.productInfo]: { ...productInfoInitialValues },
      [SuppliersProductsKey.employees]: { ...getEmployeesInitialValues() },
    },
    [InformationalInteractionKey.electronicExchange]: {
      [ElectronicExchangeKey.listMessages]: { ...listMessagesInitialValues },
      [ElectronicExchangeKey.employees]: { ...getEmployeesInitialValues() },
    },
    [InformationalInteractionKey.uzedo]: {
      [UzedoKey.uzedoTerm]: { ...uzedoTermValues },
      [UzedoKey.employees]: { ...getEmployeesInitialValues() },
    },
    [InformationalInteractionKey.otherDirections]: {
      [OtherDirectionsKey.supplierStartDate]: null,
      [OtherDirectionsKey.employees]: { ...getEmployeesInitialValues() },
    },
  },
  [StepKey.uploadingDocuments]: {
    ...uploadDocsInitialValues,
    pdf: '',
  },
});
