import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRxReportsFilesAction } from '@middleware/catalog/catalog.saga';
import { downloadFile } from '@shared/lib';
import { shortYearDottedFormat, shortYearSlashedFormat } from '@shared/ui';
import { catalogSelectors } from '@store/catalog/catalog.selectors';
import { setCharacteristicReportsPage } from '@store/catalog/catalog.slice';
import { uiSelectors } from '@store/ui/ui.selectors';
import { Flex, List, Typography } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import styles from './ReportsCharacteristicsList.module.scss';

dayjs.extend(utc);

const { Link } = Typography;

const ReportsList: React.FC = () => {
  const dispatch = useDispatch();
  const tableData = useSelector(catalogSelectors.getReportsTableData);
  const { page, rows, records } = useSelector(catalogSelectors.getCharacteristicReportsState);
  const isListLoading = useSelector(uiSelectors.getIsRequestPending(getRxReportsFilesAction.type));

  const onFileDownload = useCallback((path: string) => {
    downloadFile(path);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    dispatch(setCharacteristicReportsPage(page));
  }, []);

  return (
    <List
      size='small'
      itemLayout='vertical'
      dataSource={tableData}
      loading={isListLoading}
      rootClassName={styles.list}
      pagination={{ onChange: handlePageChange, current: page, pageSize: rows, total: records }}
      renderItem={(item, idx) => (
        <List.Item key={idx + item.file.name} className={styles.list_item}>
          <Flex vertical gap='small'>
            <Link onClick={() => onFileDownload(item.file.url)} ellipsis className={styles.list_item_link}>
              {item.file.name}
            </Link>
            <span>{dayjs(item.date, [shortYearSlashedFormat]).format(shortYearDottedFormat)}</span>
          </Flex>
        </List.Item>
      )}
    />
  );
};

export default memo(ReportsList);
