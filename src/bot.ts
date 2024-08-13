import { Bot, Context, InlineKeyboard, SessionFlavor } from "grammy";
import startHandler from "./handlers/start";
import newChatHandler from "./handlers/newChat";
import leaveChat from "./handlers/leaveChat";
import dotenv from "dotenv";

import { session, type Session } from "./session";

dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN || "";

export type MyContext = Context & SessionFlavor<Session>;
const bot = new Bot<MyContext>(BOT_TOKEN);

//middlewares
bot.use(session);

// commands
bot.command("start", startHandler);
bot.command("leave", leaveChat);

bot.callbackQuery("new_chat", newChatHandler);

// Start the bot.
bot.start().then(() => console.log("Bot running "));
