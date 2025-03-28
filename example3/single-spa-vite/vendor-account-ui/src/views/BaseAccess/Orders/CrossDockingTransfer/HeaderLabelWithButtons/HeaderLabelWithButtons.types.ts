import React from 'react';

export interface IHeaderLabelWithButtons {
  labelText: React.ReactNode;
  addBox: () => void;
  removeBox: (activeBox: string) => void;
  activeBox: string
  deleteBtnDisabled: boolean
}
