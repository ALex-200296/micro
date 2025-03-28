import { VariantType } from 'notistack';

export type NotificationMeesageType = {
  title: string;
  link?: {
    text: string;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    download?: string;
  };
};

export interface INotificationState {
  key: string;
  message: NotificationMeesageType;
  variant?: VariantType;
  isCloseIcon?: boolean;
  code?: number;
  autoHide?: boolean;
}
export interface IUiState {
  pendingRequests: Array<string>;
  notifications: INotificationState[];
  menuIsOpen: boolean;
  helpIsOpen: boolean;
  prefillHelpForm: boolean;
  isShowMeeting: boolean;
  isScreenLock: boolean;
}

export interface INotificationActionState {
  message: NotificationMeesageType;
  noDublicate?: boolean;
  code?: number;
  variant?: VariantType;
  isCloseIcon?: boolean;
  autoHide?: boolean;
}
