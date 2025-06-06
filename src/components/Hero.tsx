import React, { useState, useEffect, useRef, useCallback } from 'react';

// Props interface for the Carousel component
interface CarouselProps {}

const Carousel: React.FC<CarouselProps> = () => {
  // State for carousel animation progress (0-100)
  const [progress, setProgress] = useState(50);
  // State for the currently active carousel item index
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  // State to track if mouse/touch is pressed down for dragging
  const [isMouseDown, setIsMouseDown] = useState(false);
  // State to store the starting X coordinate for drag calculations
  const [startX, setStartX] = useState(0);

  // Refs for DOM elements
  const carouselRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursor2Ref = useRef<HTMLDivElement>(null);

  // Constants for animation speed
  const speedWheel = 0.02;
  const speedDrag = -0.1;

  // Carousel items data
  const carouselItemsData = [
    { title: 'Honesty', num: '', imgSrc: '/images/hero.jpg' },
    { title: 'Empathy', num: '', imgSrc: '/images/2.jpg' },
    { title: 'Transparency', num: '', imgSrc: '/images/3.jpg' },
    { title: 'Appreciation', num: '', imgSrc: '/images/4.jpg' },
    { title: 'Support', num: '', imgSrc: '/images/5.jpg' },
    { title: 'Perseverance', num: '', imgSrc: '/images/6.jpg' },
    { title: 'Dedication', num: '', imgSrc: '/images/7.jpg' },
    { title: 'Shared Vision', num: '', imgSrc: '/images/8.jpg' },
    { title: 'Emotional Closeness', num: '', imgSrc: '/images/9.jpg' },
    { title: 'Commitment', num: '', imgSrc: '/images/10.jpg' },
  ];

  // Helper to calculate z-index for items relative to active index
  const getZindex = useCallback((array: any[], index: number) => {
    return array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i));
  }, []);

  // Animate carousel according to progress
  const animateCarousel = useCallback(() => {
    const clampedProgress = Math.max(0, Math.min(progress, 100));
    const newActiveIndex = Math.floor(clampedProgress / 100 * (carouselItemsData.length - 1));
    setProgress(clampedProgress);
    setActiveItemIndex(newActiveIndex);
  }, [progress, carouselItemsData.length]);

  // Run animation when progress changes
  useEffect(() => {
    animateCarousel();
  }, [animateCarousel]);

  // Handle wheel scrolling
  const handleWheel = useCallback((e: WheelEvent) => {
    const wheelProgress = e.deltaY * speedWheel;
    setProgress(prev => Math.min(100, Math.max(0, prev + wheelProgress)));
  }, []);

  // Handle mouse/touch movement for dragging and cursor updates
  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;

    // Move custom cursors
    if (cursorRef.current && cursor2Ref.current) {
      cursorRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
      cursor2Ref.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
    }

    if (!isMouseDown) return;

    const x = clientX;
    const mouseProgress = (x - startX) * speedDrag;
    setProgress(prev => Math.min(100, Math.max(0, prev + mouseProgress)));
    setStartX(x);
  }, [isMouseDown, startX]);

  // Mouse/touch down start drag
  const handleMouseDown = useCallback((e: MouseEvent | TouchEvent) => {
    setIsMouseDown(true);
    setStartX('clientX' in e ? e.clientX : e.touches[0].clientX);
  }, []);

  // Mouse/touch up end drag
  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  // Attach global event listeners
  useEffect(() => {
    document.addEventListener('wheel', handleWheel);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleMouseDown);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchstart', handleMouseDown);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp]);

  // Inline styles for component
  const bodyStyle: React.CSSProperties = {
    overflow: 'hidden',
    fontFamily: '"Dancing Script", sans-serif',
    backgroundColor: '#FAEBD7',
    margin: 0,
    padding: 0,
    height: '100vh',
  };

  const carouselStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    height: '100vh',
    overflow: 'hidden',
    pointerEvents: 'none',
  };

  const cursorBaseStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 10,
    top: 0,
    left: 0,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    margin: `calc(40px * -0.5) 0 0 calc(40px * -0.5)`,
    transition: 'transform 0.85s cubic-bezier(0, 0.02, 0, 1)',
    display: 'block', // you can change to none to hide initially or control with media queries
    pointerEvents: 'none',
  };

  const cursor2Style: React.CSSProperties = {
    ...cursorBaseStyle,
    width: '2px',
    height: '2px',
    margin: `calc(2px * -0.5) 0 0 calc(2px * -0.5)`,
    transitionDuration: '0.7s',
  };

  // Calculate item style based on index and active item
  const getItemStyle = useCallback((index: number) => {
    const itemsCount = carouselItemsData.length;
    const zIndex = getZindex(carouselItemsData, activeItemIndex)[index];
    const activeCalc = (index - activeItemIndex) / itemsCount;

    const itemWidth = 400;
    const itemHeight = 500;

    const x = activeCalc * 800;
    const y = activeCalc * 200;
    const rot = activeCalc * 120;
    const opacity = (zIndex / itemsCount) * 3 - 2;

    return {
      overflow: 'hidden',
      position: 'absolute' as const,
      zIndex: zIndex,
      width: `${itemWidth}px`,
      height: `${itemHeight}px`,
      margin: `calc(${itemHeight}px * -0.5) 0 0 calc(${itemWidth}px * -0.5)`,
      borderRadius: '10px',
      top: '50%',
      left: '50%',
      userSelect: 'none',
      transformOrigin: '0% 100%',
      boxShadow: '0 10px 50px 10px rgba(0, 0, 0, 0.5)',
      background: 'black',
      pointerEvents: 'all',
      transform: `translate(${x}%, ${y}%) rotate(${rot}deg)`,
      transition: 'transform 0.8s cubic-bezier(0, 0.02, 0, 1)',
      opacity: opacity,
    };
  }, [activeItemIndex, getZindex, carouselItemsData.length]);

  // JSX Render
  return (
    <div style={bodyStyle}>
      <div style={carouselStyle} ref={carouselRef}>
        {carouselItemsData.map((item, index) => (
          <div
            key={index}
            className="carousel-item"
            style={getItemStyle(index)}
            onClick={() => {
              setProgress((index / carouselItemsData.length) * 100 + 10);
            }}
          >
            <div
              className="carousel-box"
              style={{
                position: 'absolute',
                zIndex: 1,
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.4), transparent)',
                pointerEvents: 'none',
              }}
            />
            <img
              src={item.imgSrc}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.75) contrast(0.9)',
                borderRadius: '10px',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              draggable={false}
            />
            <h3
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                margin: 0,
                color: '#FFF',
                fontSize: '2rem',
                fontWeight: 800,
                userSelect: 'none',
                pointerEvents: 'none',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
              }}
            >
              {item.title}
            </h3>
          </div>
        ))}
      </div>

      {/* Custom cursor elements */}
      <div ref={cursorRef} style={cursorBaseStyle} />
      <div ref={cursor2Ref} style={cursor2Style} />
    </div>
  );
};

export default Carousel;
