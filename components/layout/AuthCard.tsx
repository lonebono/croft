// components/layout/AuthCard.tsx
type AuthCardProps = {
  children: React.ReactNode;
};

// Centered wordmark + narrow column shared by login, forgot and reset pages
export const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)]">
      <div className="flex w-[15.4rem] flex-col items-start">
        <p className="wordmark text-2xl font-bold text-[var(--text-primary)]">
          Croft
        </p>
        <p className="mb-8 font-mono text-[10px] text-[var(--text-muted)]">
          14.6°N 121.0°E
        </p>
        {children}
      </div>
    </div>
  );
};
