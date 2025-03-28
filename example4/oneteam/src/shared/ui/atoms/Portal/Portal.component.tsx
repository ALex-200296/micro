import React, { memo } from 'react';
import { createPortal } from 'react-dom';

import { IPortalProps } from './Portal.types';

export const Portal: React.FC<IPortalProps> = memo(({ children }) =>
  createPortal(children, document.body as HTMLElement),
);
