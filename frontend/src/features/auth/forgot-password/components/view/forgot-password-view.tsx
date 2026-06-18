import Image from "next/image";
import { Wrapper } from "@/src/components/shared/wrapper";
import { ForgotPasswordForm } from "../ForgotPasswordForm";
import stadiumImg from "@/public/stadium.jpg";

export function ForgotPasswordView() {
  return (
    <div className="relative min-h-screen bg-[#0a0e1f] flex flex-col items-center justify-start py-12 px-4">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(165,180,252,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <Wrapper>
        <div className="max-w-md mx-auto flex flex-col gap-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#a5b4fc]/30 bg-[#a5b4fc]/10">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a5b4fc"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 9.9-1" />
              </svg>
            </div>
          </div>

          {/* Card */}
          <div className="flex flex-col gap-6 rounded-2xl border border-white/6 bg-[#10142a] p-8">
            <div className="text-center">
              <h1 className="mb-2 text-2xl font-black italic uppercase tracking-wide text-white">
                პაროლი დაგავიწყდათ?
              </h1>
              <p className="text-sm leading-relaxed text-[#8b8d9e]">
                შეიყვანეთ თქვენს ანგარიშთან დაკავშირებული ელ-ფოსტა და
                გამოგიგზავნით პაროლის აღდგენის ბმულს.
              </p>
            </div>

            <ForgotPasswordForm />
          </div>

          {/* Stadium image */}
          <div className="relative overflow-hidden rounded-xl border border-white/6">
            <Image
              src={stadiumImg}
              alt="Dinamo Tbilisi Stadium"
              width={600}
              height={240}
              className="h-48 w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0e1f]/80 to-transparent" />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
