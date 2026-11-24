// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";
import { AppError } from "@/lib/errors";

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new AppError(
      "Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)",
      "MISSING_ENV",
    );
  }

  return createBrowserClient(url, anonKey);
};
