export interface IBaseLayoutProps {
  menu: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  contentClassName?: string;
  footerClassName?: string;
  siderIsCollapsible?: boolean;
}
