const axios = require('axios')
TELEGRAM_BOT_TOKEN = '2082724050:AAGG4QQoh_OytoAliEkOGRSzPO523m65EXQ';
const TeleBot = require('telebot');
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);
const chatIds = [];
var a;
const CronJob = require('cron').CronJob;
const job = new CronJob('0/5 * * * * *', function() {
    chatIds.forEach((id) => {
        bot.sendMessage(id, 'From nodejs')
    })
}, null, true);

bot.on(['/start'], (msg) => {
        // var idOfChat = msg.chat.id
        // if(!chatIds.includes(idOfChat)) {
        // 	chatIds.push(idOfChat);
        // 	msg.reply.text('You pressed /start; Thats why lets go');
        // 	job.start();
        // }
        axios.get('https://api.pray.zone/v2/times/today.json?city=tashkent').then(r => {

            var times = r.data.results.datetime[0].times
            a = `📢 ${times['Sunrise']} da Tong otmoqda
		Bomdod namozi ${times.Imsak}
		Peshin namozi ${times.Dhuhr}
		Asr Namozi ${times.Asr}
		Shom Namozi ${times.Maghrib}
		Xufton Namozi ${times.Isha}
		Yarim kechasi ${times.Midnight}`
            msg.reply.text(a)
        })
    })
    // bot.on(['/stop'], (msg)=>{
    // 	var id = msg.chat.id
    // 	chatIds.pop(id)
    // })

bot.on(['/refresh'], (msg) => {
    // axios.get('https://api.pray.zone/v2/times/today.json?city=tashkent').then(request=>{
    // 	var times = JSON.parse(request.results.datetime[0].times)
    // 	a = `${times['Sunrise']} da Tong otmoqda
    // 	Bomdod namozi ${times.Imsak}
    // 	Peshin namozi ${times.Dhuhr}
    // 	Asr Namozi ${times.Asr}
    // 	Shom Namozi ${times.Maghrib}
    // 	Xufton Namozi ${times.Isha}
    // 	Yarim kechasi ${times.Midnight}`
    // 	msg.reply.text(a)
    // })
    axios.get('https://api.pray.zone/v2/times/today.json?city=tashkent').then(r => {

        var times = r.data.results.datetime[0].times
        a = `🌅 ${times['Sunrise']} da Tong otmoqda
		Bomdod namozi - ${times.Imsak} da
		Peshin namozi - ${times.Dhuhr} da
		Asr Namozi - ${times.Asr} da
		Shom Namozi - ${times.Maghrib} da
		Xufton Namozi - ${times.Isha} da
		🌃 Yarim kechasi - ${times.Midnight} da bo'lmoqda`
        msg.reply.text(a)
    })
})

bot.start()