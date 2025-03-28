export interface IReportAlertProps {
  alertMessage: string;
  dataTestId: string;
  showDownloadLink: boolean;
  lookLinkText: string;
  handleOpen: () => void;
}
