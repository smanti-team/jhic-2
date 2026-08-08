"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
const emphasizedEasing = [0.2, 0.0, 0.0, 1.0] as const;

// Responsive Spring Physics with subtle bounce
const springConfig = {
  type: "spring" as const,
  stiffness: 260,
  damping: 18,
  mass: 0.7,
};

// Proportional Durations according to MD3 Motion Guidelines
const DURATION = {
  SMALL: 0.22,
  MEDIUM: 0.35,
  FULL: 0.50,
};

/* ------------------------------------------------------------------ */
/*  SCROLL-LOCKED 40FPS IMAGE-SEQUENCE ANIMATION                       */
/*                                                                      */
/*  Behaviour:                                                          */
/*   1. Section scrolls into view normally like any other section.      */
/*   2. Once frame 0 is FULLY visible (top+bottom inside viewport),     */
/*      the page "sticks" — further downward scroll input is captured   */
/*      instead of moving the page.                                     */
/*   3. The captured scroll intent triggers an autoplay of all 80        */
/*      frames at a fixed 40fps (25ms/frame), independent of how much    */
/*      the user actually scrolled — a single nudge plays it through.    */
/*   4. Once the last frame is reached, the lock releases and normal     */
/*      scrolling continues to the next section.                        */
/* ------------------------------------------------------------------ */
function ScrollImageSequence() {
  const FRAME_COUNT = 80;
  const FPS = 40;
  const FRAME_DURATION = 1000 / FPS; // ~25ms per frame

  const getFramePath = (i: number) =>
    `/Text_morphs_into_woman_portrait_202608080814_${String(i).padStart(
      3,
      "0"
    )}.jpg`;

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const currentFrameRef = useRef(0);
  const isPlayingRef = useRef(false);
  const isCompleteRef = useRef(false);
  const isFullyVisibleRef = useRef(false);
  const touchStartYRef = useRef(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  /* ---------------- preload all 80 frames ---------------- */
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount += 1;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) setIsLoaded(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  /* ---------------- draw a given frame to canvas (cover fit) ---------------- */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const canvasRatio = rect.width / rect.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (imgRatio > canvasRatio) {
      drawHeight = rect.height;
      drawWidth = drawHeight * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = rect.width;
      drawHeight = drawWidth / imgRatio;
      offsetX = 0;
      offsetY = (rect.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  /* ---------------- draw frame 0 once loaded, handle resize ---------------- */
  useEffect(() => {
    if (!isLoaded) return;
    drawFrame(currentFrameRef.current);

    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, drawFrame]);

  /* ---------------- IntersectionObserver: detect "fully appeared" ---------------- */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isFullyVisibleRef.current = entry.intersectionRatio >= 0.99;
      },
      { threshold: [0, 0.99, 1] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ---------------- 40fps rAF playback ---------------- */
  const playSequence = useCallback(() => {
    if (isPlayingRef.current || isCompleteRef.current || !isLoaded) return;
    isPlayingRef.current = true;

    let lastTime: number | null = null;

    const step = (timestamp: number) => {
      if (lastTime === null) lastTime = timestamp;
      const elapsed = timestamp - lastTime;

      if (elapsed >= FRAME_DURATION) {
        lastTime = timestamp;
        const next = Math.min(currentFrameRef.current + 1, FRAME_COUNT - 1);
        currentFrameRef.current = next;
        drawFrame(next);
      }

      if (currentFrameRef.current >= FRAME_COUNT - 1) {
        isPlayingRef.current = false;
        isCompleteRef.current = true;
        return;
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [drawFrame, isLoaded]);

  /* ---------------- scroll capture (wheel + touch) ---------------- */
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isFullyVisibleRef.current || isCompleteRef.current) return;
      if (e.deltaY > 0) {
        e.preventDefault();
        playSequence();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isFullyVisibleRef.current || isCompleteRef.current) return;
      const deltaY = touchStartYRef.current - e.touches[0].clientY;
      if (deltaY > 0) {
        e.preventDefault();
        playSequence();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [playSequence]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-slate-950"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* loading state while the 80 frames preload — removed once ready, nothing else overlays the video */}
      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-slate-950">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400/30 border-t-amber-400" />
          <span className="text-sm font-medium tracking-wide text-amber-200/80">
            {loadProgress}%
          </span>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const visiMisiSectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();

  // --- DYNAMIC 3D SCROLL TRANSFORMS ---
  const videoY = useTransform(scrollY, [0, 1000], [0, 250]);
  const videoRotateX = useTransform(scrollY, [0, 800], [0, 15]); // Video tilts back slightly on scroll

  // Hero Text 3D Fold & Fallback
  const heroTextY = useTransform(scrollY, [0, 600], [0, -180]);
  const heroRotateX = useTransform(scrollY, [0, 600], [0, -35]); // Folds inward into 3D space
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.82]);
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  // Background Parallax Blobs
  const blobFastUp = useTransform(scrollY, [0, 2000], [0, -400]);
  const blobSlowDown = useTransform(scrollY, [0, 2000], [0, 300]);
  const blobTwist = useTransform(scrollY, [0, 2000], [0, 180]); // Rotates along Z axis on scroll

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

      {/* HERO SECTION - 3D Perspective Canvas */}
      <section className="relative h-screen w-full overflow-hidden bg-black [perspective:1200px]">
        <motion.div
          style={{ y: videoY, rotateX: videoRotateX, scale: 1.1 }}
          className="absolute inset-0 h-full w-full opacity-90 transform-gpu origin-top"
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

        {/* Mute Button */}
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

        {/* HERO CONTENT: 3D Perspective Scroll Fold */}
        <motion.div
          style={{
            y: heroTextY,
            rotateX: heroRotateX,
            opacity: heroOpacity,
            scale: heroScale,
          }}
          className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center transform-gpu [transform-style:preserve-3d]"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50, rotateX: -25 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: DURATION.FULL, ease: emphasizedEasing }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            SMAN 3 <span className="text-amber-400">Mataram</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.3, rotateY: 15 }}
            animate={{ opacity: 0.8, scaleX: 1, rotateY: 0 }}
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

        {/* Scroll down button */}
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

      {/* VISI & MISI SECTION - 3D Depth Viewport */}
      <section
        ref={visiMisiSectionRef}
        className="relative bg-slate-50 px-4 py-16 sm:px-6 md:py-24 lg:px-8 overflow-hidden [perspective:1000px]"
      >
        <motion.div
          style={{ y: blobFastUp, rotateZ: blobTwist }}
          className="absolute top-40 left-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-300/20 blur-[100px] transform-gpu origin-center"
        />
        <motion.div
          style={{ y: blobSlowDown, rotateZ: blobTwist }}
          className="absolute right-0 top-10 h-[500px] w-[200px] translate-x-1/3 rounded-full bg-blue-300/20 blur-[80px] transform-gpu origin-center"
        />

        <div className="relative mx-auto max-w-4xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DURATION.FULL, ease: emphasizedEasing }}
            className="text-center transform-gpu [transform-style:preserve-3d]"
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

          {/* Misi Card - 3D Unfold Animation */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: -25, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.MEDIUM, ease: emphasizedEasing }}
            className="mt-12 rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-6 shadow-xl shadow-slate-200/50 sm:p-10 transform-gpu [transform-style:preserve-3d] origin-top"
          >
            <h3 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
              Misi Kami
            </h3>

            <ul className="mt-8 space-y-4 [perspective:800px]">
              {missions.map((mission, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -30, rotateY: -15 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: DURATION.MEDIUM, delay: idx * 0.07, ease: emphasizedEasing }}
                  className="flex items-start gap-4 transform-gpu origin-left"
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

      {/* EKSTRAKURIKULER SECTION - 3D Grid Unfolding */}
      <section className="relative border-t border-slate-100 bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8 overflow-hidden [perspective:1200px]">
        <div className="relative mx-auto max-w-6xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.FULL, ease: emphasizedEasing }}
            className="text-center transform-gpu [transform-style:preserve-3d]"
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

          {/* Cards 3D Flip & Pop Grid */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6 [transform-style:preserve-3d]">
            {extracurriculars.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 50,
                    rotateX: -30,
                    rotateY: 20,
                    scale: 0.85,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                  }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: DURATION.MEDIUM,
                    delay: (index % 6) * 0.05,
                    ease: emphasizedEasing,
                  }}
                  whileHover={{
                    scale: 1.08,
                    rotateX: 10,
                    rotateY: -5,
                    z: 30, // Lifts the card forward in 3D space
                    transition: springConfig,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-sm p-5 text-center shadow-sm hover:border-amber-300 hover:bg-amber-50/40 hover:shadow-xl transform-gpu cursor-pointer [transform-style:preserve-3d]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200/80 bg-amber-100/60 text-amber-700 transition-colors duration-200 group-hover:bg-amber-500 group-hover:text-white transform-gpu [transform-style:preserve-3d]">
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

      {/* SCROLL-LOCKED 80-FRAME / 40FPS IMAGE SEQUENCE ANIMATION */}
      <ScrollImageSequence />
    </div>
  );
}