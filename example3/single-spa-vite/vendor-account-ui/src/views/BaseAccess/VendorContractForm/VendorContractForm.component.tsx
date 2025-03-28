import React, { memo, Suspense, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from '@app/store/user/user.selectors';
import { delay, isUndefined } from '@shared/lib';
import { PageTitle } from '@shared/ui';
import { Alert, Divider, Form, Space, Spin, Steps, Typography } from 'antd';

import { PathwiseKey } from './Pathwise/Pathwise.types';
import { alertMessage, docsLinks, getInitialValues, getStepsItems, heading, steps } from './VendorContractForm.data';
import { IInitialValues, StepKey } from './VendorContractForm.types';

import styles from './VendorContractForm.module.scss';

const { Link, Title } = Typography;

const VendorContractForm: React.FC = () => {
  const [form] = Form.useForm<IInitialValues>();
  const pathwise = Form.useWatch([StepKey.PATHWISE, PathwiseKey.RADIO], { form, preserve: true });

  const { OrgName, OrgKpp, OrgInn } = useSelector(userSelectors.getUserCompanyInfo);

  const [step, setStep] = useState<number>(0);
  const { getStepsContent } = useMemo(() => steps[step], [step]);
  const stepsItems = useMemo(() => getStepsItems(pathwise), [pathwise]);

  const initialValues: IInitialValues = useMemo(
    () => getInitialValues(OrgName, OrgKpp, OrgInn),
    [OrgName, OrgKpp, OrgInn],
  );

  const nextStep = async (step?: number) => {
    setStep((prev) => step || ++prev);
    await delay(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = async (step?: number) => {
    setStep((prev) => (!isUndefined(step) ? step : --prev));
    await delay(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <PageTitle heading={heading} />
      <Alert message={alertMessage} type='info' showIcon className={styles.alert} />
      <Divider orientation='left'>
        <Title level={2}>Ознакомьтесь с шаблоном договора поставщика:</Title>
      </Divider>
      <Space wrap={true} split={<Divider type='vertical' />}>
        {docsLinks.map(({ name, href }, index) => (
          <Link key={index + 'docsLink'} href={href} target='_blank'>
            {name}
          </Link>
        ))}
      </Space>
      <Divider />
      <Steps progressDot current={step} items={stepsItems} className={styles.steps} />
      <Suspense fallback={<Spin className='spin_flex spin_justify_center' />}>
        {getStepsContent({ form, initialValues, nextStep, prevStep })}
      </Suspense>
    </>
  );
};

export default memo(VendorContractForm);
