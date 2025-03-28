import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { templateSelectors } from '@app/store/template/template.selectors';
import { resetTemplate } from '@app/store/template/template.slice';
import { IFileData } from '@middleware/template/template.types';
import { Modal } from '@shared/ui';
import { Alert, Divider, Flex, Space, Typography } from 'antd';

import { uploadedTitle } from './UploadedFilesModal.data';

import styles from './UploadedFilesModal.module.scss';

const { Text } = Typography;

const UploadedFilesModal: React.FC = () => {
  const dispatch = useDispatch();
  const { rejectedFiles, total, totalSuccess } = useSelector(templateSelectors.getRejectedFiles);
  const onClose = useCallback(() => {
    dispatch(resetTemplate());
  }, []);

  return (
    <Modal open={!!total} title={uploadedTitle} onCancel={onClose}>
      <Space className={styles.count}>
        <CheckCircleFilled className={styles.uploaded} />
        <Text className={styles.info}>
          Загруженные файлы: {totalSuccess} из {total}
        </Text>
      </Space>
      <Text>
        {Object.entries(rejectedFiles).map(([code, summary]) => {
          return (
            <div key={code}>
              <Alert
                type='error'
                message={summary.message}
                showIcon
                icon={<ExclamationCircleFilled className={styles.alert_icon} />}
                className={styles.alert}
              />
              <Flex vertical className={styles.files_container}>
                {summary.files.map((file: IFileData, id: number) => (
                  <Text key={id + code} className={styles.files}>
                    {file.source_name}
                    <Divider className={styles.devider} />
                  </Text>
                ))}
              </Flex>
            </div>
          );
        })}
      </Text>
    </Modal>
  );
};

export default memo(UploadedFilesModal);
