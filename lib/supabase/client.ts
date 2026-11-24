// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";
import { AppError } from "@/lib/errors";

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new AppError(
      "Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)",
      "MISSING_ENV",
    );
  }

  return createBrowserClient(url, publishableKey);
};
