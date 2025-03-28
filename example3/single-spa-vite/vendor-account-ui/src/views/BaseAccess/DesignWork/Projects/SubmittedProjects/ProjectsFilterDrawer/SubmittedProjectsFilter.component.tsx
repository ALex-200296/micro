import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoSelectors } from '@app/store/info/info.selectors';
import { resetInfoCladr, setInfoCladrSearchValue } from '@app/store/info/info.slice';
import { CodeInfoSearch, TypeInfoSearch } from '@app/store/info/info.types';
import { resetProjectFilters, setProjectFilters } from '@app/store/project/project.slice';
import { userSelectors } from '@app/store/user/user.selectors';
import { FiltersForm } from '@entities/common/ui';
import { infoSearchAction } from '@middleware/info/info.saga';
import { delay } from '@shared/lib';
import { slashedFormat } from '@shared/ui';
import { Form, InputRef, Space, Switch, Typography } from 'antd';
import dayjs from 'dayjs';

import { filtersSwitchTitle, getProjectsFilterItems } from './SubmittedProjectFilters.data';
import { IProjectFiltersInitialValues, ISubmittedProjectsFilterProps } from './SubmittedProjectsFilter.types';

import styles from './SubmittedProjectsFilter.module.scss';

const { Text } = Typography;
const SubmittedProjectsFilter: React.FC<ISubmittedProjectsFilterProps> = ({
  prjSupply,
  prjAddr,
  afterSubmit,
  extCode,
  ...props
}) => {
  const dispatch = useDispatch();

  const { searchValue, cityCode } = useSelector(infoSelectors.getInfoCladr);
  const infoSearchHelp = useSelector(infoSelectors.getInfoSearch(TypeInfoSearch.HELP, CodeInfoSearch.OBJ_12));

  const [form] = Form.useForm();

  const usersLkp = useSelector(userSelectors.getUsersLkp);
  const hasAccess = useSelector(userSelectors.getUserLkpAccess);

  const inputRef = useRef<InputRef>(null);
  const [filterSwitchOn, setFilterSwitchOn] = useState<boolean>(Boolean(extCode));

  const onFocusInput = useCallback(async (inputRef: React.RefObject<InputRef>) => {
    await delay(0);
    inputRef.current!.focus({
      cursor: 'start',
    });
  }, []);

  const onSwitchChange = useCallback((filterSwitchOn: boolean) => {
    setFilterSwitchOn(filterSwitchOn);
    onFocusInput(inputRef);
  }, []);

  const onReset = useCallback(() => {
    dispatch(resetProjectFilters());
    dispatch(resetInfoCladr());
    onFocusInput(inputRef);
  }, []);

  const initialValues: IProjectFiltersInitialValues = useMemo(
    () => ({
      prjSupply: prjSupply ? dayjs(prjSupply, slashedFormat) : null,
      prjAddr: prjAddr ? prjAddr : cityCode,
      addressSearch: searchValue,
      extCode,
      ...props,
    }),
    [prjSupply, prjAddr, searchValue, cityCode, extCode, props],
  );

  const exmManCodeList = useMemo(
    () => usersLkp.map((option) => ({ value: option.exm_mancode, label: option.fio })),
    [usersLkp],
  );
  const subPrjStatusOptions = useMemo(
    () => infoSearchHelp.map((elem) => ({ ...elem, label: elem.label?.split('$')[0] })),
    [infoSearchHelp],
  );
  const projectsFilterItems = useMemo(
    () =>
      getProjectsFilterItems({
        exmManCodeList,
        showExmManCodeList: hasAccess,
        subPrjStatusOptions,
        extCodeSearchOnly: filterSwitchOn,
        inputRef,
      }),
    [hasAccess, exmManCodeList, subPrjStatusOptions, filterSwitchOn, inputRef],
  );

  const onValuesChange = useCallback((values: Partial<IProjectFiltersInitialValues>) => {
    dispatch(setInfoCladrSearchValue(values.addressSearch || ''));
  }, []);

  const onFinish = useCallback(
    (values: Partial<IProjectFiltersInitialValues>) => {
      const { addressSearch: _, extCode, ...filterParams } = values;
      void _;
      if (filterSwitchOn) {
        dispatch(setProjectFilters({ extCode }));
        dispatch(resetInfoCladr());
      } else {
        dispatch(
          setProjectFilters({
            ...filterParams,
            prjSupply: filterParams.prjSupply
              ? dayjs(filterParams.prjSupply).format(slashedFormat)
              : filterParams.prjSupply,
            prjAddr: cityCode,
          }),
        );
      }
      afterSubmit();
    },
    [cityCode, filterSwitchOn],
  );

  useEffect(() => {
    form.setFieldValue('addressSearch', searchValue);
  }, [searchValue]);

  useEffect(() => {
    if (!subPrjStatusOptions.length) {
      dispatch(
        infoSearchAction({
          type: TypeInfoSearch.HELP,
          code: CodeInfoSearch.OBJ_12,
        }),
      );
    }
  }, [subPrjStatusOptions.length]);

  return (
    <>
      <Space className={styles.switch_container}>
        <Switch checked={filterSwitchOn} onChange={onSwitchChange} />
        <Text type='secondary'>{filtersSwitchTitle}</Text>
      </Space>
      <FiltersForm
        form={form}
        initialValues={initialValues}
        formItems={projectsFilterItems}
        onReset={onReset}
        onFinish={onFinish}
        onValueChange={onValuesChange}
      />
    </>
  );
};

export default memo(SubmittedProjectsFilter);
