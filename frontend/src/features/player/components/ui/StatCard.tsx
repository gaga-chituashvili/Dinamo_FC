interface StatCardProps {
  label: string;
  value: string | number;
  accent?: boolean;
  icon?: React.ReactNode;
}

export function StatCard({
  label,
  value,
  accent = false,
  icon,
}: StatCardProps) {
  return (
    <div
      className={`flex flex-col gap-1.5 flex-1 min-w-30 rounded-xl px-6 py-5 border ${
        accent
          ? "bg-emerald-500/8 border-emerald-500/30"
          : "bg-white/3 border-white/7"
      }`}
    >
      <span className="text-[11px] font-semibold tracking-widest text-gray-500 uppercase font-mono">
        {label}
      </span>
      <span
        className={`text-4xl font-extrabold leading-none ${
          accent ? "text-emerald-400" : "text-gray-50"
        }`}
      >
        {value}
      </span>
      {icon && <div className="mt-2">{icon}</div>}
    </div>
  );
}
