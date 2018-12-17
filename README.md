# Проектирование MVC на Node.js с использованием кластеров (работа в несколько асинхронных потоков), Express.js и mongoose.

## Задача — поднять сервер который имеет следующие особенности:

1. Работает в несколько асинхронных потоков.
1. Сессионная информация будет в общей для всех потоков.
1. Поддержка HTTPS.
1. Авторизация.
1. Легко масштабируем.

## Инструкция по созданию проекта

[Файл INSTRUCTION.md](./INSTRUCTION.md)

## Зависимости проекта

> - Express
> - swagger-ui-express — Удобно для документирования API
> - Bluebird — Promise какие они есть. Нам он понадобится т.к. в стандартных Promise-ах на 4.х.х был баг из-за чего возникал memory-leak. Также promise от которого mongoose зависит более не поддерживается. Нам придется заставить mongoose использовать наш Bluebird.
> - body-parser — Поддержка json.
> - busboy — Поддержка form-data.
> - cookie-parser — Простой модуль для кук.
> - connect-mongo — Нужно для хранения сессий в MongoDB
> - express-session — Для сессий.
> - image-type — Для валидации картинок при загрузке.
> - mongoose — Для удобного доступа к MongoDB
> - mongoose-unqiue-validator — Для указания уникальных данных.
> - nodemon — Во время разработки автоматически перезагружает наш сервер при сохранении файла.
> - passport passport-local — Модули для авторизации.
> - dotenv - Для конфига приложа.
> - cluster - встроенная библиотека nodejs
> - PM2 - менеджер процессов для nodejs.
> - migrate-mongo - библиотека помогающая создать миграции
> - express-es6-template-engine - библиотека рендера

## Теория по проекту

### Подключение и создание БД mongodb

> [Установка на mac](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
 > [Сайт mongo](https://www.mongodb.com/)
 > [Сайт mongoose](https://mongoosejs.com/)
> Хорошая шпаргалка по (mongo)[https://habr.com/post/259219/]

                Запуск в консоли
                mongo --port 28015
                show dbs
                use <dbname> - work with this db
                db - display db you are using
                show collections
                show users
                db.collection.find()
                db.collection.insertOne()
                db.collection.drop()

### Кластеры

> Кластер это система приложений которые где есть две роли: Главная роль (master) и рабочая роль (worker). Есть один мастер на который приходят все запросы, и n-ое количество рабочих.
>
> Если приходит запрос к серверу, то мастер решает какому рабочему дать этот запрос. При создании рабочего NODE создает новый процесс который запускает тот же код, который сейчас запущен и создает соединение. Когда происходит соединение по TCP/IP то мастер отдает Socket одному из рабочих через IPC(Inter Process Communications).
>
> [Документация.](https://nodejs.org/api/cluster.html)

### Модели

> Про модели можно почитать [в документации](https://mongoosejs.com/docs/guide.html).

### Менеджмент процессов

> [Документация](https://pm2.io/doc/en/runtime/overview/)

### Роутинг в express

> [Хорошая статья (eng)](https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4)

### Миграция

> Зачем нужна миграция?
> Миграция — это изменение состояния базы данных. С ее помощью можно менять коллекции, добавлять поля, изменять поля, инициализировать коллекции начальными данными и так далее. Файлы с миграциями обычно кладутся под контроль версий и каждый разработчик может видеть что конкретно делает та или иная миграция.

### Документирование API

> (Swagger)[https://swagger.io/]
> (Online generator)[https://api-docs.io/](Generator)[https://www.npmjs.com/package/express-swagger-generator]
