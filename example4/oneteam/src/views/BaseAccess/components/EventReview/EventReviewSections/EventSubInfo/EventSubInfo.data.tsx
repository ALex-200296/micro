import React from 'react';
import { FileOutlined } from '@ant-design/icons';
import { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ICalendarEventState } from '@app/store/calendar/calendar.types';
import {
  getFileList,
  pathFile,
} from '@views/BaseAccess/components/EventReview/EventReviewSections/EventGeneralInfo/EventGeneralInfo.data';
import { List, Typography } from 'antd';

const { Link } = Typography;

export const getSubDescriptionsColumns = ({
  pme_comdoc,
}: ICalendarEventState): ProDescriptionsItemProps<ICalendarEventState>[] => {
  const fileList = pme_comdoc ? getFileList(pme_comdoc) : [];

  return [
    {
      label: (
        <span>
          <FileOutlined /> Файлы
        </span>
      ),
      hideInDescriptions: !fileList.length,
      renderText: () => (
        <List
          split={false}
          dataSource={fileList}
          size='small'
          renderItem={(item) => (
            <List.Item style={{ paddingTop: 0 }}>
              <Link href={`${pathFile}${item.path}`} rel='noreferrer' target='_blank' download>
                {item.name}
              </Link>
            </List.Item>
          )}
        />
      ),
    },
  ];
};
