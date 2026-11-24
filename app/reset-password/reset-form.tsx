// app/reset-password/reset-form.tsx
"use client";

import { useActionState } from "react";
import { AuthCard } from "@/components/layout/AuthCard";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { updatePassword, type UpdatePasswordState } from "@/lib/auth/actions";

const initialState: UpdatePasswordState = { error: null };

export const ResetForm = () => {
  const [state, formAction, isPending] = useActionState(
    updatePassword,
    initialState,
  );

  return (
    <AuthCard>
      <form action={formAction} className="flex w-full flex-col gap-2.5">
        <PasswordInput
          name="password"
          placeholder="new password"
          autoComplete="new-password"
          minLength={8}
        />
        <PasswordInput
          name="confirm"
          placeholder="confirm new password"
          autoComplete="new-password"
          minLength={8}
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
          set password →
        </button>
      </form>
    </AuthCard>
  );
};
