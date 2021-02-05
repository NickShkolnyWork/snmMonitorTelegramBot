/*
Напишем контроллер который будет обрабатывать прилетающие
POST запросы с наших серверов на /message с сообщениями вида
{ "serverName"   : "t-com-00",
  "dataTime" : "11:32.067 13.02/21",
  "messType" : "errorSystem"  / service , warn, errorLogic
  "message" : {JSON}
}

записывать их в базу данных, проверять нужно ли в данный момент такой тип сообщений передавать
в бот админам системы и соответственно отправлять их


 */

// подключаем модель сообщения
const Message = require("../models/modelMessage.js");
// подключаем модель сервера
const Server = require("../models/modelServer.js");

const Translate = require("../libs/translate.js");

exports.creationMessage = async function (req, res, next) {
  console.log(req.body);
  console.log(req.body.server);
  console.log(req.body.message);

  let mongoServer; // сюда запишем сервер из базы или останется null

  try {
    mongoServer = await Server.findById(req.body.server_id);
    console.log(mongoServer);

    if (mongoServer === null) {
      res.status(400).send("Сервер не найден");
    } else {

     let  message_ru = await Translate(req.body.message)

      console.log()

      const MESSAGE = new Message({
        server: mongoServer,
        message: req.body.message,
        message_ru: message_ru,
        messType: req.body.messType,
      });

      const resultMessage = await MESSAGE.save();





      //отдадим данные
      res.status(200).json({ message: "все ок" });
    }
  } catch (e) {
    res.status(400).json({ message: "ошибка" });
    return next(e); //передадим в use обрабатывающий ошибки (последний в index.js)
  }
};
