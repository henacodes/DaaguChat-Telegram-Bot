import { NextFunction } from "grammy";
import { MyContext } from "../bot";
import { findUser } from "../db";
import { UserState } from "../session";

export default async function (ctx: MyContext, next: NextFunction) {
  const user = await findUser(ctx.chat!.id);
  if (user && user.length) {
    ctx.session.state = user![0].state as UserState;
    ctx.session.partner_id = user![0].partner_id || undefined;
  }
  await next();
}
