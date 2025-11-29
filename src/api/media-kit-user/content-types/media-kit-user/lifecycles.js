'use strict';


const axios = require("axios");

module.exports={
    async afterCreate(event) {
        const {result} = event;

        try{

            const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
            const chatId = process.env.TELEGRAM_CHAT_ID;

            const text = `📩 New message received:\n
👤 Name: ${result.name}\n
📞Telephone: ${result.phone}\n
💬Message: ${result.text}\n
💬Media Kit: ${result.media_kit}\n

🕒 Time: ${new Date().toLocaleString()}
            `;



            await axios.post(
                `https://api.telegram.org/bot${telegramToken}/sendMessage`,
                {
                    chat_id: chatId,
                    text,
                    parse_mode: "Markdown"
                }
            );

        }catch (err) {
            strapi.log.error('Telegram bot:', err);
        }

    }
}