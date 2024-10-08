import { InlineKeyboard } from "grammy";
import { DatabaseUser } from "../User";
import { MyContext } from "../bot";
import { updateUser } from "../db";

export default async function (ctx: MyContext) {
  if (ctx.session.state !== "in_chat") {
    await ctx.reply("You are not in chat", {
      reply_markup: new InlineKeyboard().text("New Chat ✅", "new_chat"),
    });
    return;
  }
  if (ctx.session.partner_id) {
    await updateUser(ctx.session.partner_id, {
      state: "default",
      partner_id: undefined,
    } as DatabaseUser);
    await updateUser(ctx.chat!.id, {
      state: "default",
      partner_id: undefined,
    } as DatabaseUser);
  }
  ctx.reply("You left the chat", {
    reply_markup: new InlineKeyboard().text("New Chat ✅", "new_chat"),
  });
  ctx.api.sendMessage(
    ctx.session.partner_id as number,
    "Your partner left the chat",
    {
      reply_markup: new InlineKeyboard().text("New Chat ✅", "new_chat"),
    }
  );
  ctx.session = {
    ...ctx.session,
    state: "default",
    partner_id: undefined,
  };
}
