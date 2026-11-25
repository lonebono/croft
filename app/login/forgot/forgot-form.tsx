// app/login/forgot/forgot-form.tsx
"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AuthCard } from "@/components/layout/AuthCard";
import { requestPasswordReset, type ResetRequestState } from "../actions";

const initialState: ResetRequestState = { sent: false, error: null };

type ForgotFormProps = {
  linkExpired: boolean;
};

export const ForgotForm = ({ linkExpired }: ForgotFormProps) => {
  const [state, formAction, isPending] = useActionState(
    requestPasswordReset,
    initialState,
  );

  return (
    <AuthCard>
      {linkExpired && !state.sent && (
        <p
          role="alert"
          className="mb-4 font-mono text-[10px] text-[var(--highlight)]"
        >
          reset link expired or already used, request a new one
        </p>
      )}

      {state.sent ? (
        <p className="font-mono text-xs text-[var(--text-primary)]">
          if that email has an account, a reset link is on its way. open it in
          this browser.
        </p>
      ) : (
        <form action={formAction} className="flex w-full flex-col gap-2.5">
          <input
            type="email"
            name="email"
            placeholder="email"
            autoComplete="email"
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
            send reset link →
          </button>
        </form>
      )}

      <Link
        href="/login"
        className="mt-6 font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--accent)]"
      >
        ← back to sign in
      </Link>
    </AuthCard>
  );
};
