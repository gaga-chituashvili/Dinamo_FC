import { RegisterForm } from "../RegisterForm";

export default function RegisterView() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#0a0a0a]">
      {/* Left — player image */}
      <div className="relative hidden md:flex items-end p-12">
        <div
          className="absolute inset-0 bg-cover bg-top"
          style={{ backgroundImage: "url('/player3.jpg')" }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#0a0a0a]" />
        <div className="relative z-10">
          <p
            className="text-xs font-bold tracking-widest mb-3"
            style={{ color: "#black" }}
          >
            ELITE PERFORMANCE
          </p>
          <h2
            className="text-5xl font-black italic text-white leading-tight"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            შექმნილია
            <br />
            გამარჯვებისთვის
          </h2>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center px-4 py-12 sm:px-8 md:px-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
            style={{ backgroundColor: "#1a1a2e" }}
          >
            <span
              className="text-white font-black italic text-lg"
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              D
            </span>
          </div>

          <h1
            className="text-3xl font-black italic text-white mb-2"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            შემოუერთდი კლუბს
          </h1>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">
            გახდი დინამო თბილისის ოჯახის წევრი და მიიღე ექსკლუზიური წვდომა.
          </p>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
