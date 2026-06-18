interface SectionHeaderProps {
  children: React.ReactNode;
}

export function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-0.5 h-5 bg-emerald-500 rounded-full" />
      <h2 className="text-[13px] font-bold tracking-[0.12em] text-gray-400 uppercase font-mono m-0">
        {children}
      </h2>
    </div>
  );
}
