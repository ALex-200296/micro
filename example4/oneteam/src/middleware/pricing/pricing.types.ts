export interface IGetPriceListsSagaState {
  payload: string;
  type: string;
}

export interface IClientData {
  'cli-code': string;
  'cli-name': string;
  error: boolean;
  messsage: string;
  url: string;
}

export interface IResponseGetPriceData extends Response {
  data: {
    clients: IClientData[];
  };
}
