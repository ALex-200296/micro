import { EasyWebWorkerBody, IEasyWebWorkerMessage } from 'easy-web-worker';

import { IMessage, IWorkerContext } from './intervalWebWorker.types';

export const intervalWebWorker: EasyWebWorkerBody<IMessage> = ({ onMessage }, context) => {
  let intervalId: ReturnType<typeof setInterval>;
  const { msDelay } = context.primitiveParameters[0] as IWorkerContext;

  const startInterval = (message: IEasyWebWorkerMessage<IMessage, void>) => {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      message.reportProgress(0);
    }, msDelay);
  };
  const stopInterval = () => {
    clearInterval(intervalId);
  };

  onMessage((message) => {
    const {
      payload: { isRunning },
    } = message;
    if (isRunning) {
      startInterval(message);
    } else {
      stopInterval();
      message.resolve();
    }
  });
};
