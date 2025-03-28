interface IFieldsAndConverter<T> {
  fieldNames: Array<keyof T>;
  converter: (value: any) => any;
}

export const reformatObject = <T>(object: T, fieldsAndConverter: IFieldsAndConverter<T>[]): T => {
  const newObject = { ...object };
  fieldsAndConverter.forEach(({ fieldNames, converter }) => {
    fieldNames.forEach((key) => {
      newObject[key] = converter(object[key]);
    });
  });
  return newObject;
};
