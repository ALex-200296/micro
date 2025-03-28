import { useCallback, useMemo } from 'react';
import { intervalWebWorker } from '@features/common/lib/utils/workers/intervalWebWorker/intervalWebWorker';
import { createEasyWebWorker } from 'easy-web-worker';

export const useWebWorkerInterval = (msDelay: number) => {
  const worker = useMemo(() => createEasyWebWorker(intervalWebWorker, { primitiveParameters: [{ msDelay }] }), []);

  const runInterval = useCallback((runIntervalCallback: () => void) => {
    worker.send({ isRunning: true }).onProgress(() => {
      runIntervalCallback();
    });
  }, []);

  const stopInterval = useCallback(() => {
    worker.send({ isRunning: false }).then(() => {
      worker.dispose();
    });
  }, []);

  return {
    runInterval,
    stopInterval,
  };
};
