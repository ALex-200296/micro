import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/root.store';

const selectUiSlice = (state: RootState) => state.ui;

export const uiSelectors = {
  getMenuState: createSelector(selectUiSlice, (uiState) => uiState.menuIsOpen),
  getIsRequestPending: (id: string) =>
    createSelector(selectUiSlice, (uiState) => !!uiState.pendingRequests.find((req) => req === id)),
  getAreRequestsPending: (ids: string[]) =>
    createSelector(selectUiSlice, (items) => !!items.pendingRequests.filter((request) => ids.includes(request)).length),
  getNotifications: createSelector(selectUiSlice, (uiState) => uiState.notifications),
  getIsShowMeeting: createSelector(selectUiSlice, (uiState) => uiState.isShowMeeting),
  getIsScreenLock: createSelector(selectUiSlice, (uiState) => uiState.isScreenLock),
  getHelpState: createSelector(selectUiSlice, (uiState) => uiState.helpIsOpen),
  getPrefillHelpForm: createSelector(selectUiSlice, (uiState) => uiState.prefillHelpForm),
};
