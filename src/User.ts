export interface TelegramUser {
  first_name: string;
  last_name?: string;
  username?: string;
  telegram_id: number;
}

export interface DatabaseUser extends TelegramUser {
  age?: number | null;
  created_at?: string;
  gender?: string | null;
  id: number;
  in_chat?: boolean | null;
}
