import { ITagsData } from '@shared/lib/types';

export interface PopoverContentProps {
  hiddenValues: ITagsData['hiddenValues'];
}

export interface ITagProps extends ITagsData {
  extra?: string;
}

export interface TagContentProps {
  value: string;
  className?: string;
  label?: string;
  extra?: string;
}
