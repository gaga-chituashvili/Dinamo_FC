export function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-white uppercase">
      <span className="h-3.5 w-0.5 bg-[#a5b4fc]" />
      {children}
    </h3>
  );
}
