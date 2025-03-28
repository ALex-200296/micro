import { FormInstance } from 'antd';

export interface IExtraFileLoadFormProps {
  form: FormInstance;
  showSubmitButton?: boolean;
  submitButtonText?: string;
  onFinish?: (values: any) => void;
}

export interface IExtraFileLoadFormInitialValues {
  holding: string;
  client: string[];
  allClientsChosen: boolean;
}
