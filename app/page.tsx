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
  Megaphone,
  Trees,
  Mosque,
  Search,
  Speech,
  Users,
} from "lucide-react";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const visiMisiSectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();

  // --- ELEGANT PARALLAX & 3D FOLD TRANSFORMS ---
  const videoY = useTransform(scrollY, [0, 1000], [0, 300]);

  // Hero text will fold backward in 3D space as it scrolls up
  const heroTextY = useTransform(scrollY, [0, 800], [0, -250]);
  const heroRotateX = useTransform(scrollY, [0, 800], [0, 45]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 0.85]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Floating Background Blobs that twist continuously
  const blobFastUp = useTransform(scrollY, [0, 2000], [0, -800]);
  const blobSlowDown = useTransform(scrollY, [0, 2000], [0, 500]);
  const blobTwist = useTransform(scrollY, [0, 2000], [0, 240]);

  // Smooth cinematic easing curve
  const elegantEase = [0.22, 1, 0.36, 1] as const;

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

      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <motion.div
          style={{ y: videoY, scale: 1.15 }}
          className="absolute inset-0 h-full w-full opacity-90"
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

        <button
          onClick={toggleMute}
          className="absolute top-6 right-6 z-30 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none"
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

        {/* HERO CONTENT: Folds away elegantly on scroll */}
        <motion.div
          style={{
            y: heroTextY,
            opacity: heroOpacity,
            rotateX: heroRotateX,
            scale: heroScale,
            transformPerspective: 1200 // Gives realistic 3D depth to the fold
          }}
          className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center transform-gpu"
        >
          <motion.h1
            initial={{ opacity: 0, y: 80, rotateX: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, ease: elegantEase }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            SMAN 3 <span className="text-amber-400">Mataram</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateZ: -10 }}
            animate={{ opacity: 0.8, scale: 1, rotateZ: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: elegantEase }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: elegantEase }}
            className="text-lg font-light tracking-wide text-gray-200 sm:text-xl md:text-2xl"
          >
            Demi Indonesia yang lebih baik
          </motion.p>
        </motion.div>

        <motion.button
          style={{ opacity: heroOpacity }}
          onClick={scrollToVisiMisi}
          className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 animate-bounce rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none"
        >
          <ChevronDown className="h-7 w-7" />
        </motion.button>
      </section>

      {/* VISI & MISI SECTION */}
      <section
        ref={visiMisiSectionRef}
        className="relative bg-slate-50 px-4 py-16 sm:px-6 md:py-24 lg:px-8 overflow-hidden"
      >
        {/* Twisting Parallax Blobs */}
        <motion.div
          style={{ y: blobFastUp, rotate: blobTwist }}
          className="absolute top-40 left-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-300/20 blur-[100px] origin-center"
        />
        <motion.div
          style={{ y: blobSlowDown, rotate: blobTwist }}
          className="absolute right-0 top-10 h-[500px] w-[200px] translate-x-1/3 rounded-full bg-blue-300/20 blur-[80px] origin-center"
        />

        <div className="relative mx-auto max-w-4xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 80, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: elegantEase }}
            style={{ transformPerspective: 1000 }}
            className="text-center"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              VISI & MISI <span className="text-amber-500">SMAN 3</span> MATARAM
            </h2>
            <div className="mx-auto my-4 w-56 sm:w-72">
              {/* Line accent kept plain for readability */}
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

          <motion.div
            initial={{ opacity: 0, y: 150, rotateX: -15, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: elegantEase }}
            style={{ transformPerspective: 1200 }}
            className="mt-12 rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-6 shadow-xl shadow-slate-200/50 sm:p-10 transform-gpu"
          >
            <h3 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
              Misi Kami
            </h3>

            <ul className="mt-8 space-y-4">
              {missions.map((mission, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -60, rotateY: -35 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + (idx * 0.15), ease: elegantEase }}
                  style={{ transformPerspective: 800 }}
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

      {/* EKSTRAKULIKULER SECTION */}
      <section className="relative border-t border-slate-100 bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8 overflow-hidden">

        {/* Large Decorative shape spinning slowly in the corner */}
        <motion.div
          style={{ y: blobFastUp, rotate: blobTwist }}
          className="absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-[35%] border-[60px] border-amber-50/60 z-0"
        />

        <div className="relative mx-auto max-w-6xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 80, rotateZ: 2 }}
            whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: elegantEase }}
            className="text-center"
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

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
            {extracurriculars.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <motion.div
                  key={index}
                  // Elegant twist and flip upon entry
                  initial={{
                    opacity: 0,
                    y: 100,
                    x: -20,
                    rotateZ: -5,
                    rotateY: 45, // Flips from the side
                    scale: 0.8
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    x: 0,
                    rotateZ: 0,
                    rotateY: 0,
                    scale: 1
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 1,
                    delay: (index % 6) * 0.1,
                    ease: elegantEase
                  }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  style={{ transformPerspective: 1000 }}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-sm p-5 text-center shadow-sm transition-colors duration-300 hover:border-amber-300 hover:bg-amber-50/40 hover:shadow-xl transform-gpu"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200/80 bg-amber-100/60 text-amber-700 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-800 transition-colors group-hover:text-amber-800 sm:text-base">
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
