import React, { useEffect, useRef, useState } from "react";

interface BackgroundMusicProps {
  src: string;
  volume?: number;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ src, volume = 0.5 }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(src));
  const [isPlaying, setIsPlaying] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      const audio = audioRef.current;
      if (!initialized && audio) {
        audio.volume = volume;
        audio.loop = true;
        audio.muted = false;
        audio.play().then(() => {
          setIsPlaying(true);
          setInitialized(true);
        }).catch((e) => {
          console.warn("Autoplay blocked:", e);
        });
      }
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, [volume, initialized]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  return (
    <>
      {/* Audio tag not rendered because we use new Audio() instead */}
      {initialized && (
        <button
          onClick={togglePlayback}
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
