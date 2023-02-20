import User from "../models/users.js";
import OnlineUser from "../models/onlineUser.js";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

export const createNewChat = async (id, chatId, ctx) => {
  const existsInChat = await OnlineUser.findOne({ userId: id });
  if (existsInChat) {
    return ctx.reply("You are already in chat");
  }
  const randomDelaySecond = getRandomIntInclusive(1, 5);
  ctx.reply("Searching for users.... ⌛⌛");
  setTimeout(async () => {
    const OnlinePeope = await OnlineUser.find({ inChat: false });
    if (OnlinePeope.length > 0) {
      const randomNumber = getRandomIntInclusive(1, OnlinePeope.length);
      const randomUser = OnlinePeope[randomNumber - 1];
      randomUser.inChat = true;
      randomUser.connectedTo = chatId;
      const thisUser = new OnlineUser({
        userId: id,
        chatId: chatId,
        inChat: true,
        connectedTo: randomUser.chatId,
      });

      await randomUser.save();
      await thisUser.save();

      ctx.telegram.sendMessage(
        chatId,
        `
      🟢You are now connected to a new user 🟢 
      You can now chat with him/her!!!
    `
      );
      ctx.telegram.sendMessage(
        randomUser.userId,
        `
    🟢You are now connected to a new user 🟢 ✔✔✔
    You can now chat with him/her!!!
  `
      );
    } else {
      const thisUser = new OnlineUser({
        userId: id,
        chatId: chatId,
      });
      await thisUser.save();
      ctx.reply("Still searching for online users.... Just a moment");
      setTimeout(async () => {
        const user = await OnlineUser.findOne({ userId: id });
        if (user.inChat == false) {
          ctx.reply(
            `Sorry, There was no online user found.... come back moments later
            Thanks for using our bot😊`
          );
          await OnlineUser.deleteOne({ userId: id });
        }
      }, 5000);
    }
  }, `${randomDelaySecond}000`);
};

export const stopChat = async (id, ctx) => {
  const thisUser = await OnlineUser.findOne({ userId: id });
  ctx.reply("🔴 Chat stopped successfully 🔴");
  ctx.telegram.sendMessage(
    thisUser.connectedTo,
    `🔴 The user left the chat. 🔴
      /new_chat for a new chat`
  );
  await OnlineUser.deleteOne({ chatId: thisUser.connectedTo });
  await OnlineUser.deleteOne({ userId: id });
};

export const sendMessage = async (id, msg, ctx) => {
  const thisUser = await OnlineUser.findOne({ userId: id });
  ctx.telegram.sendMessage(
    thisUser.connectedTo,
    `
  ${msg}
  - sent from user
  `
  );
};
