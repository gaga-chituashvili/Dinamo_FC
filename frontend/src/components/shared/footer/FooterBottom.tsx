import { Wrapper } from "../wrapper";
import { Copyright } from "lucide-react";

export function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative border-t border-white/6">
      <Wrapper className="flex flex-col items-center gap-4 py-5 text-center lg:flex-row lg:justify-between lg:text-left">
        <small className="flex items-center gap-1.5 text-xs tracking-widest text-[#4a4f6e] uppercase">
          <Copyright className="h-3 w-3 shrink-0" />
          <span>
            <time dateTime={String(currentYear)}>{currentYear}</time> Dinamo
            Tbilisi FC. Built for Excellence.
          </span>
        </small>
        <div className="flex items-center gap-6">
          <span className="text-xs tracking-widest text-[#4a4f6e] uppercase">
            Tbilisi, Georgia
          </span>
          <span className="h-px w-8 bg-white/6" />
          <span className="text-xs font-bold tracking-widest text-[#a5b4fc] uppercase">
            Est. <time dateTime="1925">1925</time>
          </span>
          <span className="h-px w-8 bg-white/6" />
          <span className="text-xs tracking-widest text-[#4a4f6e] uppercase">
            Built by{" "}
            <a
              href="https://github.com/gaga-chituashvili"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a5b4fc] transition-colors hover:text-white"
            >
              Gaga Chituashvili
            </a>
          </span>
        </div>
      </Wrapper>
    </div>
  );
}
