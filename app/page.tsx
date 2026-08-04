"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react"; // npm install lucide-react (or use any icon library)

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black font-sans">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/bgvid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/50" />

      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-white backdrop-blur-md transition hover:bg-black/60 focus:outline-none"
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

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          SMAN 3 Mataram
        </h1>
        <p className="mt-4 text-lg font-light tracking-wide text-gray-200 sm:text-xl md:text-2xl">
          Demi Indonesia yang lebih baik
        </p>
      </div>
    </main>
  );
}