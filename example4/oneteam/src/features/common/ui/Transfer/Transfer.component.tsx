import React, { memo } from 'react';
import { Transfer as AntdTransfer } from 'antd';
import { TransferItem } from 'antd/es/transfer';
import cn from 'classnames';

import { NoContentMessage } from './NoContentMessage/NoContentMessage.component';
import { noContentMessageKeys, style } from './Transfer.data';
import { ITransferComponentProps } from './Transfer.types';

import styles from './Transfer.module.scss';

export const Transfer = <T extends TransferItem>({
  hideDefaultItemCheckbox = false,
  noContentTextLeft = 'Нет данных',
  noContentTextRight = 'Нет данных',
  searchPlaceholder = 'Найти',
  selectionsIcon = <></>,
  leftTitle = '',
  rightTitle = '',
  selectedKeys,
  targetKeys,
  dataSource,
  className,
  ...props
}: ITransferComponentProps<T>) => (
  <AntdTransfer
    {...props}
    targetKeys={targetKeys}
    listStyle={style.list}
    dataSource={dataSource}
    selectedKeys={selectedKeys}
    selectionsIcon={selectionsIcon}
    titles={[leftTitle, rightTitle]}
    operationStyle={style.operation}
    className={cn(styles.transfer, className, { [styles.item_checkbox_not_visible]: hideDefaultItemCheckbox })}
    locale={{
      searchPlaceholder,
      notFoundContent: [
        <NoContentMessage key={noContentMessageKeys.noContentLeft}>{noContentTextLeft}</NoContentMessage>,
        <NoContentMessage key={noContentMessageKeys.noContentRight}>{noContentTextRight}</NoContentMessage>,
      ],
    }}
  />
);
export default memo(Transfer);
