import { MyContext } from "../bot";
import { pendingUsers, updateUser, findUser } from "../db";
import { DatabaseUser } from "../User";

export default async function (ctx: MyContext) {
  ctx.deleteMessage();
  const telegram_id = ctx.chat!.id;
  try {
    const searchingUsers = await pendingUsers();
    if (searchingUsers!.length) {
      const foundUserId = searchingUsers![0].telegram_id;
      ctx.session = {
        ...ctx.session,
        in_chat: true,
        partner_id: foundUserId,
      };

      await updateUser(telegram_id, {
        state: "in_chat",
        partner_id: foundUserId,
      } as DatabaseUser);
      await updateUser(foundUserId, {
        state: "in_chat",
        partner_id: telegram_id,
      } as DatabaseUser);
      let reply = "You are connected to new user";
      ctx.reply(reply);
      ctx.api.sendMessage(foundUserId, reply);
    } else {
      // change the users state to searching, so that others can find him in the next 10 seconds
      await updateUser(telegram_id, {
        state: "searching",
      } as DatabaseUser);

      setTimeout(async () => {
        let response = await findUser(telegram_id);
        if (response![0].state !== "in_chat") {
          await updateUser(telegram_id, { state: "default" } as DatabaseUser);
        }
      }, 10_000);
    }
  } catch (error) {
    ctx.reply(
      "Cant performe this action for unknown reasons. Please try again later :)"
    );
  }
}
