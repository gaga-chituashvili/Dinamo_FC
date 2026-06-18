import { getInitials } from "./standings.utils";

interface TeamBadgeProps {
  name: string;
  logo: string | null;
  isSelected: boolean;
}

export function TeamBadge({ name, logo, isSelected }: TeamBadgeProps) {
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-black"
      style={
        logo
          ? { backgroundColor: "#ffffff" }
          : {
              backgroundColor: isSelected ? "#a5b4fc" : "#1a1f3a",
              color: isSelected ? "#0a0e1f" : "#8b8d9e",
            }
      }
    >
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={name} className="h-7 w-7 object-contain" />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}
