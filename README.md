# InCase - Backend

<img src="https://sun9-9.userapi.com/impg/TvxOs5Z6Oq4zIVtUnJD0uvbLUPHa86M0OkuSBQ/xwSvc-KOU-s.jpg?size=107x55&quality=96&sign=80e1a5000a20607c8bd1afe5453abefc&type=album" align="right"/>

#### [Наш сайт](https://in-case.games) | [API](https://api.in-case.games/api/)

> Коммерческий проект по открытию кейсов.</br>
> Кейсы могут содержать в себе любые предметы из
> списка подключенных игр.

<b>Подключенные игры:</b>

- Counter-Strike: Global Offensive
- Dota 2

<b>Технологии на визуальной части:</b>

- Docker Compose
- Nginx
- Javascript
- React
- Webpack
- Chart js, axios

# Первый запуск

> [!TIP]
> Весь запуск происходит через Docker Compose.</br>
> compose.\*-close.yaml закрывает доступ к контейнерам, через внешнее подключение.

<b>Разработка:</b>

1. Меняем .env файлы конфигураций
2. `docker-compose -f compose.yaml -f compose.dev.yaml --verbose up --build`

<b>Выпуск:</b>

1. Меняем .env файлы конфигураций
2. `docker-compose -f compose.yaml -f compose.dev.yaml --verbose build`
3. `docker save -o images.tar frontend`
4. Переносим images.tar на сервер
5. `docker load -i images.tar`
6. `docker-compose -f compose.yaml -f compose.prod.yaml --verbose up`

> [!IMPORTANT]
>
> 1. Перенести папку src/nginx с папкой conf.\*.d
> 2. Создать папку .ssl и перенести туда сертификат и ключ

# Ссылки

- [Главная страница сайта](https://in-case.games/)
- [API](https://api.in-case.games/api/)
- [FAQ](https://in-case.games/faq)
