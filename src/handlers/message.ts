import { MyContext } from "../bot";

export default async function (ctx: MyContext) {
  if (ctx.session.state === "in_chat" && ctx.session.partner_id) {
    ctx.api.sendMessage(ctx.session.partner_id, ctx.msg!.text as string);
  }
}
