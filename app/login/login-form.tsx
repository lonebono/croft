// app/login/login-form.tsx
"use client";

import { useActionState } from "react";
import { signIn, signInWithGitHub, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

type LoginFormProps = {
  githubFailed: boolean;
};

export const LoginForm = ({ githubFailed }: LoginFormProps) => {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)]">
      <div className="flex w-56 flex-col items-start">
        <p className="wordmark text-2xl font-bold text-[var(--text-primary)]">
          Croft
        </p>
        <p className="mb-8 font-mono text-[10px] text-[var(--text-muted)]">
          14.6°N 121.0°E
        </p>

        <form action={formAction} className="flex w-full flex-col gap-2.5">
          <input
            type="email"
            name="email"
            placeholder="email"
            required
            className="border-b border-[var(--divider)] bg-transparent px-0.5 py-1.5 font-mono text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            className="border-b border-[var(--divider)] bg-transparent px-0.5 py-1.5 font-mono text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
          />

          {state.error && (
            <p
              role="alert"
              className="mt-0.5 font-mono text-[10px] text-[var(--highlight)]"
            >
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 w-fit font-mono text-xs text-[var(--accent)] hover:opacity-70 disabled:opacity-40"
          >
            sign in →
          </button>
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
      </div>
    </div>
  );
};
