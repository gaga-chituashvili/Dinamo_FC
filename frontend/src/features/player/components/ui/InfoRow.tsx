interface InfoRowProps {
  label: string;
  value: string;
}

export function InfoRow({ label, value }: InfoRowProps) {
  const isEmpty = !value || value === "—" || value === "0";

  return (
    <div className="flex justify-between items-center py-3.5 border-b border-white/5">
      <span className="text-[12px] font-medium tracking-wide text-gray-500 uppercase font-mono">
        {label}
      </span>
      <span
        className={`text-sm font-semibold ${isEmpty ? "text-gray-700" : "text-gray-200"}`}
      >
        {isEmpty ? "—" : value}
      </span>
    </div>
  );
}
