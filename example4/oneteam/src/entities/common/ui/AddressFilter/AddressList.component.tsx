import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LeftOutlined } from '@ant-design/icons';
import { infoSelectors } from '@app/store/info/info.selectors';
import { infoSliceName, popInfoCladrAddressFromHistory, pushInfoCladrAddressToHistory } from '@app/store/info/info.slice';
import { IAddressListElement } from '@app/store/info/info.types';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { infoCladrAction } from '@middleware/info/info.saga';
import { IconButton } from '@shared/ui';
import { Alert, List } from 'antd';
import cn from 'classnames';
import { useDebounceValue } from 'usehooks-ts';

import { addressLabels, dataTestId } from './AddressList.data';

import styles from './AddressList.module.scss';

export const AddressList: React.FC = memo(() => {
  const dispatch = useDispatch();
  const { addressHistory, addressList, searchLevel, searchValue, cityCode } = useSelector(infoSelectors.getInfoCladr);
  const isLoading = useSelector(uiSelectors.getIsRequestPending(`${infoSliceName}/cladr`));
  const [debouncedValue] = useDebounceValue(searchValue, 1000);
  const fullAddress = useMemo(
    () =>
      addressHistory.length
        ? Array.from(new Set(addressHistory.map((address: IAddressListElement) => address.value))).join(', ')
        : '',
    [addressHistory],
  );

  useEffect(() => {
    dispatch(
      infoCladrAction({
        term: debouncedValue,
        matches: true,
        clicode: searchLevel,
        code: cityCode,
      }),
    );
  }, [debouncedValue, addressHistory.length]);

  const onListItemClick = useCallback((item: IAddressListElement) => dispatch(pushInfoCladrAddressToHistory(item)), []);
  const onGoBackClick = useCallback(() => dispatch(popInfoCladrAddressFromHistory()), []);

  return (
    <div className={styles.list_wrapper}>
      <List
        rootClassName={styles.list}
        size='small'
        split={false}
        header={
          <div className={styles.list_header}>
            <Alert message={`Введите ${addressLabels[searchLevel]}`} type='info' showIcon />
            <div className={styles.list_header_address}>
              <IconButton
                dataTestId={dataTestId}
                onClick={onGoBackClick}
                icon={<LeftOutlined />}
                size='small'
                shape='circle'
                disabled={!addressHistory.length}
              />
              <span>{fullAddress}</span>
            </div>
          </div>
        }
        dataSource={addressList}
        loading={isLoading}
        renderItem={(item: IAddressListElement) =>
          addressHistory.length < 5 ? (
            <List.Item
              onClick={() => onListItemClick(item)}
              className={cn(styles.list_item, styles.list_item_clickable)}
              key={item.id}
            >
              {item.value}
            </List.Item>
          ) : (
            <List.Item className={cn(styles.list_item, styles.list_item_disabled)} key={item.id}>
              {item.value}
            </List.Item>
          )
        }
      />
    </div>
  );
});
AddressList.displayName = 'AddressList';
