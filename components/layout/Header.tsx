// components/layout/Header.tsx
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex flex-col gap-1 border-b border-[var(--divider)] px-6 py-2">
      <Link
        href="/"
        className="wordmark w-fit text-2xl font-bold text-[var(--text-primary)]"
      >
        Croft
      </Link>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs text-[var(--text-muted)]">
          14.6°N 121.0°E
        </span>
        <span className="font-mono text-xs text-[var(--status-surveyed)]">
          surveyed Jul 4, 09:12
        </span>
      </div>
    </header>
  );
};
