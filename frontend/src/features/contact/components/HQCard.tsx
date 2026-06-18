import { MapPin, Phone, Mail, Globe, Video, Users } from "lucide-react";
import Image from "next/image";
import stadiumImg from "@/public/stadium.jpg";

const contacts = [
  {
    icon: MapPin,
    label: "მისამართი",
    value: "ბორის პაიჭაძის სახელობის დინამოს არენა, თბილისი, საქართველო",
  },
  { icon: Phone, label: "ტელეფონი", value: "+995 32 251 88 77" },
  { icon: Mail, label: "ელ-ფოსტა", value: "Info@fcdinamo.ge" },
];

const departments = [
  { label: "საერთაშორისო დეპარტამენტი", value: "Office@fcdinamo.ge" },
  { label: "მარკეტინგი", value: "marketing@fcdinamo.ge" },
  { label: "მედია ცენტრი", value: "media@fcdinamo.ge" },
];

const socials = [
  { icon: Globe, href: "https://fcdinamo.ge", label: "Website" },
  {
    icon: Video,
    href: "https://www.youtube.com/user/FCDinamoTV",
    label: "YouTube",
  },
  {
    icon: Users,
    href: "https://www.facebook.com/DINAMOTB",
    label: "Facebook",
  },
  {
    icon: null,
    href: "https://www.instagram.com/fcdinamotbilisi/",
    label: "Instagram",
  },
  {
    icon: null,
    href: "https://x.com/fcdinamotbilisi",
    label: "X",
  },
];

export function HQCard() {
  return (
    <div className="flex flex-col gap-4">
      {/* Contact info */}
      <div className="rounded-2xl border border-white/6 bg-[#10142a] p-6">
        <h3 className="mb-5 text-xs font-bold tracking-[0.2em] text-[#a5b4fc]">
          საკონტაქტო ინფორმაცია
        </h3>
        <div className="space-y-4">
          {contacts.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/6 bg-[#161b3a]">
                <Icon className="h-3.5 w-3.5 text-[#a5b4fc]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b6f8c]">
                  {label}
                </p>
                <p className="text-sm text-white">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Departments */}
      <div className="rounded-2xl border border-white/6 bg-[#10142a] p-6">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#6b6f8c]">
          დეპარტამენტები
        </h3>
        <div className="space-y-3">
          {departments.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-[#8b8d9e]">{label}</span>
              <a
                href={`mailto:${value}`}
                className="text-sm font-bold text-[#a5b4fc] transition-colors hover:text-white"
              >
                {value}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Socials */}
      <div className="rounded-2xl border border-[#a5b4fc]/20 bg-[#a5b4fc]/10 p-6">
        <h3 className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#a5b4fc]/60">
          გამოგვყევით
        </h3>
        <p className="mb-4 text-sm font-bold text-white">
          შემოგვიერთდით სოციალურ ქსელებში
        </p>
        <div className="flex gap-2">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/6 bg-[#10142a] text-[#8b8d9e] transition-colors hover:border-[#a5b4fc] hover:text-[#a5b4fc]"
            >
              {Icon ? (
                <Icon className="h-4 w-4" />
              ) : label === "Instagram" ? (
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2H21l-6.02 6.88L22 22h-5.49l-4.3-7.95L5.25 22H2.5l6.44-7.36L2 2h5.63l3.89 7.23L18.244 2zm-.96 18h1.52L6.8 3.9H5.17L17.284 20z" />
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Stadium image */}
      <div className="relative overflow-hidden rounded-xl border border-white/6">
        <Image
          src={stadiumImg}
          alt="ბორის პაიჭაძის დინამოს არენა"
          width={600}
          height={280}
          className="h-48 w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0e1f]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-[#a5b4fc]" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              ბორის პაიჭაძის დინამოს არენა
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
