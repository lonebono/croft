import { DashboardGrid } from "@/components/layout/DashboardGrid";

export const HomePage = () => {
  return (
    <DashboardGrid
      finance={<div className="text-[var(--text-muted)]">Finance</div>}
      calendar={<div className="text-[var(--text-muted)]">Calendar</div>}
      wardrobe={<div className="text-[var(--text-muted)]">Wardrobe</div>}
      coffee={<div className="text-[var(--text-muted)]">Coffee</div>}
    />
  );
};

export default HomePage;
