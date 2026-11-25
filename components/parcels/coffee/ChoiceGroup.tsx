// components/parcels/coffee/ChoiceGroup.tsx
"use client";

type ChoiceGroupProps<T extends string> = {
  options: T[];
  value: T;
  onChange: (value: T) => void;
};

export const ChoiceGroup = <T extends string>({
  options,
  value,
  onChange,
}: ChoiceGroupProps<T>) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={option === value}
          className={`border px-2 py-1 text-xs ${
            option === value
              ? "border-[var(--accent)] text-[var(--accent)]"
              : "border-[var(--divider)] text-[var(--text-muted)]"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
