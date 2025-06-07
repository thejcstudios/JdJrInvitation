import { useRef, useEffect, useState } from "react";
import "../assets/styles/ImageGallery.css";

const images: string[] = [];
const numberOfImages = 15;

for (let i = 1; i <= numberOfImages; i++) {
  images.push(`/prenup/${i}.webp`);
}

export default function ImageGallery() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  // Title fade-in observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  // Image items up-to-down fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute("data-index") || "-1");
          if (entry.isIntersecting && index >= 0 && !visibleItems.includes(index)) {
            setVisibleItems((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleItems]);

  return (
    
    <section id="prenup">
      <div className="gallarytext">
        <h1
          ref={titleRef}
          className={`gallery-heading ${isTitleVisible ? "fade-in" : ""}`}
        >
          More Prenup Photos
        </h1>
      </div>
      <div className="gallery">
        {images.map((url, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) itemRefs.current[i] = el;
            }}
            data-index={i}
            className={`gallery-item ${visibleItems.includes(i) ? "fade-up" : ""}`}
          >
            <img
              src={url}
              alt={`Gallery image ${i + 1}`}
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/400x300?text=Image+Error";
                console.error(`Failed to load image: ${url}`);
              }}
            />
          </div>
        ))}
      </div>
      </section>
  
  );
}
