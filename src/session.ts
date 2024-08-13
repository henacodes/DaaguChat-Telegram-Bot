import { session as session_ } from "grammy";

export type UserState = "in_chat" | "searching" | "default";

export interface Session {
  in_chat: boolean;
  partner_id?: number;
  state: UserState;
}

export const initial = (): Session => ({ in_chat: false, state: "default" });

export const session = session_({ initial });
