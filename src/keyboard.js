// подключаем кнопки для меню
const kb = require('./key.buttons');

module.exports = {
    servers: [
        [kb.servers.s1, kb.servers.s2],
        [kb.servers.s3, kb.servers.s4]


],
    mode: [
        [kb.mode.on, kb.mode.off],
        [kb.backServer]
    ],


}