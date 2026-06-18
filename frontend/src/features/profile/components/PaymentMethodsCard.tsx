import { CreditCard, Plus } from "lucide-react";
import type { FanProfile } from "../types/types";

interface PaymentMethodsCardProps {
  profile: FanProfile;
}

const BRAND_COLORS: Record<string, string> = {
  visa: "text-blue-400",
  mastercard: "text-orange-400",
  amex: "text-[#a5b4fc]",
};

function getBrandColor(brand: string) {
  return BRAND_COLORS[brand.toLowerCase()] ?? "text-[#6b6f8c]";
}

export function PaymentMethodsCard({ profile }: PaymentMethodsCardProps) {
  const methods = profile.paymentMethods;

  return (
    <div className="rounded-2xl border border-white/6 bg-[#10142a] p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-5 w-0.5 rounded-full bg-[#a5b4fc]" />
        <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#6b6f8c]">გადახდის მეთოდები</h2>
      </div>

      <div className="flex flex-col gap-3">
        {methods.length === 0 ? (
          <p className="py-2 text-center text-sm text-[#4a4f6e]">გადახდის მეთოდი არ არის დამატებული</p>
        ) : (
          methods.map((m) => (
            <div key={m.id} className="flex items-center justify-between rounded-xl border border-white/4 bg-[#0a0e1f] px-4 py-3">
              <div className="flex items-center gap-3">
                <CreditCard className={`h-5 w-5 ${getBrandColor(m.brand)}`} />
                <div>
                  <p className="text-sm font-bold tracking-widest text-white">•••• •••• •••• {m.last4}</p>
                  <p className="text-[11px] text-[#6b6f8c]">ვადა {m.expiry}</p>
                </div>
              </div>
              {m.isPrimary && (
                <span className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-400">მთავარი</span>
              )}
            </div>
          ))
        )}
        <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/6 py-3 text-sm text-[#6b6f8c] transition-all hover:border-[#a5b4fc]/30 hover:text-[#a5b4fc]">
          <Plus className="h-4 w-4" />ბარათის დამატება
        </button>
      </div>
    </div>
  );
}
