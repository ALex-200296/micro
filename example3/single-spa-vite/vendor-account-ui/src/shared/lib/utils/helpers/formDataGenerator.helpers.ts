export const formDataGenerator = (params: [string, any][]) => {
  const formData = new FormData();
  params.forEach((item) => item[1] && formData.set(item[0], item[1]));
  return formData;
};
