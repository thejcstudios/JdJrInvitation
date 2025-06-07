import React, { useEffect, useRef, useState } from 'react';
import styles from '../assets/styles/DressCode.module.css';

import Dress1 from '/images/Dress1.webp';
import Dress2 from '/images/Dress2.webp';
import Dress3 from '/images/Dress3.webp';
import Dress4 from '/images/Dress4.webp';
import Dress5 from '/images/Dress5.webp';
import Dress6 from '/images/Dress6.webp';

const colors = ['#FFFACD', '#DEB887', '#FFE4C4', '#FAEBD7', '#F0E68C'];

const DressCode: React.FC = () => {
  const images = [Dress1, Dress2, Dress3, Dress4, Dress5, Dress6];

  const elementsRef = useRef<(HTMLElement | SVGSVGElement | null)[]>([]);
  const [visibleStates, setVisibleStates] = useState<{ [key: number]: boolean }>({});

  // Assign ref to each DOM element
  const setRef = (el: Element | null) => {
    if (el instanceof HTMLElement || el instanceof SVGSVGElement) {
      const index = Number(el.getAttribute('data-index'));
      elementsRef.current[index] = el;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          const index = Number(target.getAttribute('data-index'));
          setVisibleStates((prev) => {
            if (prev[index] === isIntersecting) return prev;
            return { ...prev, [index]: isIntersecting };
          });
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1,
      }
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

  const totalImages = images.length * 3;

  const renderImage = (img: string, idx: number) => {
    const visible = visibleStates[idx] ?? false;
    const slideX = visible ? 0 : idx % 2 === 0 ? -50 : 50;

    return (
      <img
        key={idx}
        src={img}
        alt={`dress-${idx}`}
        data-index={idx}
        ref={setRef}
        className={styles.dressImage}
        style={{
          opacity: visible ? 1 : 0,
          transform: `translateX(${slideX}px)`,
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
        }}
      />
    );
  };

  const renderText = (text: string, idx: number, Tag: keyof JSX.IntrinsicElements) => {
    const index = totalImages + idx;
    const visible = visibleStates[index] ?? false;
    const slideX = visible ? 0 : idx % 2 === 0 ? -50 : 50;

    return React.createElement(
      Tag,
      {
        key: index,
        ref: setRef,
        'data-index': index,
        className:
          styles['dressh' + (Tag === 'h1' ? '1' : Tag === 'h2' ? '2' : '3')],
        style: {
          opacity: visible ? 1 : 0,
          transform: `translateX(${slideX}px)`,
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          whiteSpace: 'pre-line',
        },
      },
      text
    );
  };

  return (
    <div className={styles.container}>
      {renderText('Dress Code', 0, 'h1')}
      {renderText(
        `We kindly encourage our guests\nTo wear these colors for our special day`,
        1,
        'h2'
      )}

      <div className={styles.imageRow}>
        {renderText("For Female Principal Sponsors & Bride’s Entourage", 2, 'h3')}
        {images.map((img, i) => renderImage(img, i))}
      </div>

      {renderText("For Male Principal Sponsors & Groom’s Entourage", 8, 'h3')}
      <div className={styles.imageRow}>
        {images.map((img, i) => renderImage(img, i + images.length))}
        {renderText(
          `Dress Code: Semi-Formal or Long Gowns Encouraged. We can't wait to see you looking your best!`,
          14,
          'h2'
        )}
      </div>

      {renderText('For Guest', 15, 'h1')}
      <div className={styles.imageRow}>
        {images.map((img, i) => renderImage(img, i + images.length * 2))}
      </div>

      <div className={styles.circleRow}>
        {colors.map((color, i) => {
          const idx = totalImages + 16 + i;
          const visible = visibleStates[idx] ?? false;
          const slideX = visible ? 0 : i % 2 === 0 ? -50 : 50;

          return (
            <svg
              key={i}
              viewBox="0 0 100 100"
              className={styles.circle}
              data-index={idx}
              ref={setRef}
              style={{
                opacity: visible ? 1 : 0,
                transform: `translateX(${slideX}px)`,
                transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
              }}
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                fill={color}
                stroke="#A0522D"
                strokeWidth="2"
              />
            </svg>
          );
        })}
      </div>
    </div>
  );
};

export default DressCode;
