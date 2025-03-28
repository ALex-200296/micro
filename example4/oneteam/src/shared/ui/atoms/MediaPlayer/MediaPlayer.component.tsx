import React, { memo } from 'react';
import ReactPlayer from 'react-player';

import { defaultConfig } from './MediaPlayer.data';
import { IMediaPlayerProps } from './MediaPlayer.types';
export const MediaPlayer: React.FC<IMediaPlayerProps> = memo(
  ({ noFileDownload = true, controls = true, config, ...props }) => (
    <ReactPlayer controls={controls} config={{ ...config, ...(noFileDownload && defaultConfig) }} {...props} />
  ),
);
