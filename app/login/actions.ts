// app/login/actions.ts
"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error: string | null };

export const signIn = async (
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  redirect("/");
};

export const signInWithGitHub = async () => {
  // Server Actions reject requests whose Origin doesn't match Host,
  // so this is trustworthy and works on localhost, previews and prod alike.
  const origin = (await headers()).get("origin");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: `${origin}/auth/callback` },
  });

  if (error || !data.url) redirect("/login?error=github");

  redirect(data.url);
};

export type ResetRequestState = { sent: boolean; error: string | null };

export const requestPasswordReset = async (
  _prevState: ResetRequestState,
  formData: FormData,
): Promise<ResetRequestState> => {
  const email = formData.get("email") as string;
  const origin = (await headers()).get("origin");

  const supabase = await createClient();
  // Supabase returns success for unknown emails too, so this can't be used to probe accounts
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/reset`,
  });

  if (error) return { sent: false, error: error.message };
  return { sent: true, error: null };
};
