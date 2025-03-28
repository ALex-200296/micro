import React, { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ProDescriptions } from '@ant-design/pro-components';
import { calendarSelectors } from '@app/store/calendar/calendar.selectors';
import { userSelectors } from '@app/store/user/user.selectors';
import { Collapse } from '@shared/ui';
import { List } from 'antd';

import { eventContentStyle, eventLabelStyle } from '../EventReviewSections.data';
import { IEventReviewSectionsProps } from '../EventReviewSections.types';

import { getOrgCollapseItems, getResponsibleCollapseItems, SupplierExtraInfo } from './EventManInfo.data';

import styles from './EventManInfo.module.scss';

const EventManInfo: React.FC<IEventReviewSectionsProps> = ({ selectedEvent }) => {
  const { execList, codeCli: codeCliList } = selectedEvent;
  const { clicode } = useSelector(userSelectors.getUserData);
  const orgList = useSelector(calendarSelectors.getEventSupplierEmployees(clicode));
  const partnersList = useSelector(calendarSelectors.getEventPartners(clicode));

  const getVisibleSupplierEmployeesOrPartner = useCallback(
    (type: (typeof SupplierExtraInfo)[keyof typeof SupplierExtraInfo]) =>
      !!codeCliList.find(({ code }) => (type === SupplierExtraInfo.PARTNER ? code !== clicode : code === clicode)),
    [clicode, codeCliList, selectedEvent],
  );

  const orgCollapseItems = useMemo(() => getOrgCollapseItems(orgList), [orgList]);
  const responsibleCollapseItems = useMemo(() => getResponsibleCollapseItems(execList), [execList]);

  return (
    <ProDescriptions
      columns={[
        {
          label: orgList[0].label,
          key: 'organization',
          renderText: () => <Collapse items={orgCollapseItems} />,
          hideInDescriptions: !getVisibleSupplierEmployeesOrPartner(SupplierExtraInfo.SUPPLIER_EMPLOYEES),
        },
        {
          label: 'Ответственный ЭТМ',
          key: 'responsible',
          renderText: () => <Collapse items={responsibleCollapseItems} />,
          hideInDescriptions: !execList.length,
        },

        {
          label: 'Партнер',
          key: SupplierExtraInfo.PARTNER,
          renderText: () => (
            <List dataSource={partnersList} renderItem={({ label }) => <List.Item>{label}</List.Item>} />
          ),
          hideInDescriptions: !getVisibleSupplierEmployeesOrPartner(SupplierExtraInfo.PARTNER),
        },
      ]}
      column={1}
      size='small'
      bordered
      labelStyle={eventLabelStyle}
      contentStyle={eventContentStyle}
      rootClassName={styles.man_info_description}
    />
  );
};

export default memo(EventManInfo);
