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
  // State for cursor positions for the custom cursor effect
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  // Ref for the main carousel container element
  const carouselRef = useRef<HTMLDivElement>(null);
  // Ref for the custom cursor elements
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursor2Ref = useRef<HTMLDivElement>(null);

  // Constants for animation speed
  const speedWheel = 0.02;
  const speedDrag = -0.1;

  // Data for carousel items
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

  // Helper function to calculate z-index for carousel items
  const getZindex = useCallback((array: any[], index: number) => {
    return array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i));
  }, []);

  // Function to animate the carousel based on progress
  const animateCarousel = useCallback(() => {
    // Ensure progress stays within 0 and 100
    const clampedProgress = Math.max(0, Math.min(progress, 100));
    const newActiveIndex = Math.floor(clampedProgress / 100 * (carouselItemsData.length - 1));

    setProgress(clampedProgress);
    setActiveItemIndex(newActiveIndex);

  }, [progress, carouselItemsData.length]);

  // Effect for initial animation and re-animation on progress/activeItemIndex change
  useEffect(() => {
    animateCarousel();
  }, [animateCarousel]); // Rerun when animateCarousel (and thus progress/activeItemIndex) changes

  // Event handlers
  const handleWheel = useCallback((e: WheelEvent) => {
    const wheelProgress = e.deltaY * speedWheel;
    setProgress(prev => prev + wheelProgress);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;

    // Update custom cursor positions
    if (cursorRef.current && cursor2Ref.current) {
      cursorRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
      cursor2Ref.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
    }

    if (!isMouseDown) return;

    const x = clientX;
    const mouseProgress = (x - startX) * speedDrag;
    setProgress(prev => prev + mouseProgress);
    setStartX(x); // Update startX for the next move
  }, [isMouseDown, startX]);

  const handleMouseDown = useCallback((e: MouseEvent | TouchEvent) => {
    setIsMouseDown(true);
    setStartX('clientX' in e ? e.clientX : e.touches[0].clientX);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  // Effect to attach and clean up global event listeners
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


  // Inline styles for the component
  const bodyStyle: React.CSSProperties = {
    overflow: 'hidden',
    fontFamily: '"Inter", sans-serif', // Using Inter as per previous instruction
    backgroundColor: '#FAEBD7',
    margin: 0, // Ensure no default body margin
    padding: 0, // Ensure no default body padding
    height: '100vh', // Make sure body takes full viewport height
  };

  const carouselStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    height: '100vh',
    overflow: 'hidden',
    pointerEvents: 'none',
  };

  const layoutStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  };

  const layoutBeforeStyle: React.CSSProperties = {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: '90px',
    width: '10px',
    height: '100%',
    border: '1px solid #fff',
    borderTop: 'none',
    borderBottom: 'none',
    opacity: 0.15,
  };

  const layoutBoxStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: '30px',
    color: '#fff',
    transformOrigin: '0% 10%',
    transform: 'rotate(-90deg)',
    fontSize: '9px',
    lineHeight: 1.4,
    textTransform: 'uppercase',
    opacity: 0.4,
  };

  const logoStyle: React.CSSProperties = {
 
  };

  const socialStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 10,
    bottom: '20px',
    right: '25px',
    color: '#fff',
    opacity: 0.4,
  };

  const socialLinkStyle: React.CSSProperties = {
    display: 'inline-block',
    marginLeft: '3px',
  };

  const socialSvgStyle: React.CSSProperties = {
    '--fill': '#fff', // Custom property will be ignored by inline styles, need to pass fill directly
    width: '35px',
    height: '35px',
  };

  const cursorBaseStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 10,
    top: 0,
    left: 0,
    width: '40px', // --size
    height: '40px', // --size
    borderRadius: '50%',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    margin: `calc(40px * -0.5) 0 0 calc(40px * -0.5)`, // Equivalent to margin: -20px 0 0 -20px
    transition: 'transform 0.85s cubic-bezier(0, 0.02, 0, 1)',
    display: 'none', // Default display, will be overridden by media query in CSS or JS
    pointerEvents: 'none',
  };

  const cursor2Style: React.CSSProperties = {
    ...cursorBaseStyle, // Inherit base styles
    width: '2px', // --size
    height: '2px', // --size
    margin: `calc(2px * -0.5) 0 0 calc(2px * -0.5)`, // Equivalent to margin: -1px 0 0 -1px
    transitionDuration: '0.7s',
  };

  // Dynamically applied CSS for carousel items
  const getItemStyle = useCallback((index: number) => {
    const itemsCount = carouselItemsData.length;
    const zIndex = getZindex([...carouselItemsData], activeItemIndex)[index];
    const activeCalc = (index - activeItemIndex) / itemsCount;

    // Converted --width and --height clamp values to absolute px for inline style
    // You might want to adjust these based on actual viewport dimensions or use media queries
    const itemWidth = 400; // clamp(150px, 30vw, 300px) - using an arbitrary middle value
    const itemHeight = 500; // clamp(200px, 40vw, 400px) - using an arbitrary middle value

    const x = activeCalc * 800; // 800%
    const y = activeCalc * 200; // 200%
    const rot = activeCalc * 120; // 120deg
    const opacity = (zIndex / itemsCount) * 3 - 2;

    return {
      overflow: 'hidden',
      position: 'absolute',
      zIndex: zIndex,
      width: `${itemWidth}px`, // Converted to px
      height: `${itemHeight}px`, // Converted to px
      margin: `calc(${itemHeight}px * -0.5) 0 0 calc(${itemWidth}px * -0.5)`, // Dynamic margin
      borderRadius: '10px',
      top: '50%',
      left: '50%',
      userSelect: 'none',
      transformOrigin: '0% 100%',
      boxShadow: '0 10px 50px 10px rgba(0, 0, 0, 0.5)',
      background: 'black',
      pointerEvents: 'all',
      transform: `translate(${x}%, ${y}%) rotate(${rot}deg)`, // x, y are percentages here
      transition: 'transform 0.8s cubic-bezier(0, 0.02, 0, 1)',
      opacity: opacity, // Applied opacity directly here
    };
  }, [activeItemIndex, getZindex, carouselItemsData.length]);


  // Render the component
  return (
    // Applying global-like styles to the root element of this component
    // as we cannot directly style the <body> tag from a React component.
    // If this component is rendered inside <body>, these styles will apply.
   
    <div style={bodyStyle}>
      <div style={carouselStyle} ref={carouselRef}>
        {carouselItemsData.map((item, index) => (
          <div
            key={index}
            className="carousel-item"
            style={getItemStyle(index)}
            onClick={() => {
              // Clicking an item sets it as the active one
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
                transition: 'opacity 0.8s cubic-bezier(0, 0.02, 0, 1)',
                opacity: getItemStyle(index).opacity, // Re-applying opacity here
                fontFamily: '"Orelo-sw-db", serif', // Assuming this font is available
              }}
            >
              {/* Pseudo-element :before for gradient is simulated by an overlay div */}
              <div
                style={{
                  content: '""',
                  position: 'absolute',
                  zIndex: 1,
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.5))',
                }}
              ></div>
              <div
                className="title"
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  color: '#fff',
                  bottom: '20px',
                  left: '20px',
                  transition: 'opacity 0.8s cubic-bezier(0, 0.02, 0, 1)',
                  fontSize: 'clamp(20px, 3vw, 30px)', // clamp() works in inline styles
                  textShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                {item.title}
              </div>
              <div
                className="num"
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  color: '#fff',
                  top: '10px',
                  left: '20px',
                  transition: 'opacity 0.8s cubic-bezier(0, 0.02, 0, 1)',
                  fontSize: 'clamp(20px, 10vw, 80px)', // clamp() works in inline styles
                }}
              >
                {item.num}
              </div>
              <img
                src={item.imgSrc}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* SVG Symbols - Directly rendered */}
      <svg style={{ display: 'none' }}>
        <symbol id="ico-instagram" viewBox="0 0 35 35">
          <circle opacity=".2" cx="17.5" cy="17.5" r="17" stroke="var(--fill)" fill="none"></circle>
          <path fillRule="evenodd" clipRule="evenodd"
            d="M24.944 20.476c.028-.457.042-1.282.042-2.476s-.014-2.019-.042-2.476c-.056-1.09-.378-1.93-.965-2.517s-1.422-.91-2.503-.965C21.018 12.014 20.194 12 19 12s-2.019.014-2.476.042c-1.081.047-1.92.368-2.517.965s-.918 1.436-.965 2.518C13.014 15.98 13 16.805 13 18c0 1.194.014 2.019.042 2.476.047 1.09.368 1.93.965 2.517s1.436.91 2.518.965c.466.028 1.29.042 2.475.042 1.184 0 2.01-.014 2.476-.042 1.072-.047 1.906-.368 2.503-.965.597-.597.918-1.436.965-2.517ZM19 13.075h-1.427c-.186 0-.438.01-.755.029a11.61 11.61 0 0 0-.797.07c-.215.028-.401.08-.56.154-.26.102-.489.251-.685.447-.196.196-.35.425-.461.685-.056.15-.103.336-.14.56a7.843 7.843 0 0 0-.084.811 7.113 7.113 0 0 0-.014.741c.01.178.01.453 0 .826-.01.373-.01.573 0 .601.01.028.01.228 0 .601s-.01.648 0 .826c.01.177.014.424.014.74 0 .318.028.588.084.812l.14.56c.112.26.265.489.461.685.196.196.425.345.685.447.15.056.336.108.56.154.224.047.49.07.797.07.308 0 .56.01.755.028.196.019.471.019.826 0 .354-.019.554-.019.601 0 .047.019.242.019.587 0s.62-.019.826 0c.205.019.456.01.755-.028.298-.037.569-.06.811-.07.242-.01.424-.06.546-.154.26-.102.494-.251.699-.447a1.75 1.75 0 0 0 .447-.686c.056-.149.103-.335.14-.559.038-.224.066-.494.084-.811.019-.317.023-.564.014-.741a11.82 11.82 0 0 1 0-.826c.01-.373.01-.573 0-.601-.01-.028-.01-.228 0-.601s.01-.648 0-.826c-.01-.177-.014-.424-.014-.74 0-.318-.028-.588-.084-.812l-.14-.56a1.956 1.956 0 0 0-1.147-1.133 3.979 3.979 0 0 0-.545-.153 3.915 3.915 0 0 0-.811-.07c-.326 0-.578-.01-.755-.028a5.916 5.916 0 0 0-.826 0c-.372.019-.568.019-.587 0Zm3.706 2.225c.14-.14.21-.308.21-.504a.57.57 0 0 0-.21-.503.767.767 0 0 0-.517-.21.718.718 0 0 0-.504.21.622.622 0 0 0-.21.503c.01.196.08.364.21.504s.299.21.504.21c.205 0 .377-.07.517-.21ZM22.063 18c0 .849-.298 1.576-.895 2.182a2.882 2.882 0 0 1-2.168.895 3.075 3.075 0 0 1-2.182-.895c-.606-.588-.904-1.315-.895-2.182.01-.867.308-1.594.895-2.182.588-.587 1.315-.886 2.182-.895.867-.01 1.59.29 2.168.895.578.606.876 1.333.895 2.182Zm-1.077 0a1.95 1.95 0 0 0-.573-1.413A1.897 1.897 0 0 0 19 16c-.56 0-1.03.196-1.413.587A2.001 2.001 0 0 0 17 18c-.01.55.186 1.021.587 1.413.401.391.872.587 1.413.587.54 0 1.012-.196 1.413-.587.4-.392.592-.863.573-1.413Z"
            transform="translate(-1.5 -0.5)" fill="currentColor"></path> {/* fill changed to currentColor */}
        </symbol>

        <symbol id="ico-linkedin" viewBox="0 0 35 35">
          <circle opacity=".2" cx="17.5" cy="17.5" r="17" stroke="var(--fill)" fill="none"></circle>
          <path fillRule="evenodd" clipRule="evenodd"
            d="M15.3025 14.0835C15.3025 14.3845 15.1934 14.6403 14.9752 14.851C14.757 15.0617 14.4786 15.167 14.14 15.167C13.8014 15.167 13.5267 15.0617 13.316 14.851C13.1053 14.6403 13 14.3807 13 14.0722C13 13.7637 13.1053 13.5079 13.316 13.3047C13.5267 13.1016 13.8051 13 14.1512 13C14.4974 13 14.772 13.1016 14.9752 13.3047C15.1783 13.5079 15.2874 13.7675 15.3025 14.0835ZM13.0677 23V16.0248H15.2348V23H13.0677ZM16.4763 16.0248C16.5064 16.8676 16.5214 17.6125 16.5214 18.2596V23H18.7111V18.9819C18.7111 18.7111 18.7336 18.5305 18.7788 18.4402C18.9895 17.8984 19.3582 17.6275 19.8849 17.6275C20.6223 17.6275 20.991 18.1317 20.991 19.14V23H23.158V18.8691C23.158 17.8758 22.9285 17.1272 22.4695 16.623C22.0105 16.1189 21.4048 15.8668 20.6524 15.8668C19.6742 15.8668 18.9594 16.243 18.5079 16.9955H18.4628L18.3499 16.0248H16.4763Z"
            transform="translate(0 -1)" fill="currentColor"></path> {/* fill changed to currentColor */}
        </symbol>
      </svg>


      {/* Custom Cursors */}
      <div className="cursor" style={cursorBaseStyle} ref={cursorRef}></div>
      <div className="cursor cursor2" style={cursor2Style} ref={cursor2Ref}></div>
    </div>
  );
};

export default Carousel;
