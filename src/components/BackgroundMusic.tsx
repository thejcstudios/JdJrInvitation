import React, { useEffect, useRef, useState } from "react";

interface BackgroundMusicProps {
  src: string;
  volume?: number; // 0 to 1
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ src, volume = 0.5 }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasPlayed && audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current.muted = false;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasPlayed(true);
        }).catch(() => {
          // Handle play failure if needed
        });

        // Remove listeners once played
        document.removeEventListener("click", handleUserInteraction);
        document.removeEventListener("keydown", handleUserInteraction);
        document.removeEventListener("touchstart", handleUserInteraction);
      }
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [hasPlayed, volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        muted
        autoPlay
        style={{ display: "none" }}
      />

      {/* Show button only after music started playing */}
      {hasPlayed && (
        <button
          onClick={togglePlay}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            border: "1px solid #ccc",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            cursor: "pointer",
            fontSize: "24px",
            color: "#333",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            zIndex: 9999,
          }}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          title={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      )}
    </>
  );
};

export default BackgroundMusic;
