import React, { memo } from 'react';

import { FileDownloadCell } from './FileDownloadCell.component';
import { iconForResult } from './TableCell.data';
import { IUploadResultsCellProps } from './TableCellsProps.types';

import styles from './TableCell.module.scss';

export const UploadResultsCell: React.FC<IUploadResultsCellProps> = memo(({ results = [] }) => (
  <div>
    {results.map((file, idx) => (
      <div key={idx} className={styles.status}>
        {iconForResult[file.cta_code]}
        <FileDownloadCell
          entryData={file.cat}
          addDownloadAttributes
          disabled={!file.URL}
          href={file.URL}
          className={styles.file_name}
        />
      </div>
    ))}
  </div>
));