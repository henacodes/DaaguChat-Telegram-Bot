import { supabase } from "./supabase";
import type { TelegramUser, DatabaseUser } from "./User";

const registerUser = async (userData: TelegramUser) => {
  const response = await supabase.from("User").insert({
    first_name: userData.first_name,
    last_name: userData.last_name,
    telegram_id: userData.telegram_id,
    username: userData.username,
  });
};

const findUser = async (telegram_id: number) => {
  const response = await supabase
    .from("User")
    .select()
    .eq("telegram_id", telegram_id);

  return response.data;
};
