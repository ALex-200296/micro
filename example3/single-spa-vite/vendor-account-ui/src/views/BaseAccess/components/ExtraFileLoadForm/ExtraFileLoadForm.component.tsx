import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoSelectors } from '@app/store/info/info.selectors';
import { infoSliceName, setInfoClient } from '@app/store/info/info.slice';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { userSelectors } from '@app/store/user/user.selectors';
import { userSliceName } from '@app/store/user/user.slice';
import { infoClientAction } from '@middleware/info/info.saga';
import { getVendorClientsAction } from '@middleware/user/user.saga';
import { Button, filterOption, FormItem } from '@shared/ui';
import { Flex, Form, Select } from 'antd';

import { extraFileLoadInitialValues, optionsFieldNames, rules } from './ExtraFileLoadForm.data';
import { IExtraFileLoadFormProps } from './ExtraFileLoadForm.types';

import styles from './ExtraFileLoadForm.module.scss';

const ExtraFileLoadForm: React.FC<IExtraFileLoadFormProps> = ({
  form,
  showSubmitButton = false,
  submitButtonText = '',
  onFinish,
}) => {
  const dispatch = useDispatch();

  const holdingList = useSelector(userSelectors.getVendorClients);
  const clientsList = useSelector(infoSelectors.getInfoClientSubs);
  const isHoldingListPending = useSelector(uiSelectors.getIsRequestPending(`${userSliceName}/VendorClients`));
  const isClientsListPending = useSelector(uiSelectors.getIsRequestPending(`${infoSliceName}/client`));

  const holding: string = Form.useWatch('holding', form);
  const clients: string[] = Form.useWatch('client', form);

  const selectAllClientsList = useMemo(() => clientsList.map((client) => client.clientCode), [clientsList]);

  const onSelectAllClients = useCallback(() => {
    form.setFieldValue('client', selectAllClientsList);
  }, [selectAllClientsList]);

  useEffect(() => {
    if (!holdingList.length) {
      dispatch(getVendorClientsAction());
    }
  }, []);

  useEffect(() => {
    if (holdingList.length === 1) form.setFieldValue('holding', holdingList[0].clientCode);
  }, [holdingList.length]);

  useEffect(() => {
    if (holding) {
      form.setFieldValue('client', []);
      dispatch(setInfoClient([]));
      dispatch(infoClientAction({ clientCode: holding }));
    }
  }, [holding]);

  useEffect(() => {
    form.setFieldValue('allClientsChosen', clients?.length === clientsList.length);
  }, [clients?.length, clientsList.length]);

  return (
    <Form form={form} initialValues={extraFileLoadInitialValues} onFinish={onFinish}>
      <Flex className={styles.container} gap='small' justify='space-between' vertical>
        <FormItem name='holding' label='Холдинг' rules={rules}>
          <Select options={holdingList} fieldNames={optionsFieldNames} loading={isHoldingListPending} />
        </FormItem>
        <FormItem name='client' label='Клиент' rules={rules}>
          <Select
            options={clientsList}
            fieldNames={optionsFieldNames}
            mode='multiple'
            allowClear
            disabled={!holding}
            maxTagCount={10}
            loading={isClientsListPending}
            dropdownRender={(menu) => (
              <Flex vertical gap='small' justify='space-between' className={styles.dropdown_container}>
                {menu}
                <FormItem name='allClientsChosen'>
                  <Button
                    dataTestId='extra-file-load-form'
                    size='small'
                    type='primary'
                    onClick={onSelectAllClients}
                    className={styles.button_select_all}
                  >
                    Выбрать все
                  </Button>
                </FormItem>
              </Flex>
            )}
            showSearch
            filterOption={(input, option) => filterOption(input, option, 'clientName')}
          />
        </FormItem>
        {showSubmitButton && (
          <Flex justify='flex-end'>
            <Form.Item>
              <Button htmlType='submit' type='primary' className={styles.drawer_button} dataTestId='download-file'>
                {submitButtonText}
              </Button>
            </Form.Item>
          </Flex>
        )}
      </Flex>
    </Form>
  );
};

export default memo(ExtraFileLoadForm);
