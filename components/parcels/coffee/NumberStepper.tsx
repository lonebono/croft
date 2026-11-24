// components/parcels/coffee/NumberStepper.tsx
"use client";

import { ChevronUp, ChevronDown } from "lucide-react";

type NumberStepperProps = {
  value: string;
  onChange: (value: string) => void;
  step?: number;
  placeholder?: string;
};

export const NumberStepper = ({
  value,
  onChange,
  step = 1,
  placeholder,
}: NumberStepperProps) => {
  const adjust = (delta: number) => {
    const current = Number(value) || 0;
    const next = Math.max(0, current + delta);
    onChange(String(next));
  };

  return (
    <div className="flex items-center gap-1 border-b border-[var(--divider)]">
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border-0 bg-transparent py-1 text-sm text-[var(--text-base)] outline-none"
      />
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => adjust(step)}
          aria-label="Increment"
          className="text-[var(--text-muted)] hover:text-[var(--accent)]"
        >
          <ChevronUp size={12} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => adjust(-step)}
          aria-label="Decrement"
          className="text-[var(--text-muted)] hover:text-[var(--accent)]"
        >
          <ChevronDown size={12} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};
