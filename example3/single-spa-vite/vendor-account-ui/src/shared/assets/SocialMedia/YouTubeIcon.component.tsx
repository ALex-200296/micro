import React, { memo } from 'react';
import { IIconProps } from '@shared/lib';

export const YouTubeIcon: React.FC<IIconProps> = memo((props) => {
  return (
    <svg
      fill='#fff'
      width='24'
      version='1.1'
      viewBox='0 0 64 64'
      xmlSpace='preserve'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g>
        <path d='M50,52H14C7.4,52,2,46.6,2,40V24c0-6.6,5.4-12,12-12h36c6.6,0,12,5.4,12,12v16C62,46.6,56.6,52,50,52z' />
        <polygon fill='#034da2' points='24,42 24,22 44,32  ' />
      </g>
    </svg>
  );
});
