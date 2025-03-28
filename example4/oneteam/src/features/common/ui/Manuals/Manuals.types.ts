interface IManualData {
  name: string;
  to: string;
  downLoadName?: string;
  video?: boolean;
  thumbnail?: string;
  isFollowExternalLink?: boolean;
}

export interface IManualsData {
  name: string;
  data: IManualData[];
}

export interface IManualsProps {
  manualsData: IManualsData[];
  showManufacturerInfo?: boolean;
  showEdoId?: boolean;
}
