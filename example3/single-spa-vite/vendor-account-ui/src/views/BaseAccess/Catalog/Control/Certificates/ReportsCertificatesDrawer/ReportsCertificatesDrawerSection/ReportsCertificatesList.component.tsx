import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from 'react-use-cookie';
import { catalogSelectors } from '@app/store/catalog/catalog.selectors';
import { setCatalogMissingPage } from '@app/store/catalog/catalog.slice';
import { CatalogComputedPropertyState } from '@app/store/catalog/catalog.types';
import { downloadFile } from '@shared/lib';
import { List, Typography } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import styles from './ReportsCertificatesDrawerSections.module.scss';

dayjs.extend(utc);

const { Link } = Typography;

const ReportsCertificatesList: React.FC = () => {
  const dispatch = useDispatch();
  const sId = getCookie('session-id');
  const { data, page } = useSelector(catalogSelectors.getMissingData(CatalogComputedPropertyState.CERTIFICATES_LOAD));

  const renderData = useMemo(() => data.filter((element) => element.url), [data, page]);

  const onFileDownload = useCallback((fileName: string, path: string) => {
    downloadFile(`${path}/${fileName}&session-id=${sId}`);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    dispatch(
      setCatalogMissingPage({
        computedProperty: CatalogComputedPropertyState.CERTIFICATES_LOAD,
        page: page,
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      setCatalogMissingPage({
        computedProperty: CatalogComputedPropertyState.CERTIFICATES_LOAD,
        page: 1,
      }),
    );
  }, []);

  return (
    <List
      itemLayout='vertical'
      dataSource={renderData}
      pagination={{ onChange: handlePageChange, current: page, total: renderData.length }}
      rootClassName={styles.list}
      renderItem={(item, id) => (
        <List.Item key={id}>
          {
            <div className={styles.list_item}>
              <div className={styles.list_item_info}>
                <Link onClick={() => onFileDownload(item.name, item.url)} ellipsis className={styles.link}>
                  {item.name}
                </Link>
                <div>
                  {item.date} {item.time}
                </div>
              </div>
            </div>
          }
        </List.Item>
      )}
    />
  );
};

export default memo(ReportsCertificatesList);
