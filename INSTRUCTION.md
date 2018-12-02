# Пошаговая инструкция по созданию проекта

1.  Глобальная установка Node.js. Глобальная установка MongoDB [Файл INSTRUCTION.md](https://docs.mongodb.com/manual/administration/install-community/).
1.  Инициализация

        npm init --y

1.  Создаем файлы для кластеризации

        ./bin/index.js
        ./bin/master.js

1.  Создаем express проект

        ./bin/config.js
        ./bin/worker.js

1.  Создаем базу

        mkdir database
        //папку с базой надо поместить в .gitignor (логи ./database/journal могут достигать 200мб)
        //mongod - запускает базу
        // --dbpath <место где хранится база>
        //--smallfiles флаг указывающий на то, что файлы дб маленькими
        mongod --dbpath database --smallfiles

1.  Создаем файл с коннектом к базе

        ./bin/dbinit.js

1.  Создаем обработчик ошибок

        ./bin/helpers/errorHandler.js

1.  Создаем модели к нашей БД

        //тут будет содержаться экспорт всех моделей
        ./models/index.js

        //остальные модели проекта каждый в своем файле
        ./models/*.js

        Создаем помощников для валидации, вывода сообщений в ./models/helpers

1.  Подключаем роутинг

        ./controllers/index.js

1.  Подключаем мониторинг за процессами pm2

        ./pm2.config.js

        pm2 start pm2.config.js --watch
        pm2 startup pm2.config.js --watch
        pm2 stop pm2.config.js --watch

1.  Подключаем .env

1.  Делаем авторизацию с passportjs

1.  Подключаем роутинг

1.  Создаем миграцию

        migrate-mongo init

        В package.json добавляем команду, которая поможет управлять миграциями
        "migrate": "migrate-mongo -f ./migrate-mongo-config.js",

        Создать миграцию можно с помощью команды
        npm run migrate create <name>

1.
