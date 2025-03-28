import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createId } from '@shared/lib';

import { INotificationActionState, IUiState } from './ui.types';

const initialState: IUiState = {
  pendingRequests: [],
  notifications: [],
  menuIsOpen: false,
  helpIsOpen: false,
  prefillHelpForm: false,
  isShowMeeting: false,
  isScreenLock: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addPendingRequestId: (state, action: PayloadAction<string>) => {
      const { payload: requestId } = action;
      state.pendingRequests.push(requestId);
    },
    removePendingRequestId: (state, action: PayloadAction<string>) => {
      const { payload: requestId } = action;
      state.pendingRequests = state.pendingRequests.filter((id) => id !== requestId);
    },
    setMenuState: (state, action: PayloadAction<boolean>) => {
      state.menuIsOpen = action.payload;
    },
    setHelpState: (state, action: PayloadAction<boolean>) => {
      state.helpIsOpen = action.payload;
    },
    setPrefillHelp: (state, action: PayloadAction<boolean>) => {
      state.prefillHelpForm = action.payload;
    },
    setNotification: (state, action: PayloadAction<INotificationActionState>) => {
      const { message, code, variant, noDublicate = true, isCloseIcon, autoHide } = action.payload;
      const key = noDublicate ? `${code}` : createId();
      state.notifications.push({
        key,
        code,
        message,
        autoHide,
        isCloseIcon,
        variant: variant,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const { payload: key } = action;
      state.notifications = state.notifications.filter((notification) => notification.key !== key);
    },
    setIsShowMeeting: (state, action: PayloadAction<boolean>) => {
      state.isShowMeeting = action.payload;
    },
    setIsScreenLock: (state, action: PayloadAction<boolean>) => {
      state.isScreenLock = action.payload;
    },
    resetPendingRequests: (state) => {
      state.pendingRequests = initialState.pendingRequests;
    },
  },
});

export const {
  actions: {
    addPendingRequestId,
    removePendingRequestId,
    setMenuState,
    setHelpState,
    setPrefillHelp,
    setNotification,
    removeNotification,
    setIsShowMeeting,
    setIsScreenLock,
    resetPendingRequests,
  },
  reducer: uiStateReducer,
} = uiSlice;
