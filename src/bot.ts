import { Bot, Context, InlineKeyboard, SessionFlavor } from "grammy";
import dotenv from "dotenv";

import { session, type Session } from "./session";

dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN || "";

type MyContext = Context & SessionFlavor<Session>;
const bot = new Bot<MyContext>(BOT_TOKEN);

//middlewares
bot.use(session);

bot.command("start", async (ctx) => {
  await ctx.reply(
    "Welcome to Daagu Chat. A place where you can find friends around the internet and chat with them anonymously. Lets get started",
    {
      reply_markup: new InlineKeyboard().text("New Chat", "new_chat"),
    }
  );
});

// Start the bot.
bot.start().then(() => console.log("Bot running "));
