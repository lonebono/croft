// components/ui/PasswordInput.tsx
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = {
  name: string;
  placeholder: string;
  autoComplete: "current-password" | "new-password";
  minLength?: number;
};

export const PasswordInput = ({
  name,
  placeholder,
  autoComplete,
  minLength,
}: PasswordInputProps) => {
  const [revealed, setRevealed] = useState(false);
  const Icon = revealed ? EyeOff : Eye;

  return (
    <div className="flex items-center border-b border-[var(--divider)] focus-within:border-[var(--accent)]">
      <input
        type={revealed ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        required
        className="min-w-0 flex-1 bg-transparent px-0.5 py-1.5 font-mono text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
      />
      <button
        type="button"
        onClick={() => setRevealed((r) => !r)}
        aria-label={revealed ? "hide password" : "show password"}
        aria-pressed={revealed}
        className="px-1 text-[var(--text-muted)] hover:text-[var(--accent)]"
      >
        <Icon size={12} strokeWidth={1.5} />
      </button>
    </div>
  );
};
