import React from 'react';

export interface ITransferHeaderProps {
  items: string[];
  addElement: () => void;
  removeElement: (item: string) => void;
  selectElement: (item: string) => void;
  children?: React.ReactNode;
  addButtonTitle?: React.ReactNode;
  dropdownIcon?: React.ReactNode;
  itemTitle?: string;
  activeBox?: string;
}
