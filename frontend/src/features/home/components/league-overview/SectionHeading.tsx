interface SectionHeadingProps {
  label: string;
  title: string;
}

export function SectionHeading({ label, title }: SectionHeadingProps) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#a5b4fc]">
        {label}
      </p>
      <h2 className="text-2xl font-black italic text-white md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
