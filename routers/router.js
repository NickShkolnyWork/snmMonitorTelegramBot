// В этом файле прописано какой контроллер выполнять на какой метод запроса, при этом контроллеры находятся в отдельных файлах
// он экспортируется для использования в index.js

const express= require('express'); //подключаем экспресс
const router = express.Router();    //подключаем встроенный роутер

const creatAdminController = require('../controllers/creatAdminController.js');      //подключаем контроллер создания Админов
const creatServerController = require('../controllers/creatServerController.js');      //подключаем контроллер создания Серверов
const acceptMesssageController = require('../controllers/creatMessageController.js');      //подключаем контроллер создания Сообщений

router.post('/admin/creat', creatAdminController.creationAdmin); //запускаем прием /creat сообщений на создание Админов
router.post('/server/creat', creatServerController.creationServer); //запускаем прием /creat сообщений на создание Серверов
router.post('/message/creat', acceptMesssageController.creationMessage); //запускаем прием /creat сообщений на создание Сообщений от серверов

module.exports = router;