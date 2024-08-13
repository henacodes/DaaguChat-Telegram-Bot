import { supabase } from "./supabase";
import type { TelegramUser, DatabaseUser } from "./User";

export const registerUser = async (userData: TelegramUser) => {
  const response = await supabase.from("User").insert({
    first_name: userData.first_name,
    last_name: userData.last_name,
    telegram_id: userData.telegram_id,
    username: userData.username,
  });

  return response.data;
};

export const findUser = async (telegram_id: number) => {
  const response = await supabase
    .from("User")
    .select()
    .eq("telegram_id", telegram_id);

  return response.data;
};

export const updateUser = async (
  telegram_id: number,
  updatedFields: DatabaseUser
) => {
  await supabase
    .from("User")
    .update(updatedFields)
    .eq("telegram_id", telegram_id);
};

export const pendingUsers = async () => {
  const response = await supabase
    .from("User")
    .select()
    .eq("state", "searching");
  return response.data;
};
