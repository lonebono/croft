// components/parcels/coffee/TickRow.tsx
"use client";

type TickRowProps = {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  max?: number;
};

export const TickRow = ({ label, value, onChange, max = 5 }: TickRowProps) => {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-[var(--text-muted)]">{label}</span>
      <div className="flex gap-1">
        {Array.from({ length: max }, (_, i) => i + 1).map((tick) => (
          <button
            key={tick}
            type="button"
            onClick={() => onChange(tick === value ? null : tick)}
            aria-label={`${label}: ${tick} of ${max}`}
            aria-pressed={tick <= (value ?? 0)}
            className={`h-4 w-4 border border-[var(--divider)] transition-colors ${
              tick <= (value ?? 0) ? "bg-[var(--accent)]" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
