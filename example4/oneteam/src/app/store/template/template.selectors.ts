import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/root.store';

const selectTemplateSlice = (state: RootState) => state.template;

export const templateSelectors = {
  getRejectedFiles: createSelector(selectTemplateSlice, (templateState) => {
    const totalRejected = Object.values(templateState.rejectedFiles).reduce((acc, item) => {
      return item.files.length + acc;
    }, 0);
    return {
      ...templateState,
      totalSuccess: templateState.total - totalRejected,
    };
  }),
};
