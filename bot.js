import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/users.js";
import { createNewChat, sendMessage, stopChat } from "./utils/chatQueries.js";
import OnlineUser from "./models/onlineUser.js";
dotenv.config();

const welcomeText = `
  Here are the commands to get you re-started
  /new_chat - start a new chat session with a random person
  /stop_chat - stop the started chat session
  /privacy - see our privacy policies
  /about - get to now the developer

  ⏳⌛ upcomming features ⏳⌛
  /set_age < your age >- set your age
  /set_gender < your gender  > - set your gender ('male' and 'female' are valid answers)
  /country -  <your countr name>> - set your country
  `;

const bot = new Telegraf(process.env.BOT_TOKEN);
mongoose
  .connect(process.env.ATLAS)
  .then(() => {
    console.log("DB Connected successfully");
  })
  .catch((err) => console.log(err));
bot.start(async (ctx) => {
  const userExists = await User.findOne({ userId: ctx.from.id });
  if (userExists) {
    return ctx.reply(`
    Welcome back buddy
    This bot alows you chat with random people who also want to chat.
    ${welcomeText}
    `);
  }
  ctx.reply(` setting app your account. 
  please wait a moment ⏳⏳⏳`);
  try {
    const newUser = new User({
      userId: ctx.from.id,
      firstName: ctx.from.first_name,
      chatId: ctx.chat.id,
    });
    await newUser
      .save()
      .then(() => console.log("user saved succesfully"))
      .catch((err) => console.log(err));
    ctx.reply(`
        Welcome to Daagu chat bot.
        This bot alows you chat with random people who also want to chat.
       ${welcomeText}
      `);
  } catch (error) {
    ctx.reply(error.message);
  }
});

bot.command("/new_chat", (ctx) => {
  createNewChat(ctx.from.id, ctx.chat.id, ctx);
});

bot.command("/about", (ctx) => {
  ctx.reply(`
    Hello there!!
    This bot is where you can have a chat with random anonymous people anonymously.
    I am Henok Ayenew(you can call me Kirakos tho😊). I am highschool student from ethiopia.
    I hope you enjoy the bot. You can get updates on the bot with my telegram channel @gebeta_tech
    If you have anything to say, don't hesitate to DM me @HenaCodes.
    Thanks for using my bot!🙌🙌🙌

  `);
});

bot.command("/privacy", (ctx) => {
  ctx.reply(`
  - When you chat in our bot, we don't have any idea about what you type send to the other anonymous user
    you will be chatting completely anonymous!
  - Your detailed informations( firstName, Gender, Age and Country) are no going to be showed to any person you chat.
    Unless you allowed to do so!
  
  - We collect only your first name and telegram ID by default. Other informations stored based on your settings.
    If you hav any question regarding the bot, feel free to DM the developer @HenaCodes


    Enjoy!!!😊
  `);
});

bot.command("/stop_chat", async (ctx) => {
  const inChat = await OnlineUser.findOne({ userId: ctx.from.id });
  if (inChat) {
    return stopChat(ctx.from.id, ctx);
  } else {
    return ctx.reply("your are not in chat!, /new_chat to start a new chat");
  }
});
bot.use(async (ctx) => {
  const inChat = await OnlineUser.findOne({ userId: ctx.from.id });
  if (inChat) {
    return sendMessage(ctx.from.id, ctx.message.text, ctx);
  } else {
    return ctx.reply("your are not in chat!, /new_chat to start a new chat");
  }
});

bot.launch();
console.log("Bot conect successfully");
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
