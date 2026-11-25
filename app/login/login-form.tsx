// app/login/login-form.tsx
"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AuthCard } from "@/components/layout/AuthCard";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { signIn, signInWithGitHub, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

type LoginFormProps = {
  githubFailed: boolean;
};

export const LoginForm = ({ githubFailed }: LoginFormProps) => {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <AuthCard>
      <form action={formAction} className="flex w-full flex-col gap-2.5">
        <input
          type="email"
          name="email"
          placeholder="email"
          autoComplete="email"
          required
          className="border-b border-[var(--divider)] bg-transparent px-0.5 py-1.5 font-mono text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
        />
        <PasswordInput
          name="password"
          placeholder="password"
          autoComplete="current-password"
        />

        {state.error && (
          <p
            role="alert"
            className="mt-0.5 font-mono text-[10px] text-[var(--highlight)]"
          >
            {state.error}
          </p>
        )}

        <div className="mt-2 flex items-baseline justify-between">
          <button
            type="submit"
            disabled={isPending}
            className="w-fit font-mono text-xs text-[var(--accent)] hover:opacity-70 disabled:opacity-40"
          >
            sign in →
          </button>
          <Link
            href="/login/forgot"
            className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--accent)]"
          >
            forgot password?
          </Link>
        </div>
      </form>

      <form action={signInWithGitHub} className="mt-2">
        <button
          type="submit"
          className="font-mono text-xs text-[var(--accent)] hover:opacity-70"
        >
          sign in with github →
        </button>
        {githubFailed && (
          <p
            role="alert"
            className="mt-2 font-mono text-[10px] text-[var(--highlight)]"
          >
            github sign-in failed
          </p>
        )}
      </form>
    </AuthCard>
  );
};
