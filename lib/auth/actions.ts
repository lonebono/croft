// lib/auth/actions.ts
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
};

export type UpdatePasswordState = { error: string | null };

const MIN_PASSWORD_LENGTH = 8;

export const updatePassword = async (
  _prevState: UpdatePasswordState,
  formData: FormData,
): Promise<UpdatePasswordState> => {
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (password.length < MIN_PASSWORD_LENGTH) {
    return { error: `at least ${MIN_PASSWORD_LENGTH} characters` };
  }
  if (password !== confirm) return { error: "passwords don't match" };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) return { error: error.message };

  redirect("/");
};
