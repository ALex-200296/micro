import React, { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { BlockOutlined } from '@ant-design/icons';
import { IReturnAdapterInvoiceBody } from '@middleware/invoice/invoice.types';
import { IconButton, SelectableCard } from '@shared/ui';

import TooltipOrderDivision from '../TooltipOrderDivision/TooltipOrderDivision.component';

import { ITransferCard } from './TransferCard.types';

import styles from './TransferCard.module.scss';
import theme from '@styles/themeExports.module.scss';

const TransferCard: React.FC<ITransferCard> = ({
  item,
  listSelectedKeys,
  onItemSelect,
  selectedKeys,
  direction,
  activeBoxNumber,
  onFinishProductDivision,
}) => {
  const [visibleTooltip, setVisibleTooltip] = useState<boolean>(false);
  const goodsCountRef = useRef<HTMLElement>(null);

  const handleVisibleTooltip = useCallback((visible: boolean) => {
    setVisibleTooltip(visible);
  }, []);

  const onFinishDivision = useCallback(
    (item: IReturnAdapterInvoiceBody, count: number) => {
      setVisibleTooltip(false);
      onFinishProductDivision(item, count, direction);
    },
    [onFinishProductDivision],
  );

  useLayoutEffect(
    () => () => {
      goodsCountRef?.current?.classList?.add(styles.animate_count);
      setTimeout(() => goodsCountRef?.current?.classList?.remove(styles.animate_count), 1000);
    },
    [item.productCount],
  );

  return (
    <SelectableCard
      className={styles.card}
      key={item.rowId}
      title={item.productName}
      subtitle={`Арт. ${item.article}`}
      checked={listSelectedKeys.includes(item.rowId)}
      onChange={() => {
        onItemSelect(item.rowId, !selectedKeys.includes(item.rowId));
      }}
      extra={
        <TooltipOrderDivision
          maxCount={item.productCount}
          boxNumber={activeBoxNumber}
          onFinish={(value) => onFinishDivision(item, value.count)}
          open={visibleTooltip}
          onOpenChange={handleVisibleTooltip}
        >
          <IconButton
            type='transparent'
            icon={<BlockOutlined />}
            dataTestId={`card-devider-${item.rowId}`}
            disabled={item.productCount === 1}
            tooltipProps={{ title: 'Разделить товар', zIndex: Number(theme.modalZIndex) }}
            size='small'
            className={styles.icon_division}
          />
        </TooltipOrderDivision>
      }
      bottomnNode={
        <span ref={goodsCountRef} className={styles.goods_count}>
          {item.productCount} {item.measure}
        </span>
      }
    />
  );
};

export default memo(TransferCard);
