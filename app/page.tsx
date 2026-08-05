"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Music,
  LayoutPanelTop,
  Trees,
  Mosque,
  Search,
  Speech,
  Users,
} from "lucide-react";

// --- MATERIAL DESIGN 3 / GOOGLE HEALTH EXPRESSIVE MOTION TIMINGS & EASING ---
// Emphasized Easing (cubic-bezier(0.2, 0.0, 0.0, 1.0))
const emphasizedEasing = [0.2, 0.0, 0.0, 1.0] as const;

// Responsive Spring Physics with slight overshoot for interactive cards
const springConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
  mass: 0.8,
};

// Proportional Durations according to MD3 Motion Guidelines
const DURATION = {
  SMALL: 0.22,  // 200ms - 250ms for small elements & exits
  MEDIUM: 0.35, // 300ms - 400ms for cards & navigation expansions
  FULL: 0.50,   // 500ms for full-screen / hero transitions
};

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const visiMisiSectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();

  // Shared Axis Parallax Transforms
  const videoY = useTransform(scrollY, [0, 1000], [0, 250]);
  const heroTextY = useTransform(scrollY, [0, 600], [0, -180]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.92]);
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  // Background Blobs
  const blobFastUp = useTransform(scrollY, [0, 2000], [0, -400]);
  const blobSlowDown = useTransform(scrollY, [0, 2000], [0, 300]);

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
    { name: "Smanti Band", icon: Music },
    { name: "Debat Bahasa Indonesia", icon: LayoutPanelTop },
    { name: "English Club", icon: Speech },
    { name: "Kalpasaga", icon: Trees },
    { name: "Remanda", icon: Mosque },
    { name: "Badminton", icon: Search },
    { name: "Padus", icon: Users },
    { name: "Lainnya", icon: MoreHorizontal },
  ];

  return (
    <div className="w-full bg-white font-sans text-slate-800 antialiased overflow-hidden">

      {/* HERO SECTION - 500ms Full-screen shared axis morphing */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <motion.div
          style={{ y: videoY, scale: 1.1 }}
          className="absolute inset-0 h-full w-full opacity-90 transform-gpu"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/bgvid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Small UI Component - 220ms Duration */}
        <motion.button
          onClick={toggleMute}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: DURATION.SMALL, ease: emphasizedEasing }}
          className="absolute top-6 right-6 z-30 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus:outline-none"
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
        </motion.button>

        {/* HERO CONTENT: Emphasized transform + opacity morphing */}
        <motion.div
          style={{
            y: heroTextY,
            opacity: heroOpacity,
            scale: heroScale,
          }}
          className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center transform-gpu"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: DURATION.FULL, ease: emphasizedEasing }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            SMAN 3 <span className="text-amber-400">Mataram</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.3 }}
            animate={{ opacity: 0.8, scaleX: 1 }}
            transition={{ duration: DURATION.FULL, delay: 0.1, ease: emphasizedEasing }}
            className="my-4 w-48 sm:w-64"
          >
            <svg viewBox="0 0 260 20" fill="none" className="h-auto w-full">
              <path d="M2 10C50 2 210 18 258 10" stroke="url(#heroYellowGradient)" strokeWidth="3.5" strokeLinecap="round" />
              <defs>
                <linearGradient id="heroYellowGradient" x1="0" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FBBF24" stopOpacity="0.2" />
                  <stop offset="0.5" stopColor="#FBBF24" />
                  <stop offset="1" stopColor="#FBBF24" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.FULL, delay: 0.15, ease: emphasizedEasing }}
            className="text-lg font-light tracking-wide text-gray-200 sm:text-xl md:text-2xl"
          >
            Demi Indonesia yang lebih baik
          </motion.p>
        </motion.div>

        {/* Small Exit/Scroll Action Button - 200ms */}
        <motion.button
          style={{ opacity: heroOpacity }}
          onClick={scrollToVisiMisi}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: DURATION.SMALL, ease: emphasizedEasing }}
          className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 animate-bounce rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md hover:bg-white/20 focus:outline-none"
        >
          <ChevronDown className="h-7 w-7" />
        </motion.button>
      </section>

      {/* VISI & MISI SECTION */}
      <section
        ref={visiMisiSectionRef}
        className="relative bg-slate-50 px-4 py-16 sm:px-6 md:py-24 lg:px-8 overflow-hidden"
      >
        <motion.div
          style={{ y: blobFastUp }}
          className="absolute top-40 left-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-300/20 blur-[100px] transform-gpu"
        />
        <motion.div
          style={{ y: blobSlowDown }}
          className="absolute right-0 top-10 h-[500px] w-[200px] translate-x-1/3 rounded-full bg-blue-300/20 blur-[80px] transform-gpu"
        />

        <div className="relative mx-auto max-w-4xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DURATION.FULL, ease: emphasizedEasing }}
            className="text-center transform-gpu"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              VISI & MISI <span className="text-amber-500">SMAN 3</span> MATARAM
            </h2>
            <div className="mx-auto my-4 w-56 sm:w-72">
              <svg viewBox="0 0 300 24" fill="none" className="h-auto w-full">
                <path d="M5 12C75 2 225 22 295 12" stroke="url(#lightGoldLine)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="150" cy="12" r="4" fill="#F59E0B" />
                <defs>
                  <linearGradient id="lightGoldLine" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F59E0B" stopOpacity="0.1" />
                    <stop offset="0.5" stopColor="#F59E0B" />
                    <stop offset="1" stopColor="#F59E0B" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="mt-8">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 sm:text-sm">
                Visi Sekolah
              </span>
              <p className="mt-3 text-base font-medium italic text-slate-800 sm:text-lg md:text-xl">
                <span className="inline-block rounded-2xl border border-amber-200/60 bg-white/80 backdrop-blur-sm px-6 py-4 leading-relaxed shadow-sm">
                  “Meningkatkan Amaliah Imtaq, Iptek, Kebahasaan, Keindonesiaan, Kemanusiaan, dan Kemandirian”
                </span>
              </p>
            </div>
          </motion.div>

          {/* Data Card Expansion - 350ms Duration with Shared Axis (Transform + Opacity) */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.MEDIUM, ease: emphasizedEasing }}
            className="mt-12 rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-6 shadow-xl shadow-slate-200/50 sm:p-10 transform-gpu"
          >
            <h3 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
              Misi Kami
            </h3>

            <ul className="mt-8 space-y-4">
              {missions.map((mission, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: DURATION.MEDIUM, delay: idx * 0.06, ease: emphasizedEasing }}
                  className="flex items-start gap-4 transform-gpu"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-100 text-sm font-bold text-amber-800">
                    {idx + 1}
                  </span>
                  <p className="pt-0.5 text-base leading-relaxed text-slate-700 sm:text-lg">
                    {mission}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* EKSTRAKURIKULER SECTION */}
      <section className="relative border-t border-slate-100 bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8 overflow-hidden">
        <div className="relative mx-auto max-w-6xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.FULL, ease: emphasizedEasing }}
            className="text-center transform-gpu"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              EKSTRAKURIKULER <span className="text-amber-500">SMAN 3</span> MATARAM
            </h2>
            <div className="mx-auto my-4 w-56 sm:w-72">
              <svg viewBox="0 0 300 24" fill="none" className="h-auto w-full">
                <path d="M5 12C75 2 225 22 295 12" stroke="url(#ekstraGoldLine)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="150" cy="12" r="4" fill="#F59E0B" />
                <defs>
                  <linearGradient id="ekstraGoldLine" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
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
          </motion.div>

          {/* Cards Grid using Spring Physics and Shared Axis Morphing */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
            {extracurriculars.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: DURATION.MEDIUM,
                    delay: (index % 6) * 0.05,
                    ease: emphasizedEasing,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -6,
                    transition: springConfig, // Spring overshoot for interactive feedback
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-sm p-5 text-center shadow-sm hover:border-amber-300 hover:bg-amber-50/40 hover:shadow-xl transform-gpu cursor-pointer"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200/80 bg-amber-100/60 text-amber-700 transition-colors duration-200 group-hover:bg-amber-500 group-hover:text-white">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-800 transition-colors duration-200 group-hover:text-amber-800 sm:text-base">
                    {item.name}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
