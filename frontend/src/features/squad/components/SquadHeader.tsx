interface SquadHeaderProps {
  total: number;
}

export function SquadHeader({ total }: SquadHeaderProps) {
  return (
    <div className="border-b border-white/6 pb-8">
      <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#a5b4fc]">
        დინამო თბილისი
      </p>
      <h1 className="font-black text-4xl uppercase leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
        შემადგენლობა
      </h1>
      <div className="mt-4 mb-5 h-px w-12 bg-[#a5b4fc]" />
      <p className="max-w-xl text-sm leading-relaxed text-[#8b8d9e]">
        დინამო თბილისის ოფიციალური შემადგენლობა. {total} მოთამაშე, ერთი მიზანი
        — გამარჯვება.
      </p>
    </div>
  );
}
