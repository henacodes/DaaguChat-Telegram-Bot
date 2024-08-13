export interface TelegramUser {
  first_name: string;
  last_name?: string;
  username?: string;
  telegram_id: number;
}

export interface DatabaseUser extends TelegramUser {
  age?: number | undefined;
  created_at?: string;
  gender?: string | undefined;
  id?: number | undefined;
  in_chat?: boolean | undefined;
  state?: string | undefined;
  partner_id?: number | undefined;
}
