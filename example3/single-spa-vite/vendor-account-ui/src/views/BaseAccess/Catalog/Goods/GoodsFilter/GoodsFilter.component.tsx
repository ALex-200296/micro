import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catalogSelectors } from '@app/store/catalog/catalog.selectors';
import { resetCatalogConfigChars, setCatalogConfigChars } from '@app/store/catalog/catalog.slice';
import { GoodsListFilters, ICatalogFilters, ICatalogState } from '@app/store/catalog/catalog.types';
import { infoSelectors } from '@app/store/info/info.selectors';
import { CodeInfoClass, TypeInfoSesSearch } from '@app/store/info/info.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { FiltersForm, IFiltersFormProps } from '@entities/common/ui';
import { adapterCatalogWebWorker } from '@middleware/catalog/adapterCatalogWebWorker/adapterCatalogWebWorker';
import { CategoryCharCode } from '@middleware/catalog/catalog.types';
import { getInfoClassPendingRequestId } from '@middleware/info/info.data';
import { infoClassAction, infoSesSearchAction } from '@middleware/info/info.saga';
import { makeSagaRequest } from '@middleware/makeSagaRequest/makeSagaRequest';
import { api } from '@middleware/root.data';
import { paramsGenerator } from '@shared/lib';
import { FormItem } from '@shared/ui';
import { mutlipleFilterSelectProps } from '@views/BaseAccess/Catalog/Goods/GoodsFilter/GoodsFilter.data';
import { Form, Input, Select, Switch, Typography } from 'antd';
import { createEasyWebWorker } from 'easy-web-worker';

import styles from './GoodsFilter.module.scss';

const { Text } = Typography;

