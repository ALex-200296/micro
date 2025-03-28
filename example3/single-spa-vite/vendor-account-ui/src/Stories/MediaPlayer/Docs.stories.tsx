import { MediaPlayer } from '@shared/ui/atoms/MediaPlayer/MediaPlayer.component';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MediaPlayer> = {
  component: MediaPlayer,
  title: 'Media Player/Документация',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof MediaPlayer>;

export const Docs: Story = {
  args: {
    url: 'https://v3.cdnpk.net/videvo_files/video/free/2014-06/large_watermarked/Blue_Sky_and_Clouds_Timelapse_0892__Videvo_preview.mp4',
    noFileDownload: true,
    playing: false,
    loop: false,
    controls: true,
    volume: 0,
    muted: false,
    width: '100%',
    height: '100%',
  },
  argTypes: {
    url: {
      description: `Источник видео или аудио файла.
      Может быть просто ссылкой,
      плейлистом (массив)
      или MediaStream объектом - JS API для работы с медиа контентом`,
      table: {
        type: { detail: 'SourceProps: { media?: string, src: string, type?: string }' },
      },
    },
    noFileDownload: {
      description: 'Флаг, отвечающий за добавление возможности скачать проигрываемый медиа-контент.',
    },
    config: {
      description: `Свойство, позволяющее переписать дефолтную конфигурацию плеера.
      К примеру для плеера ютуба, когда в качестве url передана ссылка на ютуб. Или дефолтного плеера,
      который используется при передаче url не привязанного к какой-либо площадке.
      При включенной опции noFileDownload конфиг дефолтного плеера (file) дополняется свойством attributes: { controlsList: 'nodownload' }.`,
      table: {
        type: {
          detail:
            'Config: {\n' +
            '  soundcloud?: SoundCloudConfig\n' +
            '  youtube?: YouTubeConfig\n' +
            '  facebook?: FacebookConfig\n' +
            '  dailymotion?: DailyMotionConfig\n' +
            '  vimeo?: VimeoConfig\n' +
            '  file?: FileConfig\n' +
            '  wistia?: WistiaConfig\n' +
            '  mixcloud?: MixcloudConfig\n' +
            '  vidyard?: VidyardConfig\n' +
            '  twitch?: TwitchConfig\n' +
            '}',
        },
      },
    },
    playing: {
      description: 'Свойство, позволяющее контролировать проигрывание медиа-контента в данный момент.',
    },
    light: {
      description: `Управление превью плеера. Можно передать картинку для отображения превью.
      Boolean варианты для включения/отключения превью.
      При варианте true отображается иконка для запуска проигрывания.`,
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    loop: {
      description: 'Зацикленное проигрывание переданного контента (медиа-ресурса или плейлиста)',
    },
    controls: {
      description: 'Свойство, отвечающее за показывание/скрытие элементов управления плеером.',
    },
    volume: {
      description: 'Свойство для установки громкости проигрываемого контента.',
      control: {
        min: 0,
        max: 1,
      },
      table: {
        type: {
          summary: '0 | 1',
        },
      },
    },
    muted: {
      description: 'Включение/выключение звука',
    },
    playbackRate: {
      description: 'Скорость воспроизведения контента.',
    },
    width: {
      description: 'Ширина окна плеера',
      control: 'text',
    },
    height: {
      description: 'Высота окна плеера',
      control: 'text',
    },
    style: {
      description: 'Inline стили компонента',
    },
    progressInterval: {
      description: 'Время в миллисекундах между вызовами коллбеков onProgress',
    },
    playsinline: {
      description: `Добавляет проигрывателю атрибут playsinline,
      который позвлоляет воспроизводить контент на мобильных устройствах без необходимости перехода
      в полноэкранный режим.`,
    },
    pip: {
      description: `Влючение режима picture-in-picture,
      позволяющего выносить плеер в отдельное окно поверх остальных окон.`,
    },
    playIcon: {
      description: 'Иконка проигрывания для отображения при варианте light=true',
    },
    previewTabIndex: {
      description: 'Z-Index превью плеера при варианте light=true',
      control: 'number',
    },
    stopOnUnmount: {
      description: `Остановка проигрывания на размонирование компонента.
      Пример: при pip=true и stopOnUnmount=true после удаления из dom-дерева компонента плеера,
      вынесенное окно проигрывателя останется и прогрывание продолжится.`,
    },
    fallback: {
      description: 'Компонент, показываемый в плеере во время lazy-загрузки.',
    },
    wrapper: {
      description: 'Контейнер для оборачивания компонента плеера.',
    },
    onReady: {
      description: 'Коллбек, вызываемый когда медиа-ресурс загружен и готов к проигрыванию.',
    },
    onStart: {
      description: 'Коллбек, вызываемый когда начинается проигрывание медиа-ресурса (в первый раз).',
    },
    onPlay: {
      description:
        'Коллбек, вызываемый когда медиа-ресурс начинает проигрываться (как в первый раз, так и после паузы.)',
    },
    onProgress: {
      description: 'Коллбек, вызываемый в процессе проигрывания. Интервал вызова задается через progressInterval.',
      table: {
        type: {
          detail:
            'OnProgressProps: {\n' +
            '  played: number\n' +
            '  playedSeconds: number\n' +
            '  loaded: number\n' +
            '  loadedSeconds: number\n' +
            '}',
        },
      },
    },
    onDuration: {
      description: 'Коллбек, содержащий продолжительность в медиа в секундах.',
    },
    onPause: {
      description: 'Вызывается, когда проигрывание ставится на паузу.',
    },
    onBuffer: {
      description: 'Вызывается, когда начинается буферизация.',
    },
    onBufferEnd: {
      description: 'Вызывается, когда буферизация закончена (для типов files, youtube, facebook).',
    },
    onSeek: {
      description: 'Вызывается, когда издет обращение в медиа-ресурсу.',
    },
    onPlaybackRateChange: {
      description: 'Вызывается, когда изменяется скорость проигрывания (для типов youtube, files, vimeo, wistia) .',
    },
    onPlaybackQualityChange: {
      description: 'Вызывается, когда изменяется качество проигрываемого (только для youtube)',
    },
    onEnded: {
      description: 'Вызывается, когда медиа-ресурс проигран. Если loop=true, то этот коллбек не вызывается.',
    },
    onError: {
      description: 'Вызывается, когда происходит ошибка во время проигрывания.',
    },
    onClickPreview: {
      description: 'Вызывается, когда происходит клик по превью (только при light=true).',
    },
    onEnablePIP: {
      description: 'Вызывается, когда включается picture-in-picture режим.',
    },
    onDisablePIP: {
      description: 'Вызывается, когда выключается picture-in-picture режим.',
    },
  },
};
