import React from 'react';
import { MediaPlayer } from '@shared/ui/atoms/MediaPlayer/MediaPlayer.component';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Space, Typography } from 'antd';

import { Docs } from './Docs.stories';

const { Text, Link } = Typography;

const meta: Meta<typeof MediaPlayer> = {
  component: MediaPlayer,
  title: 'Media Player/Player',
};

export default meta;
type Story = StoryObj<typeof MediaPlayer>;

export const Player: Story = {
  ...Docs,
  render: (args) => (
    <Space direction='vertical' size='large'>
      <Card title='Плееры из разных источников'>
        <Space direction='vertical'>
          <MediaPlayer {...args} />
          <MediaPlayer {...args} url='https://youtu.be/oUFJJNQGwhk' />
          <MediaPlayer {...args} url='https://www.twitch.tv/videos/106400740' />
        </Space>
      </Card>
      <Card title='Плееры типа file с разными форматами'>
        <Text>
          MP4:
          {
            <MediaPlayer
              {...args}
              url='https://v3.cdnpk.net/videvo_files/video/free/2014-12/large_watermarked/Raindrops_Videvo_preview.mp4'
            />
          }
        </Text>
        <Text>
          MP3:
          {
            <MediaPlayer
              {...args}
              width={500}
              height={50}
              url='https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3'
            />
          }
        </Text>
      </Card>
      <Card title='Плееры типа file c превью (свойство light)'>
        <Space direction='vertical'>
          <Text>
            light = true:
            {
              <MediaPlayer
                {...args}
                light={true}
                url='https://v3.cdnpk.net/videvo_files/video/free/2019-09/large_watermarked/190828_27_SuperTrees_HD_17_preview.mp4'
              />
            }
          </Text>
          <Text>
            light = false:
            {
              <MediaPlayer
                {...args}
                light={false}
                url='https://v3.cdnpk.net/videvo_files/video/free/2019-09/large_watermarked/190828_27_SuperTrees_HD_17_preview.mp4'
              />
            }
          </Text>
          <Text>
            light = image:
            {
              <MediaPlayer
                {...args}
                light={
                  <img
                    alt='preview'
                    style={{ height: '100%', width: '100%' }}
                    src='https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png'
                  />
                }
                url='https://v3.cdnpk.net/videvo_files/video/free/2019-09/large_watermarked/190828_27_SuperTrees_HD_17_preview.mp4'
              />
            }
          </Text>
        </Space>
      </Card>
      <Card title='Ссылки на документацию'>
        <Space>
          <Link href='https://www.npmjs.com/package/react-player'>Npm</Link>
          <Link href='https://cookpete.com/react-player/'>Демо</Link>
        </Space>
      </Card>
    </Space>
  ),
};