const GoodsFilter: React.FC<Omit<IFiltersFormProps<ICatalogFilters>, 'formItems' | 'form'>> = ({
  onFinish,
  onReset,
  ...props
}) => {
  const worker = createEasyWebWorker(adapterCatalogWebWorker);
  const dispatch = useDispatch();
  const categoriesLoading = useSelector(
    uiSelectors.getIsRequestPending(getInfoClassPendingRequestId({ code: CodeInfoClass.CODE_81 })),
  );
  const categoriesOptions = useSelector(infoSelectors.getInfoClass(CodeInfoClass.CODE_81));
  const manufacturerOptions = useSelector(infoSelectors.getInfoSesSearch());
  const manufacturerLoading = useSelector(uiSelectors.getIsRequestPending(infoSesSearchAction.type));
  const catalogConfigChars = useSelector(catalogSelectors.getConfigChars);

  const [configChars, setConfigChars] = useState(catalogConfigChars);
  const [configCharsLoading, setConfigCharsLoading] = useState<boolean>(false);

  const [form] = Form.useForm();
  const brandForm = Form.useWatch(GoodsListFilters.BRAND, form);
  const seriesForm = Form.useWatch(GoodsListFilters.SERIES, form);
  const categoryForm = Form.useWatch(GoodsListFilters.CATEGORY, form);
  const manufacturerForm = Form.useWatch(GoodsListFilters.MANUFACTURER, form);
  const nameForm = Form.useWatch(GoodsListFilters.NAME, form);
  const articleForm = Form.useWatch(GoodsListFilters.ARTICLE, form);

  const getConfigCharsData = useCallback(async (manufacturerCode: string, category?: string) => {
    setConfigCharsLoading(true);
    const val = manufacturerCode ? `mnf$${manufacturerCode}` : '';
    const params = paramsGenerator([
      ['class', category],
      ['val', val],
      ['pars', `${CategoryCharCode[82]},${CategoryCharCode[989]}`],
    ]);
    const response = await makeSagaRequest({
      url: `${api}/catalog/configurator/chars`,
      method: 'get',
      params,
    });
    if (response?.data?.data) {
      const { ConfigChars } = response.data.data;
      const adaptedConfigChars: ICatalogState['configChars'] = await worker.sendToMethod('configChars', ConfigChars);
      setConfigChars(adaptedConfigChars);
    }
    setConfigCharsLoading(false);
  }, []);

  useEffect(() => {
    if (!categoriesOptions.length) {
      dispatch(infoClassAction({ code: CodeInfoClass.CODE_81 }));
    }
  }, []);

  useEffect(() => {
    if (!manufacturerOptions.length) {
      dispatch(infoSesSearchAction({ type: TypeInfoSesSearch.R_MANUF }));
    }
  }, []);

  const onDependantFilterReset = () => {
    form.setFieldsValue({ [GoodsListFilters.BRAND]: [], [GoodsListFilters.SERIES]: [] });
    setConfigChars({});
  };

  const onValuesChange: IFiltersFormProps<ICatalogFilters>['onValueChange'] = async (value) => {
    const manufacturer = value?.[GoodsListFilters.MANUFACTURER] || manufacturerForm;
    const category = value?.[GoodsListFilters.CATEGORY] || categoryForm;

    if (Object.hasOwn(value, GoodsListFilters.CATEGORY) || Object.hasOwn(value, GoodsListFilters.MANUFACTURER)) {
      onDependantFilterReset();
      await getConfigCharsData(manufacturer, category);
    }
  };

  const onFormFinish: IFiltersFormProps<ICatalogFilters>['onFinish'] = (...args) => {
    onFinish?.(...args);
    dispatch(setCatalogConfigChars(configChars));
  };

  const onFormReset: IFiltersFormProps<ICatalogFilters>['onReset'] = () => {
    onReset?.();
    dispatch(resetCatalogConfigChars());
  };

  return (
    <FiltersForm
      {...props}
      onFinish={onFormFinish}
      onReset={onFormReset}
      form={form}
      onValueChange={onValuesChange}
      formItems={[
        {
          className: styles.switch_content,
          children: (
            <>
              <FormItem name={GoodsListFilters.NO_INDEX} className={styles.switch_form_item}>
                <Switch />
              </FormItem>
              <Text type='secondary'>Только неопубликованные</Text>
            </>
          ),
        },
        {
          name: GoodsListFilters.CATEGORY,
          label: 'Категория',
          children: (
            <Select
              options={categoriesOptions}
              loading={categoriesLoading}
              allowClear
              fieldNames={{ value: 'id', label: 'title' }}
            />
          ),
        },
        {
          name: GoodsListFilters.MANUFACTURER,
          label: 'Производитель',
          children: <Select options={manufacturerOptions} allowClear loading={manufacturerLoading} />,
        },
        {
          name: GoodsListFilters.BRAND,
          label: 'Марка',
          help: !manufacturerForm && 'Сначала выберите производителя',
          children: (
            <Select
              loading={configCharsLoading}
              disabled={!!seriesForm?.length || !manufacturerForm}
              options={configChars?.[82]?.options}
              {...mutlipleFilterSelectProps}
            />
          ),
        },
        {
          name: GoodsListFilters.SERIES,
          label: 'Серия',
          help: !manufacturerForm && 'Сначала выберите производителя',
          children: (
            <Select
              {...mutlipleFilterSelectProps}
              loading={configCharsLoading}
              disabled={!manufacturerForm || !!brandForm?.length}
              options={configChars?.[989]?.options}
            />
          ),
        },
        {
          name: GoodsListFilters.NAME,
          label: 'Наименование',
          help: 'Должен содержать не менее 3 символов',
          rules: [{ min: 3, validateTrigger: ['onSubmit'] }],
          children: <Input disabled={articleForm} />,
        },
        {
          name: GoodsListFilters.ARTICLE,
          label: 'Расширенный артикул',
          help: 'Должен содержать не менее 3 символов',
          rules: [{ min: 3, validateTrigger: ['onSubmit'] }],
          children: <Input disabled={nameForm} />,
        },
      ]}
    />
  );
};

export default GoodsFilter;
