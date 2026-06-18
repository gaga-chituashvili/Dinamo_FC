"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function NewsSearch({ value, onChange }: Props) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b6f8c]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="სიახლეების ძებნა..."
        className="w-full rounded-lg border border-white/6 bg-[#10142a] py-2.5 pl-9 pr-4 text-sm text-white placeholder-[#6b6f8c] outline-none transition-colors focus:border-[#a5b4fc]"
      />
    </div>
  );
}
