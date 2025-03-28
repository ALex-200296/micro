import React, { FC, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { getUnpubReportsFilesAction } from '@middleware/catalog/catalog.saga';
import { downloadFile } from '@shared/lib';
import { shortYearDottedFormat, shortYearSlashedFormat } from '@shared/ui';
import { catalogSelectors } from '@store/catalog/catalog.selectors';
import { setUnpublishedFilesPage } from '@store/catalog/catalog.slice';
import { List, Typography } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { UnpublishedGoodsListProps } from './UnpublishedGoodsList.type';

import styles from './UnpublishedGoodsList.module.scss';

dayjs.extend(utc);

const { Link } = Typography;

const UnpublishedGoodsList: FC<UnpublishedGoodsListProps> = ({ page, rows, records }) => {
  const dispatch = useDispatch();

  const tableData = useSelector(catalogSelectors.getUnpublishedGoodsData);
  const isLoading = useSelector(uiSelectors.getIsRequestPending(getUnpubReportsFilesAction.type));

  const onFileDownload = useCallback((path: string) => {
    downloadFile(path);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    dispatch(setUnpublishedFilesPage(page));
  }, []);

  return (
    <List
      loading={isLoading}
      itemLayout='vertical'
      dataSource={tableData}
      pagination={{ onChange: handlePageChange, current: page, pageSize: rows, total: records }}
      rootClassName={styles.list}
      renderItem={(item, idx) => (
        <List.Item key={idx + item.obfId}>
          <div className={styles.list_item}>
            <div className={styles.list_item_info}>
              <Link onClick={() => onFileDownload(item.fileUrl)} ellipsis className={styles.link}>
                {item.name}
              </Link>
              <span>{dayjs(item.date, shortYearSlashedFormat).format(shortYearDottedFormat)}</span>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default memo(UnpublishedGoodsList);
