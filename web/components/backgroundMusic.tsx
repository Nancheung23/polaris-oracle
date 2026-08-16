"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Music as MusicOff } from "lucide-react";

const AUDIO_BASE_URL = process.env.NEXT_PUBLIC_AUDIO_BASE_URL!;

const TRACKS = Array.from(
  { length: 10 },
  (_, i) =>
    `${AUDIO_BASE_URL}/celestial-threads-${String(i + 1).padStart(2, "0")}.mp3`,
);

const VOLUME = 0.15;

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackIndexRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleEnded = () => {
    trackIndexRef.current = (trackIndexRef.current + 1) % TRACKS.length;
    if (audioRef.current) {
      audioRef.current.src = TRACKS[trackIndexRef.current];
      audioRef.current.play().catch(() => {});
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = VOLUME;
    }
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={TRACKS[0]}
        onEnded={handleEnded}
        preload="none"
      />
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "pause music" : "play music"}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white shadow-lg backdrop-blur transition hover:bg-black/90"
      >
        {isPlaying ? (
          <Music className="h-5 w-5" />
        ) : (
          <MusicOff className="h-5 w-5 opacity-50" />
        )}
      </button>
    </>
  );
}
