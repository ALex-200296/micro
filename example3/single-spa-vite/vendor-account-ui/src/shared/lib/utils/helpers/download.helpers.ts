export const downloadFile = (url: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadBlob = (content: string | Blob, fileName: string, mimeType = 'application/pdf') => {
  const link = document.createElement('a');
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.click();
};

export const downloadFilesFuncWithInterval = (urlList: string[], interval: number) => {
  let index = 0;
  const timerId = setInterval(() => {
    if (index >= urlList.length) {
      clearInterval(timerId);
      return;
    }
    downloadFile(urlList[index]);
    index++;
  }, interval);
};

export const downloadObjectAsJson = (exportObj: string, exportName: string = 'object'): void => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportObj);
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};
