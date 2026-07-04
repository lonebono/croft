// components/layout/DashboardGrid.tsx
export const DashboardGrid = ({
  finance,
  calendar,
  wardrobe,
  coffee,
}: {
  finance: React.ReactNode;
  calendar: React.ReactNode;
  wardrobe: React.ReactNode;
  coffee: React.ReactNode;
}) => {
  return (
    <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-px bg-[var(--divider)]">
      <div className="bg-[var(--bg-base)] p-4">{finance}</div>
      <div className="row-span-2 bg-[var(--bg-base)] p-4">{calendar}</div>
      <div className="grid grid-cols-2 gap-px bg-[var(--divider)]">
        <div className="bg-[var(--bg-base)] p-4">{wardrobe}</div>
        <div className="bg-[var(--bg-base)] p-4">{coffee}</div>
      </div>
    </div>
  );
};
