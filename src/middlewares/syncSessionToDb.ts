import { NextFunction } from "grammy";
import { MyContext } from "../bot";
export default async function (ctx: MyContext, next: NextFunction) {
  await next();
}
