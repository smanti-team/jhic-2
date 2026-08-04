"use client";

import { useState, useRef } from "react";
import {
  Volume2,
  VolumeX,
  ChevronDown,
  Laptop,
  Globe,
  Languages,
  Trophy,
  Target,
  Volleyball,
  Microscope,
  Briefcase,
  Flag,
  Compass,
  MoreHorizontal,
} from "lucide-react";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const visiMisiSectionRef = useRef<HTMLDivElement | null>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToVisiMisi = () => {
    visiMisiSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const missions = [
    "Meningkatkan sumber daya manusia yang beriman dan bertakwa terhadap Allah SWT",
    "Meningkatkan kemampuan dalam ilmu pengetahuan, teknologi, dan keterampilan",
    "Meningkatkan kemampuan berbahasa Indonesia yang baik dan benar serta kemampuan berbahasa asing",
    "Memperkokoh ikatan silaturrahmi sehingga budaya toleransi dan perdamaian sebagai warga bangsa dan umat manusia",
    "Menanam, memupuk, dan memelihara sikap kemandirian",
  ];

  // Easily modify title or icon here, ah!
  const extracurriculars = [
    { name: "IT Club", icon: Laptop },
    { name: "Deutsch Club", icon: Globe },
    { name: "Japanese Club", icon: Languages },
    { name: "Futsal", icon: Trophy },
    { name: "Basket", icon: Target },
    { name: "Voley", icon: Volleyball },
    { name: "Karya Ilmiah Remaja", icon: Microscope },
    { name: "Kewirausahaan", icon: Briefcase },
    { name: "Paskibra", icon: Flag },
    { name: "Pramuka", icon: Compass },
    { name: "Lainnya", icon: MoreHorizontal },
  ];

  return (
    <div className="w-full bg-white font-sans text-slate-800 antialiased">
      {/* HERO SECTION - FULL SCREEN 100vh */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        >
          <source src="/bgvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Sound Toggle Button (Top Right) */}
        <button
          onClick={toggleMute}
          className="absolute top-6 right-6 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <>
              <VolumeX className="h-5 w-5" />
              <span className="text-sm font-medium">Unmute</span>
            </>
          ) : (
            <>
              <Volume2 className="h-5 w-5" />
              <span className="text-sm font-medium">Mute</span>
            </>
          )}
        </button>

        {/* Main Hero Content (Center) */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
            SMAN 3 <span className="text-amber-400">Mataram</span>
          </h1>

          {/* Slick Minimal Curved Line Accent */}
          <div className="my-4 w-48 opacity-80 sm:w-64">
            <svg
              viewBox="0 0 260 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-auto w-full"
            >
              <path
                d="M2 10C50 2 210 18 258 10"
                stroke="url(#heroYellowGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="heroYellowGradient"
                  x1="0"
                  y1="0"
                  x2="260"
                  y2="0"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FBBF24" stopOpacity="0.2" />
                  <stop offset="0.5" stopColor="#FBBF24" />
                  <stop offset="1" stopColor="#FBBF24" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p className="text-lg font-light tracking-wide text-gray-200 sm:text-xl md:text-2xl">
            Demi Indonesia yang lebih baik
          </p>
        </div>

        {/* Scroll Down Arrow Button */}
        <button
          onClick={scrollToVisiMisi}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none"
          aria-label="Scroll to Visi Misi section"
        >
          <ChevronDown className="h-7 w-7" />
        </button>
      </section>

      {/* VISI & MISI SECTION */}
      <section
        ref={visiMisiSectionRef}
        className="relative bg-slate-50 px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-4xl">
          {/* Main Title & Line */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              VISI & MISI <span className="text-amber-500">SMAN 3</span> MATARAM
            </h2>

            {/* Slick Feature Line Accent */}
            <div className="mx-auto my-4 w-56 sm:w-72">
              <svg
                viewBox="0 0 300 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-auto w-full"
              >
                <path
                  d="M5 12C75 2 225 22 295 12"
                  stroke="url(#lightGoldLine)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="150" cy="12" r="4" fill="#F59E0B" />
                <defs>
                  <linearGradient
                    id="lightGoldLine"
                    x1="0"
                    y1="0"
                    x2="300"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F59E0B" stopOpacity="0.1" />
                    <stop offset="0.5" stopColor="#F59E0B" />
                    <stop offset="1" stopColor="#F59E0B" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Visi Statement */}
            <div className="mt-8">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 sm:text-sm">
                Visi Sekolah
              </span>
              <p className="mt-3 text-base font-medium italic text-slate-800 sm:text-lg md:text-xl">
                <span className="inline-block rounded-2xl border border-amber-200/60 bg-amber-50 px-6 py-4 leading-relaxed shadow-sm">
                  “Meningkatkan Amaliah Imtaq, Iptek, Kebahasaan, Keindonesiaan, Kemanusiaan, dan Kemandirian”
                </span>
              </p>
            </div>
          </div>

          {/* Misi Card */}
          <div className="mt-12 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10">
            <h3 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
              Misi Kami
            </h3>

            <ul className="mt-8 space-y-4">
              {missions.map((mission, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-100 text-sm font-bold text-amber-800">
                    {idx + 1}
                  </span>
                  <p className="pt-0.5 text-base leading-relaxed text-slate-700 sm:text-lg">
                    {mission}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* EKSTRAKULIKULER SECTION */}
      <section className="relative border-t border-slate-100 bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header Title & Divider Line */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              EKSTRAKURIKULER <span className="text-amber-500">SMAN 3</span> MATARAM
            </h2>

            {/* Slick Line Accent */}
            <div className="mx-auto my-4 w-56 sm:w-72">
              <svg
                viewBox="0 0 300 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-auto w-full"
              >
                <path
                  d="M5 12C75 2 225 22 295 12"
                  stroke="url(#ekstraGoldLine)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="150" cy="12" r="4" fill="#F59E0B" />
                <defs>
                  <linearGradient
                    id="ekstraGoldLine"
                    x1="0"
                    y1="0"
                    x2="300"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F59E0B" stopOpacity="0.1" />
                    <stop offset="0.5" stopColor="#F59E0B" />
                    <stop offset="1" stopColor="#F59E0B" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">
              Wadah pengembangan bakat dan minat siswa SMAN 3 Mataram
            </p>
          </div>

          {/* Extracurricular Cards Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
            {extracurriculars.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/80 p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:bg-amber-50/40 hover:shadow-md"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200/80 bg-amber-100/60 text-amber-700 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-800 transition-colors group-hover:text-amber-800 sm:text-base">
                    {item.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}