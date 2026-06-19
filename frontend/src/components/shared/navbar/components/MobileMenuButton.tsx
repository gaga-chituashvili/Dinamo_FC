import { Menu, X } from "lucide-react";

interface Props {
  menuOpen: boolean;
  onToggle: () => void;
}

export function MobileMenuButton({ menuOpen, onToggle }: Props) {
  return (
    <button
      className="relative flex h-8 w-8 cursor-pointer items-center justify-center text-[#8b8d9e] transition-colors hover:text-white lg:hidden"
      onClick={onToggle}
      aria-label="Toggle menu"
    >
      <span
        className={`absolute transition-all duration-300 ${menuOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0"}`}
      >
        <X className="h-5 w-5" />
      </span>
      <span
        className={`absolute transition-all duration-300 ${menuOpen ? "-rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
      >
        <Menu className="h-5 w-5" />
      </span>
    </button>
  );
}
