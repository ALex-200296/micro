import { IResponseGetFile, IResponseGetJobUuid, IUuidData } from '@middleware/reports/reports.types';
import { IResponseFile } from '@middleware/template/template.types';
import { EasyWebWorkerBody } from 'easy-web-worker';

import {
  AdapterJobUuidType,
  AdapterReportsFilesReturnType,
  AdapterReportsFilesType,
  GetTaskParamsReturnType,
  GetTaskParamsType,
  GetUuidBodyType,
  IGetTaskParamsPayload,
} from './adapterReports.types';

export const adapterReportsWebWorker: EasyWebWorkerBody = ({ onMessage }) => {
  const paramsGenerator = (params: [string, any][]) => Object.fromEntries(params.filter((items) => items[1]));

  const adapterReportsFiles: AdapterReportsFilesType = (data) => {
    const { records, rows } = data;
    return {
      records: records || 0,
      data:
        rows && rows.length
          ? rows.map((row) => {
              const {
                id,
                login,
                state,
                whencre,
                timecre,
                ob_File,
                cli_name,
                login_fio,
                ext_param,
                parameters,
                state_desc,
                file_server,
              } = row;
              return {
                id: id || '',
                login: login || '',
                state: state || '',
                timecre: timecre || '',
                whencre: whencre || '',
                ob_File: ob_File,
                cli_name: cli_name || '',
                login_fio: login_fio || '',
                ext_param: ext_param || '',
                parameters: parameters || '',
                state_desc: state_desc || '',
                file_server: file_server || '',
              };
            })
          : [],
    };
  };

  const adapterJobUuid: AdapterJobUuidType = (response) => {
    const { org_inn, login_fio, org_kpp, org_name, completed } = response.rows[0];
    return {
      orgInn: org_inn || '',
      orgKpp: org_kpp || '',
      orgName: org_name || '',
      loginFio: login_fio || '',
      completed: completed || false,
    };
  };

  const getTaskParams: GetTaskParamsType = ({ files, oneRequest, pExtParam }) => {
    if (oneRequest) {
      const { pFileServers, pParameters } = files.reduce<{ pFileServers: string[]; pParameters: string[] }>(
        (prev, { parentName, extension, numId }) => {
          return {
            pFileServers: [...prev.pFileServers, `${numId}.${extension}`],
            pParameters: [...prev.pParameters, `${parentName}.${extension}`],
          };
        },
        { pFileServers: [], pParameters: [] },
      );
      return [
        paramsGenerator([
          ['p_state', 6],
          ['p_file_server', pFileServers.join(';')],
          ['p_parameters', `file_name=${pParameters.join(';')}`],
          ['p_ext_param', pExtParam],
        ]),
      ];
    }
    return files.map(({ numId, extension, parentName }) =>
      paramsGenerator([
        ['p_state', 6],
        ['p_file_server', `${numId}.${extension}`],
        ['p_parameters', `file_name=${parentName}.${extension}`],
        ['p_ext_param', pExtParam],
      ]),
    );
  };

  const getUuidBody: GetUuidBodyType = (files) => {
    return JSON.stringify({
      files: files.map((file) => {
        const { file_name, msg } = file;
        return { file: file_name, name: msg };
      }),
    });
  };

  onMessage<IResponseGetFile['data'], AdapterReportsFilesReturnType>('reportFiles', (message) => {
    const { payload } = message;
    const adaptedInvoice = adapterReportsFiles(payload);
    message.resolve(adaptedInvoice);
  });

  onMessage<IResponseGetJobUuid['data'], IUuidData>('jobUuid', (message) => {
    const { payload } = message;
    const adaptedJobUuid = adapterJobUuid(payload);
    message.resolve(adaptedJobUuid);
  });

  onMessage<IGetTaskParamsPayload, GetTaskParamsReturnType>('taskParams', (message) => {
    const { payload } = message;
    const adaptedJobUuid = getTaskParams(payload);
    message.resolve(adaptedJobUuid);
  });

  onMessage<IResponseFile[], string>('uuidBody', (message) => {
    const { payload } = message;
    const adaptedJobUuid = getUuidBody(payload);
    message.resolve(adaptedJobUuid);
  });
};
