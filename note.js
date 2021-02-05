process.env.NTBA_FIX_319 = 1;

const axios = require('axios');

const token = '1510394089:AAGdPBkFQ2DIQgNfk14VGQTUQ7-EAzVZbOE';

const TelegramBot = require('node-telegram-bot-api');

console.log('Бот запущен')
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/initadmin (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1];

    if (resp === '331320') {

        bot.sendMessage(chatId, `Вы создали чат № ${chatId} `);

    }


});

var cron = require('node-cron');

cron.schedule('*/30 * * * * *', () => {
    console.log('running a task every 10 sec');

    //bot.sendMessage('1128949676', `Привет `);

    getWorkMonitor ()

});


async function getWorkMonitor () {


    let requestConfig = {
        method: 'head',
        url: `https://t-com-00.ru:5556/api/init/monitor`
    };

    try {

        const result = await axios(requestConfig);
        console.log(`Status: ${result.status}`)
        console.log(`Server: ${result.headers.server}`)
        console.log(`Date: ${result.headers.date}`)


      //  let a = JSON.stringify(result, null, '  ')


        console.log('Запросили у сервера работает ли он', result);

        bot.sendMessage('1128949676',  a);

    } catch (e) {
        console.log('Ошибка', e.message);

        bot.sendMessage('1128949676', `Сервер не работает `);
    }



}
//-----------------------------------------------------------------------------------------------------------

const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()


//=========================================

bot.on('message', msg => {
    console.log('Работает ', msg.from.first_name)
    const chatId = msg.chat.id;
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

bot.onText(/\/start/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1];

    console.log(msg)

    if (resp === process.env.SUPER_CODE) {

        bot.sendMessage(chatId, `Здравствуйте ${msg.chat.first_name}!\nВам доступны для мониторинга следующие серверы:`, {
            reply_markup: {
                keyboard: keyboard.servers

            }

        })

    }


});
