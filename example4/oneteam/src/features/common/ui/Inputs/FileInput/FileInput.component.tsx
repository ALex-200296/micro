import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { setIsScreenLock } from '@app/store/ui/ui.slice';
import { delay } from '@shared/lib/utils/helpers/delay.helpers';
import { Typography, Upload } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import cn from 'classnames';

import { defaultShowUploadListConfig, itemRender } from './FileInput.data';
import { IFileInputProps } from './FileInput.types';

import styles from './FileInput.module.scss';

const { Text } = Typography;
const { Dragger } = Upload;

const BaseFileInput: React.FC<IFileInputProps> = ({
  uploadText = 'Нажмите или перетащите файл в эту область, чтобы загрузить',
  uploadHint = '',
  multiple = false,
  maxCount = !multiple ? 1 : undefined,
  className,
  showUploadList,
  onChange,
  accept,
  fileSizeAccept = 100,
  dataTestId,
  ...props
}) => {
  const dispatch = useDispatch();
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const screenlook = useSelector(uiSelectors.getIsScreenLock);

  const beforeUpload = async () => {
    if (!screenlook) {
      dispatch(setIsScreenLock(true));
    }
    await delay(1);
    return false;
  };

  const handleChange = useCallback(
    (info: UploadChangeParam) => {
      if (info.file.uid === info.fileList.at(-1)?.uid) {
        if (info.fileList.length === maxCount) setUploadDisabled(true);
        dispatch(setIsScreenLock(false));
      }
      if (info.fileList.length !== maxCount && uploadDisabled) setUploadDisabled(false);

      onChange?.(info);
    },
    [uploadDisabled],
  );

  return (
    <Dragger
      data-testid={`fileinput-${dataTestId}`}
      accept={accept}
      className={cn(styles.dragger, className, { [styles.dragger_disabled]: uploadDisabled })}
      multiple={multiple}
      maxCount={maxCount}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      itemRender={(originNode, file) => itemRender(originNode, file, accept, fileSizeAccept)}
      showUploadList={
        showUploadList ? { ...defaultShowUploadListConfig, ...showUploadList } : defaultShowUploadListConfig
      }
      {...props}
    >
      <Text className={styles.main_text}>{uploadText}</Text>
      <Text className={styles.hint_text}>{uploadHint}</Text>
    </Dragger>
  );
};

export const FileInput = memo(BaseFileInput) as typeof BaseFileInput;
