// app/auth/callback/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GitHub -> Supabase -> here with ?code=. Exchange it for a session cookie.
// Always lands on "/": no `next` param, so this can't be used as an open redirect.
export const GET = async (request: NextRequest) => {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}/`);
  }

  return NextResponse.redirect(`${origin}/login?error=github`);
};
