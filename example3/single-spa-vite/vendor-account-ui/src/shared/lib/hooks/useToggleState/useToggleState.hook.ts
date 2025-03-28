import { useCallback, useState } from 'react';
export const useToggleState = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleToggle = useCallback(() => setIsOpen(!isOpen), []);

  return {
    isOpen,
    handleOpen,
    handleClose,
    handleToggle,
  };
};
