/*
Напишем контроллер который будет обрабатывать прилетающий
POST запрос с  web клиента или 1c на /server/creat с данными

{
	"name" : "t-com-00",
	"ip" : "188.225.87.20",
	"url" : "t-com-00.ru",
	"SUPER_CODE": "331320"
}

и проверять есть ли сервер с такими параметрами и если нет то создавать его

 */
const jwt = require('jsonwebtoken');                           //для использования токенов

require('dotenv').config(); //подключаем переменные окружения

// подключаем модель сервера
const Server = require('../models/modelServer.js');

/* создаем и сразу экспортируем функцию которая импортируется из этого файла в роутере когда
прилетают запросы на /creat
Функция возвращает ошибки если не ввели Имя Сервера, его url и ip адрес , ищет в базе такого юзера и если не находит то создает его
*/


exports.creationServer = async function  (req, res, next) {



    console.log(req.body)

    //если не указано имя адрес и айпи, то отправляем ошибку и выходим из функции
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('ip')|| !req.body.hasOwnProperty('url')) {
        res.status(400).send('Неполные данные');
        return;
    }


// проверяем суперкод, если не соответвует выходим и не создаем сервер
    if (req.body.SUPER_CODE != process.env.SUPER_CODE ) {

        res.status(400).send('Неверный код');
        return;
    }

    let mongoServer; // сюда запишем найденный сервер из базы или останется null

    try {

        mongoServer = await Server.findOne({ name: req.body.name, ip: req.body.ip, url: req.body.url });
        console.log(mongoServer)


        //если из базы данных вернулся сервер то вернем ошибку что такой уже есть
        if (mongoServer ) {

            res.status(400).json({message:'Такой сервер уже есть!'});
            return;
        }

        // раз сюда дошли то юзера нет и мы его будем создавать

        //создадим объект Сервера
        let creatServer = {
            name: req.body.name,
            ip: req.body.ip,
            url: req.body.url
        };



        //создаем объект Сервера по модели - передав ему как параметр объект который мы сформировали
        const SERVER = new Server(creatServer);

        await SERVER.save();

        let secretword  = process.env.SECRET_WORD;

        //добавляем в токен необходимые сведения кторые потом сможем достать
        const payload = {_id: SERVER._id};

        //выпустим токен добавив из конфига ключ
        const token = jwt.sign(payload, secretword);


        SERVER.token = token;
        await SERVER.save();


        //отдадим данные
        res.status(200).json({message: "Сервер создан"});


    } catch (e) {
       // PM2Metrics.set('cm_errors_access');
        res.status(400).json(e); //{message:'Не удалось создать Админа'}
        return next(e); //передадим в use обрабатывающий ошибки (последний в index.js)
    }



}
