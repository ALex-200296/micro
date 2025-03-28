import { EventUpdateFormProps } from '../EventUpdate/EventUpdate.types';

export interface IEventReviewProps {
  isOpen: boolean;
  handleClose: () => void;
  updateFormProps?: Partial<EventUpdateFormProps>;
}
