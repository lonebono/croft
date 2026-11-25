// components/layout/Header.tsx
import Link from "next/link";
import { signOut } from "@/lib/auth/actions";

export const Header = () => {
  return (
    <header className="flex flex-col gap-0.25 border-b border-[var(--divider)] px-6 py-4">
      <Link
        href="/"
        className="wordmark leading-none w-fit text-2xl font-bold text-[var(--text-primary)]"
      >
        Croft
      </Link>
      <div className="flex items-baseline justify-between">
        <span className="leading-none font-mono text-xs text-[var(--text-muted)]">
          14.6°N 121.0°E
        </span>
        <div className="flex items-baseline gap-0.5">
          <span className="font-mono text-xs text-[var(--status-surveyed)]">
            surveyed Jul 4, 09:12 |
          </span>
          <form action={signOut}>
            <button
              type="submit"
              className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)]"
            >
              sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
