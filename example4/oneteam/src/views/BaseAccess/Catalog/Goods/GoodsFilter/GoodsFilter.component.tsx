import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catalogSelectors } from '@app/store/catalog/catalog.selectors';
import { resetCatalogConfigChars, setCatalogConfigChars } from '@app/store/catalog/catalog.slice';
import { goodsListFilters, ICatalogFilters, ICatalogState } from '@app/store/catalog/catalog.types';
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
    uiSelectors.getIsRequestPending(getInfoClassPendingRequestId({ code: CodeInfoClass.code81 })),
  );
  const categoriesOptions = useSelector(infoSelectors.getInfoClass(CodeInfoClass.code81));
  const manufacturerOptions = useSelector(infoSelectors.getInfoSesSearch());
  const manufacturerLoading = useSelector(uiSelectors.getIsRequestPending(infoSesSearchAction.type));
  const catalogConfigChars = useSelector(catalogSelectors.getConfigChars);

  const [configChars, setConfigChars] = useState(catalogConfigChars);
  const [configCharsLoading, setConfigCharsLoading] = useState<boolean>(false);

  const [form] = Form.useForm();
  const brandForm = Form.useWatch(goodsListFilters.brand, form);
  const seriesForm = Form.useWatch(goodsListFilters.series, form);
  const categoryForm = Form.useWatch(goodsListFilters.category, form);
  const manufacturerForm = Form.useWatch(goodsListFilters.manufacturer, form);
  const nameForm = Form.useWatch(goodsListFilters.name, form);
  const articleForm = Form.useWatch(goodsListFilters.article, form);

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
      dispatch(infoClassAction({ code: CodeInfoClass.code81 }));
    }
  }, []);

  useEffect(() => {
    if (!manufacturerOptions.length) {
      dispatch(infoSesSearchAction({ type: TypeInfoSesSearch.rManuf }));
    }
  }, []);

  const onDependantFilterReset = () => {
    form.setFieldsValue({ [goodsListFilters.brand]: [], [goodsListFilters.series]: [] });
    setConfigChars({});
  };

  const onValuesChange: IFiltersFormProps<ICatalogFilters>['onValueChange'] = async (value) => {
    const manufacturer = value?.[goodsListFilters.manufacturer] || manufacturerForm;
    const category = value?.[goodsListFilters.category] || categoryForm;

    if (Object.hasOwn(value, goodsListFilters.category) || Object.hasOwn(value, goodsListFilters.manufacturer)) {
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
              <FormItem name={goodsListFilters.noIndex} className={styles.switch_form_item}>
                <Switch />
              </FormItem>
              <Text type='secondary'>Только неопубликованные</Text>
            </>
          ),
        },
        {
          name: goodsListFilters.category,
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
          name: goodsListFilters.manufacturer,
          label: 'Производитель',
          children: <Select options={manufacturerOptions} allowClear loading={manufacturerLoading} />,
        },
        {
          name: goodsListFilters.brand,
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
          name: goodsListFilters.series,
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
          name: goodsListFilters.name,
          label: 'Наименование',
          help: 'Должен содержать не менее 3 символов',
          rules: [{ min: 3, validateTrigger: ['onSubmit'] }],
          children: <Input disabled={articleForm} />,
        },
        {
          name: goodsListFilters.article,
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
