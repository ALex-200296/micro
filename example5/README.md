# Single-spa.
Данный пример состоит из корня приложения(папка root), 4 микрофронтов(папкиБ mfe, mfe2, mfe3, vite, sidebarParcel), import-map-deployer(карта импортов), cdn для примера хранения версий микрофронтов.

## Корень приложения
Отвечает за подключение микрофронтендов, их регистрацию в верхнем маршрутизаторе

## Микрофронтенды
1. Папка MFE - Header блок, на данный момент содержащий ссылки(верхнего уровня) для переходов между микрофронтендами.
2. Папка MFE2 - Main блок, состоящий из sidebar(внутрення маршрутизация модуля) и content части
3. Папка MFE3 - Main блок, состоящий из sidebar(внутренняя маршрутизация модуля) и content чатс
4. SidebarParcel - модуль sidebar, созданный как пример для использования в других микронтендах через Parcel
5. Vite - модуль Vite, созданный как для пример проверки реализации микрофронта через Vite.

## CDN
Папка с версиями микрофронтендов(папки build микрофронтов), запускается через http-server --cors(Предварительно скачать через npm).

## Deployer
Import-map-deployer, отвечающий за чтение и записи импорт карты, запускается через npm run deploy

## Процесс запуска
1. Перейти в папку root и запустить корень приложения через npm run start
2. Перейти в папку deployer и запусить import-map-deployer через npm run deploy
3. Перейти в папку cdn и запустить через http-server --cors
Доп:
Если нужно какой либо микрофронтенд запустить локально, переходит в папку микрофронтенда запускаем его npm run start, находим в network путь до нашего главного файла например http://localhost:3001/parcelSidebar/v2/main.js, копируем ссылку, переходим в браузере во вкладку с запущенным корнем(скорее всего это http://localhost:9000), в правом нижнем углу находим {...}, нажимаем, открывается панель с нашей импорт картами, добавляем нашу ссылку как новый модуль либо переопределяем другой микрофронтенд через ovverides,(дока https://www.npmjs.com/package/import-map-overrides/v/1.7.0)

Также есть пример автономного режима, переходим в папку vite и запускаем приложение через npm run start, переходим в браузер и ВУАЛЯ!!! все работает.
Проблемы
1. Корень проета не видит import-map загруженный через Import-map-deployer. Решение - убедится что корень проекта скачивает импорт карту по правильным путям, папка cdn(проверить путь до версий, пример http-server --cors запускается по пути http://192.168.0.3:8080) и import-map-deployer(проверить путь до импорт карты, пример http://localhost:5000/import-map.json).
2. Если не видно {...} в правом нижнем углу, нужно перейти в вкладку через f12 в application и добавить в LocalStorage ключ devtools и значение true

## Ссылка на can i use import-map
https://caniuse.com/?search=import-map