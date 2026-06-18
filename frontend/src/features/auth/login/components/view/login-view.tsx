import { LoginForm } from "../LoginForm";

export function LoginView() {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#0a0a0a]">
      {/* Left — image */}
      <div className="relative hidden md:block">
        <div
          className="absolute inset-0 bg-cover bg-top"
          style={{ backgroundImage: "url('/player1.jpg')" }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#0a0a0a]" />
        <div className="absolute bottom-16 left-10 right-10">
          <p className="mb-3 text-xs font-bold tracking-widest text-[#000000]">
            OFFICIAL MEMBER PORTAL
          </p>
          <h2 className="text-4xl font-black italic leading-tight text-white xl:text-5xl">
            UNLEASH THE POWER
            <br />
            WITHIN
          </h2>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center px-4 py-20 sm:px-8 md:px-12 lg:px-16">
        <div className="w-full max-w-md">
          <h1 className="mb-3 text-3xl font-black italic text-white sm:text-4xl">
            ავტორიზაცია
          </h1>
          <p className="mb-10 text-sm leading-relaxed text-gray-400">
            კეთილი იყოს თქვენი მობრძანება დინამო თბილისის ოფიციალურ
            პლატფორმაზე.
          </p>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
