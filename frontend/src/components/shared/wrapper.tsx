interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function Wrapper({ children, className = "" }: WrapperProps) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
