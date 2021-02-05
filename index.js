require('dotenv').config(); //подключаем переменные окружения

// Подключем библиотеки с помощью глобальной функции require
const express = require('express');

const mongoose = require('mongoose');
const cors =require('cors');

// подключаем кнопки для меню
const kb = require('./src/key.buttons');

// подключаем клавиатуры
const keyboard = require('./src/keyboard');

process.env.NTBA_FIX_319 = 1;

const axios = require('axios');

const token = '1510394089:AAGdPBkFQ2DIQgNfk14VGQTUQ7-EAzVZbOE';

const TelegramBot = require('node-telegram-bot-api');

console.log('Бот запущен')
const bot = new TelegramBot(token, {polling: true});

bot.on('message', msg => {
    console.log('Работает ', msg.from.first_name)
    const chatId = msg.chat.id;

    console.log(msg.text)





    switch (msg.text) {
        case kb.servers.s1:
            bot.sendMessage(chatId, 'Выберите что Вы хотите сделать:', {
                reply_markup: {keyboard: keyboard.mode}
            })
            break
        case kb.servers.s2:
            bot.sendMessage(chatId, 'Выберите что Вы хотите сделать:', {
                reply_markup: {keyboard: keyboard.mode}
            })
            break
        case kb.servers.s3:
            bot.sendMessage(chatId, 'Выберите что Вы хотите сделать:', {
                reply_markup: {keyboard: keyboard.mode}
            })
            break
        case kb.servers.s4:
            bot.sendMessage(chatId, 'Выберите что Вы хотите сделать:', {
                reply_markup: {keyboard: keyboard.mode}
            })
            break
        case kb.backServer:
            bot.sendMessage(chatId, 'Выберите сервер:', {
                reply_markup: {keyboard: keyboard.servers}
            })
            break
        case kb.mode.edit:
            bot.sendMessage(chatId, 'Выберите действие:', {
                reply_markup: {keyboard: keyboard.service}
            })
            break

    }
})

bot.onText(/\/initserver (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const idServer = match[1];

    console.log(msg)
    console.log(idServer)

    // подключаем модель сервера
    const Server = require('./models/modelServer.js');

    let mongoServer; // сюда запишем найденный сервер из базы или останется null

    try {

       // mongoServer = await ServerfindById(idServer).exec();
      //  console.log(mongoServer)

    } catch (e) {

    }


    if (resp === process.env.SUPER_CODE) {



        bot.sendMessage(chatId, `Здравствуйте ${msg.chat.first_name}!\nВведите id сервера для подключения оповещения\nили выберите из предложенных`, {
            reply_markup: {
                keyboard: keyboard.servers

            }

        })

    }


});

//показывает подробные логи если development
if (process.env.NODE_ENV === 'development') mongoose.set('debug', true);

let CORS = "*";

// Создаем переменную нашего Сервера app которая будет результатом работы функции express
const app = express();

// Получаем номер порта из переменных окружения котрые туда добавил pm2, если не получается назначаем порт 3000
const PORT = process.env.PORT_PM2 || 5000;

const router = require('./routers/router.js');
app.use(express.json());
app.use(cors({ origin: CORS }));


app.use('/api', router); //установим роутер который обрабатывает запросы прилетающие на все адреса /api/*

app.use(function (req, res, next) {
    res.status(400).send(req.error);
});



async function start() {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`Сервер стартовал на порту ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()



