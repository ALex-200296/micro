import { IGetRequestDetailsSagaState } from './project.types';

export function* getProjectRequestDetailsError({ payload }: IGetRequestDetailsSagaState) {
  const { getResponse } = payload;
  yield getResponse?.();
}
