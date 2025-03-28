import React, { memo, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DynamicRoutes } from '@app/routes/root.types';
import { useHistory } from '@shared/lib/hooks/useHistory/useHistory.hook';
import { Button } from '@shared/ui';
import { Result as ResultAntd } from 'antd';

import { allErrors, dataTestId, getStatusData } from './Result.data';
import { StatusesType } from './Result.types';

import styles from './Result.module.scss';

export const Result: React.FC = memo(() => {
  const navigate = useNavigate();
  const params = useParams();
  const { status } = params;

  const actualStatus = useMemo(() => (status && allErrors.test(status) ? status : '404'), [status]);

  const {
    history: { prevLocation },
  } = useHistory();

  const { icon, subTitle, path, text, title } = useMemo(
    () => getStatusData(params[DynamicRoutes.STATUS] as StatusesType, actualStatus, prevLocation),
    [params, prevLocation],
  );
  const navigateTo = () => {
    path.isAbsolutePath ? window.location.assign(path.pathname) : navigate({ ...path });
  };

  return (
    <div className={styles.result_container}>
      <ResultAntd
        icon={icon}
        title={title}
        subTitle={subTitle}
        rootClassName={styles.hint}
        extra={
          <Button dataTestId={dataTestId} onClick={navigateTo} type='primary'>
            {text}
          </Button>
        }
      />
    </div>
  );
});
