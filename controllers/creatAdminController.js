/*
Напишем контроллер который будет обрабатывать прилетающий
POST запрос с  web клиента или 1c на /message/creat с данными login password name
{ "login"   : "n.shkolny@mail.ru",
  "password : "123",
  "name" : "Nick Shkolny"
}
и проверять есть ли юзер с такими параметрами и если нет то создавать такого юзера

{
    "_id": "5fed7d70df81bc19cbddba2d",
    "login": "n.shkolny",
    "token": "eyJhbGciOiJ..........."
}
 */

require('dotenv').config(); //подключаем переменные окружения

// подключаем модель админа
const Admin = require('../models/modelAdmin.js');

/* создаем и сразу экспортируем функцию которая импортируется из этого файла в роутере когда
прилетают запросы на /creat
Функция возвращает ошибки если не ввели логин и пароль, ищет в базе такого юзера и если не находит то создает его
*/


exports.creationAdmin = async function  (req, res, next) {



    console.log(req.body)

    //если не указан логин или пароль, то отправляем ошибку и выходим из функции
    if (!req.body.hasOwnProperty('login') || !req.body.hasOwnProperty('password')) {
        res.status(400).send('Неполные данные');
        return;
    }



    if (req.body.SUPER_CODE != process.env.SUPER_CODE ) {

        res.status(400).send('Неверный код');
        return;
    }

    let mongoAdmin; // сюда запишем найденного юзера из базы или останется null

    try {

        mongoAdmin = await Admin.findOne({ login: req.body.login, password: req.body.password });
        console.log(mongoAdmin)


        //если из базы данных вернулся пользователь то вернем ошибку что такой уже есть
        if (mongoAdmin ) {

            res.status(400).json({message:'Такой админ уже есть!'});
            return;
        }

        // раз сюда дошли то юзера нет и мы его будем создавать

        //создадим объект Админа
        let creatAdmin = {
            login: req.body.login,
            password: req.body.password,
            name: req.body.name
        };



        //создаем объект админа по модели - передав ему как параметр объект который мы сформировали
        const ADMIN = new Admin(creatAdmin);

        await ADMIN.save();


        //отдадим данные
        res.status(200).json({message: "Админ создан"});


    } catch (e) {
       // PM2Metrics.set('cm_errors_access');
        res.status(400).json(e); //{message:'Не удалось создать Админа'}
        return next(e); //передадим в use обрабатывающий ошибки (последний в index.js)
    }



}
