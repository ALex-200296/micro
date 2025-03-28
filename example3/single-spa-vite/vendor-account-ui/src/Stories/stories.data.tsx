export const getLinkToAntDesign = (component: string) => `https://ant.design/components/${component}`;
export const getLinkToAntDesignPro = (component: string) => `https://procomponents.ant.design/en-US/components/${component}`

export const disableProps = (fields: string[]) =>
  Object.fromEntries(
    fields.map((field) => [
      field,
      {
        table: {
          disable: true,
        },
      },
    ]),
  );

export const dataTestId = 'stories';
