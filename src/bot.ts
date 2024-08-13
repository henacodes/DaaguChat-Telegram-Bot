import { Bot, Context, InlineKeyboard, SessionFlavor } from "grammy";

// handlers
import startHandler from "./handlers/start";
import newChatHandler from "./handlers/newChat";
import leaveChat from "./handlers/leaveChat";
import sendMessage from "./handlers/message";
// middleware functions
import syncSessionToDb from "./middlewares/syncSessionToDb";

import dotenv from "dotenv";

import { session, type Session } from "./session";

dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN || "";

export type MyContext = Context & SessionFlavor<Session>;
const bot = new Bot<MyContext>(BOT_TOKEN);

//apply middlewares
bot.use(session);
bot.use(syncSessionToDb);

// commands
bot.command("start", startHandler);
bot.command("leave", leaveChat);

bot.callbackQuery("new_chat", newChatHandler);
bot.on("msg:text", sendMessage);
// Start the bot.
bot.start().then(() => console.log("Bot running "));
