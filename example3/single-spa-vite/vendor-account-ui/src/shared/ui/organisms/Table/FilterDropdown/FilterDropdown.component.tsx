import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { catalogSelectors } from '@app/store/catalog/catalog.selectors';
import { delay } from '@shared/lib';
import { Button, FormItem } from '@shared/ui/atoms';
import { Flex, Form, Input, InputRef } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';

import { dropDownFilterItemConfig, searchInputName } from './FilterDropDown.data';

import styles from './FilterDropdown.module.scss';

export const FilterDropdown: React.FC<Omit<FilterDropdownProps, 'prefixCls' | 'visible'>> = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}) => {
  const [form] = Form.useForm();
  const searchInputRef = useRef<InputRef>(null);

  const { article, name } = useSelector(catalogSelectors.getGoodsListFilters);

  useEffect(() => {
    if (!article && !name) {
      setSelectedKeys([]);
      confirm();
    }
  }, [article, name]);

  useEffect(() => {
    delay(50);
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ searchInput: selectedKeys[0] ? selectedKeys[0] : '' });
  }, [selectedKeys[0]]);

  const onValuesChange = (changedValues: Record<string, string>) => {
    setSelectedKeys(changedValues[searchInputName] ? [changedValues[searchInputName]] : []);
    form.setFieldValue(searchInputName, changedValues[searchInputName]);
  };

  const handleReset = () => {
    form.setFieldValue(searchInputName, '');
    clearFilters?.();
    confirm();
  };

  return (
    <Form form={form} onFinish={() => confirm()} onValuesChange={onValuesChange}>
      <Flex vertical gap='small' className={styles.dropdown_container}>
        <FormItem {...dropDownFilterItemConfig}>
          <Input placeholder='Найти' ref={searchInputRef} />
        </FormItem>
        <Flex justify='space-between'>
          <Button dataTestId='dataTestId' onClick={handleReset} size='small'>
            Сбросить
          </Button>
          <Button dataTestId='dataTestId' type='primary' htmlType='submit' icon={<SearchOutlined />} size='small'>
            Найти
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
};
