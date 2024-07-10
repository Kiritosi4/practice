import aiogram
from . import config

bot = aiogram.Bot(config.tg_api)

async def AsyncSendMessageToChat(chatId : str, mes : str):
    await bot.send_message(chatId, mes[:4096])

async def AsyncSendMessageToMainChat(mes : str):
    await AsyncSendMessageToChat(config.group_id, mes)