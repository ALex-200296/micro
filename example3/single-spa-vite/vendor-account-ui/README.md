# Начало работы

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Настройка и запуск проекта:

- В папке `System32/drivers/etc` открыть `hosts` файл с правами администратора.

  В файле найти следующие строки и прописать **dev.etm.ru**:

  > <span># localhost name resolution is handled within DNS itself. </span> <br/> > <span>127.0.0.1 **dev.etm.ru** </span> <br/> > <span>::1 localhost </span> <br/>

  Путь указан для Windows. Если пути разнятся, смотрите инструкцию: [Hosts file instruction](https://help.reg.ru/hc/ru/articles/4408047768849-%D0%A4%D0%B0%D0%B9%D0%BB-hosts-%D0%B4%D0%BB%D1%8F-Windows-10)

## Доступные команды

В директории проекта можно запустить:

### `npm run dev`

Запускает приложение локально, используя **env.development** .\
Откройте [http://dev.etm.ru:3000](http://dev.etm.ru:3000) для просмотра в браузере.

Страница перезагрузится, если в код внести изменения.\
Если возникнут ошибки, они будут показаны на экране и в консоли.

### `npm run build`
Создает build проекта. Перед релизом **рекомендуется** запустить для проверки сборки на целевой ветке.

### Снимок текущего состояния(git commit)

Перед каждым снимком текущего состояния `git commit` проводится анализ качества вашего кода `npm run lint`.
При обнаружении синтаксической ошибки снимок текущего состояния отменяется.

#### Вывод:
Перед каждым снимком текущего состояния, запускать `npm run lint:fix` (автоматическое исправление синтаксических ошибок)

## Storybook

### `npm run storybook`

Для создания стори компонента, нужно поместить файл в папку `Stories` и указать, что файл является историей. 

Пример: `Button.stories.tsx`

История компонента должна обязательно содержать:
- раздел документации
- ссылку на компонент из библиотеки(если есть)
- краткое описание отличий написанного компонента от библиотечного

По возможности описывать все пропы. 

### Alias, относительные импорты

Все относительные импорты прописаны в файле craco.config.js

Неправильно:

import FormItem '../../components/FormItem/FormItem.component'

Правильно:

import FormItem '@components/FormItem/FormItem.compoment'

Относительные импорты внутри scss файлов, пример

@use '@styles/_colors.scss';
@import '@styles/_colors.scss';
