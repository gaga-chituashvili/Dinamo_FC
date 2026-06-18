import { Wrapper } from "@/src/components/shared/wrapper";
import { ContactForm } from "./ContactForm";
import { HQCard } from "./HQCard";
import { StadiumMap } from "./StadiumMap";

export function ContactView() {
  return (
    <div className="min-h-screen bg-[#0a0e1f]">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(165,180,252,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Page header */}
      <div className="border-b border-white/6">
        <Wrapper className="py-12">
          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#a5b4fc]">
            კონტაქტი
          </p>
          <h1 className="text-3xl font-black italic text-white md:text-5xl">
            დაგვიკავშირდით
          </h1>
          <div className="mt-3 h-px w-12 bg-[#a5b4fc]" />
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#8b8d9e]">
            დინამო თბილისი ყოველთვის თქვენთან სასაუბროდ. ჩვენი მხარდაჭერის
            გუნდი, პრეს-სამსახური და მარკეტინგის დეპარტამენტი მზად არის
            დაგეხმაროთ ნებისმიერ საკითხში.
          </p>
        </Wrapper>
      </div>

      {/* Form + HQ */}
      <Wrapper className="py-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          <div className="rounded-2xl border border-white/6 bg-[#10142a] p-6 md:p-8">
            <h2 className="mb-6 text-lg font-black italic text-white">
              მოგვწერეთ
            </h2>
            <ContactForm />
          </div>
          <HQCard />
        </div>
      </Wrapper>

      <StadiumMap />
    </div>
  );
}
