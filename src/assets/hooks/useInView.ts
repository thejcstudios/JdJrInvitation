import { useEffect, useRef, useState } from 'react';

export const useInView = <T extends HTMLElement>(threshold = 0.1) => {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], observerInstance) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (ref.current) {
            observerInstance.unobserve(ref.current); // stop observing after first trigger
          }
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isInView };
};
