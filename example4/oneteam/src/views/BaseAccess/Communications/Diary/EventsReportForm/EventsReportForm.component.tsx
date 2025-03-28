import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calendarSelectors } from '@app/store/calendar/calendar.selectors';
import { calendarSliceName } from '@app/store/calendar/calendar.slice';
import { uiSelectors } from '@app/store/ui/ui.selectors';
import { getExportCliTaskAction } from '@middleware/calendar/calendar.saga';
import { downloadFile } from '@shared/lib';
import { Button, DateRangePicker, FormItem, slashedFormat } from '@shared/ui';
import { Form, Progress } from 'antd';

import { buttonText, dataTestId, eventsReportFormInfo, fieldsProps, initialState } from './EventsReportForm.data';
import { IInitialStateForm } from './EventsReportForm.types';
import EventsReportFormInfo from './EventsReportFormInfo.component';

import styles from './EventsReportForm.module.scss';

const EventsReportForm: React.FC = () => {
  const isLoading = useSelector(uiSelectors.getIsRequestPending(`${calendarSliceName}/meeting/exportCliTask`));
  const { fileName } = useSelector(calendarSelectors.getCalendarExportFileName);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = useCallback((values: IInitialStateForm) => {
    const [startDate, endDate] = values.dateRange;
    dispatch(
      getExportCliTaskAction({
        startDate: startDate ? startDate.format(slashedFormat) : '',
        finalDate: endDate ? endDate.format(slashedFormat) : '',
      }),
    );
  }, []);

  useEffect(() => {
    if (fileName && !isLoading) {
      downloadFile(fileName);
    }
  }, [fileName]);

  return (
    <Form form={form} onFinish={onFinish} initialValues={initialState} className={styles.form}>
      <FormItem
        {...fieldsProps.date}
        help={
          isLoading ? (
            <Progress />
          ) : (
            <EventsReportFormInfo
              fileName={fileName}
              fileText={eventsReportFormInfo.fileText}
              helperText={eventsReportFormInfo.helperText}
            />
          )
        }
      >
        <DateRangePicker size='large' className={styles.range_picker} dataTestId={dataTestId} />
      </FormItem>
      <FormItem className={styles.btn}>
        <Button dataTestId={dataTestId} disabled={isLoading} htmlType='submit' type='primary'>
          {buttonText}
        </Button>
      </FormItem>
    </Form>
  );
};

export default memo(EventsReportForm);
