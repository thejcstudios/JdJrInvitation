import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/Gifts.css';

const Gifts: React.FC = () => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [visible, setVisible] = useState<{ [key: number]: boolean }>({});

  const setRef = (el: HTMLElement | null) => {
    if (el) {
      const index = Number(el.getAttribute('data-index'));
      elementsRef.current[index] = el;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          const index = Number(target.getAttribute('data-index'));
          setVisible((prev) => ({
            ...prev,
            [index]: isIntersecting,
          }));
        });
      },
      { threshold: 0.2 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const getStyle = (index: number) => ({
    opacity: visible[index] ? 1 : 0,
    transform: visible[index] ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.9s ${0.1 * index}s cubic-bezier(0.65, 0, 0.35, 1), transform 0.9s ${0.1 * index}s cubic-bezier(0.65, 0, 0.35, 1)`,
  });

  return (
    <section className="gifts-section">
      <div className="gifts-container">
        <h2
          className="gifts-title"
          data-index="0"
          ref={setRef}
          style={getStyle(0)}
        >
          Gifts
        </h2>
        <p
          className="gifts-message"
          data-index="1"
          ref={setRef}
          style={getStyle(1)}
        >
          There is no better gift than the honor of your presence.
        </p>
        <p
          className="gifts-message"
          data-index="2"
          ref={setRef}
          style={getStyle(2)}
        >
          However, if we are blessed with a gift from you,
        </p>
        <p
          className="gifts-message"
          data-index="3"
          ref={setRef}
          style={getStyle(3)}
        >
          we respectfully request a monetary token instead.
        </p>
      </div>
      <div className="decor-top-left" />
      <div className="decor-top-right" />
    </section>
  );
};

export default Gifts;
