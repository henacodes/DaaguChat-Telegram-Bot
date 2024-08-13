import { Context, InlineKeyboard } from "grammy";
import { findUser, registerUser } from "../db";
import { DatabaseUser, TelegramUser } from "../User";
import { generateCoolName } from "../utils";

export default async function (ctx: Context) {
  let telegramUser: TelegramUser = {
    telegram_id: ctx.chat?.id || 0,
    first_name: ctx.chat?.first_name || generateCoolName(),
    username: ctx.chat?.username,
    last_name: ctx.chat?.last_name,
  };

  try {
    let user;
    user = await findUser(ctx.chat?.id as number);

    if (!user?.length) {
      await registerUser(telegramUser);
    }

    await ctx.reply(
      "Welcome to Daagu Chat. A place where you can find friends around the internet and chat with them anonymously. Lets get started",
      {
        reply_markup: new InlineKeyboard().text("New Chat", "new_chat"),
      }
    );
  } catch (error) {
    ctx.reply("There was a problem with our server please try again");
  }
}
